import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import products from "./data/products.js";
const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id: productId } = req.params;
  const product = products.find((product) => product._id === productId);
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
