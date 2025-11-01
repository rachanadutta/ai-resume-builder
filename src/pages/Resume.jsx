import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PersonalInfo from "../components/steps/PersonalInfo";
import Summary from "../components/steps/Summary";
import Experience from "../components/steps/Experience";
import Skills from "../components/steps/Skills";
import Projects from "../components/steps/Projects";
import Education from "../components/steps/Education";
import Certificate from "../components/steps/Certificate";
import Languages from "../components/steps/Languages";
import Others from "../components/steps/Others";
import Progress from "../components/Progress";
import Preview from "../components/Preview";
import TemplateSelector from "../components/TemplateSelector";
import Navbar from "../components/Navbar.jsx";

function Resume() {
  const BASE_URL = "https://ai-resume-backend-11s4.onrender.com";

  const token = localStorage.getItem("token");
  if (!token) return <div className="p-8 text-center">Please log in to create Resume</div>;

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    leetcode: "",
    summary: "",

    skills: [],
    experience: [],
    education: [],
    other: [],
    languages : [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [optionalStep, setOptionalStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [step, setStep] = useState(1);

  const saveTimeout = useRef(null);

  // === v START: MODIFIED DOWNLOAD HANDLER v ===
  
  // This function fixes the "URI malformed" error by using localStorage
  // instead of a long URL query parameter.
  // In src/pages/Resume.jsx
// THIS IS THE CODE YOU ALREADY HAVE. IT IS CORRECT.

const handleDownload = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/resume/download`,
      { formData, template: selectedTemplate },
      { responseType: "blob", headers: { Authorization: `Bearer ${token}` } }
    );

    // Check if the response is a blob, and not a JSON error
    const contentType = res.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      // ... your error handling ...
      return; 
    }

    // If it's a PDF, proceed to download
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error downloading resume:", err.response?.data || err.message);
    alert("Failed to download resume. Please try again.");
  }
};
  
  // === ^ END: MODIFIED DOWNLOAD HANDLER ^ ===


  // Load resume from backend on mount
  useEffect(() => {
    const loadResume = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/resume/load`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.resume) {
          setFormData(res.data.resume.formData);
          console.log("Resume loaded!");
        }
      } catch (err) {
        console.error("No saved resume found:", err.response?.data || err.message);
      }
    };
    loadResume();
  }, [token]);

  // Auto-save with debounce
  useEffect(() => {
    if (!token) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      try {
        await axios.post(
          `${BASE_URL}/resume/save`,
          { formData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Progress saved!");
      } catch (err) {
        console.error("Error saving progress:", err.response?.data || err.message);
      }
    }, 1000); // save 1s after last change

    return () => clearTimeout(saveTimeout.current);
  }, [formData, token]);


  const nextStep = () => {
    if (!completedSteps.includes(step)) setCompletedSteps([...completedSteps, step]);
    setStep(prev => Math.min(prev + 1, 6)); // step never exceeds 6
  };


  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="flex lg:flex-row flex-col min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] overflow-x-hidden">
        
        <aside className="lg:w-24 w-full bg-gray-700/70 rounded-r-lg p-4 shadow-md">
          <Progress step={step} setStep={setStep} completedSteps={completedSteps} />
        </aside>

        <main className="flex flex-col lg:flex-row flex-1 p-8">
          <div className="max-w-3xl md:w-[700px] bg-white shadow-lg rounded-2xl p-6">
            {step === 1 && <PersonalInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />}
            
            {step === 2 && <Experience formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <Skills formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <Projects formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 5 && <Education formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 6 && <Summary formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}

            {/* Optional sections */}
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Optional Sections</h2>
              <div className="flex gap-3 cursor-pointer">
                <button onClick={() => setOptionalStep("certificates")} className="px-4 cursor-pointer py-2 rounded-xl border hover:bg-blue-50 text-gray-600">Certificates</button>
                <button onClick={() => setOptionalStep("languages")} className="px-4 py-2 rounded-xl border cursor-pointer hover:bg-blue-50 text-gray-600">Languages</button>
                <button onClick={() => setOptionalStep("other")} className="px-4 py-2 rounded-xl cursor-pointer border hover:bg-blue-50 text-gray-600">Other</button>
              </div>
            </div>
            <div className="mt-6 cursor-pointer">
              {optionalStep === "certificates" && <Certificate formData={formData} setFormData={setFormData} nextStep={() => setOptionalStep(null)} prevStep={() => setOptionalStep(null)} />}
              {optionalStep === "languages" && <Languages formData={formData} setFormData={setFormData} nextStep={() => setOptionalStep(null)} prevStep={() => setOptionalStep(null)} />}
              {optionalStep === "other" && <Others formData={formData} setFormData={setFormData} nextStep={() => setOptionalStep(null)} prevStep={() => setOptionalStep(null)} />}
            </div>
          </div>
        </main>

        <aside className="preview-container w-full mt-8 ml-4 md:mr-8">
          <Preview formData={formData} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
          <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />

          <button onClick={handleDownload}  className="bg-blue-500 mt-10 rounded-xl cursor-pointer hover:bg-blue-600 text-xl text-white px-3 py-2 border">Download</button>
        </aside>
      </div>
    </div>
  );
}

export default Resume;