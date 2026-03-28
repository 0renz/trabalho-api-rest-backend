const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Rota para login e gerar token JWT
router.post("/login", authController.login);

module.exports = router;
