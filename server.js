const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDatabase = require("./config/database");
const orderRoutes =
  require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "ShopSphere API is running 🚀"
  });
});


// ========================================
// API ROUTES
// ========================================

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);
app.use(  "/api/orders",  orderRoutes);
app.get("/test-order-route", (req, res) => {
  res.json({
    success: true,
    message: "Order route is working"
  });
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;


const startServer = async () => {

  try {

    // Connect MongoDB FIRST
    await connectDatabase();

    // Start server ONLY after MongoDB connects
    app.listen(PORT, () => {

      console.log(
        `ShopSphere server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }

};


startServer();