const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  entryType: {
    type: String,
    default: "catalog"
  },
  title: String,
  description: String,
  price: Number,
  condition: String, // New / Good / Used
  image: String,
  quantity: {
    type: Number,
    default: 1
  },
  orderedByName: String,
  orderedByEmail: String,
  address: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
