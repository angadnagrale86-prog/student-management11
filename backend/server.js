const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });


// ========================================
// HOME API
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "Student Management Backend is running!",
  });
});


// ========================================
// SIGNUP API
// ========================================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          "Email already registered. Please login.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Account created successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});


// ========================================
// LOGIN API
// ========================================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    let passwordMatch = false;

    // ========================================
    // CHECK HASHED PASSWORD
    // ========================================

    try {
      passwordMatch = await bcrypt.compare(
        password,
        user.password
      );
    } catch (error) {
      passwordMatch = false;
    }

    // ========================================
    // OLD PASSWORD SUPPORT
    // ========================================

    // If old user has plain-text password,
    // check it and convert it to a hash.
    if (!passwordMatch && user.password === password) {
      passwordMatch = true;

      const newHashedPassword = await bcrypt.hash(
        password,
        10
      );

      user.password = newHashedPassword;

      await user.save();
    }

    // ========================================
    // INVALID LOGIN
    // ========================================

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // ========================================
    // SUCCESSFUL LOGIN
    // ========================================

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});


// ========================================
// STUDENT ROUTES
// ========================================

const studentRoutes = require("./routes/studentRoutes");

app.use(
  "/api/students",
  studentRoutes
);


// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});