require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

/* ---- Model ---- */
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed password
});
const User = mongoose.model("User", userSchema);

/* ---- Helper: validate email format simple ---- */
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/* ---- Register ---- */
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password harus diisi" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }

    // Hash password dan simpan user baru
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });

    res.status(201).json({ message: "User berhasil dibuat" });
  } catch (err) {
    // Jika error karena duplikat email
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

/* ---- Login ---- */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password harus diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email / password salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Email / password salah" });

    // Buat JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

/* ---- Middleware Auth untuk route yang butuh proteksi ---- */
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token tidak ditemukan" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });
    req.user = user; // simpan data user payload JWT di request
    next();
  });
}

/* ---- Protected example: get user profile ---- */
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

/* ---- Health check endpoint (optional) ---- */
app.get("/api/health", (req, res) => {
  res.json({ status: "API running" });
});

/* ---- Start server ---- */
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URI || !JWT_SECRET) {
  console.error("Error: Environment variables MONGO_URI dan JWT_SECRET harus diset!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API ready on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
