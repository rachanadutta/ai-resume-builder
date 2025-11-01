import React, { useState } from "react";
import AIBox from "../AIBox";
import axios from "axios";

export default function Skills({ formData, setFormData, nextStep, prevStep }) {
  const BASE_URL = "https://ai-resume-backend-11s4.onrender.com";
  const [input, setInput] = useState({ category: "webTechnologies", value: "" });
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = {
    webTechnologies: "Web Technologies",
    databases: "Databases",
    tools: "Tools & Frameworks",
    soft: "Soft Skills",
  };

  const addSkill = () => {
    if (!input.value.trim()) return;
    const { category, value } = input;
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [category]: [...(formData.skills?.[category] || []), value.trim()],
      },
    });
    setInput({ ...input, value: "" });
  };

  const removeSkill = (cat, i) => {
    const newList = formData.skills[cat].filter((_, idx) => idx !== i);
    setFormData({
      ...formData,
      skills: { ...formData.skills, [cat]: newList },
    });
  };

  const handleAISuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/ai/suggest`, {
        type: "skills",
        data: { skills: formData.skills },
      });
      setAiText(res.data.aiText);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    try {
      // Expected AI response format (JSON)
      const aiSkills = JSON.parse(aiText);

      // Merge AI skills into existing ones
      const merged = { ...formData.skills };
      Object.keys(categories).forEach((cat) => {
        merged[cat] = [
          ...(merged[cat] || []),
          ...(aiSkills[cat] || []),
        ].filter((v, i, a) => a.indexOf(v) === i); // remove duplicates
      });

      setFormData({ ...formData, skills: merged });
    } catch (e) {
      console.error("AI response not in JSON format, using fallback");
    }
    setAiText("");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Skills</h2>

      <div className="flex gap-2">
        <select
          className="border p-2 rounded"
          value={input.category}
          onChange={(e) => setInput({ ...input, category: e.target.value })}
        >
          {Object.entries(categories).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <input
          className="border p-2 rounded flex-1"
          placeholder={`Add a ${categories[input.category]} skill`}
          value={input.value}
          onChange={(e) => setInput({ ...input, value: e.target.value })}
        />
        <button onClick={addSkill} className="border px-3 py-1 rounded bg-blue-400 text-white">
          Add
        </button>
      </div>

      {Object.entries(categories).map(([key, label]) => (
        <div key={key}>
          <h3 className="font-semibold mt-3">{label}</h3>
          <ul className="ml-4">
            {(formData.skills?.[key] || []).map((s, i) => (
              <li key={i} className="mt-1">
                {s}{" "}
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => removeSkill(key, i)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="border px-3 py-2 bg-blue-400 text-white rounded">
          Back
        </button>
        <button onClick={handleAISuggest} className="bg-fuchsia-400 px-3 py-2 text-white rounded">
          ✨ AI Suggest
        </button>
        <button onClick={nextStep} className="border px-3 py-2 bg-blue-400 text-white rounded">
          Next
        </button>
      </div>

      {(loading || aiText) && (
        <AIBox
          text={aiText}
          loading={loading}
          onAccept={handleAccept}
          onDiscard={() => setAiText("")}
        />
      )}
    </div>
  );
}
