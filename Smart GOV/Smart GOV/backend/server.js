const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register User
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists! Please log in." });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password!" });
    
    //1 hour
    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Protected Route
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied!" });

  try {
    const verified = jwt.verify(token, "secretKey");
    res.json({ message: "Access granted to protected route!" });
  } catch {
    res.status(403).json({ error: "Invalid token!" });
  }
});

// Protected Route
app.get("/user/name", async(req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied!" });

  try {
    const verified = jwt.verify(token, "secretKey");
    const userId = verified.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found!" });
    res.json({name: user.firstName});
  } catch (error) {
    res.status(403).json({ error: "Invalid token!" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
