package com.stream.app.service;

import com.stream.app.entities.Video;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService{

    @Value("${files.video")
    String DIR;

    @Override
    public Video save(Video video, MultipartFile file) {

        try{
            String filename= file.getOriginalFilename();
            String contentType=file.getContentType();
            InputStream inputStream=file.getInputStream();




        //folder path:create
            String cleanFileName=StringUtils.cleanPath(filename); //filename mai agar koi unwanted naam aa rha hoga toh clean kar dega usko
            String cleanFolder=StringUtils.cleanPath(DIR);

            Path path= Paths.get(cleanFolder,cleanFileName);

            System.out.println(path);



        //folder path with filename


        //copy file to the folder

        //video metadata


        //metadata save
        }
        catch(IOException e){

        }

        return null;
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
