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

    const [isReady, setIsReady] = useState(false);

     useEffect(() => {
    console.log("TEMPLATE LOADED"); // 👈 Puppeteer should log this
    const timer = setTimeout(() => {
      console.log("PAGE READY FOR PDF"); // 👈 confirms React is settled
      setIsReady(true);
    }, 2000); // Wait 2s to allow all content to render
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ background: "white", margin: 0, padding: 0 }}>
      {template === "template1" && <Template1 data={data} />}
      {template === "template2" && <Template2 data={data} />}
      {template === "template3" && <Template3 data= {data}/>}

      {isReady && <div id="resume-ready" style={{ display: "none" }}></div>}

    </div>
  );
}

export default PrintTemplate;
