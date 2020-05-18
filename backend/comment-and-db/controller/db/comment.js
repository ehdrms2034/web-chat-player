const express = require("express");
const router = express.Router();
const CommentService = require("../../services/db/CommentService");
const UserService = require("../../services/db/UserService");
const APIResponse = require("../../models/APIResponse");
const ObjectId = require("mongoose").Types.ObjectId;

const commentService = new CommentService();
const userService = new UserService();

router.post("/createComment", async (req, res) => {
  const { cookie, video, message, timeline } = req.body;
  let replacedTime = parseInt(timeline.replaceAll(":", ""));
  try {
    const owner = await userService.getUserBycookie(cookie);
    await commentService.createComment(owner, video, message, replacedTime);
    res.send(
      new APIResponse("success", "성공적으로 댓글을 작성했습니다.", null)
    );
  } catch (error) {
    res.send(
      new APIResponse("error", "댓글을 작성하는데 실패했습니다.", error)
    );
  }
});

router.get("/getComments", async (req, res) => {
  const { video, timeline, duration } = req.body;
  try {
    const messageList = await commentService.getCommentsByVideo(
      video,
      timeline,
      duration
    );
    const parsedList = messageList.map((it) => {
      return {
        nickname: it.owner.nickname,
        timeline: it.timeline,
        message: it.message,
        createdAt : it.createdAt
      };
    });
    res.send(
      new APIResponse(
        "success",
        "성공적으로 메시지 리스트를 불러왔습니다.",
        parsedList
      )
    );
  } catch (error) {
    res.send(
      new APIResponse(
        "error",
        "메시지 리스트를 불러오는데 실패했습니다.",
        error
      )
    );
  }
});

module.exports = router;
