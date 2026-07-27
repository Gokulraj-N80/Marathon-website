# Run Beyond Limits 2026 🏃

A full-stack marathon event registration and management platform for a multi-city running event across **Chennai, Bengaluru, and Salem**.

---

## What It Does

- Participants register online through a step-by-step form
- Admin manages all registrations from a dashboard
- Emails are sent automatically on registration and payment confirmation
- PDF certificates with QR codes are generated and emailed to paid participants

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, TailwindCSS v4, TanStack Router |
| UI Components | shadcn/ui, Radix UI, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + bcryptjs |
| Email | Nodemailer (Gmail SMTP) |
| PDF | PDFKit + QRCode |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gokulraj-N80/Marathon.git
cd Marathon
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=your_email@gmail.com
BASE_URL=http://localhost:5000
```

> To get `SMTP_PASS`: Go to Google Account → Security → App Passwords → Generate one for "Mail"

Seed the admin account (first time only):

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd "marathon frontend"
npm install
npm run dev
```

---

## Running

| Service | URL |
|---|---|
| Frontend | http://localhost:8080 |
| Backend API | http://localhost:5000 |
| Admin Panel | http://localhost:8080/admin |

**Admin login** (after seeding):
```
Username: admin
Password: adminpassword123
```

---

## API Endpoints

### Public
| Method | Route | Description |
|---|---|---|
| POST | `/api/register` | Register a participant |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/certificate/download/:id` | Download PDF certificate |

### Admin (requires JWT token)
| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/participants` | List all participants |
| PUT | `/api/admin/participants/:id` | Edit participant |
| PUT | `/api/admin/participants/:id/payment` | Update payment + assign BIB |
| DELETE | `/api/admin/participants/:id` | Delete participant |
| POST | `/api/admin/participants/:id/send-certificate` | Email certificate |
| GET | `/api/admin/contacts` | List contact messages |

---

## Race Categories

| ID | Name | Distance | Fee |
|---|---|---|---|
| `5k` | Fun Run | 5 KM | ₹499 |
| `10k` | Challenge | 10 KM | ₹799 |
| `21k` | Half Marathon | 21 KM | ₹999 |

---

## Project Structure

```
Marathon-full/
├── backend/
│   ├── server.js       # All API routes and logic
│   ├── seed.js         # Creates admin account
│   └── .env            # Your config (not committed)
│
└── marathon frontend/
    └── src/
        ├── routes/     # Pages (home, register, admin, etc.)
        ├── components/
        │   ├── admin/  # Dashboard components
        │   └── marathon/ # Public site sections
        └── styles.css
```

---

## License

MIT © [Gokulraj N](https://github.com/Gokulraj-N80)
