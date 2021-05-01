const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
