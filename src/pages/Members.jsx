import { useState } from "react";
import "../Components/UI/CSS/Inputs.css";
import Input from "../Components/UI/Input";
import AdminTextSlideControl from "../AdminPanel/AdminTextSlideControl";
import Recent from "../Components/Features/Recent";
import ImageUpload from "../AdminPanel/ImageUpload";
import AdminEventDetailsControl from "../AdminPanel/AdminEventDetailsControl";
import EventCards from "../Components/UI/EventCards";
import Events from "./Events";
import CommentSection from "../Components/Features/CommentSection";
import EventDetailsPart from "../Components/UI/EventDetailsPart";

import SideMenu from '../Components/Features/SideMenu';
import RegisterForm from "../USER/RegisterForm";
import Search from "./Search";
import MemberCards from "./MemberCards";
import Loading from "../Components/UI/Loading";
import GeneralMemberPage from "./GeneralMemberPage";
import ValidationControl from "../USER/ValidationControl";
import AllMembersPage from "../USER/AllMembersPage";


const Members = () => {
  return (
    <div className="">

      <div className="fixed top-0 left-0 w-16 h-screen flex flex-col justify-center items-center z-10">
        <SideMenu></SideMenu>
      </div>
      {/* <Input></Input> */}

      {/* <AdminTextSlideControl></AdminTextSlideControl> */}

      {/* <Recent></Recent>
      <ImageUpload></ImageUpload>
      <button className="button03">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7L288 480l9.4 0L512 480c17.7 0 32-14.3 32-32s-14.3-32-32-32l-124.1 0L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416l-9.4 0-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg>
        Delete
      </button> */}

      

      {/* <EventCards></EventCards>

      <Events></Events>

      <CommentSection></CommentSection>

      <EventDetailsPart></EventDetailsPart> */}

      {/* <TestPage></TestPage> */}

      {/* <RegisterForm></RegisterForm> */}

      {/* <Search></Search> */}
      {/* <MemberCards></MemberCards> */}

      {/* <Loading></Loading> */}

      {/* <GeneralMemberPage></GeneralMemberPage> */}

      {/* <ValidationControl></ValidationControl> */}

      <AllMembersPage></AllMembersPage>

    </div>
  );
};

export default Members;
