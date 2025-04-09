package com.stream.app.service;

import com.stream.app.entities.Video;
import com.stream.app.repository.VideoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
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

    @Value("${files.video")
    String DIR;

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

            //metadata save
            return videoRepository.save(video);


        }
        catch(IOException e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }


    }

    @Override
    public Video get(String videoId) {
        return null;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public List<Video> getAll() {
        return List.of();
    }
}
