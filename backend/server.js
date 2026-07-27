import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/marathon";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretmarathonkey123";

// Nodemailer SMTP Transporter (works with Gmail port 465 AND Brevo port 587)
const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: smtpPort,
  secure: smtpPort === 465, // true for port 465 (Gmail), false for 587 (Brevo/TLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify SMTP connection on start
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP Connection Error:", err.message);
  } else {
    console.log("SMTP Server is ready to send emails!");
  }
});

// ---- NOTIFICATION HELPERS ----

async function sendRegistrationEmail(participant) {
  const raceLabel = participant.raceId === "5k" ? "5K Fun Run" : participant.raceId === "10k" ? "10K Challenge" : "Half Marathon (21K)";
  const feeMap = { "5k": "₹499", "10k": "₹799", "21k": "₹999" };
  const fee = feeMap[participant.raceId] || "₹799";
  const regDate = new Date(participant.registrationDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

  const plainText = `Dear ${participant.fullName},

Congratulations! You have successfully registered for Run Beyond Limits 2026.

YOUR REGISTRATION DETAILS:
- Full Name: ${participant.fullName}
- Phone: ${participant.phone}
- City: ${participant.cityId}
- Race Category: ${raceLabel}
- T-Shirt Size: ${participant.size}
- Registered On: ${regDate}
- Payment Status: PENDING — ${fee} due

Our team will send you the payment link shortly. Once payment is confirmed, you will receive your BIB number and a link to download your participation certificate.

If you have any questions, please contact us at support@infinitymiles.com.

Run Beyond Limits 2026 Team`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#F1F5F9;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#F1F5F9;">
        Registration confirmed for Run Beyond Limits 2026. Payment of ${fee} is pending. Details inside.
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:30px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
            <!-- View in Browser -->
            <tr>
              <td style="padding:12px 36px 0;text-align:right;">
                <a href="${BASE_URL}" style="color:#64748B;font-size:11px;text-decoration:underline;">View in browser</a>
              </td>
            </tr>
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#1E3A8A 0%,#F97316 100%);padding:40px 36px;text-align:center;">
                <p style="color:rgba(255,255,255,0.8);margin:0 0 6px;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Run Beyond Limits 2026</p>
                <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:700;">Registration Confirmed</h1>
                <p style="color:rgba(255,255,255,0.9);margin:12px 0 0;font-size:15px;">You're one step closer to race day!</p>
              </td>
            </tr>
            <!-- Greeting -->
            <tr>
              <td style="padding:32px 36px 8px;">
                <p style="font-size:18px;color:#0F172A;margin:0;">Dear <strong>${participant.fullName}</strong>,</p>
                <p style="color:#475569;margin:14px 0 0;line-height:1.7;font-size:15px;">Thank you for registering! Your spot for <strong>${raceLabel}</strong> has been reserved. Please review your details below:</p>
              </td>
            </tr>
            <!-- Details Table -->
            <tr>
              <td style="padding:24px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid #E2E8F0;">
                  <tr style="background:#F8FAFC;">
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;width:45%;border-bottom:1px solid #E2E8F0;font-size:14px;">Full Name</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${participant.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">Phone</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${participant.phone}</td>
                  </tr>
                  <tr style="background:#F8FAFC;">
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">City</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;text-transform:capitalize;">${participant.cityId}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">Race Category</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${raceLabel}</td>
                  </tr>
                  <tr style="background:#F8FAFC;">
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">T-Shirt Size</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${participant.size}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">Registered On</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${regDate}</td>
                  </tr>
                  <tr style="background:#FFF7ED;">
                    <td style="padding:14px 18px;font-weight:600;color:#C2410C;font-size:14px;">Payment Status</td>
                    <td style="padding:14px 18px;color:#C2410C;font-weight:700;font-size:14px;">PENDING &mdash; ${fee} due</td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Info box -->
            <tr>
              <td style="padding:0 36px 28px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="background:#EFF6FF;border-left:4px solid #1E3A8A;border-radius:8px;padding:18px 22px;">
                      <p style="margin:0 0 4px;color:#1E3A8A;font-weight:600;font-size:14px;">What happens next?</p>
                      <p style="margin:0;color:#1E40AF;font-size:13px;line-height:1.7;">Our team will send you the payment link shortly. Once your payment is confirmed, you will receive your <strong>BIB number</strong> and a link to download your <strong>participation certificate</strong>.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Divider -->
            <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #E2E8F0;margin:0;"></td></tr>
            <!-- Contact -->
            <tr>
              <td style="padding:24px 36px;text-align:center;">
                <p style="margin:0 0 4px;color:#64748B;font-size:13px;">Have questions? Reach out to us</p>
                <a href="mailto:support@infinitymiles.com" style="color:#1E3A8A;font-size:14px;font-weight:600;text-decoration:none;">support@infinitymiles.com</a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:#F8FAFC;padding:24px 36px;text-align:center;border-top:1px solid #E2E8F0;">
                <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">Run Beyond Limits 2026 &bull; This is an automated email sent to ${participant.email}</p>
                <p style="margin:8px 0 0;color:#94A3B8;font-size:11px;">You received this because you registered for Run Beyond Limits 2026.</p>
                <p style="margin:6px 0 0;"><a href="mailto:support@infinitymiles.com?subject=Unsubscribe" style="color:#94A3B8;font-size:11px;text-decoration:underline;">Unsubscribe</a></p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;

  try {
    await transporter.sendMail({
      from: `"Run Beyond Limits 2026" <${process.env.SMTP_FROM}>`,
      to: participant.email,
      replyTo: "support@infinitymiles.com",
      subject: `Run Beyond Limits 2026 — Registration Confirmed for ${participant.fullName}`,
      text: plainText,
      html: htmlContent,
      headers: {
        "List-Unsubscribe": `<mailto:support@infinitymiles.com?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Mailer": "RunBeyondLimits-Mailer/1.0",
        "X-Campaign": "marathon-2026"
      }
    });
    console.log(`Registration email sent to ${participant.email}`);
  } catch (err) {
    console.error(`Failed to send email to ${participant.email}:`, err.message);
  }
}

async function sendPaymentConfirmationEmail(participant) {
  const raceLabel = participant.raceId === "5k" ? "5K Fun Run" : participant.raceId === "10k" ? "10K Challenge" : "Half Marathon (21K)";
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const certLink = `${BASE_URL}/api/certificate/download/${participant._id}`;

  const raceDate = "August 24, 2026";

  const plainText = `Dear ${participant.fullName},

Your payment is confirmed! You're officially registered for Run Beyond Limits 2026.

CONFIRMED DETAILS:
- Race Category: ${raceLabel}
- City: ${participant.cityId}
- BIB Number: ${participant.bibNumber}
- T-Shirt Size: ${participant.size}
- Payment Status: CONFIRMED & PAID

WHAT'S NEXT:
- Race Day: ${raceDate}
- Arrival Time: 5:30 AM
- What to Bring: Valid photo ID, printed BIB number
- Wear your Run Beyond Limits 2026 T-shirt

Download your certificate: ${certLink}

If you have any questions, please contact us at support@infinitymiles.com.

See you on race day!
Run Beyond Limits 2026 Team`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#F1F5F9;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#F1F5F9;">
        Payment confirmed for Run Beyond Limits 2026. Your BIB number is ${participant.bibNumber}. Download your certificate now.
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:30px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
            <!-- View in Browser -->
            <tr>
              <td style="padding:12px 36px 0;text-align:right;">
                <a href="${BASE_URL}" style="color:#64748B;font-size:11px;text-decoration:underline;">View in browser</a>
              </td>
            </tr>
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#059669 0%,#1E3A8A 100%);padding:40px 36px;text-align:center;">
                <p style="color:rgba(255,255,255,0.8);margin:0 0 6px;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Run Beyond Limits 2026</p>
                <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:700;">Payment Successful!</h1>
                <p style="color:rgba(255,255,255,0.9);margin:12px 0 0;font-size:15px;">You're officially in the race</p>
              </td>
            </tr>
            <!-- Greeting -->
            <tr>
              <td style="padding:32px 36px 8px;">
                <p style="font-size:18px;color:#0F172A;margin:0;">Dear <strong>${participant.fullName}</strong>,</p>
                <p style="color:#475569;margin:14px 0 0;line-height:1.7;font-size:15px;">Great news! Your payment has been confirmed and your spot for <strong>${raceLabel}</strong> is now locked in. Here are your confirmed details:</p>
              </td>
            </tr>
            <!-- Details Table -->
            <tr>
              <td style="padding:24px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid #E2E8F0;">
                  <tr style="background:#F8FAFC;">
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;width:45%;border-bottom:1px solid #E2E8F0;font-size:14px;">Race Category</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${raceLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">City</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;text-transform:capitalize;">${participant.cityId}</td>
                  </tr>
                  <tr style="background:#F8FAFC;">
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">BIB Number</td>
                    <td style="padding:14px 18px;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-weight:700;font-size:18px;letter-spacing:1px;">${participant.bibNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;font-weight:600;color:#1E3A8A;border-bottom:1px solid #E2E8F0;font-size:14px;">T-Shirt Size</td>
                    <td style="padding:14px 18px;color:#334155;border-bottom:1px solid #E2E8F0;font-size:14px;">${participant.size}</td>
                  </tr>
                  <tr style="background:#F0FDF4;">
                    <td style="padding:14px 18px;font-weight:600;color:#059669;font-size:14px;">Payment Status</td>
                    <td style="padding:14px 18px;color:#059669;font-weight:700;font-size:14px;">CONFIRMED & PAID</td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Certificate Button -->
            <tr>
              <td style="padding:8px 36px 32px;text-align:center;">
                <p style="color:#334155;margin:0 0 16px;font-size:15px;">Your participation certificate is ready to download:</p>
                <a href="${certLink}" style="display:inline-block;background:linear-gradient(135deg,#1E3A8A,#F97316);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:50px;font-weight:700;font-size:15px;letter-spacing:0.5px;">Download Certificate</a>
              </td>
            </tr>
            <!-- Divider -->
            <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #E2E8F0;margin:0;"></td></tr>
            <!-- What's Next -->
            <tr>
              <td style="padding:28px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="background:#F0FDF4;border-radius:10px;padding:24px 22px;border:1px solid #BBF7D0;">
                      <p style="margin:0 0 14px;color:#065F46;font-size:16px;font-weight:700;">What's Next?</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;width:30px;vertical-align:top;">&#128197;</td>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;"><strong>Race Day:</strong> ${raceDate}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;width:30px;vertical-align:top;">&#9200;</td>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;"><strong>Arrival Time:</strong> 5:30 AM (please be punctual)</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;width:30px;vertical-align:top;">&#128196;</td>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;"><strong>Bring:</strong> Valid photo ID + printed BIB number</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;width:30px;vertical-align:top;">&#127917;</td>
                          <td style="padding:6px 0;color:#334155;font-size:14px;line-height:1.7;"><strong>Wear:</strong> Your Run Beyond Limits 2026 T-shirt</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Divider -->
            <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #E2E8F0;margin:0;"></td></tr>
            <!-- Contact -->
            <tr>
              <td style="padding:28px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="background:#EFF6FF;border-radius:10px;padding:20px 22px;border:1px solid #BFDBFE;text-align:center;">
                      <p style="margin:0 0 6px;color:#1E3A8A;font-size:14px;font-weight:600;">Need Help?</p>
                      <p style="margin:0;color:#475569;font-size:13px;line-height:1.6;">Contact our support team anytime</p>
                      <a href="mailto:support@infinitymiles.com" style="display:inline-block;margin-top:10px;color:#1E3A8A;font-size:14px;font-weight:600;text-decoration:none;">support@infinitymiles.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:#F8FAFC;padding:24px 36px;text-align:center;border-top:1px solid #E2E8F0;">
                <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">Run Beyond Limits 2026 &bull; This is an automated email sent to ${participant.email}</p>
                <p style="margin:8px 0 0;color:#94A3B8;font-size:11px;">You received this because you registered and paid for Run Beyond Limits 2026.</p>
                <p style="margin:6px 0 0;"><a href="mailto:support@infinitymiles.com?subject=Unsubscribe" style="color:#94A3B8;font-size:11px;text-decoration:underline;">Unsubscribe</a></p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;

  try {
    await transporter.sendMail({
      from: `"Run Beyond Limits 2026" <${process.env.SMTP_FROM}>`,
      to: participant.email,
      replyTo: "support@infinitymiles.com",
      subject: `Run Beyond Limits 2026 — Payment Confirmed! Your BIB is ${participant.bibNumber}`,
      text: plainText,
      html: htmlContent,
      headers: {
        "List-Unsubscribe": `<mailto:support@infinitymiles.com?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Mailer": "RunBeyondLimits-Mailer/1.0",
        "X-Campaign": "marathon-2026-payment"
      }
    });
    console.log(`Payment confirmation email sent to ${participant.email} with BIB: ${participant.bibNumber}`);
  } catch (err) {
    console.error(`Failed to send payment email to ${participant.email}:`, err.message);
  }
}

// Send WhatsApp Notification (console log — integrate your WhatsApp API here)
function sendWhatsAppNotification(participant) {
  const raceLabel = participant.raceId === "5k" ? "5K Fun Run" : participant.raceId === "10k" ? "10K Challenge" : "Half Marathon (21K)";
  const message = `Hello ${participant.fullName}! 🎉\n\nYou have successfully registered for *Run Beyond Limits 2026*!\n\n📍 City: ${participant.cityId.charAt(0).toUpperCase() + participant.cityId.slice(1)}\n🏃 Category: ${raceLabel}\n👕 T-Shirt: ${participant.size}\n\nPayment instructions will be sent soon. Once paid, your BIB number and certificate will be issued.\n\nSee you on race day! 💪`;

  // Log for now — integrate Twilio or WhatsApp Cloud API here with participant.phone
  console.log(`\n📱 WhatsApp Message for +91${participant.phone}:\n${message}\n`);
}

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Mongoose Schemas & Models
const ParticipantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  size: { type: String, required: true }, // T-Shirt size
  cityId: { type: String, required: true }, // e.g. chennai
  raceId: { type: String, required: true }, // e.g. 10k
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paymentTxnId: { type: String, default: "" },
  bibNumber: { type: String, default: "" },
  registrationDate: { type: Date, default: Date.now }
});

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Participant = mongoose.model("Participant", ParticipantSchema);
const ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);
const Admin = mongoose.model("Admin", AdminSchema);

