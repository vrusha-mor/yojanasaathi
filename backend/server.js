import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import { callOpenRouter } from "./aiService.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.json({ status: "YojanaSaathi Unified Backend is running" });
});

/* ======================
   AUTH ROUTES
====================== */
app.post("/signup", async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  if (!name || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name",
      [name, password]
    );
    res.status(201).json({ message: "Signup successful", user: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Username already exists" });
    }
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  try {
    const result = await pool.query(
      "SELECT id, name FROM users WHERE name = $1 AND password = $2",
      [name, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user: result.rows[0] });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ======================
   SCHEME ROUTES
====================== */
app.post("/api/schemes/search", async (req, res) => {
  const { query, language } = req.body;

  const prompt = `
You are an Indian government scheme reasoning engine.

User message:
"${query}"
Language requested: ${language || 'Auto-detect'}

Your tasks:
- Detect the user's language automatically
- Identify suitable Indian government schemes
- Respond in the SAME language as the user
- Keep response simple and helpful

IMPORTANT:
- You MUST include documents array for EVERY scheme
- documents MUST be an array of strings

Return JSON ONLY in this exact format:

{
  "message": "",
  "schemes": [
    {
      "name": "",
      "description": "",
      "eligibility": "",
      "documents": [
        "Aadhaar Card",
        "Income Certificate"
      ],
      "apply_link": ""
    }
  ]
}
`;

  try {
    const parsed = await callOpenRouter(prompt);

    // 🛡️ SAFETY: Ensure documents always exist
    parsed.schemes = (parsed.schemes || []).map(s => ({
      ...s,
      documents: s.documents?.length ? s.documents : ["Aadhaar Card", "Income Certificate", "Residence Proof", "Bank Passbook"]
    }));

    res.json(parsed);
  } catch (error) {
    console.error("Scheme search error:", error);
    res.status(500).json({ message: "Server error", schemes: [] });
  }
});

/* ======================
   SCAM CHECKER ROUTES
====================== */
app.post("/api/check-scam", async (req, res) => {
  const { text } = req.body;

  const prompt = `
You are a cybersecurity expert.

Analyze the following text or URL and determine if it is a scam.

"${text}"

Return ONLY valid JSON:
{
  "isScam": true or false,
  "riskLevel": "Low | Medium | High",
  "reason": "Short explanation"
}
`;

  try {
    const result = await callOpenRouter(prompt);
    res.json(result);
  } catch (error) {
    console.error("Scam check error:", error);
    res.status(500).json({ message: "Server error during scam check" });
  }
});

/* ======================
   SERVER START
====================== */
// Wildcard route to serve index.html for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Unified Backend running on http://localhost:${PORT}`);
});
