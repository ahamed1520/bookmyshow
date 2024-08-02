const express = require("express");
const {
  AddMovies,
  GetAllMovies,
  UpdateMovies,
  DeleteMovies,
  GetMovieById,
} = require("../controller/movieController");
const { validateJWTToken } = require("../middleware/aurthmiddleware");
const movieRouter = express.Router();

movieRouter.post("/addMovie", validateJWTToken, AddMovies);
movieRouter.get("/getAllMovies", validateJWTToken, GetAllMovies);
movieRouter.patch("/updateMovie", validateJWTToken, UpdateMovies);
movieRouter.post("/deleteMovie", validateJWTToken, DeleteMovies);
movieRouter.get("/getMovieById/:id", validateJWTToken, GetMovieById);

module.exports = movieRouter;
