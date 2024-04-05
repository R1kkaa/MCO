function add(app, models) {
  const { mongodb, fs } = require("../server");
  const {
    getavgrating,
    getnumreviews,
    gethelpful,
    getunhelpful,
  } = require("../utility/functions");

  const { uploadreviewimage } = require("../utility/filehandling");

  const reviews = models["reviews"];
  const reviewsratings = models["reviewsratings"];
  const restaurants = models["restaurants"];

  app.post("/review", async function (req, res) {
    newreview = new reviews();
    newreview.restaurantID = mongodb.ObjectId.createFromHexString(
      req.body.restaurantid
    );
    newreview.reviewerID = mongodb.ObjectId.createFromHexString(
      req.body.userid
    );
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
      fs.unlink(
        "./public" + response.imageurl,
        (err) => err && console.error(err)
      );
      reviewsratings
        .deleteMany({
          reviewID: mongodb.ObjectId.createFromHexString(req.params.id),
        })
        .then(function () {
          // Success
          console.log("Data deleted");
        })
        .catch(function (error) {
          console.log(error);
        });
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
              reviewsratings
                .findByIdAndDelete(response._id)
                .then((response2) => {
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
}

module.exports.add = add;
