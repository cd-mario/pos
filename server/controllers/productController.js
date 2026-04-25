import Product from "../models/products.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    // handle image (optional)
    const image = req.file ? req.file.path : null;

    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      image
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating product",
      error: error.message
    });
  }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
};