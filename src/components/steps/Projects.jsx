import React, { useState } from "react";
import AIBox from "../AIBox";
import axios from "axios";


export default function Projects({ formData, setFormData, nextStep, prevStep }) {
  const [projectInput, setProjectInput] = useState({
    title: "",
    link: "",
    description: ""
  });
  const BASE_URL = "https://ai-resume-backend-11s4.onrender.com";

  const [showAI, setShowAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState("");

  const handleAISuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/ai/suggest`, {
        type: "project",
        data: projectInput,
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
    setProjectInput({ ...projectInput, description: aiText });
    setShowAI(false);
    setLoading(false);
    setAiText("");
  };

  const handleDiscard = () => {
    setShowAI(false);
    setAiText("");
    setLoading(false);
  };

  const addProject = () => {
    if (!projectInput.title.trim()) return;

    setFormData({
      ...formData,
      projects: [...(formData.projects || []), projectInput]
    });

    setProjectInput({ title: "", link: "", description: "" });
  };

  const removeProject = (index) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Projects</h2>

      <input
        className="border p-2 rounded caret-black"
        type="text"
        placeholder="Project Title"
        value={projectInput.title}
        onChange={(e) => setProjectInput({ ...projectInput, title: e.target.value })}
      />

      <input
        className="border caret-black p-2 rounded"
        type="url"
        placeholder="Project Link (optional)"
        value={projectInput.link}
        onChange={(e) => setProjectInput({ ...projectInput, link: e.target.value })}
      />

      <textarea
        className="border caret-black p-2 rounded"
        placeholder="Project Description"
        rows={4}
        value={projectInput.description}
        onChange={(e) => setProjectInput({ ...projectInput, description: e.target.value })}
      />

      <div className="flex gap-3 mt-4">
        <button
          className="px-3 py-2 bg-amber-200 rounded-lg cursor-pointer hover:bg-yellow-200"
          type="button"
          onClick={addProject}
        >
          Add Project
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
        {formData.projects?.map((project, index) => (
          <li className="text-lg mt-3" key={index}>
            <strong>{project.title}</strong>{" "}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                [Link]
              </a>
            )}
            <p>{project.description}</p>
            <button
              className="hover:text-red-600 text-lg cursor-pointer text-red-500"
              type="button"
              onClick={() => removeProject(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          className="px-3 py-2 rounded-lg bg-blue-400 cursor-pointer text-white hover:bg-blue-700"
          type="button"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-blue-400 cursor-pointer text-white hover:bg-blue-700"
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
