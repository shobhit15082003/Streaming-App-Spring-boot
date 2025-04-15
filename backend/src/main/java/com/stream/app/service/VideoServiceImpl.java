package com.stream.app.service;

import com.stream.app.entities.Video;
import com.stream.app.repository.VideoRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService{

    private VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Value("${files.video}")
    String DIR;

    @Value("${file.video.hsl}")
    String HSL_DIR;

    @PostConstruct
    public void init(){
        File file=new File(DIR);

        if(!file.exists()){
            file.mkdir();
            System.out.println("Folder created");
        }
        else{
            System.out.println("Folder already created");
        }

        File hsl_file=new File(HSL_DIR);
        if(!hsl_file.exists()){
            hsl_file.mkdir();
            System.out.println("HSL folder created");
        }
        else{
            System.out.println("HSL folder already created");
        }

    }

    @Override
    public Video save(Video video, MultipartFile file) {

        try{
            String filename= file.getOriginalFilename();
            String contentType=file.getContentType();
            InputStream inputStream=file.getInputStream();




            //file path
            String cleanFileName=StringUtils.cleanPath(filename); //filename mai agar koi unwanted naam aa rha hoga toh clean kar dega usko

            //folder path
            String cleanFolder=StringUtils.cleanPath(DIR);

            // folder path with file name
            Path path= Paths.get(cleanFolder,cleanFileName);

            System.out.println(path);

            //copy file to the folder
            Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);

            //video metadata
            video.setContentType(contentType);
            video.setFilePath(path.toString());


            Video savedVideo = videoRepository.save(video);
            //processing video
            processVideo(savedVideo.getVideoId());

            //delete actual video file if exception




            //metadata save
            return savedVideo;


        }
        catch(IOException e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }


    }

    @Override
    public Video get(String videoId) {

        Video video= videoRepository.findById(videoId).orElseThrow(()-> new RuntimeException("Video not found"));
        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public List<Video> getAll() {
        List<Video> allVideos=videoRepository.findAll();
        return allVideos;
    }

    @Override
    public String processVideo(String videoId) {

        Video video=this.get(videoId);
        String filePath=video.getFilePath();

        Path videoPath = Paths.get(filePath);

//        String output360p=HSL_DIR+videoId+"/360p/";
//        String output720p=HSL_DIR+videoId+"/720p/";
//        String output1080p=HSL_DIR+videoId+"/1080p/";

        try{
//            Files.createDirectories(Paths.get(output360p));
//            Files.createDirectories(Paths.get(output720p));
//            Files.createDirectories(Paths.get(output1080p));


        //ffmpeg command
        Path outputPath=Paths.get(HSL_DIR,videoId);

        Files.createDirectories(outputPath);

        String ffmpegCmd=String.format(
          "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segemnt_filename \"%s/segment_%%3d.ts\" \"%s/master.m3u8\"",
                videoPath,HSL_DIR,outputPath
        );


//        StringBuilder ffmpegCmd = new StringBuilder();
//        ffmpegCmd.append("ffmpeg -i ")
//                .append(videoPath.toString())
//                .append(" ")
//                .append("-map 0:v -map 0:a -s:v:0 640x360 -b:v:0 800k ")
//                .append("-map 0:v -map 0:a -s:v:1 1280x720 -b:v:1 2800k ")
//                .append("-map 0:v -map 0:a -s:v:2 1920x1080 -b:v:2 5000k ")
//                .append("-var_stream_map \"v:0,a:0 v:1,a:0 v:2,a:0\" ")
//                .append("-master_pl_name ").append(HSL_DIR).append(videoId).append("/master.m3u8 ")
//                .append("-f hls -hls_time 10 -hls_list_size 0 ")
//                .append("-hls_segment_filename \"").append(HSL_DIR).append(videoId).append("/v%v/prog_index%03d.ts\" ")
//                .append(HSL_DIR).append(videoId).append("/v%v/prog_index.m3u8");
        System.out.println(ffmpegCmd);
        ProcessBuilder processBuilder=new ProcessBuilder("/bin/bash","-c",ffmpegCmd);
        processBuilder.inheritIO();
        Process process=processBuilder.start();
        int exit = process.waitFor();
        if(exit!=0){
            throw new RuntimeException("Video processing failed");
        }

        return videoId;
        } catch (IOException e) {
            throw new RuntimeException("Video processing failed");
        } catch (InterruptedException e){
            throw new RuntimeException(e);
        }

    }


    @GetMapping("/{videoId}/master.m3u8")
    public ResponseEntity<Resource> serviceMasterFile(
            @PathVariable String videoId
    ){
        Path path=Paths.get(HSL_DIR,videoId,"master.m3u8");
        System.out.println(path);

        if(!Files.exists(path)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        FileSystemResource resource=new FileSystemResource(path);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, "application/vnd.apple.mpegurl")
                .body((Resource) resource);

    }

    @GetMapping("/{videoId}/{segment}.ts")
    public ResponseEntity<Resource> serveSegment(
            @PathVariable String videoId,
            @PathVariable String segment
    ){
        Path path = Paths.get(HSL_DIR,videoId,segment+".ts");
        if(Files.exists(path)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        FileSystemResource resource = new FileSystemResource(path);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE,"video/mp2t")
                .body((Resource) resource);
    }


}
