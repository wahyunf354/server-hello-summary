const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const patnerScheme = new mongoose.Schema({
  nameOwner: {
    type: String,
    required: true,
  },
  noNik: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  locationStore: {
    type: String,
    required: true,
  },
  noHp: {
    type: String,
    required: true,
  },
  dateJoin: {
    type: Date,
    required: true,
  },
  nameBrand: {
    type: String,
    required: true,
  },
  isRequestLogo: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
  },
  tagline: {
    type: String,
  },
  imageUrlKtp: {
    type: String,
    required: true,
  },
  socialMediaId: [
    {
      type: ObjectId,
      required: true,
    },
  ],
  typeBundleId: [
    {
      _id: {
        type: ObjectId,
        required: true,
      },
      price: {
        type: ObjectId,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Patner", patnerScheme);
