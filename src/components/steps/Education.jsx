import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Education({ formData, setFormData, nextStep, prevStep }) {
  const [eduInput, setEduInput] = useState({
    degree: "",
    institution: "",
    startDate: null,
    endDate: null,
    description: ""
  });

  const addEducation = () => {
    if (eduInput.degree.trim() === "" && eduInput.institution.trim() === "") return;

    setFormData({
      ...formData,
      education: [...(formData.education || []), eduInput]
    });

    setEduInput({
      degree: "",
      institution: "",
      startDate: null,
      endDate: null,
      description: ""
    });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  // Safe date formatting
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d) ? date : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold mb-4'>Education</h2>

      <input
        className='border p-2 rounded'
        type="text"
        placeholder="Degree or Certification"
        value={eduInput.degree}
        onChange={(e) => setEduInput({ ...eduInput, degree: e.target.value })}
      />

      <input
        className='border p-2 rounded'
        type="text"
        placeholder="Institution Name"
        value={eduInput.institution}
        onChange={(e) => setEduInput({ ...eduInput, institution: e.target.value })}
      />

      <DatePicker
        className='border p-2 rounded'
        selected={eduInput.startDate ? new Date(eduInput.startDate) : null}
        onChange={(date) => setEduInput({ ...eduInput, startDate: date })}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="Start Month & Year"
      />

      <DatePicker
        className='border p-2 rounded'
        selected={eduInput.endDate ? new Date(eduInput.endDate) : null}
        onChange={(date) => setEduInput({ ...eduInput, endDate: date })}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="End Month & Year"
      />

      <textarea
        className='border p-2 rounded'
        placeholder="Description (optional)"
        rows="4"
        value={eduInput.description}
        onChange={(e) => setEduInput({ ...eduInput, description: e.target.value })}
      />

      <button
        className="mt-4 px-3 py-2 bg-amber-200 rounded-lg cursor-pointer hover:bg-yellow-200"
        type="button"
        onClick={addEducation}
      >
        Add Education
      </button>

      <ul>
        {formData.education?.map((edu, index) => (
          <li className="text-lg mt-3" key={index}>
            <strong>{edu.degree}</strong> at {edu.institution} (
            {formatDate(edu.startDate)} - {formatDate(edu.endDate)})
            <button
              className="hover:text-red-600 text-lg cursor-pointer text-red-500 ml-5"
              type="button"
              onClick={() => removeEducation(index)}
            >
              x
            </button>
            <p>{edu.description}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          className='border-2 px-3 py-2 rounded-lg bg-blue-400 cursor-pointer text-white hover:bg-blue-700'
          type="button"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className='border-2 px-3 py-2 rounded-lg bg-blue-400 cursor-pointer text-white hover:bg-blue-700'
          type="button"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
