const express = require("express");
const router = express.Router();
const { getProducts, placeOrder } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/order", placeOrder);

module.exports = router;
