var path = require("path");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, "..//config/.env"),
  });

const mongoose = require("../models");
const UserService = require('../services/db/UserService');


describe("db", () => {
  beforeEach(() => {
    mongoose;
  });

  it("test", async () => {
    const userService = new UserService();
    await userService.createUser("cookie","ooo");
    console.log(process.env.DB_HOST);
  });
});
