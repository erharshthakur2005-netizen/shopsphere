const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getUserOrders,
  getOrder,
  getMyOrders,
  updateOrderStatus
} = require("../controllers/orderController");


// ========================================
// CREATE ORDER
// ========================================

router.post("/", createOrder);


// ========================================
// GET ALL ORDERS
// ========================================

router.get("/", getOrders);


// ========================================
// GET USER ORDERS
// ========================================

router.get("/user", getUserOrders);


// ========================================
// GET MY ORDERS
// ========================================

router.get("/my-orders", getMyOrders);


// ========================================
// GET SINGLE ORDER
// ========================================

router.get("/:id", getOrder);


// ========================================
// UPDATE ORDER STATUS
// ========================================

router.put("/:id/status", updateOrderStatus);


module.exports = router;
