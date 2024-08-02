const movieModel = require("../model/movieModel");

const AddMovies = async (req, res) => {
  try {
    const newMovie = new movieModel(req?.body);
    const response = await newMovie.save();
    res.status(200).json({
      success: true,
      response: response,
      message: "movie added successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const GetAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json({
      success: true,
      data: movies,
      message: "movie fetch successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const UpdateMovies = async (req, res) => {
  try {
    const id = req.body._id;
    const update = req.body;
    const option = { new: true };
    const movies = await movieModel.findByIdAndUpdate(id, update, option);
    res.status(200).json({
      success: true,
      data: movies,
      message: "movie updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const DeleteMovies = async (req, res) => {
  try {
    const id = req.body._id;
    const movies = await movieModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "movie deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const GetMovieById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: movie,
      message: "movie fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

module.exports = {
  AddMovies,
  GetAllMovies,
  UpdateMovies,
  DeleteMovies,
  GetMovieById,
};
