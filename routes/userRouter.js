const express = require("express");
const {
  userRegister,
  userLogin,
  getCurrentUserInfo,
} = require("../controller/userColtroller");
const { validateJWTToken } = require("../middleware/aurthmiddleware");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/getcurrentuser", validateJWTToken, getCurrentUserInfo);

module.exports = {
  userRouter,
};
