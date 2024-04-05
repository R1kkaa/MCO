const { reviews } = require("../schemas/reviews");
const { reviewsratings } = require("../schemas/reviewsratings");
const { users } = require("../schemas/users");
const { restaurants } = require("../schemas/restaurants");
const { mongodb } = require("../server");

async function getusers() {
  const userquery = await users.find({});
  return JSON.stringify(userquery);
}
async function getrestaurants() {
  const restaurantquery = await restaurants.find({});
  return restaurantquery;
}

async function getreviews() {
  const reviewquery = await reviews.find({});
  return reviewquery;
}
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
module.exports = {
  getusers: getusers,
  getrestaurants: getrestaurants,
  getreviews: getreviews,
  getavgrating: getavgrating,
  getnumreviews: getnumreviews,
  gethelpful: gethelpful,
  getunhelpful: getunhelpful,
  getfeaturedreviews: getfeaturedreviews,
  getrestoreviews: getrestoreviews,
  getuserreviews: getuserreviews,
};
