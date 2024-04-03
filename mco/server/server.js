//Do MVC
//Deployment
//Link Cookies to Sessions, Validation
const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios");
const mongodb = require("mongodb");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const { check, ValidationResult, validationResult } = require("express-validator");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const bcrypt = require("bcrypt");
const passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  "Access-Control-Allow-Credentials": true

};
app.use(cors(corsOptions));

const storageusers = multer.diskStorage({
  destination: "./public/users",
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const storagemedia = multer.diskStorage({
  destination: "./public/reviewmedia",
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploaduserimage = multer({ storage: storageusers });
const uploadreviewimage = multer({ storage: storagemedia });
app.use(cookieParser());
const mongoose = require("mongoose");
const path = require("path");
const { connect } = require("http2");
const Schema = mongoose.Schema;
mongoose
  .connect("mongodb://127.0.0.1:27017/MCODB")
  .then(() => console.log("Database Connection Success"))
  .catch((err) => {
    console.error(err);
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: "some-secret",
    cookie: {secure: false},
    resave: false, saveUninitialized: false,
    store: MongoStore.create({        
      mongoUrl: 'mongodb://127.0.0.1:27017/MCODB',
    autoRemove: 'native' }),
  })
);
app.use(passport.initialize());
app.use(passport.session());



const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  isOwner: Boolean,
  description: String,
  imageurl: String,
});

userSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email","username"]});
const users = mongoose.model("User", userSchema);
exports.users = users;

passport.serializeUser(users.serializeUser()); 
passport.deserializeUser(users.deserializeUser()); 
passport.use(new LocalStrategy(users.authenticate())); 
async function getusers() {
  const userquery = await users.find({});
  return JSON.stringify(userquery);
}
const restaurantsSchema = new Schema({
  restaurantName: String,
  location: String,
  description: String,
  owner: String,
  avgrating: Number,
  numreviews: Number,
});
const restaurants = mongoose.model("Restaurant", restaurantsSchema);

async function getrestaurants() {
  const restaurantquery = await restaurants.find({});
  return restaurantquery;
}
const reviewsSchema = new Schema({
  restaurantID: mongodb.ObjectId,
  reviewerID: mongodb.ObjectId,
  review: String,
  rating: Number,
  helpful: Number,
  unhelpful: Number,
  ownerresponse: String,
  imageurl: String,
  edited: Boolean,
});
const reviews = mongoose.model("Review", reviewsSchema);

async function getreviews() {
  const reviewquery = await reviews.find({});
  return reviewquery;
}

const reviewsratingSchema = new Schema({
  reviewID: mongodb.ObjectId,
  reviewerID: mongodb.ObjectId,
  helpful: Boolean,
  unhelpful: Boolean,
});
const reviewsratings = mongoose.model("Reviewsrating", reviewsratingSchema);

async function getavgrating(id) {
  var val = await reviews.aggregate([
    {
      $match: {
        restaurantID: mongodb.ObjectId.createFromHexString(id),
      },
    },
    {
      $group: {
        _id: null,
        fieldN: { $avg: "$rating" },
      },
    },
  ]);
  val[0].fieldN = val[0].fieldN.toFixed(2);
  return val[0].fieldN;
}
async function getnumreviews(id) {
  var val = await reviews.aggregate([
    {
      $match: {
        restaurantID: mongodb.ObjectId.createFromHexString(id),
      },
    },
    {
      $count: "rating",
    },
  ]);
  return val[0].rating;
}
async function gethelpful(id) {
  var val = await reviewsratings.aggregate([
    {
      $match: {
        reviewID: mongodb.ObjectId.createFromHexString(id),
        helpful: true,
      },
    },
    {
      $count: "helpful",
    },
  ]);
  if (val[0]) return val[0].helpful;
  else return 0;
}
async function getunhelpful(id) {
  var val = await reviewsratings.aggregate([
    {
      $match: {
        reviewID: mongodb.ObjectId.createFromHexString(id),
        unhelpful: true,
      },
    },
    {
      $count: "unhelpful",
    },
  ]);
  if (val[0]) return val[0].unhelpful;
  else return 0;
}
async function getfeaturedreviews(restaurant) {
  var val = await reviews.aggregate([
    {
      $match: {
        restaurantID: restaurant._id,
        rating: {
          $gte: 4,
        },
      },
    },
  ]);
  var rand = parseInt(Math.floor(Math.random() * val.length));
  return val[rand].review;
}
async function getrestoreviews(id) {
  var val = await reviews
    .aggregate([
      {
        $match: {
          restaurantID: mongodb.ObjectId.createFromHexString(id),
        },
      },
    ])
    .lookup({
      from: "users",
      localField: "reviewerID",
      foreignField: "_id",
      as: "user",
    });
  return val;
}
async function getuserreviews(id) {
  var val;
  try {
    val = await reviews
      .aggregate([
        {
          $match: {
            reviewerID: mongodb.ObjectId.createFromHexString(id),
          },
        },
      ])
      .lookup({
        from: "restaurants",
        localField: "restaurantID",
        foreignField: "_id",
        as: "restaurant",
      });
  } catch (error) {
    val = "ERROR404";
  }
  return val;
}
app.post("/home/login", passport.authenticate('local'),
  async function (req, res) {
    if(req.user){
        req.session.userid = req.user._id
        req.session.remember = req.body.remember
        if(!req.body.remember){
          req.session.cookie.expires = false
        }else{
          req.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000
        }
      res.send({success: true, _id: req.user._id, isOwner : req.user.isOwner})
    }else{
      res.send({success: false})
    }
});

app.post("/home/register/check", async function (req, res) {
  var val = await getusers();
  res.send(val);
});

app.post("/home/register", check('email').isEmail().withMessage("Email Invalid."), check('password').isLength({min: 8}).withMessage("Password must atleast be 8 characters."), async function (req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    console.log(errors)
    res.send({fail: true, errors: errors.array()})
  }
  else{
    let user =
    {  firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      username : req.body.username,
      isOwner : false,
      description : req.body.description,}
    
      users.register(new users({  firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        username : req.body.username,
        isOwner : false,
        description : req.body.description,}), req.body.password, function (err, user) { 
        res.send(String(user["_id"]));
      })
  }
});