// Admin JWT Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};

// --- API ROUTES ---

// Public: Participant Registration
app.post("/api/register", async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();

    // Send email and WhatsApp notification (non-blocking)
    sendRegistrationEmail(newParticipant);
    sendWhatsAppNotification(newParticipant);

    res.status(201).json({
      success: true,
      message: "Registration created successfully!",
      participant: newParticipant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Public: Submit Contact Message
app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: "Contact message saved successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Public: Admin Login
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get Participants List (Players List)
app.get("/api/admin/participants", authenticateAdmin, async (req, res) => {
  try {
    const participants = await Participant.find().sort({ registrationDate: -1 });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update Payment Status & Bib Assignment
app.put("/api/admin/participants/:id/payment", authenticateAdmin, async (req, res) => {
  const { paymentStatus, paymentTxnId } = req.body;
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    participant.paymentStatus = paymentStatus;
    if (paymentTxnId) {
      participant.paymentTxnId = paymentTxnId;
    }

    // Automatically generate Bib if paid and not already set
    if (paymentStatus === "Paid" && !participant.bibNumber) {
      // Find count of paid participants in the same race and city to make it unique
      const count = await Participant.countDocuments({
        cityId: participant.cityId,
        raceId: participant.raceId,
        paymentStatus: "Paid"
      });
      const cityPrefix = participant.cityId.substring(0, 3).toUpperCase();
      const racePrefix = participant.raceId.toUpperCase();
      const nextNum = String(count + 1).padStart(4, "0");
      participant.bibNumber = `${cityPrefix}-${racePrefix}-${nextNum}`;
    } else if (paymentStatus === "Pending") {
      participant.bibNumber = "";
    }

    await participant.save();

    // Send payment confirmation email with certificate link
    if (paymentStatus === "Paid") {
      sendPaymentConfirmationEmail(participant);
    }

    res.json({ success: true, participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get Contact Messages
app.get("/api/admin/contacts", authenticateAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Edit Participant
app.put("/api/admin/participants/:id", authenticateAdmin, async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) return res.status(404).json({ error: "Participant not found" });

    const allowed = ["fullName", "phone", "email", "city", "cityId", "raceId", "size", "dob", "gender", "address", "state", "pincode", "emergencyContact"];
    for (const key of allowed) {
      if (req.body[key] !== undefined) participant[key] = req.body[key];
    }
    await participant.save();
    res.json({ success: true, participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete Participant
app.delete("/api/admin/participants/:id", authenticateAdmin, async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant) return res.status(404).json({ error: "Participant not found" });
    res.json({ success: true, message: "Participant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: T-Shirt Size Report
app.get("/api/admin/reports/tshirt", authenticateAdmin, async (req, res) => {
  try {
    const participants = await Participant.find().lean();
    const sizeMap = {};
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    for (const s of sizes) {
      sizeMap[s] = { size: s, total: 0, races: { "5k": 0, "10k": 0, "21k": 0 } };
    }
    for (const p of participants) {
      const s = (p.size || "").toUpperCase();
      const r = p.raceId || "10k";
      if (sizeMap[s]) {
        sizeMap[s].total++;
        if (sizeMap[s].races[r] !== undefined) sizeMap[s].races[r]++;
      }
    }
    res.json(Object.values(sizeMap));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Send Certificate Email
app.post("/api/admin/participants/:id/send-certificate", authenticateAdmin, async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) return res.status(404).json({ error: "Participant not found" });
    if (participant.paymentStatus !== "Paid") return res.status(400).json({ error: "Participant has not paid yet" });
    await sendPaymentConfirmationEmail(participant);
    res.json({ success: true, message: `Certificate email sent to ${participant.email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Certificate Lookup
app.get("/api/certificate/lookup", async (req, res) => {
  const { query } = req.query; // email or phone
  if (!query) {
    return res.status(400).json({ error: "Search query (email or phone) is required" });
  }

  try {
    const participant = await Participant.findOne({
      $and: [
        { paymentStatus: "Paid" },
        { $or: [{ email: query.trim() }, { phone: query.trim() }] }
      ]
    });

    if (!participant) {
      return res.status(404).json({ error: "No paid participant found with this email or phone number." });
    }

    res.json({
      id: participant._id,
      fullName: participant.fullName,
      city: participant.city,
      raceId: participant.raceId,
      bibNumber: participant.bibNumber
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Generate and Download Certificate PDF
app.get("/api/certificate/download/:id", async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant || participant.paymentStatus !== "Paid") {
      return res.status(404).send("Certificate not found or participant has not paid.");
    }

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
      margins: { top: 0, left: 0, bottom: 0, right: 0 }
    });

    // Send PDF header
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="Certificate-${participant.fullName.replace(/\s+/g, "_")}.pdf"`);
    doc.pipe(res);

    const width = doc.page.width;
    const height = doc.page.height;

    // --- DRAW BACKGROUND & BORDERS ---
    // Outer border
    doc.rect(20, 20, width - 40, height - 40)
      .lineWidth(5)
      .stroke("#1E3A8A"); // Navy Blue

    // Inner thin border
    doc.rect(30, 30, width - 60, height - 60)
      .lineWidth(1)
      .stroke("#F97316"); // Orange

    // Decorative corners
    const drawCorner = (x, y, dx, dy) => {
      doc.save()
        .rect(x, y, dx, dy)
        .fill("#1E3A8A");
    };
    drawCorner(20, 20, 30, 10);
    drawCorner(20, 20, 10, 30);
    drawCorner(width - 50, 20, 30, 10);
    drawCorner(width - 30, 20, 10, 30);
    drawCorner(20, height - 30, 30, 10);
    drawCorner(20, height - 40, 10, 30);
    drawCorner(width - 50, height - 30, 30, 10);
    drawCorner(width - 30, height - 40, 10, 30);

    // --- CERTIFICATE CONTENT ---

    // Header Logo/Text
    doc.fillColor("#1E3A8A")
      .font("Helvetica-Bold")
      .fontSize(36)
      .text("RUN BEYOND LIMITS 2026", 0, 80, { align: "center" });

    doc.fillColor("#F97316")
      .font("Helvetica")
      .fontSize(14)
      .text("OFFICIAL FINISHER CERTIFICATE", 0, 130, { align: "center", characterSpacing: 2 });

    // Middle text
    doc.fillColor("#334155")
      .font("Helvetica-Oblique")
      .fontSize(18)
      .text("This is proudly presented to", 0, 190, { align: "center" });

    // Participant Name
    doc.fillColor("#0F172A")
      .font("Helvetica-Bold")
      .fontSize(32)
      .text(participant.fullName.toUpperCase(), 0, 230, { align: "center" });

    // Race completion details
    const raceDetailsText = `For successfully completing the ${participant.raceId.toUpperCase()} category in the Run Beyond Limits 2026 Marathon held at ${participant.city}.`;
    doc.fillColor("#334155")
      .font("Helvetica")
      .fontSize(16)
      .text(raceDetailsText, 100, 290, { align: "center", width: width - 200, lineGap: 6 });

    // Bib Number and Date
    doc.fillColor("#1E3A8A")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`BIB NUMBER: ${participant.bibNumber}`, 100, 380, { align: "left" });

    doc.fillColor("#1E3A8A")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("DATE: JULY 2026", width - 280, 380, { align: "right" });

    // Signatures
    doc.save();

    // Signature Line 1
    doc.moveTo(100, 470).lineTo(250, 470).lineWidth(1).stroke("#94A3B8");
    doc.fillColor("#475569")
      .font("Helvetica")
      .fontSize(12)
      .text("Race Director", 100, 480, { width: 150, align: "center" });

    // Signature Line 2
    doc.moveTo(width - 250, 470).lineTo(width - 100, 470).lineWidth(1).stroke("#94A3B8");
    doc.fillColor("#475569")
      .font("Helvetica")
      .fontSize(12)
      .text("Event Coordinator", width - 250, 480, { width: 150, align: "center" });

    // QR Code for verification
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
    const verifyUrl = `${BASE_URL}/api/certificate/lookup?query=${encodeURIComponent(participant.email)}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 120, margin: 1 });
    const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrBase64, "base64");
    doc.image(qrBuffer, width - 150, height - 160, { width: 80, height: 80 });
    doc.fillColor("#475569")
      .font("Helvetica")
      .fontSize(8)
      .text("Scan to verify", width - 150, height - 75, { width: 80, align: "center" });

    doc.restore();

    // End of Document
    doc.end();
  } catch (error) {
    res.status(500).send("Error generating certificate: " + error.message);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
