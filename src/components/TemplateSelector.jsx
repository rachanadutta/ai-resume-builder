import React from "react";
import template1 from "../assets/images/template1.png";
import template2 from "../assets/images/template2.png";
import template3 from "../assets/images/template3.png";

function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  const templates = [
    { id: "template1", img: template1 },
    { id: "template2", img: template2 },
    { id: "template3", img: template3 },
  ];

  return (
    <div className="flex gap-4 mt-6">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => setSelectedTemplate(template.id)}
          className={`p-2 border rounded-lg cursor-pointer ${
            selectedTemplate === template.id ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <img src={template.img} alt={template.id} className="md:w-48 w-24 h-auto" />
        </div>
      ))}
    </div>
  );
}

export default TemplateSelector;
