import { useState } from "react";
import "../Components/UI/CSS/Inputs.css";
import Input from "../Components/UI/Input";
import AdminTextSlideControl from "../AdminPanel/AdminTextSlideControl";
import EventGallery from "../Components/UI/EventGallery";
const ContactUs = () => {
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Contact Us</h1>
      {/* <Input></Input> */}

      {/* <AdminTextSlideControl></AdminTextSlideControl> */}

      <EventGallery></EventGallery>
      
    </div>
  );
};

export default ContactUs;
