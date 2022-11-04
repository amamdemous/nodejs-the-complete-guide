const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

const users = ["amamdemous", "bill_gates", "elon"];

app.use("/users", (req, res, next) => {
  res.send(users);
});

app.use("/", (req, res, next) => {
  res.send("<h1> Main page </h1>");
});

app.listen(port);
