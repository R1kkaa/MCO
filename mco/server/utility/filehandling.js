const multer = require("multer");
const storageusers = multer.diskStorage({
  destination: "./public/users",
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const storagemedia = multer.diskStorage({
  destination: "./public/reviewmedia",
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploaduserimage = multer({ storage: storageusers });
const uploadreviewimage = multer({ storage: storagemedia });

module.exports = {
  uploaduserimage: uploaduserimage,
  uploadreviewimage: uploadreviewimage,
};
