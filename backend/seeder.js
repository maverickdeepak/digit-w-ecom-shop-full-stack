import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user_modal.js";
import Product from "./models/product_model.js";
import Order from "./models/order_model.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const created_users = await User.insertMany(users);

    const admin_user = created_users[0]._id.toString();

    const sample_products = products.map((product) => {
      return { ...product, user: admin_user };
    });

    await Product.insertMany(sample_products);
    console.log("Data Inserted Successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error)
    console.log("There is error in while inserting data".red);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed".red);
    process.exit();
  } catch (error) {
    console.log("There is error in Data Destroyed".red);
    process.exit();
  }
};

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData();
}