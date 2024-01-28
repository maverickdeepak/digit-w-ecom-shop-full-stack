import async_handler from "../middleware/async_handler.js";
import Product from "../models/product_model.js";

const get_products = async_handler(async (req, res) => {
  const products = await Product.find({});
  res.json({
    status: "success",
    length: products.length + 1,
    data: products,
  });
});

const get_product_by_id = async_handler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (product) {
    res.json({
      status: "success",
      length: 1,
      data: product,
    });
  }

  res.status(404);
  throw new Error("Resource not Found!");
});

export { get_products, get_product_by_id };
