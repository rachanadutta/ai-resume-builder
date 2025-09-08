import React, { useState } from "react";

export default function Other({ formData, setFormData, nextStep, prevStep }) {
    const [otherInput, setOtherInput] = useState("");

    const addOther = () => {
        if (otherInput.trim() === "") return;

        setFormData({
            ...formData,
            other: [...(formData.other || []), otherInput.trim()]
        });
        setOtherInput("");
    };

    const removeOther = (index) => {
        const newOther = formData.other.filter((_, i) => i !== index);
        setFormData({ ...formData, other: newOther });
    };

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold mb-4'>Other</h2>

            <input
            className='border p-2 rounded '
                type="text"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
                placeholder="Add an item"
            />
            <div>
            <button className="mt-4 px-3 py-2  cursor-pointer bg-amber-200 rounded-lg hover:bg-yellow-200"  type="button" onClick={addOther}>Add</button>
            <button className=" ml-5 hover:bg-fuchsia-500 cursor-pointer rounded-lg bg-fuchsia-400 px-3 py-2 text-white ">AI Suggestions</button>
            </div>

            <ul>
                {formData.other && formData.other.map((item, index) => (
                    <li className="text-lg mt-3"  key={index}>
                        {item} <button className="hover:text-red-600 text-lg cursor-pointer text-red-500 ml-5" type="button" onClick={() => removeOther(index)}>x</button>
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
