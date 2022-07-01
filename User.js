const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  levels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Level",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
