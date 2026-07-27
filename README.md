# Run Beyond Limits 2026 🏃

[![React](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-orange)](https://nodemailer.com)
[![PDFKit](https://img.shields.io/badge/PDFKit-PDF_Gen-red)](https://pdfkit.org)

**Run Beyond Limits 2026** is a premium full-stack event registration and management platform tailored for a multi-city marathon event across **Chennai, Bengaluru, and Salem**. 

It handles everything from user registration via a sleek frontend to admin operations, email dispatch, automated SMS/WhatsApp alerts, and live verification using dynamically generated PDF certificates with scannable QR codes.

---

## 📐 System Architecture & Flow

The following diagram illustrates how participants, the backend API, the database, and the admin panel interact:

```mermaid
sequenceDiagram
    autonumber
    actor Participant
    actor Admin
    participant Frontend as React Frontend
    participant Backend as Express API Server
    participant DB as MongoDB Atlas
    participant Email as SMTP Email Server

    Participant->>Frontend: Fills Registration Form
    Frontend->>Backend: POST /api/register
    Backend->>DB: Saves Participant (Status: Pending)
    Backend->>Email: Dispatches Registration Confirmation Email
    Note over Backend,Email: HTML email template sent to user
    Backend-->>Participant: WhatsApp notification stub logged

    Admin->>Frontend: Log In (JWT Token acquired)
    Admin->>Frontend: Views Dashboard & updates status to "Paid"
    Frontend->>Backend: PUT /api/admin/participants/:id/payment (Status: Paid)
    Backend->>Backend: Generates Unique BIB Number
    Note right of Backend: Format: CITY-RACE-XXXX (e.g. CHE-21K-0005)
    Backend->>DB: Updates Payment & BIB Info
    Backend->>Email: Dispatches Payment Successful Email
    Note over Email: Contains download URL for certificate
    
    Participant->>Backend: GET /api/certificate/download/:id
    Backend->>Backend: Generates PDFKit A4 Landscape Certificate
    Note right of Backend: Includes dynamic QR code verifying the URL
    Backend-->>Participant: Downloads Finisher Certificate PDF
```

---

## ⚡ Key Features

### 🎨 Frontend (Public Website)
- 🚀 **SSR-Ready Framework**: Built with **TanStack Start** for lightning-fast performance, server-side rendering, and smooth page transitions.
- 📐 **Glassmorphic Design System**: Vibrant colors, dark mode styling, customized Google Fonts (Inter/Outfit), and subtle micro-animations powered by **Framer Motion**.
- ⏱️ **Countdown Timer**: Real-time ticker counting down to race day.
- 📝 **Step-by-Step Registration**: Complete multi-city registration form using **React Hook Form** + **Zod** schema validations.
- 📸 **Media Gallery & FAQs**: Dynamic accordion for FAQs and custom masonry gallery layouts.

### 🛡️ Admin Dashboard
- 📊 **Key Metrics Overview**: Real-time stats counting total registrations, total revenue collected, and pending verification.
- 👔 **Inventory Reports**: Instant generation of T-shirt size counts segregated by race categories (XS to XXL).
- 🏅 **BIB Allocation Engine**: Automated BIB generator triggered upon payment confirmation. Format prefix adapts dynamically (e.g., `CHE-5K-0001`, `BEN-21K-0012`).
- 📧 **Manual Certificate Resend**: Admin feature to trigger a fresh email with the certificate link to paid participants.
- 🧹 **CRUD Management**: Easily search, edit, or delete participants and review submitted contact messages.

### ⚙️ Backend Services
- 📄 **On-The-Fly PDF Generation**: Backend draws beautiful landscape A4 certificates using **PDFKit** including custom borders, signatures, and styling.
- 🔍 **Secure QR Verification**: QR codes are rendered into the PDF pointing to a public API endpoint (`/api/certificate/lookup?query=...`) for instant physical verification.
- ✉️ **Responsive HTML Emails**: Custom CSS templates sent automatically on status change via **Nodemailer**, complete with `List-Unsubscribe` headers.

---

## 📁 Repository Structure

```
Marathon-full/
├── backend/
│   ├── server.js          # Main entrypoint containing all REST API routes and business logic
│   ├── seed.js            # Database seeder to initialize/reset the admin profile
│   ├── seed-test.js       # Local testing seeder file
│   └── package.json       # Backend Node dependencies and scripts
│
└── marathon frontend/
    ├── src/
    │   ├── routes/        # TanStack Start file-based routing directory
    │   │   ├── index.tsx  # Home landing page
    │   │   ├── register.tsx # Registration page
    │   │   └── admin.tsx  # Admin authentication page
    │   ├── components/
    │   │   ├── admin/     # Admin Dashboard tabs (Dashboard, Participants, Contacts, Reports)
    │   │   └── marathon/  # Hero, Countdown, FAQ, and Registration frontend blocks
    │   └── styles.css     # Global CSS and Tailwind CSS variables
    └── package.json       # Frontend dependencies (React 19, Radix UI, TanStack Router)
```

---

## 🛠️ Setup & Running

### Prerequisites
- [Node.js](https://nodejs.org/) >= 18.0.0
- MongoDB Atlas account (or a local MongoDB instance)
- SMTP Mail Account (Gmail, Brevo, AWS SES, or similar)

---

### Step 1: Configure Backend Environment

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
BASE_URL=http://localhost:5000

# Seeder Admin Account
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpassword123

# SMTP Server Details (e.g. Gmail or Brevo)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=your_email@gmail.com
```

#### Environment Variables Reference

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | Local port the backend listens on | `5000` |
| `MONGODB_URI` | Connection URI for the MongoDB server | `mongodb://localhost:27017/marathon` |
| `JWT_SECRET` | Secret key used to sign admin session tokens | `supersecretmarathonkey123` |
| `BASE_URL` | Base URL used to construct the certificate download links | `http://localhost:5000` |
| `SMTP_HOST` | Host address of your outgoing mail transporter | `smtp-relay.brevo.com` or `smtp.gmail.com` |
| `SMTP_PORT` | Port of SMTP (usually 465 for SSL, 587 for TLS) | `465` (SSL) / `587` (TLS) |
| `SMTP_USER` | Log in username for outgoing email | `support@infinitymiles.com` |
| `SMTP_PASS` | Password or app-specific key | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM` | The sender address shown in emails | `"Run Beyond Limits" <support@infinitymiles.com>` |

---

### Step 2: Set up Backend

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Seed the Database (Creates or updates the admin account defined in `.env`):
   ```bash
   npm run seed
   ```

3. Spin up the Dev API Server (runs with `nodemon`):
   ```bash
   npm run dev
   ```
   The backend will be running at [http://localhost:5000](http://localhost:5000).

---

### Step 3: Set up Frontend

We recommend using **Bun** for frontend commands for faster builds, but standard **npm** is fully supported.

1. Navigate to the frontend directory:
   ```bash
   cd "../marathon frontend"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```
   The frontend will be running at [http://localhost:8080](http://localhost:8080).

---

## 📡 REST API Reference

All requests must use the base URL: `http://localhost:5000`

### Public Endpoints

| Method | Endpoint | Description | Payload Example |
|:---|:---|:---|:---|
| **POST** | `/api/register` | Register a new runner | `{ "fullName": "John Doe", "email": "john@example.com", "phone": "9876543210", "cityId": "chennai", "raceId": "10k", "size": "M", ... }` |
| **POST** | `/api/contact` | Save a contact form message | `{ "name": "Jane", "email": "jane@example.com", "phone": "9999999999", "message": "Race inquiry" }` |
| **POST** | `/api/admin/login` | Authenticate admin | `{ "username": "admin", "password": "adminpassword123" }` |
| **GET** | `/api/certificate/lookup` | Search for a paid registration | Query Params: `?query=email_or_phone` |
| **GET** | `/api/certificate/download/:id` | Generates & downloads PDF | Parameter: `:id` is the Participant MongoDB ID |

### Protected Admin Endpoints
*Requires Header: `Authorization: Bearer <your_jwt_token>`*

| Method | Endpoint | Description | Payload Example |
|:---|:---|:---|:---|
| **GET** | `/api/admin/participants` | Retrieve list of all registrants | *None* |
| **PUT** | `/api/admin/participants/:id` | Edit details of a registrant | `{ "fullName": "Updated Name", "size": "L" }` |
| **PUT** | `/api/admin/participants/:id/payment` | Confirm payment & generate BIB | `{ "paymentStatus": "Paid", "paymentTxnId": "TXN999234" }` |
| **DELETE** | `/api/admin/participants/:id` | Remove a participant record | *None* |
| **GET** | `/api/admin/contacts` | Fetch list of all contact messages | *None* |
| **GET** | `/api/admin/reports/tshirt` | Retrieve counts grouped by size & race | *None* |
| **POST** | `/api/admin/participants/:id/send-certificate` | Force-send certificate email | *None* |

---

## 🏃 Race Categories & Fee Details

| ID | Name | Target Distance | Price (INR) |
|---|---|---|---|
| `5k` | Fun Run | 5 Kilometers | ₹499 |
| `10k` | Challenge | 10 Kilometers | ₹799 |
| `21k` | Half Marathon | 21 Kilometers | ₹999 |

---

## 👨‍💻 Author

- **Gokulraj N** — [@Gokulraj-N80](https://github.com/Gokulraj-N80)

*Made with ❤️ for runners pushing past their limits.*
