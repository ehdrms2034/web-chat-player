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

  async getComments(videoId, timeline, offset) {
    timeline = parseFloat(timeline);
    offset = parseFloat(offset);
    return await Comment.find({
      video: videoId,
      timeline: { $gte: timeline, $lt: timeline + offset },
    }).populate(["owner", "video"]);
  }
}

String.prototype.replaceAll = function (org, dest) {
  return this.split(org).join(dest);
};

module.exports = CommentService;
