import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number },
    comment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },

    category: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,

      default: 0,
    },
    price: {
      type: Number,

      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
