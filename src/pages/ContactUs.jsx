import { useState } from "react";
import "../Components/UI/CSS/Inputs.css";
import Input from "../Components/UI/Input";
import AdminTextSlideControl from "../AdminPanel/AdminTextSlideControl";
const ContactUs = () => {
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Contact Us</h1>
      <Input></Input>

      <AdminTextSlideControl></AdminTextSlideControl>
      
    </div>
  );
};

export default ContactUs;
