const mongoose = require("mongoose");

mongoose
  .connect(process.env.MongoDBURl)
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((err) => {
    console.log("failed to connect with db", err);
  });
