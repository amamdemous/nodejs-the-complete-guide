const express = require("express");
const path = require("path");
const { config } = require("./config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uri = `mongodb+srv://telman:${config.DATABASE_PASSWORD}@cluster0.gm6pmjz.mongodb.net/shop?retryWrites=true&w=majority`;

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error404");

const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63931d291360b1a15a02aaa1")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.getError404Page);

mongoose
  .connect(uri)
  .then((response) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "amamdemous",
          email: "amamdemous@gmail.com",
          cart: {
            items: [],
          },
        });

        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
