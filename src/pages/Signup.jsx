import React from "react";
import SignupForm from "./SignupForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup({}){

    const navigate= useNavigate();

    const handleSignup= async ({email,password}) =>{
        try{
            await axios.post("http://localhost:5000/auth/signup", {email,password});
            alert("Signup succesful! Please login.");
            navigate("/login");
        }catch(err){

            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return <SignupForm onSubmit={handleSignup} />;
}