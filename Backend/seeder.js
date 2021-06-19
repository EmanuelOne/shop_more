import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
dotenv.config();
const getRand = (max) => Math.floor(Math.random() * max.length);

connectDB();
const description = [];
const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    // console.log(createdUsers);
    const sampleProducts = products.map((product) => {
      product.description ? description.push(product.description) : "";
      return { ...product };
    });

    await Product.insertMany(
      sampleProducts.map((product) => {
        if (!product.description)
          product.description = description[getRand(description)];
        return product;
      })
    );

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
  // console.log(process.argv);
} else {
  importData();
}
