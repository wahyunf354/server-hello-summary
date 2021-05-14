const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const typeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  productId: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Type", typeSchema);
