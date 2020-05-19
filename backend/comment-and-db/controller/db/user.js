const express = require("express");
const router = express.Router();
const UserService = require("../../services/db/UserService");
const generateResponse = require("../../models/generateResponse");

const userService = new UserService();

router.post("/createUser", async (req, res) => {
  const { cookie, nickname } = req.body;
  try {
    if (cookie === undefined || nickname === undefined)
      throw new Error("request body가 조회되지 않음");
    await userService.createUser(cookie, nickname);
    return res.send(
      generateResponse("success", "유저 생성에 성공했습니다.", nickname)
    );
  } catch (error) {
    return res.send(
      generateResponse("error", "유저 생성에 실패했습니다.", error.message)
    );
  }
});

router.get("/getNickname", async (req, res) => {
  const { cookie } = req.body;
  try {
    if (cookie === undefined) throw new Error("request body가 조회되지 않음");
    const data = await userService.getNickname(cookie);
    res.send(
      generateResponse("success", "성공적으로 nickname을 조회했습니다.", data)
    );
  } catch (error) {
    res.send(
      generateResponse("error", "nickname을 가져오는데 실패했습니다.", error.message)
    );
  }
});

module.exports = router;
