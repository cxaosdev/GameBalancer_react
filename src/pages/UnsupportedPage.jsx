import Footer from "components/Footer";
import React from "react";
import logo from "../components/logo.jpg";
import { FaGithub, FaPhoneAlt } from "react-icons/fa";

const UnsupportedPage = () => {
  return (
    <>
      <div className="do-hyeon-regular flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <img className="ml-[1.5rem] w-[2.2rem]" src={logo} alt="Logo" />
        <h1 className="mt-8 text-lg">
          모바일 및 태블릿 기기에서는 지원하지 않습니다.
        </h1>
        <div className="fixed bottom-1 flex items-center text-[1rem]">
          <div className="flex items-center text-white/80">
            <FaPhoneAlt />
            <span className="text-white/80">
              &nbsp;Contact: scy0723123@gmail.com &nbsp;
            </span>
          </div>
          <div className="flex items-center text-white/80">
            <FaGithub />
            <span className="ml-2 cursor-pointer text-white/80">cxaosdev</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnsupportedPage;
