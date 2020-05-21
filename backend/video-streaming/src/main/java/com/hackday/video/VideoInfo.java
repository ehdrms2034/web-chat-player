package com.hackday.video;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class VideoInfo {
    String originalFilename;
    String originalVideoPath;
    String convertedVideoPath;
    String posterPath;
    String videoServerUrl;
}
