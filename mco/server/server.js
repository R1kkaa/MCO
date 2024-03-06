const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');


const cors = require("cors");
app.use(cors());


const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/MCODB').then(() =>  console.log(mongoose.connection.readyState))
.catch((err) => { console.error(err); });
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/home/login', async function (req, res) {
  var val = await getusers()
  res.send(val)
});

async function test(){
  await axios.get('http://localhost:5000/home/login')
  .then(response => {
    response.data.forEach(element => {
      console.log(String(element.email))
    });
      }, error => {
    console.log(error);
  });
}

test()
