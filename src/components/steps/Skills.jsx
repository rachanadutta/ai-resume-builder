import React, { useState } from "react";
import AIBox from "../AIBox";
import axios from "axios";


export default function Skills({ formData, setFormData, nextStep, prevStep }) {
  const BASE_URL = "https://ai-resume-backend-11s4.onrender.com";

  const [skillInput, setSkillInput] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState("");
  const handleAISuggest = async () => {
   
    setLoading(true);
    // setShowAI(true);
    setAiText("");

    try{
      const res = await axios.post(`${BASE_URL}/api/ai/suggest`, {type:"skills", data: {skills: formData.skills},});
      setAiText(res.data.aiText);
      setShowAI(true);
    }catch(err){
      console.error(err.response?.data || err.message);
    }finally{
      setLoading(false);
    }
  };
  const handleAccept = () => {
    setFormData({
      ...formData,
      skills: aiText.split(",").map((s) => s.trim()),
    });
    setShowAI(false);
    setLoading(false);
    setAiText("");
  };

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Skills</h2>

      <div>
        <input
        className='border p-2 rounded '
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill"
        />
        <button className="ml-4 border-2 px-2 py-1 rounded-lg hover:text-gray-600 cursor-pointer" type="button" onClick={addSkill}>Add</button>
      </div>

      <ul>
        {formData.skills && formData.skills.map((skill, index) => (
          <li className="text-lg ml-3 mt-3 " key={index}>
            {skill} <button className="hover:text-red-600 text-lg cursor-pointer ml-6"  type="button" onClick={() => removeSkill(index)}>x</button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-700 cursor-pointer'  type="button" onClick={prevStep}>Back</button>
         <button onClick={handleAISuggest} className="cursor-pointer mr-5 rounded-lg bg-fuchsia-400 px-3 py-2 text-white ">✨ AI Suggestions</button>
        <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 cursor-pointer text-white hover:bg-blue-700'  type="button" onClick={nextStep}>Next</button>
      </div>
      {(loading || aiText) && (
        <AIBox
          text={aiText}
          loading={loading}
          onAccept={handleAccept}
          onDiscard={() => {setLoading(false); setAiText("");}
          
          }
        />
      )}
    </div>
  );
}
