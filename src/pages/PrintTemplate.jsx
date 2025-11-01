import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom"; // No longer needed
import Template1 from "../components/Template1";
import Template2 from "../components/Template2";
import Template3 from "../components/Template3";

function PrintTemplate() {
  // 1. Get data from localStorage
  const [data, setData] = useState(null);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    // 2. Read the data on component mount
    const dataStr = localStorage.getItem('printResumeData');
    const templateName = localStorage.getItem('printResumeTemplate');

    if (dataStr && templateName) {
      try {
        setData(JSON.parse(dataStr));
        setTemplate(templateName);
      } catch (e) {
        console.error("Failed to parse resume data from localStorage:", e);
      }
    } else {
      console.error("No print data found in localStorage.");
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // 3. Trigger print once data is loaded and rendered
    if (data && template) {
      // Use a short timeout to ensure content is rendered before printing
      const timer = setTimeout(() => {
        try {
          console.log("Page loaded. Generating PDF...");
          window.print();
          console.log("PDF generated successfully.");
        } catch (e) {
          console.error("Error during window.print():", e);
        } finally {
          // 4. Clean up localStorage after triggering print
          // localStorage.removeItem('printResumeData');
          // localStorage.removeItem('printResumeTemplate');
          // Note: Cleanup might be better placed in an 'afterprint' event listener
          // For now, we'll leave it here.
        }
      }, 1000); // 1-second delay

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [data, template]); // This effect runs when data or template changes

  // Display a loading message or empty state until data is ready
  if (!data || !template) {
    return <div>Loading resume for printing...</div>;
  }
    
  // 5. Render the correct template
  return (
    <div style={{ background: "white", margin: 0, padding: 0 }}>
      {template === "template1" && <Template1 data={data} />}
      {template === "template2" && <Template2 data={data} />}
      {template === "template3" && <Template3 data={data}/>}
    </div>
  );
}

export default PrintTemplate;