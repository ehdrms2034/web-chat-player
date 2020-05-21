package com.hackday.video;

import lombok.AllArgsConstructor;
import lombok.Data;

//하나라도 없으면 안돌아감
@AllArgsConstructor
@Data
public class VideoInfo {
    String originalFilename;
    String originalVideoPath;
    String convertedVideoPath;
    String posterPath;
    String videoServerUrl;
}
