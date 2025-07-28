const express = require("express");
const router = express.Router();
const { createPayment, getPayments } = require("../controllers/payments.controllers");
const isAuthenticated = require("../utils/isAuthenticated");

router.post("/", isAuthenticated, createPayment);
router.get("/", isAuthenticated, getPayments);

module.exports = router;