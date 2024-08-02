const jwt = require("jsonwebtoken");

const validateJWTToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SecretKey);
    req.body.userId = decode.userId;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = {
  validateJWTToken,
};
