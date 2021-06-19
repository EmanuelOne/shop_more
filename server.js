import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import color from "colors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoute);
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
