const User = require("../../models/user");

class UserService {
  constructor() {}

  async createUser(cookie, nickname) {
    const newUser = new User({ cookie: cookie, nickname: nickname });
    await newUser.save();
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserBycookie(cookie) {
    const data = await User.findOne({ cookie });
    if (data === null || data ===undefined)
      throw new Error("조회하려는 cookie값이 존재하지 않습니다");
    return data;
}

  async getNickname(cookie) {
    const userData = await User.findOne({ cookie });
    if (userData === null || userData === undefined)
      throw new Error("조회하려는 cookie값이 존재하지 않습니다");
    return userData.nickname;
  }
}

module.exports = UserService;
