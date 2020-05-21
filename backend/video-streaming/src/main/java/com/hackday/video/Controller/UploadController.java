package com.hackday.video.Controller;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class UploadController {
    @Value("video.absolute.location")
    private String videoLocation;
    @Value("${upload.location}")
    private String uploadLocation;

    @PostMapping(value = "/videos/upload")
    public Map<String, Object> upload(@RequestParam("videoname") String videoname, @RequestParam("file") MultipartFile multipartFile,
                                      @RequestParam("desc") String desc) {
        String filename = multipartFile.getOriginalFilename();
        File targetFile = new File(uploadLocation+filename);
        System.out.println("actual path is: " + targetFile.getAbsolutePath());
        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);

            System.out.println("filename:"+ filename);
            //ConvertService cs = new ConvertService();
            try {



                String ffmpegBasePath = "/root/ffmpeg/";
                FFmpeg ffmpeg = new FFmpeg(ffmpegBasePath+"ffmpeg");		// ffmpeg.exe 파일 경로
                FFprobe ffprobe = new FFprobe(ffmpegBasePath+"ffprobe");	// ffprobe.exe 파일 경로
                System.out.println("fmpg: " + ffmpeg);
                FFmpegBuilder builder = new FFmpegBuilder()
                        .setInput(targetFile.getAbsolutePath())// output 파일을 덮어쓸 것인지 여부(false일 경우, output path에 해당 파일이 존재할 경우 예외 발생 - File 'C:/Users/Desktop/test.png' already exists. Exiting.)
                        .addOutput("/root/videos/"+"example.m3u8")
                        .addExtraArgs("-codec:", "copy")
                        .addExtraArgs("-start_number", "0")
                        .addExtraArgs("-hls_list_size", "0")
                        .addExtraArgs("-hls_time", "10")
                        .addExtraArgs("-f", "hls")
                        .done();


                FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);		// FFmpeg 명령어 실행을 위한 FFmpegExecutor 객체 생성
                executor.createJob(builder).run();
            } catch (Exception e) {
                System.out.println(e);
            }



        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }

        Map<String, Object> m = new HashMap<>();
        m.put("errorCode", 10);
        return m;
    }
}
