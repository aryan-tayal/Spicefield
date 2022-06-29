const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  number: Number,
  grid: Number,
  difficulty: Number,
});

module.exports = mongoose.model("Level", LevelSchema);
