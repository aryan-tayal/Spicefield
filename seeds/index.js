const mongoose = require("mongoose");
const levelInfo = require("./levelInfo");
const Level = require("../level");

mongoose.connect("mongodb://localhost:27017/kajam-game", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Level.deleteMany({});
  for (let i = 0; i < levelInfo.length; i++) {
    const level = new Level({
      number: i + 1,
      difficulty: Math.floor(Math.random() * 100) + 1,
      grid: levelInfo[i].grid,
      correct: levelInfo[i].correct,
      time: levelInfo[i].time,
    });
    await level.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
