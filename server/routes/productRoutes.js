import express from "express";
import { createProduct, getProducts, deleteProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// single image upload
router.post("/", upload.single("image"), createProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);

export default router;