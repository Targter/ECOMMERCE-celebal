import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#F5F5F3] group">
      <div className="max-w-container mx-auto border-t pt-6 pb-10 px-4 sm:px-6">
        <p className="text-titleFont font-normal text-center flex flex-col md:flex-row items-center justify-center text-lightText duration-200 text-sm gap-1 md:gap-2 text-wrap">
          <span className="text-md md:mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          <span className="text-center">
            Copyright 2022 | E-Commerce shopping | All Rights Reserved |
          </span>
          <a href="https://abhaybansal.in/" target="_blank" rel="noreferrer">
            <span className="font-medium group-hover:text-primeColor text-center">
              Powered by Abhaybansal.in
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
