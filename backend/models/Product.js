const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, default: '' },
  sizes: { type: [String], default: ['XS', 'S', 'M', 'L', 'XL'] },
  colors: { type: [String], default: [] },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 24 },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 50 },
  tags: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  seasonality: { type: String, default: 'All-Season' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
