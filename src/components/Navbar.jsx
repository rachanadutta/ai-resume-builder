// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // icons

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="flex items-center justify-between  h-20 px-6 shadow-lg   bg-gray-900 backdrop:blur-md z-50 text-white ">
//       {/* Logo */}
//        <h1 className={`font-bold text-xl md:text-3xl bg-gradient-to-l from-indigo-500 via-red-500 to-blue-500 text-transparent bg-clip-text 
//         ${isOpen ? "block" : "hidden"} md:block`}>
//         AI Resume Builder
//       </h1>

//       {/* Desktop Links */}
//       <div className="hidden md:flex items-center gap-10 text-lg font-semibold">
//         <Link className="hover:underline hover:underline-offset-4" to="/">Home</Link>
//         <Link className="hover:underline hover:underline-offset-4" to="/Templates">Templates</Link>
       
//       </div>

//       {/* Desktop Auth Buttons */}
//       <div className="hidden md:flex gap-5">
//         <Link className="px-4 py-2 shadow-md bg-purple-400 text-white rounded hover:bg-purple-500">Sign In</Link>
//         <Link className="px-4 py-2 shadow-md bg-purple-400 text-white rounded hover:bg-purple-500">Login</Link>
//       </div>


// <div className="md:hidden flex items-center   ml-auto ">

//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden ml-auto p-2 rounded hover:bg-gray-700"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X  size={28} /> : <Menu size={28} />}
//       </button>
//     </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="absolute top-13 left-0 w-full bg-gray-900 flex text-white flex-col p-6  py-6 text-lg font-semibold md:hidden z-50 mt-4">
            

          
            
//           <Link className="hover:text-purple-400 w-full py-2 " onClick={() => setIsOpen(false)} to="/">Home</Link>
//           <Link className="hover:text-purple-400 py-2" onClick={() => setIsOpen(false)} to="/Templates">Templates</Link>
          
//           <div className="mt-2 flex items-center justify-center gap-6">
//           <Link className="px-4 py-2 shadow-md bg-purple-400 text-white text-center rounded mt-3 mb-6 hover:bg-purple-500" to="#">Sign In</Link>
//           <Link className="px-4 py-2 shadow-md bg-purple-400 text-white text-center rounded mt-3 mb-6 hover:bg-purple-500" to="#">Login</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between h-20 px-6 shadow-lg bg-gray-900 text-white">
      {/* Logo */}
      <h1
        className={`font-bold text-xl md:text-3xl bg-gradient-to-l from-indigo-500 via-red-500 to-blue-500 text-transparent bg-clip-text 
        ${isOpen ? "block" : "hidden"} md:block`}
      >
        AI Resume Builder
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10 text-lg font-semibold">
        <Link className="hover:underline hover:underline-offset-4" to="/">
          Home
        </Link>
        <Link
          className="hover:underline hover:underline-offset-4"
          to="/Templates"
        >
          Templates
        </Link>
      </div>

      {/* Desktop Auth/User */}
      <div className="hidden md:flex gap-5 items-center">
        {user ? (
          <>
            <span className="font-semibold">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 shadow-md bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="px-4 py-2 shadow-md bg-purple-400 rounded hover:bg-purple-500">
              Sign Up
            </Link>
            <Link to="/login" className="px-4 py-2 shadow-md bg-purple-400 rounded hover:bg-purple-500">
              Login
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center ml-auto">
        <button
          className="p-2 rounded hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col p-6 text-lg font-semibold md:hidden z-50">
          <Link
            className="hover:text-purple-400 py-2"
            onClick={() => setIsOpen(false)}
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-purple-400 py-2"
            onClick={() => setIsOpen(false)}
            to="/Templates"
          >
            Templates
          </Link>

          <div className="mt-4 flex flex-col gap-4">
            {user ? (
              <>
                <span className="text-center">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 shadow-md bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="px-4 py-2 shadow-md bg-purple-400 rounded text-center hover:bg-purple-500"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link 
                  className="px-4 py-2 shadow-md bg-purple-400 rounded text-center hover:bg-purple-500"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
