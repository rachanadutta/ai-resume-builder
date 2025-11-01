
import { useEffect, useRef, useState } from "react";

function Template3({ data }) {

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
      
      

      {/* Main content */}
      <main className="p-6 space-y-6 col-span-1">
        {data?.summary && (
          <section>
            <h3 className="text-lg font-bold border-b pb-1 mb-2">Summary</h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}


        {data?.experience?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold border-b pb-1">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{exp.title}</p>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(exp.start)} {exp.end ? ` - ${formatDate(exp.end)}` : "-Present"}
                </p>
              </div>
            ))}
          </section>
        )}

        

        {data?.projects?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold border-b pb-1">Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mt-2">
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
                <p className="text-gray-600">{proj.description}</p>
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
        {cert.date && (
          <p className="text-gray-500 text-sm">
            {new Date(cert.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
        )}

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

      {/* Sidebar */}
      <aside className="bg-white space-x-10 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{data?.name || "Your Name"}</h1>
          <p className="text-gray-600">{data?.title}</p>
        </div>

        <div className="text-sm space-x-2 space-y-2">
          {data?.email && <p>{data.email}</p>}
          {data?.phone && <p>{data.phone}</p>}
          {data?.linkedin && <a href={data.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>}
          {data?.github && <a href={data.github} className="text-blue-600 hover:underline">GitHub</a>}
          {data?.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a>}
        </div>

        {data?.skills?.length > 0 && (
          <div>
            <h2 className="font-bold">Skills</h2>
            <ul className="list-disc list-inside text-lg">
              {data.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}
        {/* Education */}
        {data?.education?.length > 0 && (
          <section>
            <h3 className="text-md font-bold pb-1 mb-2">Education</h3>
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
              {data.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Others */}
        {data?.others?.length > 0 && (
          <section>
            <h3 className="text-md font-bold border-b pb-1 mb-2">Others</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.others.map((other, i) => (
                <li key={i}>{other}</li>
              ))}
            </ul>
          </section>
        )}

        
      </aside>
    </div>
  )
}

export default Template3;
