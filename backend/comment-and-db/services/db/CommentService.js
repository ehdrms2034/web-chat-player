const Comment = require("../../models/comment");
const Video = require("../../models/video");
const moment = require("moment");

class CommentService {
  constructor() {}

  async createComment(owner, video, message, timeline) {
    const newComment = new Comment({ owner, video, message, timeline });
    await newComment.save();
  }

  async getAllComment() {
    const comments = await Comment.find().populate(["owner", "video"]);
    return comments;
  }

  //video Id : objectId , timeline 12:11:21:22 hh:mm:ss:ms, duration : sec
  async getCommentsByVideo(videoId, timeline, duration) {
    let basedDate = moment("2000");
    let replacedTime = timeline.replaceAll(":", "");
    while (replacedTime.length < 8) {
      replacedTime = "0" + replacedTime;
    }

    let hh = replacedTime.substring(0, 2);
    let mm = replacedTime.substring(2, 4);
    let ss = replacedTime.substring(4, 6);
    let ms = replacedTime.substring(6, 8);
    basedDate.add(hh, "hour");
    basedDate.add(mm, "minute");
    basedDate.add(ss, "second");

    let endDate = moment(basedDate);
    endDate.add(duration, "second");

    let startHH = basedDate.hour().toString();
    let startMM = basedDate.minute().toString();
    let startSS = basedDate.second().toString();

    if (startHH.length < 2) startHH = "0" + startHH;
    if (startMM.length < 2) startMM = "0" + startMM;
    if (startSS.length < 2) startSS = "0" + startSS;

    let endHH = endDate.hour().toString();
    let endMM = endDate.minute().toString();
    let endSS = endDate.second().toString();

    console.log(basedDate, endDate);

    if (endHH.length < 2) endHH = "0" + endHH;
    if (endMM.length < 2) endMM = "0" + endMM;
    if (endSS.length < 2) endSS = "0" + endSS;

    const startTime = parseInt(startHH + startMM + startSS + ms);
    const endTime = parseInt(endHH + endMM + endSS + ms);

    return await Comment.find({
      video: videoId,
      timeline: { $gte: startTime, $lt: endTime },
    }).populate(["owner", "video"]);
  }
}

String.prototype.replaceAll = function (org, dest) {
  return this.split(org).join(dest);
};

module.exports = CommentService;
