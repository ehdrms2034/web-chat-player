package com.hackday.video.Controller;

import com.hackday.video.Service.UploadUtils;
import com.hackday.video.VideoInfo;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UploadController {
    private static Logger logger = LoggerFactory.getLogger(UploadController.class);


    //ffmpeg util 클래스 ffmpeg path때문에 autowired
    @Autowired
    private UploadUtils util;


    @PostMapping(value = "/videos/upload")
    public Map<String, Object> upload(@RequestParam("videoname") String videoname, @RequestParam("file") MultipartFile videoMultipartFile,@RequestParam("poster") MultipartFile posterMultipartFile,
                                      @RequestParam("desc") String desc) {
        Map<String, Object> ret = new HashMap<>();

        VideoInfo vi = util.getParsedVideoInfo(videoname, videoMultipartFile, posterMultipartFile);
        logger.info("got video: " + vi);
        //파일 객체 정의
        File videoFile = new File(vi.getOriginalVideoPath() );
        File posterFile = new File(vi.getPosterPath());

        try {
            //파일 생성: POST 받은 파일의 인풋스트림을 정의해둔 객체에 쓰기
            FileUtils.copyInputStreamToFile(videoMultipartFile.getInputStream(), videoFile);
            FileUtils.copyInputStreamToFile(posterMultipartFile.getInputStream(), posterFile);

            //FFmpeg 변환
            util.convertToHls(vi.getOriginalVideoPath(), vi.getConvertedVideoPath());
            //메타 서버에 POST 요청
            util.sendRequsetToMetaServer(videoname, desc, vi.getVideoServerUrl(), vi.getPosterServerUrl());
        } catch (Exception e) {
            //실패시 롤백
            util.rollBack(videoFile, posterFile);
            e.printStackTrace();
            ret.put("errorcode", 12);
            ret.put("message", "업로드 실패");
            return ret;
        }

        ret.put("errorCode", 10);
        ret.put("message", "업로드 성공");

        return ret;

    }
}
