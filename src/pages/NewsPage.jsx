import SignIn from "../Components/GoogleSignIn/SignIn";
import Menu from "../Components/Layout/Menu";
("use client");
import ColourfulText from "../Components/Layout/ColourfulText";
import { motion } from "framer-motion";
const NewsPage = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      {/* <SignIn></SignIn> */}

      {/* <Menu></Menu> */}

      <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
           <ColourfulText text="Comptron" /> - Creativity Assembled <br />
        </h1>
      </div>
    </div>
  );
};

export default NewsPage;
