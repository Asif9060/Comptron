import { useState } from "react";
import DarkMode from "../Components/Features/DarkMode";
import Header from "../Components/Layout/Header";
import Navbar from "../Components/Layout/Navbar";
import Card from "../Components/UI/Card"
import TextSlide from "../Components/UI/TextSlide";
import { Theme } from "@radix-ui/themes";
const MembersPage = () => {
    const [className, setClassName] = useState('');
    
        // Function to update the class name
        const updateClassName = (newClass) => {
          setClassName(newClass);
        };
    return (
        <div>
            <Theme appearance={className}>
                <Header></Header>
                <Navbar></Navbar>
                <DarkMode updateClassName={updateClassName}></DarkMode>
                <TextSlide></TextSlide>
                <Card></Card>
            </Theme>
        </div>
    );
};

export default MembersPage;