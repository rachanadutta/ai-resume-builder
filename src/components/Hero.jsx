import resume1 from "../assets/images/resume1.webp"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TiltedCard from "./TiltedCard"
import Resume from "../pages/Resume"
import { HoverBorderGradient } from "./HoverBorderGradient"
import axios from "axios";
import Particles from '../components/Particles';





function Hero() {
  const [hasResume, setHasResume]= useState(false);
  const navigate= useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token) return ;

    const checkResume = async ()=>{
      try{
        const res= await axios.get("http://localhost:5000/resume/load",{
          headers: {Authorization: `Bearer ${token}`},
        });
        if(res.data.resume) setHasResume(true);
      }catch(err){
        console.error("Error checking resume: ",err.response?.data || err.message);
      }
    };
    checkResume();
  },[]);
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)



  useEffect(() => {
    setTimeout(() => setAnimateOut(true), 300)
    setTimeout(() => setAnimateIn(true), 1000)
  }, [])

  const cards = [
    { rotate: "8deg", offsetPx: 24 },
    { rotate: "13deg", offsetPx: 48 },
    { rotate: "18deg", offsetPx: 72 },
  ]

  return (
    <div className="overflow-x-hidden flex flex-col lg:flex-row justify-center lg:items-center lg:justify-evenly  lg:min-h-[calc(100vh-80px)]
  text-white p-3 md:px-35 relative ">
<div style={{ width: '100%', height: '100%', position: 'absolute',top:0, left:0, zIndex:0 }} >
  <Particles
    particleColors={['#D058B0', '#824294','#fffff']}
    particleCount={400}
    particleSpread={8}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>

    

  
      <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 w-full">
        
        {/* ✅ Typewriter Effect with gradient on last word */}
        <h2 className="mb-4 text-6xl font-bold">Welcome to the <span className="bg-gradient-to-l from-indigo-500 via-red-500 to-blue-500 text-transparent bg-clip-text">AI Resume Builder</span></h2>

        <p className="hidden lg:flex lg:text-xl lg:text-gray-600 lg:mb-6">
          Create your professional resume with ease.
        </p>
        <div className="hidden  lg:flex lg:gap-9">
        <HoverBorderGradient>
<button
    className="lg:flex font-semibold rounded-lg transition cursor-pointer hidden"
    onClick={() => navigate("/Resume/1")}
  >
    Create Resume
    </button>
  
</HoverBorderGradient>

{hasResume && (
  <HoverBorderGradient>
    <button
      className="lg:flex font-semibold rounded-lg transition cursor-pointer hidden"
      onClick={() => navigate("/Resume/template")}
    >
      Continue Resume
    </button>
  </HoverBorderGradient>
)}

        </div>
      </div>

      <div className="lg:mr-30 lg:w-1/2 flex flex-col justify-center lg:mt-5 w-full items-center lg:items-end lg:justify-end overflow-visible h-[450px] cursor-pointer">
        {cards
          .slice()
          .reverse()
          .map((card, i) => (
            <img
              key={i}
              src={resume1}
              style={{
                transform: animateOut
                  ? animateIn
                    ? "rotate(0deg) translateX(0px)" // fan-in
                    : `rotate(${card.rotate}) translateX(${card.offsetPx}px)` // fan-out
                  : "rotate(0deg) translateX(0px)",
                opacity: animateIn ? 0 : 1,
                transition: "all 0.8s ease",
              }}
              className="absolute w-60 md:w-80 shadow-md rounded-lg z-10"
            />
          ))}

        <div className="main-resume relative z-20 w-[320px] h-[450px]">
         
          <TiltedCard
   
            imageSrc={resume1}
         
            containerHeight="450px"
            containerWidth="320px"
            imageHeight="450px"
            imageWidth="320px"
            rotateAmplitude={14}
            scaleOnHover={1.05}
          />
         
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="lg:hidden text-lg text-gray-600 mb-6 mt-10">
          Create your professional resume with ease.
        </p>
        <HoverBorderGradient containerClassName ="rounded-full lg:hidden" >
        <button
          className="px-6 py-3 lg:hidden text-black font-semibold rounded-lg  transition cursor-pointer"
          onClick={() => navigate("/Resume/1")}
        >
          Create Resume
        </button>
        </HoverBorderGradient>
        {hasResume && (
          <button
          className="px-6 py-3 lg:hidden text-black font-semibold rounded-lg  transition cursor-pointer"
          onClick={() => navigate("/Resume")}
        >
          Continue Resume
        </button>
        )}
      </div>
    </div>
  )
}

export default Hero

