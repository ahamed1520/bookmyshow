const bookingModel = require("../model/bookingModel");
const showModel = require("../model/showModel");

const stripe = require("stripe")(process.env.StripeKey);

const makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.emil,
      description: "Token Booked for movie",
      "automatic_payment_methods[enabled]": true,
    });

    const transactionId = charge.id;

    res.status(200).json({
      success: true,
      message: "Payment Successfull",
      data: transactionId,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const bookAShow = async (req, res) => {
  try {
    const newBooking = new bookingModel(req.body);
    await newBooking.save();

    const show = await showModel.findById(req.body.show);
    await showModel.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });
    res.status(200).json({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.body.userId })
      .populate("show")
      .populate({ path: "show", populate: { path: "movie", model: "movies" } })
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "theater", model: "theaters" },
      });
    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  makePayment,
  bookAShow,
  getBookings,
};
