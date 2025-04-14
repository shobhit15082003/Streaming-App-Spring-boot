package com.stream.app.Controllers;

import com.stream.app.Payload.CustomMessage;
import com.stream.app.constants.AppConstants;
import com.stream.app.entities.Video;
import com.stream.app.service.VideoService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin("*")
public class VideoController {

    private VideoService videoService;
    private String baka;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestParam("file")MultipartFile file,
            @RequestParam("title")String title,
            @RequestParam("description")String description
            ){
        Video video=new Video();
        video.setTitle(title);
        video.setDescription(description);
//        video.setVideoId(UUID.randomUUID().toString());

        Video savedVideo=videoService.save(video,file);
        if(savedVideo!=null){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(video);

        }
        else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CustomMessage.builder().message("Video not uploaded")
                            .success(false)
                            .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                            .build()
                    );
        }


    }

    @GetMapping
    public List<Video> getAll(){
        return videoService.getAll();
    }



    @GetMapping("/stream/{videoId}")
    public ResponseEntity<Resource> stream(
            @PathVariable String videoId
    ){
        Video video=videoService.get(videoId);

        String contentType=video.getContentType();
        String filePath=video.getFilePath();

        if(contentType==null){
            contentType="application/octet-stream";
        }

        Resource resource=new FileSystemResource(filePath);

        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);


    }

    @GetMapping("/stream/range/{videoId}")
    public ResponseEntity<Resource> streamVideoRange(
            @PathVariable String videoId,
            @RequestHeader(value = "Range", required = false) String range
    ){
        System.out.println(range);

        Video video=videoService.get(videoId);

        String contentType=video.getContentType();

        if(contentType==null){
            contentType="application/octet-stream";
        }

        //to get the path
        Path path = Paths.get(video.getFilePath());
        Resource resource=new FileSystemResource(path); //content

        //if range is null then send the entire file
        if(range==null){
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        }

        //total length of file
        long fileLength=path.toFile().length();

        long rangeStart,rangeEnd;
        String [] ranges=range.replace("bytes=","").split("-");
        rangeStart=Long.parseLong(ranges[0]);
//        if(ranges.length>1){
//            rangeEnd=Long.parseLong(ranges[1]);
//        }else{
//            rangeEnd=fileLength-1;
//        }
//        if(rangeEnd>fileLength-1){
//            rangeEnd=fileLength-1;
//        }
            rangeEnd=rangeStart+ AppConstants.CHUNK_SIZE-1;
            if(rangeEnd>-fileLength){
                rangeEnd=fileLength-1;
            }

        InputStream inputStream;
        try{
            inputStream= Files.newInputStream(path);
            inputStream.skip(rangeStart);

            long contentLegth=rangeEnd-rangeStart+1;

            byte[] data=new byte[(int)contentLegth];
            int read=inputStream.read(data,0,data.length);
            System.out.println("Read(number of bytes: "+read);

            HttpHeaders headers=new HttpHeaders();
            headers.add("Content-Range","bytes "+rangeStart+"-"+rangeEnd+"/"+fileLength);
            headers.add("Cache-Control","no-cache, no-store, must-revalidate");
            headers.add("Pragma","no-cache");
            headers.add("Expires","0");
            headers.add("X-Content-Type-Oprions","nosniff");
            headers.setContentLength(contentLegth);

            return ResponseEntity
                    .status(HttpStatus.PARTIAL_CONTENT)
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(new ByteArrayResource(data));
        }
        catch (IOException ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }


}
