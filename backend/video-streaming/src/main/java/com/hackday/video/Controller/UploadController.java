package com.hackday.video.Controller;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
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
    public Map<String, Object> upload(@RequestParam("videoname") String videoname, @RequestParam("file") MultipartFile multipartFile,@RequestParam("poster") MultipartFile posterMultipartFile,
                                      @RequestParam("desc") String desc) {
        String filename = multipartFile.getOriginalFilename();
        String postername= posterMultipartFile.getOriginalFilename();
        System.out.println("filename:"+ filename);
        File targetFile = new File(uploadLocation+filename);



        String[] parsed = postername.split("\\.");
        String extension = parsed[parsed.length-1];
        String posterName = videoname+"-poster."+extension;
        File posterFile = new File(uploadLocation+ posterName);
        logger.info("actual path of video is: " + targetFile.getAbsolutePath());
        logger.info("actual path of poster is: " + posterFile.getAbsolutePath());
        try {
            //파일 가져오기
            InputStream fileStream = multipartFile.getInputStream();
            InputStream posterStream = posterMultipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
            FileUtils.copyInputStreamToFile(posterStream, posterFile);

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
                FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
                executor.createJob(builder).run();

            } catch (Exception e) {
                System.out.println(e);
            }


        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        final String videoServerUrl="http://49.50.162.195:8080/videos/";

        //메타 서버에 보내기
        final String postUri = "http://27.96.130.172/api/video/video";
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> info= new HashMap<>();
        info.put("name", videoname);
        info.put("summary", desc);
        info.put("posterUrl", videoServerUrl+videoname+".m3u8");
        info.put("videoUrl", videoServerUrl+posterName);
        HttpEntity<Map<String, Object>> request = new HttpEntity<Map<String, Object>>(info);
        Map<String, Object> m = new HashMap<>();
        m.put("errorCode", 10);
        ResponseEntity<Object> response = restTemplate.postForEntity(postUri, request, Object.class);
        System.out.println(response);
        return m;
    }
}
