import mongoose from "mongoose";

// Order item schema
const OrderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  image: {
    type: String,
    default: ""
  }
});

// Main Order Schema
const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: "Colombo"
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      default: "Bespoke Atelier Concierge (COD)"
    },
    status: {
      type: String,
      enum: ["Pending", "Tailoring", "Dispatched", "Delivered"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;