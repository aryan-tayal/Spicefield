const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Level = require("./Level");
const User = require("./User");
const levelInfo = require("./seeds/levelInfo");
const session = require("express-session");

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
app.use(session({ secret: "notagoodsecret" }));
app.use("/levels", (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
    next();
  } else next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/levels", async (req, res) => {
  const levels = await Level.find({});
  res.render("levels/index", { levels });
});
app.post("/levels", async (req, res) => {
  const currentLevel = await Level.findById(req.body.levelId);
  if (levelInfo.length === currentLevel.number) {
    res.redirect("/gamewon");
  } else {
    const nextLevel = await Level.findOneAndUpdate(
      {
        number: currentLevel.number + 1,
      },
      { locked: false }
    );
    res.redirect(`/levels/${nextLevel._id}`);
  }
});
app.get("/levels/:id", async (req, res) => {
  const level = await Level.findById(req.params.id);
  res.render("levels/show", { level });
});

app.get("/signup", async (req, res) => {
  res.render("user/signup", { error: req.query.error });
});
app.post("/signup", async (req, res) => {
  if (await User.findOne({ username: req.body.username }))
    res.redirect("/signup?error=true");
  else {
    const user = new User({ username: req.body.username, progress: 1 });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/levels");
  }
});

app.listen(3000, () => {
  console.log("Serving on 3000");
});
