const theaterModel = require("../model/theaterModel");
const show = require("../model/showModel");
const showModel = require("../model/showModel");

const AddTheaters = async (req, res) => {
  try {
    const newTheater = new theaterModel(req?.body);
    const response = await newTheater.save();
    res.status(200).json({
      success: true,
      response: response,
      message: "theater added successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const GetAllTheaters = async (req, res) => {
  try {
    const theater = await theaterModel.find().populate("owner");
    res.status(200).json({
      success: true,
      data: theater,
      message: "theater fetch successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const UpdateTheater = async (req, res) => {
  try {
    const id = req.body._id;
    const update = req.body;
    const option = { new: true };
    const theater = await theaterModel.findByIdAndUpdate(id, update, option);
    res.status(200).json({
      success: true,
      data: theater,
      message: "theater updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const DeleteTheater = async (req, res) => {
  try {
    const id = req.body._id;
    const movies = await theaterModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "theater deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const GetAllTheatersByOwnerId = async (req, res) => {
  try {
    const theater = await theaterModel.find({ owner: req.body.owner });
    res.status(200).json({
      success: true,
      data: theater,
      message: "theater fetch successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const AddShowToTheater = async (req, res) => {
  try {
    const newShow = new show(req?.body);
    const response = await newShow.save();
    res.status(200).json({
      success: true,
      response: response,
      message: "show added successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const GetAllShowsByTheater = async (req, res) => {
  try {
    const shows = await show
      .find({ theater: req.body.theater })
      .populate("movie")
      .sort({
        createdAt: -1,
      });
    res.status(200).json({
      success: true,
      data: shows,
      message: "show fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const DeleteShow = async (req, res) => {
  try {
    const id = req.body._id;
    const response = await show.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      response: response,
      message: "show deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error.message" });
  }
};

const GetAllTheaterForMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await showModel
      .find({ movie, date })
      .populate("theater")
      .sort({ createdAt: -1 });

    const uniqueTheaters = [];

    shows.forEach((show) => {
      const theater = uniqueTheaters.find(
        (theater) => theater._id == show.theater._id
      );
      if (!theater) {
        const showForThisTheater = shows.filter(
          (showObj) => showObj.theater._id == show.theater._id
        );

        uniqueTheaters.push({
          ...show.theater._doc,
          shows: showForThisTheater,
        });
      }
    });

    res.status(200).json({
      success: true,
      data: uniqueTheaters,
      message: "Theaters fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

const GetShowById = async (req, res) => {
  try {
    const show = await showModel
      .findById(req.body.showId)
      .populate("movie")
      .populate("theater");

    res
      .status(200)
      .json({ success: true, message: "Show fetch successfully", data: show });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
module.exports = {
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
};
