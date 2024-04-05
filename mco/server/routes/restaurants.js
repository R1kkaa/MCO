function add(app, models) {
  const {
    getrestaurants,
    getfeaturedreviews,
    getrestoreviews,
  } = require("../utility/functions");

  const restaurants = models["restaurants"];

  //all restaurants data
  app.get("/restaurants", async function (req, res) {
    console.log("USER: " + req.user);
    console.log("SESSION ID: " + req.sessionID);
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
      .then((response) => {
        if (response) {
          res.send(response);
        } else {
          res.send({ fail: true });
        }
      })
      .catch((err) => res.send({ fail: true }));
  });

  //per restaurant review
  app.get("/restaurants/:id/reviews", async function (req, res) {
    var val = await getrestoreviews(req.params.id).catch((err) => {
      console.log(test);
      if (err) {
        console.log(err);
        res.send({ fail: true });
      }
    });
    res.send(val);
  });
}
module.exports.add = add;
