const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    image: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
