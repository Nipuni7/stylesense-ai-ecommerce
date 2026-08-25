import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://theenipuni55_db_user:StyleSense12345@cluster0.jdr8sxl.mongodb.net/stylesense?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("🌿 StyleSense Database connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
