import React, { useState } from "react";

export default function Certificates({ formData, setFormData, nextStep, prevStep }) {
    const [certInput, setCertInput] = useState({
        title: "",
        issuer: "",
        date: null,
        link: ""
    });

    const addCertificate = () => {
        if (certInput.title.trim() === "" && certInput.issuer.trim() === "") return;

        setFormData({
            ...formData,
            certificates: [...(formData.certificates || []), certInput]
        });

        setCertInput({
            title: "",
            issuer: "",
            date: null,
            link: ""
        });
    };

    const removeCertificate = (index) => {
        const newCerts = formData.certificates.filter((_, i) => i !== index);
        setFormData({ ...formData, certificates: newCerts });
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl mb-4">Certificates</h2>

            <label htmlFor="title"></label>
            <input
            className='border p-2 rounded '
                type="text"
                name="title"
                value={certInput.title}
                onChange={(e) => setCertInput({ ...certInput, title: e.target.value })}
                placeholder="Certificate Title"
            />

            <label htmlFor="issuer"></label>
            <input
            className='border caret-black p-2 rounded '
                type="text"
                name="issuer"
                value={certInput.issuer}
                onChange={(e) => setCertInput({ ...certInput, issuer: e.target.value })}
                placeholder="Issuer"
            />

            <label htmlFor="date"></label>
            <input
            className='border caret-black p-2 rounded '
                type="month"
                name="date"
                value={certInput.date || ""}
                onChange={(e) => setCertInput({ ...certInput, date: e.target.value })}
                placeholder="Date"
            />

            <label htmlFor="link"></label>
            <input
            className='border caret-black p-2 rounded '
                type="url"
                name="link"
                value={certInput.link}
                onChange={(e) => setCertInput({ ...certInput, link: e.target.value })}
                placeholder="Certificate Link (optional)"
            />
<div>
            <button className="mt-4 px-3 py-2  bg-amber-200 rounded-lg" type="button" onClick={addCertificate}>Add Certificate</button>
            <button className=" ml-5 hover:bg-fuchsia-500 cursor-pointer rounded-lg bg-fuchsia-400 px-3 py-2 text-white ">AI Suggestions</button>
            </div>

            <ul>
                {formData.certificates && formData.certificates.map((cert, index) => (
                    <li className="text-lg mt-3 flex gap-4"  key={index}>
                        <strong>{cert.title}</strong> by {cert.issuer} ({cert.date})
                        {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer"> [Link]</a>}
                        <button className="hover:text-red-600 text-lg cursor-pointer text-red-500 ml-5"  type="button" onClick={() => removeCertificate(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between mt-6">
                <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-700'  type="button" onClick={prevStep}>Back</button>
                
                <button className='border-2 px-3 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-700'  type="button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}
