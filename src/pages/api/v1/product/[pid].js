import initDB from "../../../../../helpers/initDB";
import Product from "../../../../../models/productModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
}

const getProduct = async (req, res) => {
  const id = await req.query.pid;
  const product = await Product.findById(id);
  if (!product) {
    res.status(400).json({
      success: false,
      message: "Product not found",
      product: [],
    });
    return;
  }
  res.status(200).json({
    success: true,
    product,
  });
};

const deleteProduct = async (req, res) => {
  const id = await req.query.pid;
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product: [],
  });
};
