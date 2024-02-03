import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { not_found, error_handler } from "./middleware/error_middleware.js";
const PORT = process.env.PORT || 8080;

import product_routes from "./routes/product_routes.js";
import user_routes from "./routes/user_routes.js";

connectDB(); // Connect to DB

const app = express();

// body parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", product_routes);
app.use("/api/users", user_routes);

app.use(not_found);
app.use(error_handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
