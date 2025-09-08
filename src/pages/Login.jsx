import React from "react";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({}) {
  const navigate = useNavigate();
  const BASE_URL = "https://ai-resume-backend-11s4.onrender.com";


  const handleLogin = async ({ email, password }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      console.log("BASE URL", BASE_URL);
      
      // Save token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ email }));

      alert("Login successful!");
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
