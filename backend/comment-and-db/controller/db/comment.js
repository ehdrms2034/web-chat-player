const express = require("express");
const router = express.Router();
const CommentService = require("../../services/db/CommentService");
const UserService = require("../../services/db/UserService");
const generateResponse = require("../../models/generateResponse");
const ObjectId = require("mongoose").Types.ObjectId;

const commentService = new CommentService();
const userService = new UserService();

router.post("/comment", async (req, res) => {
  const { cookie, video, message, timeline } = req.body;
  try {
    if (
      cookie === undefined ||
      video === undefined ||
      message === undefined ||
      timeline === undefined
    )
      throw new Error("request body가 조회 되지 않습니다");
    const owner = await userService.getUserBycookie(cookie);
    await commentService.createComment(owner, video, message, replacedTime);
    res.send(
      generateResponse("success", "성공적으로 댓글을 작성했습니다.", null)
    );
  } catch (error) {
    res.send(
      generateResponse(
        "error",
        "댓글을 작성하는데 실패했습니다.",
        error.message
      )
    );
  }
});

router.get("/comments", async (req, res) => {
  const { video, timeline, offset } = req.query;
  try {
    if (
      video === undefined ||
      timeline === undefined ||
      offset == undefined
    ) {
      throw new Error("request query가 조회되지 않습니다.");
    }
    const messageList = await commentService.getComments(
      video,
      timeline,
      duration
    );
    const parsedList = messageList.map((it) => {
      return {
        nickname: it.owner.nickname,
        timeline: it.timeline,
        message: it.message,
        createdAt: it.createdAt,
      };
    });
    res.send(
      generateResponse(
        "success",
        "성공적으로 메시지 리스트를 불러왔습니다.",
        parsedList
      )
    );
  } catch (error) {
    res.send(
      generateResponse(
        "error",
        "메시지 리스트를 불러오는데 실패했습니다.",
        error.message
      )
    );
  }
});

module.exports = router;
