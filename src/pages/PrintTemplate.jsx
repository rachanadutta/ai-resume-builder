import React from "react";
import { useLocation } from "react-router-dom";
import Template1 from "../components/Template1";
import Template2 from "../components/Template2";
import Template3 from "../components/Template3";

function PrintTemplate() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const template = query.get("template") || "template1";
  const data = query.get("data")
    ? JSON.parse(decodeURIComponent(query.get("data")))
    : {};

  return (
    <div style={{ background: "white", margin: 0, padding: 0 }}>
      {template === "template1" && <Template1 data={data} />}
      {template === "template2" && <Template2 data={data} />}
      {template === "template3" && <Template3 data= {data}/>}
    </div>
  );
}

export default PrintTemplate;
