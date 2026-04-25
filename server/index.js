import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);

mongoose
        .connect(MONGOURL)
        .then(() => {
            console.log("db connected!");
            app.listen(PORT, () => {
                console.log(`port is running on port ${PORT}`)
            })
        })
        .catch((err) => {
            console.log(err);
        })