app.post(
  "/home/register/upload",
  uploaduserimage.array("my-image-file"),
  async function (req, res) {
    id = JSON.parse(JSON.stringify(req.body)).id;
    users.findById(id).then((document) => {
      document.imageurl = "/users/".concat(req.files[0].originalname);
      document.save();
    });
    res.send(req.body);
  }
);

app.post("/rememberme", async function (req,res){
  if(req.session.remember && req.user){
    res.send({user: req.user, success: true})
  }
  else{
    res.send({success: false})
  }
})

app.post("/logged", async function (req,res){
  if(req.user){
    res.send({user: req.user, success: true})
  }
  else{
    res.send({success: false})
  }
})

app.post("/review", async function (req, res) {
  newreview = new reviews();
  newreview.restaurantID = mongodb.ObjectId.createFromHexString(
    req.body.restaurantid
  );
  newreview.reviewerID = mongodb.ObjectId.createFromHexString(req.body.userid);
  newreview.review = req.body.review;
  newreview.rating = req.body.rating;
  newreview.helpful = 0;
  newreview.unhelpful = 0;
  newreview.ownerresponse = "";
  newreview.save().then(async function (result) {
    let rating = await getavgrating(req.body.restaurantid);
    let numreviews = await getnumreviews(req.body.restaurantid);
    restaurants
      .findByIdAndUpdate(req.body.restaurantid, {
        avgrating: rating,
        numreviews: numreviews,
      })
      .then((response) => {
        res.send(String(result["_id"]));
      });
  });
});

app.post(
  "/review/upload",
  uploadreviewimage.array("my-image-file"),
  async function (req, res) {
    id = JSON.parse(JSON.stringify(req.body)).id;
    reviews.findById(id).then((document) => {
      document.imageurl = "/reviewmedia/".concat(req.files[0].originalname);
      document.save();
    });
    res.send(req.body);
  }
);

app.post("/user/:id/editprofile", async function (req, res) {
  users.findById(req.params.id).then((document) => {
    document.description = req.body.description;
    if (req.body.newimage) {
      fs.unlink(
        "./public" + document.imageurl,
        (err) => err && console.error(err)
      );
    }
    document.save();
    res.send(document);
  });
});

app.post("/user/:id/deleteprofile", async function (req, res) {
  reviews.deleteMany(
    {
        reviewerID: mongodb.ObjectId.createFromHexString(req.params.id)
    }).then(
        function () {
            // Success
            console.log("Data deleted");
        }).catch(
            function (error) {
                // Failure
                console.log(error);
            }).then(response =>{
              reviewsratings.deleteMany(
                {
                    reviewerID: mongodb.ObjectId.createFromHexString(req.params.id)
                }).then(
                    function () {
                        // Success
                        console.log("Data deleted");
                    }).catch(
                        function (error) {
                            // Failure
                            console.log(error);
                        })
            }).then(rsponse => {
              users.findByIdAndDelete(req.params.id).then(response =>
                res.send(200)
                )
            })
});

