const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Level = require("./models/Level");
const User = require("./models/User");
const levelInfo = require("./levelInfo");
const session = require("express-session");

mongoose.connect(
  "mongodb+srv://aryan:spicefield@cluster0.rf2jzvq.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error")
);
mongoose.connection.once("open", () => console.log("DB connected"));

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "spicefarm" }));
app.use("/levels", (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/");
  } else next();
});

app.get("/", async (req, res) => {
  res.render("home", { error: req.query.error });
});

app.get("/levels", async (req, res) => {
  const user = await User.findById(req.session.user_id).populate("levels");
  const levels = user.levels;
  res.render("index", { levels });
});
app.post("/levels/:id", async (req, res) => {
  const currentLevel = await Level.findByIdAndUpdate(req.params.id, {
    completed: true,
  });

  if (levelInfo.length === currentLevel.number) {
    res.redirect("/gamewon");
  } else {
    const nextLevel = await Level.findOneAndUpdate(
      {
        number: currentLevel.number + 1,
        user: req.session.user_id,
      },

      { locked: false }
    );
    res.redirect(`/levels/${nextLevel._id}`);
  }
});
app.get("/levels/:id", async (req, res) => {
  const level = await Level.findById(req.params.id);
  res.render("level", { level });
});

app.post("/", async (req, res) => {
  if (await User.findOne({ username: req.body.username }))
    res.redirect("/?error=true");
  else {
    const user = new User({ username: req.body.username });
    for (let i = 0; i < levelInfo.length; i++) {
      const level = new Level({
        number: i + 1,
        difficulty: levelInfo[i].difficulty,
        grid: levelInfo[i].grid,
        correct: levelInfo[i].correct,
        time: levelInfo[i].time,
        locked: levelInfo[i].locked,
        completed: false,
        user: user._id,
      });
      user.levels.push(level);
      await level.save();
    }
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/levels");
  }
});
app.get("/gamewon", async (req, res) => {
  const lastLevel = await Level.findOne({
    number: levelInfo.length,
    user: req.session.user_id,
  });
  if (lastLevel && lastLevel.completed) {
    res.render("gamewon");
  } else {
    res.redirect("/levels");
  }
});

app.listen(3000, () => {
  console.log("Serving on 3000");
});
