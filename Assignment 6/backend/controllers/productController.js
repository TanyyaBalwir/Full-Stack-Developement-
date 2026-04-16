const Product = require("../models/Product");

const defaultProducts = [
  {
    title: "T-Shirt",
    description: "Comfortable cotton t-shirt for daily wear.",
    price: 799,
    condition: "New",
    image: "tshirt.png",
    entryType: "catalog"
  },
  {
    title: "Jeans",
    description: "Regular fit blue jeans with a simple look.",
    price: 1499,
    condition: "Good",
    image: "jeans.png",
    entryType: "catalog"
  },
  {
    title: "Sneakers",
    description: "Stylish sneakers for college and casual use.",
    price: 1999,
    condition: "New",
    image: "sneakers.png",
    entryType: "catalog"
  },
  {
    title: "Jacket",
    description: "Warm winter jacket with a trendy design.",
    price: 2499,
    condition: "New",
    image: "jacket.png",
    entryType: "catalog"
  }
];

exports.seedProducts = async () => {
  try {
    const count = await Product.countDocuments({ entryType: "catalog" });
    if (count === 0) {
      await Product.insertMany(defaultProducts);
    }
  } catch (error) {
    console.log("Unable to seed products:", error.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ entryType: "catalog" }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch products right now." });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, address, items, userId } = req.body;

    if (!customerName || !customerEmail || !address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Please complete checkout details and cart items." });
    }

    const orderEntries = items.map((item) => ({
      entryType: "order",
      title: item.name,
      description: `Order placed for ${item.name}`,
      price: item.price,
      condition: "Ordered",
      image: item.image ? item.image.replace("images/", "") : "",
      quantity: item.quantity,
      orderedByName: customerName,
      orderedByEmail: customerEmail,
      address,
      seller: userId || null
    }));

    const savedOrders = await Product.insertMany(orderEntries);
    res.status(201).json(savedOrders);
  } catch (error) {
    res.status(500).json({ message: "Unable to place order right now." });
  }
};
