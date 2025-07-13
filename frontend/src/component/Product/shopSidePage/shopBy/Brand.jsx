import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import NavTitle from "./NavTitle";

const Brand = ({ onSelectBrand }) => {
  const [show, setShow] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const ref = useRef();

  const brands = [
    {
      _id: 9006,
      title: "Apple",
    },
    {
      _id: 9007,
      title: "Ultron",
    },
    {
      _id: 9008,
      title: "Unknown",
    },
    {
      _id: 9009,
      title: "Shoppers Home",
    },
    {
      _id: 9010,
      title: "Hoichoi",
    },
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

  const handleBrandClick = (brand) => {
    const newBrand = brand === selectedBrand ? null : brand;
    setSelectedBrand(newBrand);
    onSelectBrand(newBrand);
    setShow(false); // Close dropdown after selection
  };

  return (
    <div className="w-full relative">
      <NavTitle title="Shop by Brand" icons={false} />
      <div
        onClick={() => setShow(!show)}
        ref={ref}
        className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
      >
        <HiOutlineMenuAlt4 className="w-5 h-5" />
        <p className="text-[14px] font-normal">Select Brand</p>
      </div>
      {show && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6 bg-white/40 backdrop-blur-xl"
        >
          <li
            className={`text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer ${
              selectedBrand === null ? "text-black font-medium" : ""
            }`}
            onClick={() => handleBrandClick(null)}
          >
            All Brands
          </li>
          {brands.map((item) => (
            <li
              key={item._id}
              className={`text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-black duration-300 cursor-pointer ${
                selectedBrand === item.title ? "text-black font-medium" : ""
              }`}
              onClick={() => handleBrandClick(item.title)}
            >
              {item.title}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Brand;
