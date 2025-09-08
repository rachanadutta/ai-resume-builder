
import React, { useState } from "react";
import AIBox from "../AIBox";
import axios from "axios";



export default function Summary({ formData, setFormData, nextStep, prevStep }) {
const BASE_URL = "https://ai-resume-backend-11s4.onrender.com";
    const [showAI, setShowAI]= useState(false);
    const [loading, setLoading] = useState(false);
    const [aiText, setAiText] = useState("");

    const handleAISuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/ai/suggest`, {
        type: "summary",
        data: {
          skills: formData.skills,
          experience: formData.experience,
          projects: formData.projects,
        },
      });
      setAiText(res.data.aiText);
      setShowAI(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

    const handleAccept= ()=>{
        setFormData({...formData, summary:aiText});
        setShowAI(false);
    }
    const handleDiscard= ()=>{
        setShowAI(false);
        setLoading(false);
        setAiText("");
    }

    return(
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold mb-4'>Summary</h2>

            <label className='text-lg font-semibold' htmlFor="summary"></label>
            <textarea className="border p-2 border-black"
            name="summary"
            value={formData.summary}
            onChange={(e)=> setFormData({...formData, summary:e.target.value})}
            placeholder="Write a brief summary about yourself"
            rows="5"
            cols="50"
            ></textarea>
            <div className="flex justify-between mt-6">

            <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 hover:bg-blue-700 cursor-pointer text-white' type="button" onClick={prevStep}>Back</button>
             <button onClick={handleAISuggest} className=" mr-5 rounded-lg cursor-pointer bg-fuchsia-400 px-3 py-2 text-white ">✨ AI Suggestions</button>
             
            <button className='border-2 px-3 py-2 rounded-lg bg-blue-400  text-white hover:bg-blue-700 cursor-pointer' type="button" onClick={nextStep}>Next</button>
            </div>
            {(loading || aiText) && (<AIBox text={aiText} loading={loading} onAccept={handleAccept} onDiscard={handleDiscard}/>)}
        </div>
    )
}