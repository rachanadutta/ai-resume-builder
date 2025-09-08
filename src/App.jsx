import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Resume from "./pages/Resume.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Templates from "./pages/Templates.jsx"
import PreviewPage from "./pages/Preview.jsx";
import PrintTemplate from "./pages/PrintTemplate.jsx";

function App() {
  return ( 
    <div >
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Templates" element={<Templates />} />
         <Route path="/Resume/:id" element={<Resume />}/>
         <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/preview" element={<PreviewPage/>} />
         <Route path="/print-template" element={<PrintTemplate />}/>
       </Routes>
      
      
    </div>
    
    
  );
}

export default App;
