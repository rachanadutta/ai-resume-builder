import React from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";


function Preview({formData, selectedTemplate}){
    if(selectedTemplate==="template1"){
        return <Template1 data={formData}/>;
    }
    if(selectedTemplate==="template2"){
        return <Template2 data={formData}/>;
    }
    return <Template3 data={formData}/>;
}

export default Preview;
