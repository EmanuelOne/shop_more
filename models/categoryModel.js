import mongoose from "mongoose";

const categorySchama = mongoose.Schema({
  
  category: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchama);

export default Product;
