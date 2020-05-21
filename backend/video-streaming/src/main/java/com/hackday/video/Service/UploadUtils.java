package com.hackday.video.Service;

import ch.qos.logback.core.util.FileUtil;
import com.hackday.video.Controller.UploadController;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;


@Component
public class UploadUtils {

    @Value("${ffmpeg.path}")
    private String ffmpegPath;

    private static Logger logger = LoggerFactory.getLogger(UploadController.class);

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
}

