const express = require("express");
const router = express.Router();
const { register, login, getUsers } = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
