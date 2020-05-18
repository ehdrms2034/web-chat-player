const User = require("../../models/user");

class UserService {
  constructor() {}

  async createUser(cookie, nickname) {
    const newUser = new User({ cookie: cookie, nickname: nickname });
    await newUser.save();
  }

  async getAllUsers(){
      return await User.find();
  }

  async getNickname(cookie) {
    const userData = await User.findOne({ cookie });
    return userData.nickname;
  }
}

module.exports = UserService;
