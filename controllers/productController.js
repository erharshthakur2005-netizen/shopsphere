const Product = require("../modules/Product");


// ========================================
// GET ALL PRODUCTS
// ========================================

const getProducts = async (req, res) => {

  try {

    const products = await Product.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });

  }

};


// ========================================
// GET SINGLE PRODUCT
// ========================================

const getProduct = async (req, res) => {

  try {

    const product =
      await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }

    res.json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Invalid product ID"
    });

  }

};


// ========================================
// CREATE PRODUCT
// ========================================

const createProduct = async (req, res) => {

  try {

    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      success: false,
      message: "Failed to create product"
    });

  }

};


// ========================================
// UPDATE PRODUCT
// ========================================

const updateProduct = async (req, res) => {

  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Failed to update product"
    });

  }

};


// ========================================
// DELETE PRODUCT
// ========================================

const deleteProduct = async (req, res) => {

  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Failed to delete product"
    });

  }

};


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
