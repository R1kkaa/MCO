const { mongoose, mongodb, Schema } = require("../server");
const reviewsratingSchema = new Schema({
  reviewID: mongodb.ObjectId,
  reviewerID: mongodb.ObjectId,
  helpful: Boolean,
  unhelpful: Boolean,
});
const reviewsratings = mongoose.model("Reviewsrating", reviewsratingSchema);

module.exports.reviewsratings = reviewsratings;
