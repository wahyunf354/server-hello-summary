const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const typeBundleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  patnerId: [
    {
      type: ObjectId,
      ref: "Patner",
    },
  ],
});

module.exports = mongoose.model("TypeBundle", typeBundleSchema);
