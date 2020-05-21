package com.hackday.video.Controller;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static Logger logger = LoggerFactory.getLogger(UploadController.class);

    @Value("video.absolute.location")
    private String videoLocation;
    @Value("${upload.location}")
    private String uploadLocation;

    @Value("${ffmpeg.path}")
    private String ffmpegPath;
    @PostMapping(value = "/videos/upload")
    public Map<String, Object> upload(@RequestParam("videoname") String videoname, @RequestParam("file") MultipartFile multipartFile,@RequestParam("poster") MultipartFile posterFile,
                                      @RequestParam("desc") String desc) {
        String filename = multipartFile.getOriginalFilename();
        System.out.println("filename:"+ filename);
        File targetFile = new File(uploadLocation+filename);

        System.out.println(filename.split("."));
        File poster = new File(uploadLocation+videoname+"-poster");
        logger.info("actual path of video is: " + targetFile.getAbsolutePath());
        logger.info("actual path of poster is: " + poster.getAbsolutePath());
        try {
            //파일 가져오기
            InputStream fileStream = multipartFile.getInputStream();
            InputStream posterStream = posterFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
            FileUtils.copyInputStreamToFile(posterStream, poster);

            //ConvertService cs = new ConvertService();
            //ffmpeg hls 변환 후 업로드
            try {
                FFmpeg ffmpeg = new FFmpeg(ffmpegPath+"ffmpeg");		// ffmpeg 파일 경로
                FFprobe ffprobe = new FFprobe(ffmpegPath+"ffprobe");	// ffprobe 파일 경로
                System.out.println("fmpg: " + ffmpeg);
                FFmpegBuilder builder = new FFmpegBuilder()
                        .setInput(targetFile.getAbsolutePath())
                        .addOutput(uploadLocation+videoname+".m3u8")
                        .addExtraArgs("-codec:", "copy") //코덱
                        .addExtraArgs("-start_number", "0") //0부터시작
                        .addExtraArgs("-hls_list_size", "0")
                        .addExtraArgs("-hls_time", "10") //10초정도컷
                        .addExtraArgs("-f", "hls")
                        .done();


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
