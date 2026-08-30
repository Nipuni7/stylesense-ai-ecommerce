import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import Order from "./models/Order.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://theenipuni55_db_user:StyleSense2026@cluster0.jdr8sxl.mongodb.net/stylesense?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// --- ORDER ENDPOINTS (MONGODB REAL DATABASE FLOW) ---

// 1. GET ALL ORDERS (Admin Portal Stream)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const formattedOrders = orders.map((ord) => ({
      id: ord.orderId,
      _id: ord._id,
      customerName: ord.customerName,
      email: ord.email,
      address: ord.address,
      city: ord.city,
      items: ord.items,
      totalAmount: ord.totalAmount,
      status: ord.status,
      createdAt: ord.createdAt
    }));
    res.json(formattedOrders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ error: "Failed to retrieve order stream" });
  }
});

// 2. CREATE NEW ORDER (Cart Checkout)
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, email, address, city, items, totalAmount } = req.body;

    if (!customerName || !email || !items || items.length === 0) {
      return res.status(400).json({ error: "Incomplete order details provided" });
    }

    const newOrder = new Order({
      customerName,
      email,
      address,
      city: city || "Colombo",
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Atelier order placed and stored in MongoDB successfully",
      order: {
        id: savedOrder.orderId,
        customerName: savedOrder.customerName,
        totalAmount: savedOrder.totalAmount,
        status: savedOrder.status
      }
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// 3. UPDATE ORDER STATUS (Lifecycle Transitions from Admin)
app.patch("/api/orders/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Order requisition not found" });
    }

    res.json({ message: "Order status transitioned successfully", order: updated });
  } catch (error) {
    console.error("Failed to update status:", error);
    res.status(500).json({ error: "Status update failed" });
  }
});

// Database Connection & Server Start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🌿 StyleSense Database connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });