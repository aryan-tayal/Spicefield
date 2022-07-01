const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  number: Number,
  grid: Number,
  difficulty: Number,
  correct: Array,
  time: Number,
  locked: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Level", LevelSchema);
