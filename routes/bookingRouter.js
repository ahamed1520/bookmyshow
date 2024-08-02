const express = require("express");
const { validateJWTToken } = require("../middleware/aurthmiddleware");
const {
  makePayment,
  bookAShow,
  getBookings,
} = require("../controller/bookColtroller");
const bookingRouter = express.Router();

bookingRouter.post("/makePayment", validateJWTToken, makePayment);
bookingRouter.post("/bookShow", validateJWTToken, bookAShow);
bookingRouter.get("/getBookings", validateJWTToken, getBookings);

module.exports = bookingRouter;
