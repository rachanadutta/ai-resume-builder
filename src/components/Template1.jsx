import { useEffect, useRef, useState } from "react";

function Template1({ data }) {
  const containerRef = useRef();
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const adjustScale = () => {
      if (!containerRef.current) return;
      const maxHeightPx = 1122;
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
    return isNaN(d)
      ? date
      : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div
      ref={containerRef}
      className="p-16 m-6 mx-auto max-w-4xl bg-white shadow-md rounded-md"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontSize: `${0.85 * scaleFactor}rem`,
        lineHeight: 1.4,
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h1
          className="font-bold text-gray-900"
          style={{ fontSize: `${1 * scaleFactor}rem` }}
        >
          {data?.name || "Your Name"}
        </h1>
        <h2
          className="text-gray-800"
          style={{ fontSize: `${0.7 * scaleFactor}rem` }}
        >
          {data?.title}
        </h2>
        <section
          className="flex flex-wrap gap-3 text-gray-600 text-xs mt-1"
          style={{ gap: `${10 * scaleFactor}px` }}
        >
          {data?.email && <p>{data.email}</p>}
          {data?.phone && <p>{data.phone}</p>}
          {data?.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {data?.github && (
            <a href={data.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {data?.portfolio && (
            <a href={data.portfolio} target="_blank" rel="noreferrer">
              Portfolio
            </a>
          )}
        </section>
      </div>

      {/* Summary */}
      {data?.summary && (
        <section className="mb-3">
          <h2 className="font-bold border-b pb-1 text-sm">Summary</h2>
          <ul className="list-disc list-inside text-gray-700 mt-1">
            <li>{data.summary}</li>
          </ul>
        </section>
      )}

      {/* Education */}
      <section className="mb-3">
        <h2 className="font-bold border-b pb-1 text-sm">Education</h2>
        {data?.education?.length > 0 ? (
          data.education.map((edu, i) => (
            <ul key={i} className=" mt-1">
              <li className="font-semibold">
                {edu.degree} - {edu.institution}
              </li>
              <li className="text-gray-500 text-xs">
                {formatDate(edu.startDate)} -{" "}
                {edu.endDate ? formatDate(edu.endDate) : "Present"}
              </li>
              {edu.description && (
                <li className="text-gray-700 text-sm">{edu.description}</li>
              )}
            </ul>
          ))
        ) : (
          <p className="text-gray-400 italic">No education added yet</p>
        )}
      </section>

      {/* Experience */}
      {/* Experience */}
{data?.experience?.length > 0 && (
  <section className="mb-3">
    <h2 className="font-bold border-b pb-1 text-sm">Experience</h2>
    {data.experience.map((exp, i) => (
      <div key={i} className="mt-2">
        {/* Title + Company + Date in same line */}
        <div className="flex justify-between items-center">
          <p className="font-semibold">
            {exp.title} - {exp.company}
          </p>
          <p className="text-gray-500 text-xs">
            {formatDate(exp.start)}{" "}
            {exp.end ? `- ${formatDate(exp.end)}` : "- Present"}
          </p>
        </div>

        {/* Description as bullet points */}
        {exp.description && (
          <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
            {exp.description.split("\n").map((point, idx) => (
              <li key={idx}>{point.trim()}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </section>
)}


      {/* Skills */}
      {data?.skills && (
        <section className="mb-3">
          <h2 className="font-bold border-b pb-1 text-sm">Skills</h2>

          {/* Technical Skills */}
          <div className="mt-1">
            <p className="font-semibold text-sm">Technical Skills</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong>Web Technologies:</strong>{" "}
                {data.skills.webTechnologies?.join(", ") || "N/A"}
              </li>
              <li>
                <strong>Databases:</strong>{" "}
                {data.skills.databases?.join(", ") || "N/A"}
              </li>
              <li>
                <strong>Tools & Frameworks:</strong>{" "}
                {data.skills.tools?.join(", ") || "N/A"}
              </li>
            </ul>
          </div>

          {/* Soft Skills */}
          {data.skills.soft?.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold text-sm">Soft Skills</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {data.skills.soft.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold border-b pb-1 text-sm">Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mt-1">
              <div className="flex justify-between">
                <p className="font-semibold">
                  {proj.title} ({formatDate(proj.date)})
                </p>
                {proj?.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-xs hover:underline"
                  >
                    Link
                  </a>
                )}
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                {proj.description
                  ?.split("\n")
                  .map((line, idx) => (
                    <li key={idx}>{line.trim()}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certificates */}
      {/* Certificates */}
{data?.certificates?.length > 0 && (
  <section className="mb-3">
    <h2 className="font-bold border-b pb-1 text-sm">Certificates</h2>
    <ul className="text-sm text-gray-700 mt-2 space-y-1">
      {data.certificates.map((cert, i) => (
        <li key={i} className="flex justify-between items-center">
          <div>
            <span className="font-semibold">{cert.title}</span> — {cert.issuer}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            {cert.date && <span>{formatDate(cert.date)}</span>}
            {cert?.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  </section>
)}


      {/* Other */}
      {data?.other?.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold border-b pb-1 text-sm">Others</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
            {data.other.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {data?.languages?.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold border-b pb-1 text-sm">Languages</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
            {data.languages.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Template1;
