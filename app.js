const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// Routes
const productRoute = require("./routes/product.route");

// ROUTING
app.get("/", (req, res) => {
  res.send("Route is working!Huh!!!");
});

// posting to database
app.use("/api/v1/product", productRoute);

module.exports = app;
