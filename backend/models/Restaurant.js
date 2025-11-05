const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: String,
  cuisine: [String],
  rating: { type: Number, default: 0 },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  description: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);