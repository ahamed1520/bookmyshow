const express = require("express");
const {
  AddTheaters,
  GetAllTheaters,
  UpdateTheater,
  DeleteTheater,
  GetAllTheatersByOwnerId,
  AddShowToTheater,
  GetAllShowsByTheater,
  DeleteShow,
  GetAllTheaterForMovie,
  GetShowById,
} = require("../controller/theaterController");

const theaterRouter = express.Router();
const { validateJWTToken } = require("../middleware/aurthmiddleware");

theaterRouter.post("/addTheater", validateJWTToken, AddTheaters);
theaterRouter.get("/getAllTheater", validateJWTToken, GetAllTheaters);
theaterRouter.patch("/updateTheater", validateJWTToken, UpdateTheater);
theaterRouter.post("/deleteTheater", validateJWTToken, DeleteTheater);
theaterRouter.post(
  "/getAllTheaterByOwnerId",
  validateJWTToken,
  GetAllTheatersByOwnerId
);
theaterRouter.post("/addShow", validateJWTToken, AddShowToTheater);
theaterRouter.post("/getAllShow", validateJWTToken, GetAllShowsByTheater);
theaterRouter.post("/deleteShow", validateJWTToken, DeleteShow);
theaterRouter.post(
  "/getAllTheaterByMovie",
  validateJWTToken,
  GetAllTheaterForMovie
);
theaterRouter.post("/getShowById", validateJWTToken, GetShowById);

module.exports = theaterRouter;
