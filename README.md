# 🌍 BUMIVERSE - Platform Edukasi Lingkungan

Platform berbagi ide dan inspirasi ramah lingkungan dengan sistem tracking aksi pengguna, dashboard analytics, dan manajemen konten yang lengkap.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [Prerequisites](#-prerequisites)
- [Instalasi & Setup](#-instalasi--setup)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Demo Akun](#-demo-akun)
- [Struktur Project](#-struktur-project)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)
- [Screenshots](#-screenshots)

## ✨ Fitur Utama

### 👥 **User Features**
- 🔐 **Authentication** - Register, login, dan logout dengan JWT
- 📖 **Artikel Lingkungan** - Baca artikel edukatif dengan sistem like/dislike dan komentar
- 🎓 **Edukasi** - Topik-topik pembelajaran tentang lingkungan
- 🌱 **Aksi Ramah Lingkungan** - Tracking aksi hijau dengan sistem poin
- 📊 **Dashboard Pribadi** - Visualisasi progres, leaderboard, dan badge achievements
- 🏷️ **Kategori** - Berbagai kategori aksi lingkungan dengan tips dan fun facts

### 👨‍💼 **Admin Features**
- 📈 **Admin Dashboard** - Statistik lengkap platform
- 👤 **User Management** - Kelola pengguna (promote/demote/delete)
- 📊 **Analytics** - Data insights dan monitoring aktivitas

## 🛠️ Teknologi yang Digunakan

### **Frontend**
- **React 18** dengan TypeScript
- **Vite** - Build tool modern dan cepat
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Modern icons
- **React Router DOM** - Navigation

### **Backend**
- **Node.js** dengan Express.js
- **MongoDB** dengan Mongoose ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Pastikan sistem Anda memiliki:

- **Node.js** (v18+ recommended) - [Download here](https://nodejs.org/)
- **npm** atau **yarn** - Package manager
- **MongoDB** - Database ([MongoDB Atlas](https://www.mongodb.com/atlas) atau local installation)
- **Git** - Version control

### Cek versi yang terinstall:
```bash
node --version    # Should be v18+
npm --version     # Should be v8+
```

## 🚀 Instalasi & Setup

### **1. Clone Repository**
```bash
git clone <repository-url>
cd bumiverse
```

### **2. Setup Backend**

#### A. Install Dependencies
```bash
cd backend
npm install
```

#### B. Environment Configuration
Buat file `.env` di folder `backend/`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/bumiverse
# Atau gunakan MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bumiverse

# JWT Secret (ganti dengan string acak yang aman)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

#### C. Seed Database (Data Awal)
```bash
# Jalankan script untuk membuat data sample
node utils/seedDatabase.js
```

**✅ Setelah seeding berhasil, Anda akan melihat:**
- 2 user account (admin dan user biasa)
- Sample articles
- Education topics
- Categories
- Sample user actions

### **3. Setup Frontend**

#### A. Install Dependencies
```bash
cd ../  # Kembali ke root directory
npm install
```

#### B. Environment Configuration (Optional)
Buat file `.env` di root directory jika perlu custom API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Menjalankan Aplikasi

### **Opsi 1: Manual (Recommended)**

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
# Atau: node server.js
```

**✅ Backend berhasil jika melihat:**
```
🚀 BUMIVERSE Server running on port 5000
🌍 Environment: development
✅ BUMIVERSE connected to MongoDB Atlas
```

#### Terminal 2 - Frontend Development Server
```bash
# Di root directory
npm run dev
```

**✅ Frontend berhasil jika melihat:**
```
Local:   http://localhost:5173/
Network: http://192.168.x.x:5173/
```

### **Opsi 2: Concurrent (Jika ada script setup)**
```bash
# Jika ada script untuk run both together
npm run dev:full
```

## 🔑 Demo Akun

Setelah seeding database, gunakan akun berikut untuk testing:

### **👨‍💼 Admin Account**
- **Email:** `admin@bumiverse.com`
- **Password:** `admin123`
- **Access:** Admin dashboard, user management, full access

### **👤 User Account**
- **Email:** `user@bumiverse.com`
- **Password:** `user123`
- **Access:** User dashboard, actions, articles

### **✨ Atau Buat Akun Baru**
- Klik "Daftar di sini" di halaman login
- Isi form registrasi
- Login dengan akun yang baru dibuat

## 📁 Struktur Project

```
bumiverse/
├── 📁 backend/                 # Backend API Server
│   ├── 📁 config/             # Database configuration
│   ├── 📁 middleware/         # Auth & admin middleware
│   ├── 📁 models/             # MongoDB schemas
│   ├── 📁 routes/             # API routes
│   ├── 📁 utils/              # Utilities & seeding
│   ├── 📄 server.js           # Main server file
│   └── 📄 package.json        # Backend dependencies
│
├── 📁 src/                    # Frontend React App
│   ├── 📁 components/         # Reusable components
│   ├── 📁 Pages/              # Page components
│   ├── 📁 services/           # API services
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 utils/              # Utilities
│   └── 📄 App.tsx             # Main app component
│
├── 📄 package.json            # Frontend dependencies
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 vite.config.ts          # Vite configuration
└── 📄 README.md               # This file
```

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Articles**
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `PUT /api/articles/:id/like` - Like article
- `POST /api/articles/:id/comments` - Add comment

### **Education**
- `GET /api/education` - Get education topics
- `GET /api/education/:id` - Get single topic

### **Categories**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category

### **User Actions**
- `GET /api/user-actions` - Get user's actions
- `POST /api/user-actions` - Add new action
- `GET /api/user-actions/leaderboard` - Get leaderboard

### **Admin (Auth Required)**
- `GET /api/admin/dashboard` - Admin statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## 🐛 Troubleshooting

### **❌ Backend tidak bisa start**

**Problem:** `Error: connect ECONNREFUSED`
```bash
# Solution: Cek MongoDB connection
# 1. Pastikan MongoDB service running (jika local)
sudo systemctl start mongod  # Linux
brew services start mongodb  # macOS

# 2. Atau gunakan MongoDB Atlas (cloud)
# Update MONGODB_URI di .env dengan connection string Atlas
```

**Problem:** `JWT_SECRET is not defined`
```bash
# Solution: Pastikan file .env ada dan benar
cd backend
cat .env  # Cek isi file
# Pastikan JWT_SECRET terisi
```

### **❌ Frontend tidak bisa connect ke Backend**

**Problem:** Network Error atau CORS Error
```bash
# Solution 1: Pastikan backend running di port 5000
curl http://localhost:5000/api/health

# Solution 2: Cek CORS settings
# Pastikan FRONTEND_URL di backend/.env sesuai dengan frontend
```

**Problem:** `Failed to fetch`
```bash
# Solution: Cek API URL di frontend
# File: src/services/api.ts
# Pastikan API_BASE_URL pointing ke backend yang benar
```

### **❌ Database Issues**

**Problem:** `MongoError: Authentication failed`
```bash
# Solution: Cek credentials di MONGODB_URI
# Format yang benar:
# mongodb+srv://username:password@cluster.mongodb.net/database
```

**Problem:** `Collection doesn't exist`
```bash
# Solution: Jalankan seeding ulang
cd backend
node utils/seedDatabase.js
```

### **❌ Login/Register tidak berfungsi**

**Problem:** Token issues
```bash
# Solution: Clear browser storage
# Di Developer Tools -> Application -> Storage -> Clear All
```

## 🧪 Testing Quick Guide

### **1. Test Authentication**
1. Buka `http://localhost:5173/register`
2. Daftar akun baru
3. Login dengan akun tersebut
4. Pastikan redirect ke dashboard

### **2. Test User Actions**
1. Login sebagai user
2. Buka halaman "Aksi" 
3. Pilih beberapa aksi lingkungan
4. Konfirmasi aksi
5. Cek dashboard untuk melihat poin bertambah

### **3. Test Admin Features**
1. Login sebagai admin (`admin@bumiverse.com / admin123`)
2. Buka admin dashboard
3. Test user management (promote/demote users)
4. Cek statistics dan recent activities

### **4. Test API Directly**
```bash
# Health check
curl http://localhost:5000/api/health

# Get articles
curl http://localhost:5000/api/articles

# Get statistics
curl http://localhost:5000/api/stats
```

## 📸 Screenshots

### **🏠 Homepage**
- Hero section dengan CTA buttons
- Latest articles grid
- Feature highlights

### **📱 User Dashboard**
- Personal stats dan achievement badges
- Progress charts dan leaderboard
- Recent actions history

### **👨‍💼 Admin Dashboard**
- Platform-wide statistics
- User management table
- Analytics dan insights

### **🌱 Actions Page**
- Interactive checklist aksi ramah lingkungan
- Point system dengan konfirmasi
- Progress tracking

## 🚀 Production Deployment Tips

Jika ingin deploy ke production:

### **Backend Deploy Options:**
1. **Railway.app** (Recommended) - Easy MongoDB integration
2. **Heroku** - Popular platform
3. **DigitalOcean App Platform** - Good performance
4. **AWS EC2** - Full control

### **Frontend Deploy Options:**
1. **Vercel** (Recommended) - Perfect for React apps
2. **Netlify** - Great for static sites
3. **AWS S3 + CloudFront** - Scalable option

### **Database:**
- **MongoDB Atlas** (Recommended) - Managed cloud database
- Update `MONGODB_URI` dengan Atlas connection string

---

## 🎉 Selamat!

Aplikasi **BUMIVERSE** Anda sudah siap digunakan! 

### **📞 Support**
Jika ada masalah atau pertanyaan:
1. Cek troubleshooting guide di atas
2. Lihat console log untuk error details  
3. Pastikan semua prerequisites terinstall
4. Cek network connectivity antara frontend-backend

### **🌟 Next Steps**
- Customize content sesuai kebutuhan
- Tambah artikel dan topik edukasi
- Setup monitoring untuk production
- Tambah fitur sesuai feedback user

**Happy coding! 🌍💚**