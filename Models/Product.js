const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
  name: {
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
  patnerId: {
    type: ObjectId,
    ref: "Patner",
  },
  type: [
    {
      type: ObjectId,
      ref: "Type",
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
