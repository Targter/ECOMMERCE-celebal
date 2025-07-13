import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import NavTitle from "./NavTitle";

const Color = ({ onSelectColor }) => {
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const ref = useRef();

  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Gray",
    "Mixed",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleColorClick = (color) => {
    const newColor = color === selectedColor ? null : color;
    setSelectedColor(newColor);
    onSelectColor(newColor);
    setShow(false); // Close dropdown after selection
  };

  return (
    <div className="w-full relative">
      <NavTitle title="Shop by Color" icons={false} />
      <div
        onClick={() => setShow(!show)}
        ref={ref}
        className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
      >
        <HiOutlineMenuAlt4 className="w-5 h-5" />
        <p className="text-[14px] font-normal">Select Color</p>
      </div>
      {show && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6 bg-white/40 backdrop-blur-xl "
        >
          <li
            className={`text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-black duration-300 cursor-pointer flex items-center gap-2 ${
              selectedColor === null ? "text-black font-medium" : ""
            }`}
            onClick={() => handleColorClick(null)}
          >
            <span className="w-3 h-3 rounded-full bg-gray-400"></span>
            All Colors
          </li>
          {colors.map((color, index) => (
            <li
              key={index}
              className={`text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-black duration-300 cursor-pointer flex items-center gap-2 ${
                selectedColor === color ? "text-black font-medium" : ""
              }`}
              onClick={() => handleColorClick(color)}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    color.toLowerCase() === "mixed"
                      ? "linear-gradient(45deg, red, yellow, green, blue)"
                      : color.toLowerCase(),
                }}
              ></span>
              {color}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Color;
