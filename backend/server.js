import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import mysql from "mysql2/promise";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
const tmpDir = path.join(__dirname, "tmp");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

console.log("📁 Folders ready");

// CORS configuration for local and all production domains
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://campusbridge-production-8a9c.up.railway.app",
    "https://campusbridge-production-d7e6.up.railway.app",
    "https://campusbridge-production-777b.up.railway.app",
    "https://campusbridge-production-5b30.up.railway.app"
  ],
  credentials: true,
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: tmpDir,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

let db;
(async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.MYSQLHOST || "localhost",
      user: process.env.MYSQLUSER || "root",
      password: process.env.MYSQLPASSWORD || "",
      database: process.env.MYSQL_DATABASE || "job_portal",
      port: process.env.MYSQLPORT || 3306,
      ssl: {
        rejectUnauthorized: false // Aiven क्लाउड डेटाबेससाठी SSL कनेक्शन अनिवार्य आहे
      }
    });
    console.log("✅ Connected to MySQL Database");

    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          fullname VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          phoneNumber VARCHAR(50),
          profile_photo VARCHAR(255),
          role VARCHAR(50) DEFAULT 'Student',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS student_resumes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT NOT NULL,
          resume_path VARCHAR(255) NOT NULL,
          uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("📁 Database tables verified/created successfully");

  } catch (err) {
    console.error("❌ MySQL connection/table creation error:", err);
  }
})();

const isAdmin = (req, res, next) => {
  next();
};

app.post("/register", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ success: false, message: "Database not connected" });

    const { fullname, email, password, phoneNumber, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ success: false, message: "Fullname, email, and password are required" });
    }

    const [existing] = await db.execute("SELECT * FROM users WHERE email=?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    let profilePhotoPath = null;

    if (req.files && req.files.profile_photo) {
      const file = req.files.profile_photo;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ success: false, message: "Invalid file type. Only PNG, JPG, JPEG allowed." });
      }

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      profilePhotoPath = `/uploads/${fileName}`;

      console.log("📸 Saving file to:", filePath);
      await file.mv(filePath);
    }

    await db.execute(
      "INSERT INTO users (fullname, email, password, phoneNumber, profile_photo, role) VALUES (?, ?, ?, ?, ?, ?)",
      [fullname, email, password, phoneNumber || null, profilePhotoPath, role || "Student"]
    );

    res.status(200).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ success: false, message: "Database not connected" });

    const { email, password, role } = req.body;

    console.log(`➡️ Attempting login for Email: ${email}, Role: ${role}`);

    const [rows] = await db.execute("SELECT * FROM users WHERE email=?", [email]);

    if (rows.length === 0) {
      console.log(`❌ Login Failed: Email '${email}' not found.`);
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];

    const dbRole = user.role ? user.role.toLowerCase() : '';
    const inputRole = role ? role.toLowerCase() : '';

    if (dbRole !== inputRole) {
      if (!(inputRole === 'alumni' && dbRole === 'alumini')) {
        console.log(`❌ Login Failed: Role Mismatch. DB: ${dbRole}, Input: ${inputRole}`);
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
    }

    if (user.password !== password) {
      console.log("❌ Login Failed: Password Mismatch.");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    console.log(`✅ Login Successful for User ID: ${user.id}`);
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.post("/api/student/upload-resume", async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      console.error("Missing student ID in request body");
      return res.status(400).json({ success: false, message: "Missing student ID" });
    }

    if (!req.files || !req.files.resume)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const file = req.files.resume;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF or DOC/DOCX allowed.",
      });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await file.mv(filePath);

    await db.execute(
      "INSERT INTO student_resumes (student_id, resume_path) VALUES (?, ?)",
      [studentId, `/uploads/${fileName}`]
    );

    console.log("✅ New Resume stored in student_resumes:", filePath);

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      filename: fileName,
      path: `/uploads/${fileName}`,
    });
  } catch (err) {
    console.error("❌ Resume Upload Error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.get("/api/student/resume/:studentId", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ success: false, message: "Database not connected" });

    const { studentId } = req.params;

    console.log(`🔍 Attempting to fetch resume for Student ID: ${studentId}`);

    const [rows] = await db.execute(
      "SELECT resume_path FROM student_resumes WHERE student_id=? ORDER BY uploaded_at DESC LIMIT 1",
      [studentId]
    );

    if (rows.length === 0) {
      return res.status(200).json({ success: false, message: "No resume uploaded yet!" });
    }

    const resumePath = rows[0].resume_path;

    res.status(200).json({
      success: true,
      message: "Resume path fetched successfully",
      resume: resumePath,
    });
  } catch (err) {
    console.error("❌ Resume Check Error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.get('/api/admin/users', isAdmin, async (req, res) => {
  try {
    if (!db) return res.status(500).json({ success: false, message: "Database not connected" });

    const [users] = await db.query(
      "SELECT id, fullname, email, role, profile_photo FROM users WHERE role IN (?, ?, ?)",
      ['Student', 'Alumni', 'Alumini']
    );

    res.status(200).json({ success: true, users });
    console.log(`✅ Fetched ${users.length} users for Admin.`);

  } catch (err) {
    console.error("❌ Error fetching Admin users list:", err);
    res.status(500).json({ success: false, message: 'Server error while fetching users.' });
  }
});

// Serve frontend static files safely with multiple path fallbacks
let frontendDistPath = path.join(__dirname, "frontend", "dist");
if (!fs.existsSync(frontendDistPath)) {
  frontendDistPath = path.join(__dirname, "../frontend/dist");
}

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api") && !req.path.startsWith("/uploads")) {
      return res.sendFile(path.join(frontendDistPath, "index.html"));
    }
    next();
  });
}

// Listen on 0.0.0.0 for correct cloud proxy routing
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});