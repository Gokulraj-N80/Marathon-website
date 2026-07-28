# Run Beyond Limits 2026 🏃

[![React](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

A full-stack Node.js marathon event registration and management platform supporting multi-city events across **Chennai, Bengaluru, and Salem**.

---

## ✨ Key Features
- **Runner Portal**: Responsive step-by-step registration with Zod schema validation.
- **Admin Dashboard**: Real-time stats, interactive participant records, and report exports.
- **BIB Allocation**: Automatic generation and assignment of BIBs upon payment approval.
- **PDF & Email Automations**: Sends styled confirmation emails with dynamically generated PDF certificates and validation QR codes.
- **Responsive Navigation**: Polished navigation layout with dynamic font sizes, seamless route tracking indicators, and quick-access Admin integration.
- **Glassmorphic Admin Access**: Secure admin sign-in featuring a centered, glassmorphic layout optimized for both desktop and mobile viewports with fluid animations.

---

## 🛠️ Quick Start

### 1. Configure Backend Environment
Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000

# Seeder Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpassword123

# SMTP Outbox Config
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=your_email@gmail.com
```

### 2. Run Backend API
```bash
cd backend
npm install
npm run seed  # Create admin account
npm run dev   # Runs on http://localhost:5000
```

### 3. Run Frontend App
```bash
cd "marathon frontend"
npm install   # or bun install
npm run dev   # Runs on http://localhost:8080
```

---

## 📡 Core API Routes

| Method | Route | Description | Authentication |
|---|---|---|---|
| **POST** | `/api/register` | Register a new participant | Public |
| **POST** | `/api/admin/login` | Admin Authentication | Public |
| **GET** | `/api/certificate/download/:id` | Generate and download certificate | Public |
| **PUT** | `/api/admin/participants/:id/payment` | Approve payment and generate BIB | Admin (JWT) |

---

## 🏃 Race Categories
- **5K Fun Run** — ₹499
- **10K Challenge** — ₹799
- **Half Marathon (21K)** — ₹999

---

## 👨‍💻 Author
- **Gokulraj N** — [@Gokulraj-N80](https://github.com/Gokulraj-N80)
