const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
const mongodb = require('mongodb')
const fs = require('fs');
const cors = require("cors");
const multer = require("multer")
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());

const mongoose = require("mongoose");
const path = require('path');
const  Schema  = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/MCODB').then(() =>  console.log("Database Connection Success"))
.catch((err) => { console.error(err); });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  isOwner: Boolean,
  description: String,
  imageurl: String,
})
const users = mongoose.model('User', userSchema);
async function getusers(){
  const userquery = await users.find({})
  return JSON.stringify(userquery);
}
const restaurantsSchema = new Schema({
  restaurantName: String,
  location: String,
  description: String,
  owner: String,
  avgrating: Number,
  numreviews: Number
})
const restaurants = mongoose.model('Restaurant', restaurantsSchema);

async function getrestaurants(){
  const restaurantquery = await restaurants.find({})
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
})
const reviews = mongoose.model('Review', reviewsSchema);

async function getreviews(){
  const reviewquery = await reviews.find({})
  return reviewquery;
}
async function getfeaturedreviews(restaurant){
    var val = await reviews.aggregate([{
      $match:{
        restaurantID: restaurant._id,
        rating: {
          $gte: 4
        }
      }
    }])
    var rand = parseInt(Math.floor(Math.random() * val.length))
    return val[rand].review
}
async function getrestoreviews(id){
  var val = await reviews.aggregate([{

    $match:{
      restaurantID: mongodb.ObjectId.createFromHexString(id),
    },
  }]).lookup(    {
    from: 'users',
    localField: 'reviewerID',
    foreignField: '_id',
    as: 'user'
  })
  return val
}

async function getuserreviews(id){
  var val
  try{
    val = await reviews.aggregate([{
      $match:{
        reviewerID: mongodb.ObjectId.createFromHexString(id),
      },
    }]).lookup(    {
      from: 'restaurants',
      localField: 'restaurantID',
      foreignField: '_id',
      as: 'restaurant'
    })
  }catch(error){
    val = "ERROR404"
  }
  return val
}

//post userdata for login
app.post('/home/login', async function (req, res) {
  var val = await getusers()
  console.log("true")
  res.send(val)
});

const storage = multer.diskStorage({
  destination: './public/users',
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})
const upload = multer({storage: storage})


//app.post('/home/register/data', upload.array("my-image-file"), async function (req, res) {
//get register data

app.post('/home/register', async function (req, res) {
  newuser = new users()
  newuser.firstName = req.body.firstName
  newuser.lastName = req.body.lastName
  newuser.email = req.body.email
  newuser.password = req.body.password
  newuser.username = req.body.username
  newuser.isOwner = false
  newuser.description = req.body.description
  newuser.save().then(function(result){
    res.send(String(result['_id']))
   })
});

app.post('/home/register/upload', upload.array("my-image-file"), async function (req, res) {
  id = (JSON.parse(JSON.stringify(req.body))).id
  users.findById(id).then((document) =>{
    document.imageurl = "/users/".concat(req.files[0].originalname)
    document.save()
  })
  res.send(req.body)
});

app.post('/review', async function (req, res) {
  newreview = new reviews()
  newreview.restaurantID = mongodb.ObjectId.createFromHexString(req.body.restaurantid)
  newreview.reviewerID = mongodb.ObjectId.createFromHexString(req.body.userid)
  newreview.review = req.body.review
  newreview.rating = req.body.rating
  newreview.helpful = 0
  newreview.unhelpful = 0
  newreview.ownerresponse = ""
  newreview.save().then(function(result){
    res.send(String(result['_id']))
   })
});

app.post('/review/upload', upload.array("my-image-file"), async function (req, res) {
  id = (JSON.parse(JSON.stringify(req.body))).id
  reviews.findById(id).then((document) =>{
    document.imageurl = "/reviewmedia/".concat(req.files[0].originalname)
    document.save()
  })
  res.send(req.body)
});

app.post('/user/:id/editprofile', async function (req, res){
  console.log(req.params.id)
  users.findById(req.params.id).then((document) =>{
    document.description = req.body.description
    if(req.body.newimage){
      fs.unlink("./public"+document.imageurl, (err) => err && console.error(err));
    }
    document.save()
    res.send(document)
  })
})

app.post('/user/:id/editprofile/upload', upload.array("my-image-file"), async function (req, res){
  console.log(req.params.id)
  users.findById(req.params.id).then((document) =>{
    document.imageurl = "/users/".concat(req.files[0].originalname)
    document.save()
    res.send(document)
  })
  
})


//all restaurants data
app.get('/restaurants', async function (req, res) {
  var val = await getrestaurants()
  res.send(val)
});


//randomly select featured reviews data
app.get('/restaurants/featured', async function (req, res) {
  var val = await getrestaurants()
  const reviews = await Promise.all(val.map(restaurants => getfeaturedreviews(restaurants)))
  res.send(reviews)
});

//per restaurant data
app.get('/restaurants/:id', async function (req, res){
  var val = await restaurants.findOne({_id: req.params.id}).
  catch(err => res.send("ERROR 404"));
  res.send(val)
});

//per restaurant review
app.get('/restaurants/:id/reviews', async function (req, res){
  var val = await getrestoreviews(req.params.id)
  res.send(val)
});

//get all reviews data
app.get('/reviews', async function (req, res) {
  var val = await getreviews()
  res.send(val)
});

//user data
app.get('/user/:id', async function (req, res){
  var val = await users.findOne({_id: req.params.id}).
  catch(err => res.send("ERROR 404"));
  res.send(val)
});

app.get('/user/:id/reviews', async function (req, res){
  var val = await getuserreviews(req.params.id)
  res.send(val)
});

