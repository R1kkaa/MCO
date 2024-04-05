const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("mongodb");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  "Access-Control-Allow-Credentials": true,
};
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/MCODB")
  .then(() => console.log("Database Connection Success"))
  .catch((err) => {
    console.error(err);
  });
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: "some-secret",
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/MCODB",
      autoRemove: "native",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  mongodb: mongodb,
  fs: fs,
  passport: passport,
  check: check,
  mongoose: mongoose,
  Schema: mongoose.Schema,
  validationResult: validationResult,
};
const { reviews } = require("./schemas/reviews");
const { reviewsratings } = require("./schemas/reviewsratings");
const { users } = require("./schemas/users");
const { restaurants } = require("./schemas/restaurants");

passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());
passport.use(new LocalStrategy(users.authenticate()));

let models = {
  restaurants: restaurants,
  reviews: reviews,
  reviewsratings: reviewsratings,
  users: users,
};
const userroutes = require("./routes/users");
userroutes.add(app, models);

const reviewroutes = require("./routes/reviews");
reviewroutes.add(app, models);

const restaurantroutes = require("./routes/restaurants");
restaurantroutes.add(app, models);
