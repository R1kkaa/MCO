const { mongoose, mongodb, Schema } = require("../server");
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

module.exports.reviews = reviews;
