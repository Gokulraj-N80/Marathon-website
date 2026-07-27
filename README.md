# 🏃 Run Beyond Limits 2026

<div align="center">

![Run Beyond Limits](https://img.shields.io/badge/Run%20Beyond%20Limits-2026-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)

**A full-stack marathon event management platform with participant registration, admin dashboard, email notifications, and certificate generation.**

[Live Demo](#) · [Report Bug](https://github.com/Gokulraj-N80/Marathon/issues) · [Request Feature](https://github.com/Gokulraj-N80/Marathon/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Admin Dashboard](#-admin-dashboard)
- [Email System](#-email-system)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

**Run Beyond Limits 2026** is a professional marathon event management platform built for a multi-city running event across **Chennai, Bengaluru, and Salem** on September 27, 2026.

The platform handles the full participant lifecycle — from registration and payment tracking to BIB number assignment, certificate generation (PDF + QR code), and automated email notifications.

---

## ✨ Features

### Public Website
- 🏠 **Hero Section** — Animated landing page with countdown timer
- 📋 **Event Info** — Race categories (5K / 10K / 21K Half Marathon), fees, and timelines
- 📝 **Multi-Step Registration** — 6-step guided form with Zod validation
- 🖼️ **Gallery** — Event photo gallery
- ❓ **FAQ** — Common questions and answers
- 📬 **Contact Form** — Sends messages directly to the admin dashboard
- 🌙 **Dark / Light Theme** — Full theme toggle support
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

### Admin Dashboard
- 🔐 **Secure Login** — JWT-based authentication
- 📊 **Dashboard Analytics** — Live stats, charts, city/race breakdown
- 👥 **Participants Management** — Search, filter, paginate, edit, delete
- 💳 **Payment Tracking** — Mark participants as Paid / Pending, auto-assign BIB numbers
- 📧 **Send Certificates** — One-click email of PDF certificate with QR code
- 📦 **Export** — Download participant data as CSV or Excel
- 👕 **T-Shirt Size Report** — Breakdown by size and city
- 📩 **Contact Messages** — View all messages sent via the contact form
- 📈 **Reports & Charts** — Registration trends and analytics using Recharts

### Backend
- ✉️ **Automated Emails** — Registration confirmation + payment confirmation (HTML templates)
- 📄 **PDF Certificate Generation** — Auto-generated with QR code using PDFKit + qrcode
- 🔒 **JWT Auth Middleware** — Protects all admin routes
- 🌐 **REST API** — Clean, documented Express.js API

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.8 | Type safety |
| TanStack Router | 1.x | File-based routing |
| TanStack Query | 5.x | Server state management |
| Tailwind CSS | 4.x | Utility-first styling |
| shadcn/ui + Radix UI | Latest | Component library |
| Framer Motion | 12.x | Animations |
| Recharts | 2.x | Data visualizations |
| Zod | 3.x | Form validation |
| Sonner | 2.x | Toast notifications |
| Lucide React | 0.57x | Icons |
| XLSX | 0.18 | Excel export |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | 4.x | Web framework |
| MongoDB + Mongoose | 8.x | Database & ODM |
| Nodemailer | 9.x | SMTP email sending |
| PDFKit | 0.15 | PDF certificate generation |
| QRCode | 1.5 | QR code generation |
| JSON Web Token | 9.x | Authentication |
| bcryptjs | 2.x | Password hashing |
| dotenv | 16.x | Environment config |
| nodemon | 3.x | Dev hot-reload |

---

## 📁 Project Structure

```
Marathon-full/
├── backend/                    # Express.js REST API
│   ├── server.js               # Main server + all routes
│   ├── seed.js                 # Database seeder script
│   ├── seed-test.js            # Test data seeder
│   ├── .env                    # Environment variables (see below)
│   └── package.json
│
└── marathon frontend/          # React + TanStack Start frontend
    ├── src/
    │   ├── assets/             # Images and static assets
    │   ├── components/
    │   │   ├── admin/          # Admin dashboard components
    │   │   │   ├── AdminLayout.tsx
    │   │   │   ├── DashboardTab.tsx
    │   │   │   ├── ParticipantsTab.tsx
    │   │   │   ├── ReportsTab.tsx
    │   │   │   ├── TShirtTab.tsx
    │   │   │   ├── ContactsTab.tsx
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── EditModal.tsx
    │   │   │   ├── DeleteModal.tsx
    │   │   │   └── StatCard.tsx
    │   │   ├── marathon/       # Public-facing page sections
    │   │   │   ├── HeroSection.tsx
    │   │   │   ├── EventHighlights.tsx
    │   │   │   ├── RaceCategories.tsx
    │   │   │   ├── Countdown.tsx
    │   │   │   ├── AboutEvent.tsx
    │   │   │   ├── Gallery.tsx
    │   │   │   ├── FAQ.tsx
    │   │   │   ├── ContactSection.tsx
    │   │   │   └── ...more
    │   │   └── ui/             # shadcn/ui base components
    │   ├── data/
    │   │   └── marathon.ts     # Event data (cities, races, FAQ)
    │   ├── routes/
    │   │   ├── index.tsx       # Home page
    │   │   ├── register.tsx    # Registration wizard
    │   │   ├── admin.tsx       # Admin dashboard
    │   │   ├── about.tsx
    │   │   ├── event-info.tsx
    │   │   ├── gallery.tsx
    │   │   ├── contact.tsx
    │   │   └── certificates.tsx
    │   ├── styles.css          # Global CSS + theme variables
    │   └── router.tsx
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** or **bun** package manager
- **MongoDB Atlas** account (free tier works) — [Sign up](https://www.mongodb.com/cloud/atlas)
- **Gmail account** with an [App Password](https://myaccount.google.com/apppasswords) for SMTP

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Gokulraj-N80/Marathon.git
cd Marathon
```

**2. Install backend dependencies**
```bash
cd backend
npm install
```

**3. Install frontend dependencies**
```bash
cd "marathon frontend"
npm install
# or if using bun:
bun install
```

---

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=5000

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# JWT Secret (use a strong random string in production)
JWT_SECRET=your_super_secret_key_here

# Admin Credentials (used by seed script)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password

# SMTP Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=your_email@gmail.com

# Backend base URL (for certificate download links in emails)
BASE_URL=http://localhost:5000
```

> **Note:** Never commit your `.env` file. It is listed in `.gitignore`.

**How to get a Gmail App Password:**
1. Go to [Google Account → Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords** and generate one for "Mail"
4. Use that 16-character password as `SMTP_PASS`

---

### Running the App

**Start the backend (port 5000)**
```bash
cd backend
npm run dev
```

You should see:
```
Server is running on http://localhost:5000
Connected to MongoDB successfully!
SMTP Server is ready to send emails!
```

**Seed the admin account** (first time only)
```bash
cd backend
npm run seed
```

**Start the frontend (port 8080)**
```bash
cd "marathon frontend"
npm run dev
# or
bun run dev
```

Open your browser at: `http://localhost:8080`

Admin panel: `http://localhost:8080/admin`

---

## 📡 API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/register` | Register a new participant |
| `POST` | `/api/contact` | Submit a contact message |
| `POST` | `/api/admin/login` | Admin login (returns JWT) |
| `GET` | `/api/certificate/download/:id` | Download participant's PDF certificate |

### Admin Endpoints (requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/participants` | Get all participants |
| `PUT` | `/api/admin/participants/:id` | Edit participant details |
| `PUT` | `/api/admin/participants/:id/payment` | Update payment status + auto-assign BIB |
| `DELETE` | `/api/admin/participants/:id` | Delete a participant |
| `POST` | `/api/admin/participants/:id/send-certificate` | Email certificate to participant |
| `GET` | `/api/admin/contacts` | Get all contact messages |

### Registration Request Body

```json
{
  "fullName": "John Doe",
  "dob": "1995-06-15",
  "gender": "Male",
  "phone": "9876543210",
  "email": "john@example.com",
  "emergencyContact": "9876543211",
  "address": "123 Main Street",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "pincode": "600001",
  "size": "M",
  "cityId": "chennai",
  "raceId": "10k"
}
```

### Race Categories

| ID | Name | Distance | Fee |
|---|---|---|---|
| `5k` | Fun Run | 5 KM | ₹499 |
| `10k` | Challenge | 10 KM | ₹799 |
| `21k` | Half Marathon | 21 KM | ₹999 |

### Event Cities

| ID | City | State | Venue |
|---|---|---|---|
| `chennai` | Chennai | Tamil Nadu | Marina Beach Road |
| `bengaluru` | Bengaluru | Karnataka | Cubbon Park |
| `salem` | Salem | Tamil Nadu | Salem Race Course |

---

## 🖥 Admin Dashboard

Access at `http://localhost:8080/admin`

**Default credentials** (after running `npm run seed`):
```
Username: admin
Password: adminpassword123
```

> ⚠️ Change the admin password in `.env` before deploying to production.

### Dashboard Features

- **Overview** — Live stats cards (total registrations, paid/pending, revenue by race)
- **Participants** — Full table with search, filter by city/race/payment, pagination, inline edit/delete
- **Payment Management** — Toggle Paid ↔ Pending; BIB number is auto-generated on payment confirmation
- **Certificate Sending** — Click the send button to email a PDF certificate with embedded QR code
- **T-Shirt Report** — Size breakdown per city for logistics planning
- **Contact Messages** — View all messages submitted via the contact form
- **Reports** — Registration trend charts, city distribution, race category breakdown

---

## 📧 Email System

Two automated email templates are included:

### 1. Registration Confirmation Email
Sent immediately when a participant registers. Includes:
- Full registration details table
- Payment instructions notice
- Next steps information

### 2. Payment Confirmation + Certificate Email
Sent when admin marks a participant as **Paid**. Includes:
- BIB number
- Race day instructions
- Direct PDF certificate download link
- QR code for on-site check-in

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Gokulraj N**  
GitHub: [@Gokulraj-N80](https://github.com/Gokulraj-N80)

---

<div align="center">

Made with ❤️ for runners everywhere 🏃

</div>
