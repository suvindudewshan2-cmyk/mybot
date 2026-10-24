import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message ?? "").trim();
    if (!message) return res.status(400).json({ error: "Message is required" });
    if (message.length > 8000) return res.status(413).json({ error: "Message too long" });
    if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: "GEMINI_API_KEY missing on server" });

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: message,
      config: { systemInstruction: "You are StudyMate AI, a supportive tutor for a Sri Lankan student. Answer in Sinhala when the user writes Sinhala, otherwise use their language. Help with A/L Commerce, Business Studies, Accounting and general school subjects. Explain step by step and admit uncertainty." }
    });
    res.json({ reply: result.text || "මට පිළිතුරක් ලබාදෙන්න බැරි වුණා. නැවත උත්සාහ කරන්න." });
  } catch (e) {
    console.error("Gemini error:", e?.message || e);
    res.status(500).json({ error: "AI request failed. Check the API key, model access and usage limits." });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.listen(process.env.PORT || 10000, "0.0.0.0", () => console.log("StudyMate AI server started"));
