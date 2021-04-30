const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
