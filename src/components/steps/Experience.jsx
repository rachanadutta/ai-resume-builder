import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AIBox from "../AIBox";
import axios from "axios";

export default function Experience({ formData, setFormData, nextStep, prevStep }) {
  const [expInput, setExpInput] = useState({
    title: "",
    company: "",
    start: null,
    end: null,
    description: ""
  });

  const [showAI, setShowAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState("");

  const handleAISuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/suggest", {
        type: "experience",
        data: expInput,
      });
      setAiText(res.data.aiText);
      setShowAI(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    setExpInput({ ...expInput, description: aiText });
    setShowAI(false);
  };

  const handleDiscard = () => {
    setShowAI(false);
    setAiText("");
    setLoading(false);
  };

  const addExperience = () => {
    if (expInput.title.trim() === "" && expInput.company.trim() === "") return;

    setFormData({
      ...formData,
      experience: [...(formData.experience || []), expInput]
    });

    setExpInput({ title: "", company: "", start: null, end: null, description: "" });
  };

  const removeExperience = (index) => {
    const newExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExperience });
  };

  // Safe date formatting
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d) ? date : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>

      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Job Title"
        value={expInput.title}
        onChange={(e) => setExpInput({ ...expInput, title: e.target.value })}
      />

      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Company Name"
        value={expInput.company}
        onChange={(e) => setExpInput({ ...expInput, company: e.target.value })}
      />

      <DatePicker
        className="border p-2 rounded"
        selected={expInput.start ? new Date(expInput.start) : null}
        onChange={(date) => setExpInput({ ...expInput, start: date })}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="Start Month & Year"
      />

      <DatePicker
        className="border p-2 rounded"
        selected={expInput.end ? new Date(expInput.end) : null}
        onChange={(date) => setExpInput({ ...expInput, end: date })}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="End Month & Year"
      />

      <textarea
        className="border p-2 rounded"
        placeholder="Describe your role and achievements"
        rows={4}
        value={expInput.description}
        onChange={(e) => setExpInput({ ...expInput, description: e.target.value })}
      />

      <div className="flex gap-3 mt-4">
        <button
          className="px-3 py-2 cursor-pointer bg-amber-200 rounded-lg hover:bg-yellow-200"
          type="button"
          onClick={addExperience}
        >
          Add Experience
        </button>

        <button
          className="px-3 py-2 bg-fuchsia-400 text-white rounded-lg hover:bg-fuchsia-500 cursor-pointer"
          type="button"
          onClick={handleAISuggest}
        >
          ✨ Improve with AI
        </button>
      </div>

      <ul>
        {formData.experience?.map((exp, index) => (
          <li className="text-lg mt-3" key={index}>
            <strong>{exp.title}</strong> at {exp.company} (
            {formatDate(exp.start)}{exp.end ? ` - ${formatDate(exp.end)}` : ""})
            <p>{exp.description}</p>
            <button
              className="hover:text-red-600 text-lg cursor-pointer text-red-500"
              type="button"
              onClick={() => removeExperience(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          className="px-3 cursor-pointer py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-700"
          type="button"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="px-3 py-2 cursor-pointer rounded-lg bg-blue-400 text-white hover:bg-blue-700"
          type="button"
          onClick={nextStep}
        >
          Next
        </button>
      </div>

      {(loading || aiText) && (
        <AIBox text={aiText} loading={loading} onAccept={handleAccept} onDiscard={handleDiscard} />
      )}
    </div>
  );
}
