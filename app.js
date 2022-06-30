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
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/levels", async (req, res) => {
  const levels = await Level.find({});
  res.render("levels/index", { levels });
});
app.post("/levels", async (req, res) => {
  const currentLevel = await Level.find({ locked: false });
  const nextLevel = await Level.find({ number: currentLevel[0].number + 1 });
  nextLevel.locked = false;
//   await nextLevel.save();
  res.redirect(`/levels/${nextLevel[0]._id}`);
});
app.get("/levels/:id", async (req, res) => {
  const level = await Level.findById(req.params.id);
  res.render("levels/show", { level });
});

app.listen(3000, () => {
  console.log("Serving on 3000");
});
