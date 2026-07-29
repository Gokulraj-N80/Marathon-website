import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/marathon";

const ParticipantSchema = new mongoose.Schema({
  fullName: String, dob: String, gender: String, phone: String, email: String,
  emergencyContact: String, address: String, city: String, state: String,
  pincode: String, size: String, cityId: String, raceId: String,
  paymentStatus: String, paymentTxnId: String, bibNumber: String,
  registrationDate: Date
});
const Participant = mongoose.model("Participant", ParticipantSchema);

const names = [
  "Arun Kumar", "Priya Sharma", "Rahul Verma", "Deepa Nair", "Vikram Singh",
  "Kavitha Reddy", "Suresh Babu", "Anitha Devi", "Mohammed Ali", "Lakshmi Iyer",
  "Rajesh Gupta", "Meena Kumari", "Arjun Patel", "Divya Rajan", "Karthik Mohan",
  "Swathi Pillai", "Senthil Murugan", "Nithya Shree", "Prakash Raj", "Revathi Menon",
  "Vignesh Raja", "Aishwarya Bai", "Sanjay Mishra", "Preethi Sundar", "Ganesh Kumar",
  "Jayashree Rao", "Manikandan T", "Harini V", "Bala Murugan", "Keerthana S",
  "Aditya Nambiar", "Poornima Jayaraman", "Ravi Teja", "Saranya Murthy", "Kiran Bhat",
  "Lavanya Prasad"
];

const cities = ["chennai", "bengaluru", "salem"];
const cityNames = { chennai: "Chennai", bengaluru: "Bengaluru", salem: "Salem" };
const states = { chennai: "Tamil Nadu", bengaluru: "Karnataka", salem: "Tamil Nadu" };
const pincodeRanges = { chennai: 600000, bengaluru: 560000, salem: 636000 };
const races = ["5k", "10k", "21k"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const genders = ["Male", "Female"];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomPhone() { return String(7000000000 + Math.floor(Math.random() * 3000000000)); }
function registrationDate(index) {
  const start = new Date("2026-06-01T09:00:00");
  return new Date(start.getTime() + index * 1000 * 60 * 60 * 13);
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const docs = Array.from({ length: 100 }, (_, i) => {
    const name = names[i % names.length];
    const city = cities[i % cities.length];
    const race = races[i % races.length];
    const paid = i % 10 < 8;
    const cityPrefix = city.substring(0, 3).toUpperCase();
    const racePrefix = race.toUpperCase();
    return {
      fullName: name,
      dob: `199${i % 10}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      gender: genders[i % genders.length],
      phone: String(7000000000 + i * 7919),
      email: `${name.toLowerCase().replace(/\s+/g, ".")}.${i + 1}@example.com`,
      emergencyContact: String(8000000000 + i * 5639),
      address: `${(i % 190) + 1}, ${["Main Road", "Lake View Street", "Race Course Road", "Park Avenue", "Green Layout"][i % 5]}, ${cityNames[city]}`,
      city: cityNames[city],
      state: states[city],
      pincode: String(pincodeRanges[city] + (i % 90)),
      size: sizes[i % sizes.length],
      cityId: city,
      raceId: race,
      paymentStatus: paid ? "Paid" : "Pending",
      paymentTxnId: paid ? `TXN-${Date.now() + i * 1000}-${i}` : "",
      bibNumber: paid ? `${cityPrefix}-${racePrefix}-${String(i + 1).padStart(4, "0")}` : "",
      registrationDate: registrationDate(i),
    };
  });

  const removed = await Participant.deleteMany({});
  console.log(`Removed ${removed.deletedCount} existing participants.`);
  await Participant.insertMany(docs);
  console.log(`Inserted ${docs.length} participants.`);

  await mongoose.connection.close();
  console.log("Done.");
}

seed().catch(console.error);
