import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Category from "../models/productModel.js";
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // get all products by pagination
  //
  const pageSize = 12;
  const page = Number(req.query.page) || 1;
  // console.log(req.query);
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: "i",
        },
      }
    : {};
  let count;
  let products;
  if (keyword) {
    count = await Product.countDocuments({ ...keyword });
    products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }
  if (category) {
    count = await Product.countDocuments({ ...category });
    products = await Product.find({ ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
// @desc getAllproduct
//api/products/all
const getCategories = asyncHandler(async (req, res) => {
  let searchName = req.query.name || "";
  let page = req.query.page || 1;
  const category = await Category.find({});
  let products = [];
  let pages = [[]];
  products = category.filter((product, i) => {
    const { name } = product;
    return name.includes(searchName);
  });
  let start = 0;
  const perPage = 12;
  products.map((product, i) => {
    pages[start + 1] = [];
    if (pages[start].length < perPage) return pages[start].push(product);
    start = start + 1;
  });
  pages.splice(pages.length - 1, 1);
  console.log(category.length, products.length, pages.length);
  if (category) {
    res.json({ page, pages: pages.length, products: pages[page - 1] });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getCategories,
};
