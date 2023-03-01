const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    file_name: String,
    s3_bucket_path: String
  });
  
const Image = new mongoose.model("Image", imageSchema);

module.exports = Image;