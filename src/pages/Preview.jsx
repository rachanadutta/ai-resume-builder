import { useLocation } from "react-router-dom";
import Preview from "../components/Preview";

export default function PreviewPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const template = queryParams.get("template");
  const data = queryParams.get("data");

  let formData = {};
  try {
    formData = data ? JSON.parse(decodeURIComponent(data)) : {};
  } catch (e) {
    console.error("Invalid data format", e);
  }

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto p-8 shadow-md">
      <Preview formData={formData} selectedTemplate={template} />
    </div>
  );
}
