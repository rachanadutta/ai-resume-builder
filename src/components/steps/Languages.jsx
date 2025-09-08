import React, { useState } from "react";

export default function Languages({ formData, setFormData, nextStep, prevStep }) {
    const [langInput, setLangInput] = useState("");

    const addLanguage = () => {
        if (langInput.trim() === "") return;

        setFormData({
            ...formData,
            languages: [...(formData.languages || []), langInput.trim()]
        });
        setLangInput("");
    };

    const removeLanguage = (index) => {
        const newLangs = formData.languages.filter((_, i) => i !== index);
        setFormData({ ...formData, languages: newLangs });
    };

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold mb-4'>Languages</h2>

            <input
            className='border p-2 rounded '
                type="text"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                placeholder="Add a language"
            />
            <div>
            <button className="mt-4 px-3 py-2 border-2 cursor-pointer bg-amber-200 rounded-lg hover:bg-yellow-200"  type="button" onClick={addLanguage}>Add</button>
            </div>

            <ul>
                {formData.languages && formData.languages.map((lang, index) => (
                    <li className="text-lg mt-3" key={index}>
                        {lang} <button className="hover:text-red-600 text-lg cursor-pointer text-red-500 ml-5" type="button" onClick={() => removeLanguage(index)}>x</button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between mt-6">
                <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 text-white cursor-pointer hover:bg-blue-700' type="button" onClick={prevStep}>Back</button>
                <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 text-white cursor-pointer hover:bg-blue-700' type="button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}
