// src/components/templates/TemplateProfessional.jsx
import { useEffect, useRef, useState } from "react";
function Template2({ data }) {

  const containerRef = useRef();
    const [scaleFactor, setScaleFactor] = useState(1);
  
    useEffect(() => {
      const adjustScale = () => {
        if (!containerRef.current) return;
  
        const maxHeightPx = 1122; // approx 297mm
        const currentHeight = containerRef.current.scrollHeight;
  
        if (currentHeight > maxHeightPx) {
          const factor = Math.max(0.7, maxHeightPx / currentHeight);
          setScaleFactor(factor);
        } else {
          setScaleFactor(1);
        }
      };
      
  
      adjustScale();
      window.addEventListener("resize", adjustScale);
      return () => window.removeEventListener("resize", adjustScale);
    }, [data]);

    const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d) ? date : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  return (
    <div
      ref={containerRef}
      className="mx-auto bg-white shadow-md flex rounded-md"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: `${24 * scaleFactor}px`,
        fontSize: `${1 * scaleFactor}rem`,
        lineHeight: 1.4,
      }}
    >
      
      {/* Left Sidebar */}
      <aside className="w-1/3 h-[297mm] bg-gray-100 p-4 space-y-6">
        {/* Name & Title */}
        <div className="text-center border-b pb-3">
          <h1 className="text-xl font-bold">{data?.name || "Your Name"}</h1>
          <h2 className="text-sm text-gray-600">{data?.title || "Your Title"}</h2>
        </div>

        {/* Contact Info */}
        <section className="text-sm space-y-1 space-x-2">
          {data?.email && <p>{data.email}</p>}
          {data?.phone && <p>{data.phone}</p>}
          {data?.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
          {data?.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>}
          {data?.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a>}
        </section>

        {/* Skills */}
        {data?.skills?.length > 0 && (
          <section>
            <h3 className="text-md font-bold border-b pb-1 mb-2">Skills</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

         {/* Education */}
        {data?.education?.length > 0 && (
          <section>
            <h3 className="text-md font-bold border-b pb-1 mb-2">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-gray-600 text-sm">{edu.institution} </p>
                <p className="text-gray-500 text-sm">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</p>
              </div>
            ))}
          </section>
        )}

        {/* languages */}
        {data?.languages?.length > 0 && (
          <section>
            <h3 className="text-md font-bold border-b pb-1 mb-2">Languages</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.languages.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
        {/* Skills */}
        {data?.others?.length > 0 && (
          <section>
            <h3 className="text-md font-bold border-b pb-1 mb-2">Others</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.others.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        
      </aside>

      {/* Right Content */}
      <main className="w-2/3 p-6 space-y-6">
        {/* Summary */}
        {data?.summary && (
          <section>
            <h3 className="text-lg font-bold border-b pb-1 mb-2">Summary</h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data?.experience?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b pb-1 mb-2">Work Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold">{exp.title}</p>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(exp.start)} {exp.end ? ` - ${formatDate(exp.end)}` : "-Present"}
                </p>
                 <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

       

        {/* Projects */}
        {data?.projects?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b pb-1 mb-2">Projects</h3>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold">{proj.title}</p>
                {proj?.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View Project
                  </a>
                )}
                <p className="text-gray-600 text-sm">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {data?.certificates?.length > 0 && (
     <section className="space-y-2 mt-2 md:mt-4">
  <h2 className="text-xl font-bold border-b pb-1">Certificates</h2>
    {data.certificates.map((cert, i) => (
      <div key={i} className="mb-3">
        <p className="font-semibold">{cert.title}</p>
        <p className="text-gray-600">{cert.issuer}</p>

        {cert?.link && (
            <a href={cert.link} target="_blank" rel="noopener noreferrer">
                View Certificate
            </a>
        )}
      </div>
    ))}
    </section>
  )}
      </main>
    </div>
  );
}

export default Template2;
