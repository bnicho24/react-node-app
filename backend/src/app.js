const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",   // allow React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routers
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

module.exports = app;