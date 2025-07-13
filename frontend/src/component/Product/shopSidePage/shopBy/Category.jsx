import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import NavTitle from "./NavTitle";

const Category = ({ onSelectCategory }) => {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const ref = useRef();

  const categories = [
    "Electronics",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
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

  const handleCategoryClick = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onSelectCategory(newCategory);
    setShow(false); // Close dropdown after selection
  };

  return (
    <div className="w-full relative">
      <NavTitle title="Shop by Category" icons={false} />
      <div
        onClick={() => setShow(!show)}
        ref={ref}
        className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
      >
        <HiOutlineMenuAlt4 className="w-5 h-5" />
        <p className="text-[14px] font-normal">Select Category</p>
      </div>
      {show && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6 bg-white/40 backdrop-blur-xl"
        >
          <li
            className={`text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-black duration-300 cursor-pointer ${
              selectedCategory === null ? "text-black font-medium" : ""
            }`}
            onClick={() => handleCategoryClick(null)}
          >
            All Categories
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-black duration-300 cursor-pointer ${
                selectedCategory === category ? "text-black font-medium" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Category;
