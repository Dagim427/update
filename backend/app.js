require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnection = require("./db/dbConfig");
const rateLimit = require("express-rate-limit");
const timeout = require("connect-timeout");
// Import Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const clerkRoute = require("./routes/clerkRoute");
const triageRoomRoute = require("./routes/triageRoomRoute");
const doctorRoute = require("./routes/doctorRoute");
const homeRoute = require("./routes/homeRoute");
const labTechnicianRoute = require("./routes/labTechnicianRoute");
const patientRoute = require("./routes/patientRoute");

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;
const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,  // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    trustProxy: true,
  });
// ─── Middlewares ───────────────────────────────────────────────

app.use(cors(
  {
    origin: process.env.V1 || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));

app.use(express.json());
app.use(timeout('60s'));
app.use(globalLimiter);
// ─── Routes ───────────────────────────────────────────────────
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/clerk", clerkRoute);
app.use("/api/triage-room", triageRoomRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/home", homeRoute);
app.use("/api/lab-technician", labTechnicianRoute);
app.use("/api/patient", patientRoute);

// ─── Health Check ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ─── Start Server ─────────────────────────────────────────────
async function startServer() {
  try {
    await dbconnection.getConnection();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on PORT :${PORT}`);
      console.log("✅ Database connected successfully");
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
