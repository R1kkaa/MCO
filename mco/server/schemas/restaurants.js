const { mongoose, Schema } = require("../server");

const restaurantsSchema = new Schema({
  restaurantName: String,
  location: String,
  description: String,
  owner: String,
  avgrating: Number,
  numreviews: Number,
});
const restaurants = mongoose.model("Restaurant", restaurantsSchema);

module.exports.restaurants = restaurants;
