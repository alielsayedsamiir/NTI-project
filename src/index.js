const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB successfully!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server listening on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err.message);
  });