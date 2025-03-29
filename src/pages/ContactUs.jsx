import { useState } from "react";
import "../Components/UI/CSS/Inputs.css";
import Input from "../Components/UI/Input";
import AdminTextSlideControl from "../AdminPanel/AdminTextSlideControl";
import Recent from "../Components/Features/Recent";
import ImageUpload from './../AdminPanel/ImageUpload';

const ContactUs = () => {
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Contact Us</h1>
      {/* <Input></Input> */}

      {/* <AdminTextSlideControl></AdminTextSlideControl> */}

      <Recent></Recent>
      <ImageUpload></ImageUpload>

      
      
    </div>
  );
};

export default ContactUs;
