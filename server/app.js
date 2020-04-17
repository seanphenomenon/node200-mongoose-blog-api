const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost/my-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to MongoDB");
});

mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.use("/api/users", require("./routes/users"));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
