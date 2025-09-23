import { useEffect, useRef, useState } from "react";

function Template1({ data }) {
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
      className="mx-auto bg-white shadow-md rounded-md"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: `${24 * scaleFactor}px`,
        fontSize: `${1 * scaleFactor}rem`,
        lineHeight: 1.4,
      }}
    >
      {/* Header */}
      <div className="mb-4" style={{ marginBottom: `${16 * scaleFactor}px` }}>
        <h1 className="font-bold" style={{ fontSize: `${2.25 * scaleFactor}rem` }}>
          {data?.name || "Your Name"}
        </h1>
        <h2 className="text-gray-800" style={{ fontSize: `${1.125 * scaleFactor}rem` }}>
          {data?.title}
        </h2>
        <section className="flex flex-wrap gap-15 text-sm text-gray-500" style={{ gap: `${15 * scaleFactor}px` }}>
          {data?.email && <p className="hover:text-blue-500">{data.email}</p>}
          {data?.phone && <p className="hover:text-blue-500">{data.phone}</p>}
          {data?.linkedin && <a className="hover:text-blue-500" href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {data?.github && <a className="hover:text-blue-500" href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {data?.portfolio && <a className="hover:text-blue-500" href={data.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </section>
      </div>

      {/* Summary */}
      {data?.summary && (
        <section className="mb-4" style={{ marginBottom: `${12 * scaleFactor}px` }}>
          <h2 className="font-bold border-b pb-1">Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Education */}
      <section className="mb-4" style={{ marginBottom: `${12 * scaleFactor}px` }}>
        <h2 className="font-bold border-b pb-1">Education</h2>
        {data?.education?.length > 0 ? (
          data.education.map((edu, i) => (
            <div key={i} className="p-2 flex gap-15" style={{ padding: `${8 * scaleFactor}px 0` }}>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500 text-sm">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No education added yet</p>
        )}
      </section>

      {/* Work Experience */}
      {data?.experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold border-b pb-1">Work Experience</h2>
          <div className="grid grid-cols-2">
            {data.experience.map((exp, i) => (
              <div key={i} className="p-2">
                <p className="font-semibold">{exp.title}</p>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(exp.start)} {exp.end ? ` - ${formatDate(exp.end)}` : "-Present"}
                </p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data?.skills?.length > 0 && (
        <section className="mb-4" style={{ marginBottom: `${12 * scaleFactor}px` }}>
          <h2 className="font-bold border-b pb-1">Skills</h2>
          <div className="grid grid-rows-2 gap-2 mt-2" style={{ gridAutoFlow: "column" }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{ padding: `${2 * scaleFactor}px ${4 * scaleFactor}px` }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <section className="mb-4" style={{ marginBottom: `${12 * scaleFactor}px` }}>
          <h2 className="font-bold border-b pb-1">Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="p-2" style={{ padding: `${8 * scaleFactor}px 0` }}>
              <div className="flex justify-between gap-4">
                <p className="font-semibold">{proj.title}</p>
                {proj?.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:underline-offset-2">Link</a>}
              </div>
              <p className="text-gray-600">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certificates */}
      {data?.certificates?.length > 0 && (
        <section className="mb-4" style={{ marginBottom: `${12 * scaleFactor}px` }}>
          <h2 className="font-bold border-b pb-1">Certificates</h2>
          <div className="grid grid-cols-2">
            {data.certificates.map((cert, i) => (
              <div key={i} className="p-2" style={{ padding: `${8 * scaleFactor}px 0` }}>
                <p className="font-semibold">{cert.title}</p>
                <p className="text-gray-600">{cert.issuer}</p>
                {cert?.link && <a href={cert.link} target="_blank" rel="noopener noreferrer">View Certificate</a>}
              </div>
            ))}
          </div>
        </section>
      )}
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
    </div>
  );
}

export default Template1;
