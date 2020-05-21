package com.hackday.video.Service;

import ch.qos.logback.core.util.FileUtil;
import com.hackday.video.Controller.UploadController;
import com.hackday.video.VideoInfo;
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
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;


@Component
public class UploadUtils {

    @Value("${upload.location}")
    private String uploadLocation;

    @Value("${ffmpeg.path}")
    private String ffmpegPath;

    private static Logger logger = LoggerFactory.getLogger(UploadController.class);
    //메타 서버
    final String postUri = "http://27.96.130.172/api/video/video";

    //비디오 서버
    final String videoUrl="http://49.50.162.195:8080/videos/";

    public void convertToHls(String inputPath, String outputPath) throws IOException {
        FFmpeg ffmpeg = new FFmpeg(ffmpegPath+"ffmpeg");		// ffmpeg 파일 경로
        FFprobe ffprobe = new FFprobe(ffmpegPath+"ffprobe");	// ffprobe 파일 경로
        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(inputPath) // input path와 output path가 붙어있지 않으면 오류 남...
                .addOutput(outputPath)
                .addExtraArgs("-codec:", "copy") //코덱
                .addExtraArgs("-start_number", "0") //0부터시작
                .addExtraArgs("-hls_list_size", "0") // 플레이리스트 하나로 통일
                .addExtraArgs("-hls_time", "10") //10초정도컷
                .addExtraArgs("-f", "hls")
                .done();

        // output command line:
        // ffmpeg -y -v error -i /root/videos/videoplayback.mp4 -codec: copy -start_number 0 -hls_list_size 0 -hls_time 10 -f hls /root/videos/eight.m3u8
        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
        executor.createJob(builder).run();
    }

    public void rollBack(File videoFile, File posterFile) {
        FileUtils.deleteQuietly(videoFile);
        FileUtils.deleteQuietly(posterFile);
        logger.info("failed to upload: deleted Files");
    }

    public ResponseEntity<Object> sendRequsetToMetaServer(String name, String summary, String videoUrl, String posterUrl) throws Exception{

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> info= new HashMap<>();
        info.put("name", name);
        info.put("summary", summary);
        info.put("videoUrl", videoUrl);
        info.put("posterUrl", posterUrl);
        ResponseEntity<Object> response=null;
        try {
            //메타 데이터 서버에 요청
            HttpEntity<Map<String, Object>> request = new HttpEntity<Map<String, Object>>(info);
             response = restTemplate.postForEntity(postUri, request, Object.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    public VideoInfo getParsedVideoInfo(String videoname, MultipartFile videoMultipartFile, MultipartFile posterMultipartFile) {
        String filename = videoMultipartFile.getOriginalFilename();

        //비디오 이름(경로) 생성
        String originalVideoPath = uploadLocation+filename;
        String convertedVideoPath = uploadLocation+videoname+".m3u8";

        //포스터 이름은 확장자 따로 가져와서 생성
        String[] parsedPoster = posterMultipartFile.getOriginalFilename().split("\\.");
        String extension = parsedPoster[parsedPoster.length-1];
        String posterName = videoname+"-poster."+extension;
        String posterPath=uploadLocation+ posterName;


        String videoServerUrl = videoUrl+videoname+".m3u8";
        VideoInfo vi = new VideoInfo(filename, originalVideoPath, convertedVideoPath, posterPath, videoServerUrl);
        return vi;
    }
}

