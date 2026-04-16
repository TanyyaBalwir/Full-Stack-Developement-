const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { seedProducts } = require("./controllers/productController");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected");
  await seedProducts();
})
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
