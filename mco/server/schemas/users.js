const { mongoose, Schema } = require("../server");
const passportLocalMongoose = require("passport-local-mongoose");
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
userSchema.plugin(passportLocalMongoose, {
  usernameQueryFields: ["email", "username"],
});
const users = mongoose.model("User", userSchema);

module.exports.users = users;
