const express = require("express");
require("dotenv").config();
const app = express();
const dbconfig = require("./config/dbconfig");
const { userRouter } = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const theaterRouter = require("./routes/theaterRouter");
const bookingRouter = require("./routes/bookingRouter");

//application middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/app/v1/user", userRouter);
app.use("/app/v1/user/admin", movieRouter);
app.use("/app/v1/user/theater", theaterRouter);
app.use("/app/v1/user/booking", bookingRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening to the port ${process.env.PORT}`);
});
