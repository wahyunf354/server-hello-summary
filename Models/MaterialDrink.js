const mongoose = require("mongoose");

const materialDrinkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("MaterialDrink", materialDrinkSchema);
