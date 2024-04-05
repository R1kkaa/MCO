function add(app, models) {
  const {
    mongodb,
    fs,
    passport,
    check,
    validationResult,
  } = require("../server");
  const { getusers, getuserreviews } = require("../utility/functions");
  const { uploaduserimage } = require("../utility/filehandling");
  const users = models["users"];
  const reviews = models["reviews"];
  const reviewsratings = models["reviewsratings"];

  app.get("/user/:id", async function (req, res) {
    var val = await users
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

  app.get("/user/:id/reviews", async function (req, res) {
    var val = await getuserreviews(req.params.id);
    res.send(val);
  });

  app.post(
    "/home/register/upload",
    uploaduserimage.array("my-image-file"),
    async function (req, res) {
      id = JSON.parse(JSON.stringify(req.body)).id;
      users.findById(id).then((document) => {
        document.imageurl = "/users/".concat(req.files[0].originalname);
        document.save();
      });
      res.send(req.body);
    }
  );

  app.post(
    "/home/login",
    passport.authenticate("local"),
    async function (req, res) {
      if (req.user) {
        req.session.userid = req.user._id;
        req.session.remember = req.body.remember;
        if (!req.body.remember) {
          req.session.cookie.expires = false;
        } else {
          req.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000;
        }
        res.send({
          success: true,
          _id: req.user._id,
          isOwner: req.user.isOwner,
        });
      } else {
        res.send({ success: false });
      }
    }
  );

  app.post("/home/register/check", async function (req, res) {
    var val = await getusers();
    res.send(val);
  });

  app.post(
    "/home/register",
    check("email").isEmail().withMessage("Email Invalid."),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must atleast be 8 characters."),
    async function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        res.send({ fail: true, errors: errors.array() });
      } else {
        let user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          isOwner: false,
          description: req.body.description,
        };

        users.register(
          new users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            isOwner: false,
            description: req.body.description,
          }),
          req.body.password,
          function (err, user) {
            res.send(String(user["_id"]));
          }
        );
      }
    }
  );

  app.post("/rememberme", async function (req, res) {
    if (req.session.remember && req.user) {
      res.send({ user: req.user, success: true });
    } else {
      res.send({ success: false });
    }
  });

  app.post("/logged", async function (req, res) {
    if (req.user) {
      res.send({ user: req.user, success: true });
    } else {
      res.send({ success: false });
    }
  });
  app.post("/user/:id/editprofile", async function (req, res) {
    users.findById(req.params.id).then((document) => {
      document.description = req.body.description;
      if (req.body.newimage) {
        try {
          fs.unlink(
            "./public" + document.imageurl,
            (err) => err && console.error(err)
          );
        } catch (err) {
          console.log(err);
        }
      }
      document.save();
      res.send(String(document["_id"]));
    });
  });
  ``;
  app.post("/user/:id/deleteprofile", async function (req, res) {
    let reviewdocs = await reviews.find({
      reviewerID: mongodb.ObjectId.createFromHexString(req.params.id),
    });
    reviewdocs.forEach((element) => {
      fs.unlink(
        "./public" + element.imageurl,
        (err) => err && console.error(err)
      );
      console.log(element._id);
      reviewsratings
        .deleteMany({
          reviewID: element._id,
        })
        .then(function () {
          // Success
          console.log("Data deleted");
        })
        .catch(function (error) {
          // Failure
          console.log(error);
        });
    });
    reviews
      .deleteMany({
        reviewerID: mongodb.ObjectId.createFromHexString(req.params.id),
      })
      .then(function () {
        // Success
        console.log("Data deleted");
      })
      .catch(function (error) {
        // Failure
        console.log(error);
      })
      .then((response) => {
        reviewsratings
          .deleteMany({
            reviewerID: mongodb.ObjectId.createFromHexString(req.params.id),
          })
          .then(function () {
            // Success
            console.log("Data deleted");
          })
          .catch(function (error) {
            // Failure
            console.log(error);
          });
      })
      .then((response) => {
        users
          .findByIdAndDelete(req.params.id)
          .then(
            (response) =>
              fs.unlink(
                "./public" + response.imageurl,
                (err) => err && console.error(err)
              ),
            res.send(200)
          );
      });
  });

  app.post(
    "/user/:id/editprofile/upload",
    uploaduserimage.array("my-image-file"),
    async function (req, res) {
      users.findById(req.params.id).then((document) => {
        document.imageurl = "/users/".concat(req.files[0].originalname);
        document.save().then((response) => {
          res.send(document);
        });
      });
    }
  );
  app.post("/signout", async function (req, res) {
    console.log("signed out");
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.send(200);
    });
  });
}

module.exports.add = add;
