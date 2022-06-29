const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Level = require("./Level");

mongoose.connect("mongodb://localhost:27017/kajam-game");

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error")
);
mongoose.connection.once("open", () => console.log("DB connected"));

const path = require("path");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/levels", async (req, res) => {
  const levels = await Level.find({});
  res.render("levels/index", { levels });
});

app.get("/levels/:id", async (req, res) => {
  const level = await Level.findById(req.params.id);
  res.render("levels/show", { level });
});

app.get("/makelevel", async (req, res) => {
  const level = new Level({
    number: Math.floor(Math.random() * 10) + 1,
    difficulty: Math.floor(Math.random() * 100) + 1,
    grid: Math.floor(Math.random() * 5) + 1,
    correct: [1, 3, 5, 6, 9],
  });
  await level.save();
  res.send(level);
});

app.listen(3000, () => {
  console.log("Serving on 3000");
});
