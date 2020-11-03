const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const userRouter = require("./routes/userroutes");
const bookRouter = require("./routes/bookroutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
