import ApiFeatures from "../../../../features/search";
import initDB from "../../../../helpers/initDB";
import Product from "../../../../models/productModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
}

async function getProducts(req, res) {
  const resultPerPage = process.env.RPP;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  if (!products) {
    res.status(400).json({
      success: false,
      products: [],
    });
  }
  res.status(200).json({
    success: true,
    productCount,
    products,
  });
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  if (!product) {
    res.status(404).json({
      sucess: false,
      message: "Product not found",
      product: [],
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
}
