const Order = require("../modules/order");

const createOrder = async (req, res) => {

  try {

    const {
      customer,
      items,
      total,
      paymentMethod
    } = req.body;

    if (
      !customer ||
      !items ||
      items.length === 0 ||
      total === undefined ||
      !paymentMethod
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid order data"
      });

    }

    const order = await Order.create({

      customer,
      items,
      total,
      paymentMethod,
      status: "Pending"

    });

    return res.status(201).json({

      success: true,
      message: "Order placed successfully",
      order

    });

  } catch (error) {

    console.error("Create Order Error:", error);

    return res.status(500).json({

      success: false,
      message: "Failed to place order"

    });

  }

};


// ========================================
// GET ALL ORDERS
// ========================================

const getOrders = async (req, res) => {

  try {

    const orders =
      await Order.find()
        .sort({ createdAt: -1 });


    res.json({

      success: true,

      count: orders.length,

      orders

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Failed to fetch orders"

    });

  }

};


// ========================================
// GET SINGLE ORDER
// ========================================

const getOrder = async (req, res) => {

  try {

    const order =
      await Order.findById(req.params.id);


    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order not found"

      });

    }


    res.json({

      success: true,

      order

    });


  } catch (error) {

    console.error(error);

    res.status(400).json({

      success: false,

      message: "Invalid order ID"

    });

  }

};



// ========================================
// UPDATE ORDER STATUS
// ========================================

const updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });

    }

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true
        }
      );

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    return res.json({

      success: true,

      message: "Order status updated successfully",

      order

    });

  } catch (error) {

    console.error(
      "Update Order Status Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Failed to update order status"

    });

  }

};

// ========================================
// GET USER ORDERS
// ========================================

const getUserOrders = async (req, res) => {

  try {

    const { email } = req.query;

    if (!email) {

      return res.status(400).json({
        success: false,
        message: "Email is required"
      });

    }

    const orders =
      await Order.find({
        "customer.email": email.toLowerCase()
      }).sort({
        createdAt: -1
      });


    res.json({

      success: true,

      count: orders.length,

      orders

    });

  } catch (error) {

    console.error(
      "Get User Orders Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Failed to fetch your orders"

    });

  }

};
// ========================================
// GET MY ORDERS
// ========================================

const getMyOrders = async (req, res) => {

  try {

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const orders = await Order.find({
      "customer.email": email
    }).sort({
      createdAt: -1
    });

    return res.json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {

    console.error("Get My Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your orders"
    });

  }

};
module.exports = {

  createOrder,

  getOrders,

  getUserOrders,

  getOrder,
  getMyOrders,

  updateOrderStatus

};
