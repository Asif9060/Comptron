import { Theme } from '@radix-ui/themes';
import '../assets/CSS/index.css';
import DarkMode from '../Components/Features/DarkMode';
import { useState } from 'react';
// import Navbar from '../Components/Layout/Navbar';
import Header from '../Components/Layout/Header';
import TextSlide from '../Components/UI/TextSlide';
import Members from '../Components/Features/Members';
import Button from '../Components/UI/MemberButton';
import TextEffect from '../Components/UI/TextEffect';
import Menu from '../Components/Layout/Menu';
import Imageslide from '../Components/Features/Imageslide';
import Welcomemsg from '../Components/Layout/Welcomemsg';
import ScalingLogo from '../Components/UI/ScalingLogo';
import Navbar2 from '../Components/Layout/Navbar2';


const HomePage = () => {
    const [className, setClassName] = useState('');

    // Function to update the class name
    const updateClassName = (newClass) => {
      setClassName(newClass);
    };
    return (
        <div>
            <Theme appearance={className}>
                
                <Header></Header>
                {/* <Navbar></Navbar> */}
                <Navbar2></Navbar2>
                <DarkMode updateClassName={updateClassName}></DarkMode>
                <TextSlide></TextSlide>
                <Menu></Menu>
                <TextEffect></TextEffect>
                <Welcomemsg></Welcomemsg>
                <h1 className=' recent text-5xl text-pink-700' >Recent Activity</h1>
                <Imageslide></Imageslide>
                <h2 className='flex justify-center text-3xl text-[#15A6E1] underline underline-offset-6'>Our Core Members</h2>
                <Members></Members>
                <Button></Button>
                <ScalingLogo></ScalingLogo>
            </Theme>
        </div>
    );
};

export default HomePage;