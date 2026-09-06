const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      pincode: {
        type: String,
        required: true
      }
    },

    items: [
      {
        productId: {
          type: String,
          required: true
        },

        title: {
          type: String,
          required: true
        },

        price: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true
        },

        image: {
          type: String
        }
      }
    ],

    total: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Order", orderSchema);
