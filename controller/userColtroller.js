const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req?.body?.email });

    if (userExist) {
      return res
        .status(200)
        .json({ success: false, message: "User already Registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body?.password, salt);
    req.body.password = hashPassword;
    const user = userModel(req.body);
    const response = await user.save();
    res.status(200).json({
      success: true,
      response: response,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || "user enter invalid information",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body?.email });

    if (!userExist) {
      return res
        .status(200)
        .json({ success: false, message: "User doesn't exist" });
    }

    const validatePasword = await bcrypt.compare(
      req?.body?.password,
      userExist.password
    );

    if (!validatePasword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign({ userId: userExist._id }, process.env.SecretKey, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged In", data: token });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || "user enter invalid information",
    });
  }
};

const getCurrentUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    res.status(200).json({
      success: true,
      message: "User details fetch successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getCurrentUserInfo,
};
