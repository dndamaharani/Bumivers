const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek user existing
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email sudah digunakan." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil." });
  } catch (err) {
    res.status(500).json({ message: "Gagal registrasi", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email tidak ditemukan." });

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah." });

    // Buat token
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Gagal login", error: err.message });
  }
});

module.exports = router;
