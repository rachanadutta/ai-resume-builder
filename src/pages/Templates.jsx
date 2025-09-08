import Card from "../components/Card";
import { Link } from "react-router-dom";
import template1 from "../assets/images/template1.png"
import template2 from"../assets/images/template2.png";
import template3 from"../assets/images/template3.png";
import Navbar from "../components/Navbar.jsx";
function Templates(){
    return (
        <div className="bg-gradient-to-r from-[#0f172a]  to-[#334155] min-h-screen">
            <Navbar />
            <h1 className="text-3xl font-semibold mb-10 text-center pt-4 text-white ">Templates</h1>
            <section className="flex md:flex-row flex-col items-center justify-center gap-20 ">

                <Link to="/Resume/1">
        <Card  
           
            title="Minimalistic"
            img={template1}
            size="big"
                 
        />
        </Link>
        <Link to="/Resume/2">
        <Card  
           
            title="Professtional 1"
            img={template2}
            size="big"
                
        />
        </Link>
        <Link to="/Resume/3">
        <Card  
           
            title="Professional 2"
            img={template3}
            size="big"
                  
        />
        </Link>
      </section>
        </div>
    )
}
export default Templates;