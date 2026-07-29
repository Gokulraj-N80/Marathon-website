import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/marathon";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", AdminSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding.");

    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log(`Admin user '${ADMIN_USERNAME}' already exists. Updating password...`);
      const salt = await bcrypt.genSalt(10);
      existingAdmin.password = await bcrypt.hash(ADMIN_PASSWORD, salt);
      await existingAdmin.save();
      console.log("Admin password updated successfully.");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
      const newAdmin = new Admin({
        username: ADMIN_USERNAME,
        password: hashedPassword
      });
      await newAdmin.save();
      console.log(`Admin user '${ADMIN_USERNAME}' created successfully.`);
    }
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

seed();
