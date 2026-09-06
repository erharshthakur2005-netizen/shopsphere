require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("./models/Product");
console.log(
  `Database Name: ${mongoose.connection.name}`
);

const products = [
  {
    title: "Wireless Headphones",
    category: "electronics",
    price: 1499,
    rating: 4.5,
    image: "https://picsum.photos/400/300?random=1",
    description: "High quality wireless headphones.",
    stock: 25
  },

  {
    title: "Smart Watch",
    category: "electronics",
    price: 2499,
    rating: 4.7,
    image: "https://picsum.photos/400/300?random=2",
    description: "Modern smartwatch with fitness tracking.",
    stock: 15
  },

  {
    title: "Classic Sneakers",
    category: "fashion",
    price: 1999,
    rating: 4.4,
    image: "https://picsum.photos/400/300?random=3",
    description: "Comfortable everyday sneakers.",
    stock: 30
  },

  {
    title: "Premium Backpack",
    category: "accessories",
    price: 1299,
    rating: 4.6,
    image: "https://picsum.photos/400/300?random=4",
    description: "Durable backpack for everyday use.",
    stock: 20
  },

  {
    title: "Casual T-Shirt",
    category: "fashion",
    price: 699,
    rating: 4.3,
    image: "https://picsum.photos/400/300?random=5",
    description: "Comfortable casual cotton T-shirt.",
    stock: 50
  },

  {
    title: "Bluetooth Speaker",
    category: "electronics",
    price: 1799,
    rating: 4.8,
    image: "https://picsum.photos/400/300?random=6",
    description: "Portable Bluetooth speaker with rich sound.",
    stock: 18
  }
];


const seedDatabase = async () => {

  try {

    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(
      `${products.length} products inserted`
    );

    await mongoose.connection.close();

    console.log("Database connection closed");

  } catch (error) {

    console.error(
      "Seed error:",
      error.message
    );

    process.exit(1);

  }

};


seedDatabase();