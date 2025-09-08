import Hero from "../components/Hero";
import template1 from "../assets/images/template1.png"
import template2 from "../assets/images/template2.png"
import template3 from "../assets/images/template3.png"
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";



function Home(){

  
    return(
    <div className="relative bg-gradient-to-r from-[#0f172a]  to-[#334155]">
      

      <Navbar />
      

            
            <Hero />
            
          
            
            
            
        
        <section className="flex p-8 lg:flex-row flex-col justify-center bg-gradient-to-r from-[#0f172a]  to-[#334155] items-center gap-20 ">
        
        <Card  
           
            title="Minimalistic"
            img={template1}
            size="big"
                 
        />
        
        <Card  
           
            title="Professtional 1"
            img={template2}
            size="big"
                
        />
        <Card  
           
            title="Professional 2"
            img={template3}
            size="big"
                  
        />

        
      </section>

      <footer>
      <p className="text-center text-gray-400 p-4">© 2025 AI Resume Builder.. Made with love <i className="text-white" ></i>by Rachana</p>
      </footer>
    </div>

    );
}
export default Home;