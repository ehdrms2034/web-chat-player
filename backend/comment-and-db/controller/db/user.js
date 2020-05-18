const express = require("express");
const router = express.Router();
const UserService = require("../../services/db/UserService");
const APIResponse = require("../../models/APIResponse");

const userService = new UserService();

router.post("/createUser", async (req, res) => {
  const { cookie, nickname } = req.body;
  try {
    console.log(cookie,nickname);
    await userService.createUser(cookie,nickname);
    return res.send(
      new APIResponse("success", "유저 생성에 성공했습니다.", nickname)
    );
  } catch (error) {
    return res.send(
      new APIResponse("error", "유저 생성에 실패했습니다.", error)
    );
  }
});

router.get("/getNickname", async (req, res) => {
  const { cookie } = req.body;
  try {
    const data = await userService.getNickname(cookie);
    res.send(
      new APIResponse("success", "성공적으로 nickname을 조회했습니다.", data)
    );
  } catch (error) {
    res.send(
      new APIResponse("error", "nickname을 가져오는데 실패했습니다.", error)
    );
  }
});

module.exports = router;
