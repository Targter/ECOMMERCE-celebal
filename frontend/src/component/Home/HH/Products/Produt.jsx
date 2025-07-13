// add to cart pending.....

import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../../designLayouts/Image";
import Badge from "./Badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../../reducers/store/slice/cartSlice";
import { Imageee } from "../../../../assets/images";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  //   console.log("productId:", props._id);
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };

  const handleAddToCart = () => {
    dispatch(addItemsToCart({ id: props._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success(`${props.productName} added to cart!`);
      })
      .catch((error) => {
        toast.error(error || "Failed to add item to cart");
      });
  };
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden  ">
        <div>
          <Image className="w-[80%] h-full" imgSrc={Imageee} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-auto absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-auto flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <Link to={`/product/${props._id}`}>
              <li
                // onClick={handleProductDetails}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                View Details
                <span className="text-lg">
                  <MdOutlineLabelImportant />
                </span>
              </li>
            </Link>
            {/* <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-transparent border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">₹{props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
