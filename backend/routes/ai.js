// backend/routes/ai.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const router = express.Router();

router.post("/suggest", async (req, res) => {
  const { type, data } = req.body;
  const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

  let prompt = "";

  switch (type) {
    case "skills":
      prompt = `From this data (education, projects, experience), suggest 8–12 ATS-friendly technical skills, comma-separated, no soft skills.

 Existing Skills: ${data.skills?.join(", ") || ""}
Education: ${data.education || "N/A"}
Projects: ${data.projects || "N/A"}
Experience: ${data.experience || "N/A"}`;
      break;

    case "summary":
      prompt = `Write a professional resume summary in 2-3 concise sentences(max 50 words) highlighting strengths and key skills: ${data.skills?.join(", ") || ""}, experience titles: ${data.experience?.map(e=>e.title).join(", ") || ""}, and projects: ${data.projects?.map(p=>p.title).join(", ") || ""}.`;
      break;

    case "experience":
      prompt = `Generate a professional resume description for this role in 2-3 concise sentences (max 40 words). Focus on responsibilities, tech used and impact.:
Title: ${data.title}
Company: ${data.company}
Duration: ${data.start || "N/A"} - ${data.end || "N/A"}
Existing description: ${data.description || "None"}`;
      break;

    case "project":
      prompt = `Generate a concise 2-3 sentence  professional project description for this project. Highlight technologies used and the impact/result:
Title: ${data.title}
Link: ${data.link || "None"}
Existing description: ${data.description || "None"}`;
      break;

    default:
      return res.status(400).json({ error: "Invalid AI type" });
  }

  try {

    const result = await model.generateContent(prompt);
    const response =await result.response;
    const aiText= response.text();
    // const response = await axios.post(
    //  "https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.5-pro:predict",
    //   {
    //     input: [
    //       {
    //         role: "user",
    //         content: [{ type: "text", text: prompt }]
    //       }
    //     ]
    //   },
    //   { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } }
    // );

    // const aiText = response.data?.predictions?.[0]?.content || "";
    console.log(aiText);
    res.json({ aiText });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate AI text" });
  }
});

export default router;