app.post(
  "/user/:id/editprofile/upload",
  uploaduserimage.array("my-image-file"),
  async function (req, res) {
    users.findById(req.params.id).then((document) => {
      document.imageurl = "/users/".concat(req.files[0].originalname);
      document.save();
      res.send(document);
    });
  }
);

app.post("/signout", async function (req,res) {
  console.log("signed out")
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send(200);
  });
})
//all restaurants data
app.get("/restaurants", async function (req, res) {
  console.log("USER: " + req.user)
  console.log("SESSION ID: "+req.sessionID)
  var val = await getrestaurants();
  res.send(val);
});

//randomly select featured reviews data
app.get("/restaurants/featured", async function (req, res) {
  var val = await getrestaurants();
  const reviews = await Promise.all(
    val.map((restaurants) => getfeaturedreviews(restaurants))
  );
  res.send(reviews);
});

//per restaurant data
app.get("/restaurants/:id", async function (req, res) {
  var val = await restaurants
    .findOne({ _id: req.params.id })
    .catch((err) => res.send("ERROR 404"));
  res.send(val);
});

//per restaurant review
app.get("/restaurants/:id/reviews", async function (req, res) {
  var val = await getrestoreviews(req.params.id);
  res.send(val);
});

//get all reviews data
app.get("/reviews", async function (req, res) {
  var val = await getreviews();
  res.send(val);
});

app.post("/reviews/:id/edit", async function (req, res) {
  reviews.findById(req.params.id).then(async function (document) {
    document.review = req.body.review;
    document.rating = req.body.rating;
    document.edited = true;
    document.save().then(async function (response) {
      let rating = await getavgrating(req.body.restaurantid);
      let numreviews = await getnumreviews(req.body.restaurantid);
      restaurants
        .findByIdAndUpdate(req.body.restaurantid, {
          avgrating: rating,
          numreviews: numreviews,
        })
        .then((response) => {
          res.send(document);
        });
    });
  });
});

app.post("/reviews/:id/delete", async function (req, res) {
  reviews.findByIdAndDelete(req.params.id).then(async function (response) {
    let rating = await getavgrating(req.body.restaurantid);
    let numreviews = await getnumreviews(req.body.restaurantid);
    restaurants
      .findByIdAndUpdate(req.body.restaurantid, {
        avgrating: rating,
        numreviews: numreviews,
      })
      .then((response) => {
        res.send("deleted");
      });
  });
});

app.post("/reviews/:id/replyowner", async function (req, res) {
  reviews.findById(req.params.id).then(async function (document) {
    document.ownerresponse = req.body.ownerresponse;
    document.save().then(async function (response) {
          res.send(document);
    });
  });
});

app.post("/reviews/:id/mark", async function (req, res) {
  let reviewID = mongodb.ObjectId.createFromHexString(req.params.id);
  let userID = mongodb.ObjectId.createFromHexString(req.body.userid);
  reviewsratings
    .exists({ reviewID: reviewID, reviewerID: userID })
    .then((result) => {
      if (result) {
        reviewsratings.findById(result._id).then((response) => {
          if (response.helpful == req.body.mark) {
            reviewsratings.findByIdAndDelete(response._id).then((response2) => {
              res.send("success");
            });
          } else {
            reviewsratings
              .findByIdAndUpdate(response._id, {
                helpful: req.body.mark,
                unhelpful: !req.body.mark,
              })
              .then((response2) => {
                res.send("success");
              });
          }
        });
      } else {
        var reviewmark = new reviewsratings();
        reviewmark.reviewID = reviewID;
        reviewmark.reviewerID = userID;
        reviewmark.helpful = req.body.mark;
        reviewmark.unhelpful = !req.body.mark;
        reviewmark.save().then((response) => {
          res.send("success");
        });
      }
    });
});

app.post("/marks/:id", async function (req, res) {
  let val1 = await gethelpful(req.params.id);
  let val2 = await getunhelpful(req.params.id);
  reviews.findById(req.params.id).then((response) => {
    if (response) {
      response.helpful = val1;
      response.unhelpful = val2;
      response.save().then((next) => {
        res.send({ helpful: val1, unhelpful: val2 });
      });
    } else {
      res.send({ helpful: val1, unhelpful: val2 });
    }
  });
});
//user data
app.get("/user/:id", async function (req, res) {
  var val = await users
    .findOne({ _id: req.params.id })
    .catch((err) => res.send("ERROR 404"));
  res.send(val);
});

app.get("/user/:id/reviews", async function (req, res) {
  var val = await getuserreviews(req.params.id);
  res.send(val);
});
