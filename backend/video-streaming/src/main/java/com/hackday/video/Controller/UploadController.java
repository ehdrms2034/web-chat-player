package com.hackday.video.Controller;

import com.hackday.video.Service.UploadUtils;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Value("${upload.location}")
    private String uploadLocation;

    //비디오 서버
    final String videoServerUrl="http://49.50.162.195:8080/videos/";
    //메타 서버
    final String postUri = "http://27.96.130.172/api/video/video";

    //ffmpeg util 클래스 ffmpeg path때문에 autowired
    @Autowired
    UploadUtils util;


    @PostMapping(value = "/videos/upload")
    public Map<String, Object> upload(@RequestParam("videoname") String videoname, @RequestParam("file") MultipartFile multipartFile,@RequestParam("poster") MultipartFile posterMultipartFile,
                                      @RequestParam("desc") String desc) {
        Map<String, Object> ret = new HashMap<>();
        String filename = multipartFile.getOriginalFilename();
        logger.info("requested filename: "+ filename);
        File targetFile = new File(uploadLocation+filename);
        String[] parsed = posterMultipartFile.getOriginalFilename().split("\\.");

        //사진파일은 확장자 따로 붙여주기
        String extension = parsed[parsed.length-1];
        String posterName = videoname+"-poster."+extension;

        File posterFile = new File(uploadLocation+ posterName);

        //origin 저장한 뒤 변환하고 삭제(todo!!)
        String originVideoPath = targetFile.getAbsolutePath();
        String convertedVideoPath = uploadLocation+videoname+".m3u8";

        try {
            //파일 가져오기
            InputStream fileStream = multipartFile.getInputStream();
            InputStream posterStream = posterMultipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
            FileUtils.copyInputStreamToFile(posterStream, posterFile);
        } catch (IOException e) {
            //실패시 롤백
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
            ret.put("errorcode", 11);
            ret.put("message", "업로드 실패: 파일 저장에 실패했습니다.");
            return ret;
        }

        try {

            //FFmpeg 변환
            util.convertToHls(originVideoPath, convertedVideoPath);
        } catch (Exception e) {
            e.printStackTrace();

            ret.put("errorcode", 12);
            ret.put("message", "업로드 실패: 파일 변환해 실패했습니다.");
            return ret;

        }

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> info= new HashMap<>();
        info.put("name", videoname);
        info.put("summary", desc);
        info.put("videoUrl", videoServerUrl+videoname+".m3u8");
        info.put("posterUrl", videoServerUrl+posterName);

        try {
            //메타 데이터 서버에 요청
            HttpEntity<Map<String, Object>> request = new HttpEntity<Map<String, Object>>(info);
            ResponseEntity<Object> response = restTemplate.postForEntity(postUri, request, Object.class);
        } catch (Exception e) {
            e.printStackTrace();
            ret.put("errorcode", 13);
            ret.put("message", "업로드 실패: 메타 서버에 전송을 실패했습니다.");
        }

        ret.put("errorCode", 10);
        ret.put("message", "업로드 성공");

        return ret;

    }
}
