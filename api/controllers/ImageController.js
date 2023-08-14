const Image = require("../models/ProfileImage");
const {getImageFromS3} = require('./controller')
const checkProfilePic = async (req, res) => {
  const user_id = req.body.userId;
  console.log(email);
  const image = await Image.findOne({ user_id: user_id });
  if (image) {
    res.status(200);
    res.send({ Message: true });
  } else {
    res.status(200);
    res.send({ Message: false });
  }
};

const getEventImage = async (req, res) => {
  const s3_bucket_path = req.body.image_path;
  const imageBody = await getImageFromS3(s3_bucket_path);
  const imageData = Buffer.from(imageBody.Body).toString("base64");
  const imageSrc = `data:${imageBody.ContentType};base64,${imageData}`;
  res.status(200);
  res.send(imageSrc);
};

module.exports = { checkProfilePic, getEventImage };
