const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');


const cors = require("cors");
app.use(cors());


const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/MCODB').then(() =>  console.log("Database Connection Success"))
.catch((err) => { console.error(err); });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  isOwner: Boolean
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
  owner: String
})
const restaurants = mongoose.model('Restaurant', restaurantsSchema);

async function getrestaurants(){
  const restaurantquery = await restaurants.find({})
  return restaurantquery;
}
const reviewsSchema = new Schema({
  restaurantID: String,
  reviewerID: String,
  review: String,
  rating: Number,
  helpful: Number,
  unhelpful: Number
})
const reviews = mongoose.model('Review', reviewsSchema);

async function getreviews(){
  const reviewquery = await reviews.find({})
  return reviewquery;
}
async function getnumreviews(passrestaurantID){
  var val = await reviews.aggregate([{
      $match: 
        {
        restaurantID: String(passrestaurantID)
        }
      }, 
      {
        $count: "numreviews"
      },
  
    ])
    return val[0].numreviews
  }
async function getavgreviews(passrestaurantID){
  var val = await reviews.aggregate([
    {
      $match: {
        restaurantID: String(passrestaurantID)
      }
    },
    {
      $group: {
        _id: passrestaurantID,
        avgReview: { $avg: "$rating" }
      }
    }
  ]).exec()
    return val[0].avgReview
  }

//post userdata
app.post('/home/login', async function (req, res) {
  var val = await getusers()
  res.send(val)
});

async function getfeaturedreviews(restaurant){
    var val = await reviews.aggregate([{
      $match:{
        restaurantID: String(restaurant._id),
        rating: {
          $gte: 4
        }
      }
    }])
    var rand = parseInt(Math.floor(Math.random() * val.length))
    return val[rand]
}
//get restaurants data

app.get('/restaurants', async function (req, res) {
  var val = await getrestaurants()
  res.send(val)
});

app.get('/restaurants/featured', async function (req, res) {
  var val = await getrestaurants()
  const reviews = await Promise.all(val.map(restaurants => getfeaturedreviews(restaurants)))
  res.send(reviews)
});


async function loadrestaurants(){
  var restaurantquery = await getrestaurants()
  restaurantquery.forEach(async (restaurant) => {
    let id = restaurant._id.toString()
    app.get("/restaurants/".concat(id), async function (req,res){
      var avg = await getavgreviews(id)
      avg = 5
      var num = await getnumreviews(id)
      var featured = await getfeaturedreviews(restaurant)
      var val = {data:restaurant, avgreview: avg, numreview: num, featuredreview: featured}
      res.send(val)
    })
  });
}

loadrestaurants()
  
  //get reviews data
app.get('/reviews', async function (req, res) {
  var val = await getreviews()
  res.send(val)
});

async function test(){
  var val = await getrestaurants()
  const reviews = await Promise.all(val.map(restaurants => getfeaturedreviews(restaurants)))
  console.log(reviews[0].reviews)
}
test()
