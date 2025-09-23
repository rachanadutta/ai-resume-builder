import { Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Resume from "./pages/Resume.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Templates from "./pages/Templates.jsx"
import PreviewPage from "./pages/Preview.jsx";
import PrintTemplate from "./pages/PrintTemplate.jsx";

function App() {
  const navigate = useNavigate(); // For v6
  // const history = useHistory(); // For v5

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    const redirectSearch = sessionStorage.getItem('redirectSearch');

    if (redirectPath) {
      // Clear the stored data so this doesn't run again on refresh
      sessionStorage.removeItem('redirect');
      sessionStorage.removeItem('redirectSearch');

      // Navigate to the intended route
      // For React Router v6
      navigate(redirectPath + (redirectSearch || ''), { replace: true });

      // For React Router v5
      // history.replace(redirectPath + (redirectSearch || ''));
    }
  }, [navigate]);
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
