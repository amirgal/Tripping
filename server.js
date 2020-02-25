const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/TrippingDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", api);

const port = 3000;
app.listen(process.env.PORT || port, function() {
  console.log(`Running server on port ${port}`);
});
