import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
// import { saveShippingInfo } from "../../actions/cartAction";
import { saveShippingInfo } from "../../reducers/store/slice/cartSlice";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobeAmericas,
  FaExchangeAlt,
} from "react-icons/fa";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      // Use your preferred error handling (toast, alert, etc.)
      console.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  //
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!pinCode.trim()) newErrors.pinCode = "Pin Code is required";
    else if (!/^\d{5,6}$/.test(pinCode))
      newErrors.pinCode = "Pin Code must be 5-6 digits";
    if (!phoneNo.trim()) newErrors.phoneNo = "Phone Number is required";
    else if (!/^\d{10}$/.test(phoneNo))
      newErrors.phoneNo = "Phone Number must be 10 digits";
    if (!country) newErrors.country = "Country is required";
    if (country && !state) newErrors.state = "State is required";
    return newErrors;
  };

  const handleInputChange = (field, value) => {
    const setters = {
      address: setAddress,
      city: setCity,
      state: setState,
      country: setCountry,
      pinCode: setPinCode,
      phoneNo: setPhoneNo,
    };
    setters[field](value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "country") setState(""); // Reset state when country changes
  };
  return (
    // <Fragment>
    //   <MetaData title="Shipping Details" />
    //   <CheckoutSteps activeStep={0} />

    //   <div className="shippingContainer">
    //     <div className="shippingBox">
    //       <h2 className="shippingHeading">Shipping Details</h2>

    //       <form
    //         className="shippingForm"
    //         encType="multipart/form-data"
    //         onSubmit={shippingSubmit}
    //       >
    //         <div className="form-group">
    //           <FaHome className="input-icon" />
    //           <input
    //             type="text"
    //             placeholder="Address"
    //             required
    //             value={address}
    //             onChange={(e) => setAddress(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-group">
    //           <FaCity className="input-icon" />
    //           <input
    //             type="text"
    //             placeholder="City"
    //             required
    //             value={city}
    //             onChange={(e) => setCity(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-group">
    //           <FaMapMarkerAlt className="input-icon" />
    //           <input
    //             type="number"
    //             placeholder="Pin Code"
    //             required
    //             value={pinCode}
    //             onChange={(e) => setPinCode(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-group">
    //           <FaPhone className="input-icon" />
    //           <input
    //             type="number"
    //             placeholder="Phone Number"
    //             required
    //             value={phoneNo}
    //             onChange={(e) => setPhoneNo(e.target.value)}
    //             maxLength="10"
    //             minLength="10"
    //           />
    //         </div>

    //         <div className="form-group">
    //           <FaGlobeAmericas className="input-icon" />
    //           <select
    //             required
    //             value={country}
    //             onChange={(e) => setCountry(e.target.value)}
    //           >
    //             <option value="">Country</option>
    //             {Country.getAllCountries().map((item) => (
    //               <option key={item.isoCode} value={item.isoCode}>
    //                 {item.name}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         {country && (
    //           <div className="form-group">
    //             <FaExchangeAlt className="input-icon" />
    //             <select
    //               required
    //               value={state}
    //               onChange={(e) => setState(e.target.value)}
    //             >
    //               <option value="">State</option>
    //               {State.getStatesOfCountry(country).map((item) => (
    //                 <option key={item.isoCode} value={item.isoCode}>
    //                   {item.name}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //         )}

    //         <button type="submit" className="shippingBtn" disabled={!state}>
    //           Continue
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </Fragment>
    <Fragment>
      <MetaData title="Shipping Details | ECOMMERCE" />
      <div className="mt-[90px]">
        <CheckoutSteps activeStep={0} />
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Shipping Details
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Please provide your shipping information to proceed.
          </p>

          <form onSubmit={shippingSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaHome className="text-gray-400 mx-3" size={16} />
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Shipping address"
                  required
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaCity className="text-gray-400 mx-3" size={16} />
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="City"
                  required
                />
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pin Code
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaMapMarkerAlt className="text-gray-400 mx-3" size={16} />
                <input
                  type="number"
                  id="pinCode"
                  placeholder="Enter your pin code"
                  value={pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                    errors.pinCode ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Pin code"
                  required
                />
              </div>
              {errors.pinCode && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.pinCode}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="phoneNo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaPhone className="text-gray-400 mx-3" size={16} />
                <input
                  type="number"
                  id="phoneNo"
                  placeholder="Enter your phone number"
                  value={phoneNo}
                  onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                  className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none appearance-none ${
                    errors.phoneNo ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Phone number"
                  required
                  maxLength="10"
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                />
              </div>
              {errors.phoneNo && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.phoneNo}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                <FaGlobeAmericas className="text-gray-400 mx-3" size={16} />
                <select
                  id="country"
                  value={country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Select country"
                  required
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.country}
                </p>
              )}
            </div>

            {country && (
              <div className="relative">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                  <FaExchangeAlt className="text-gray-400 mx-3" size={16} />
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Select state"
                    required
                  >
                    <option value="">Select State</option>
                    {State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">
                    {errors.state}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={!state || loading}
              className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium ${
                !state || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Continue to order confirmation"
            >
              <FaHome size={16} />
              Continue
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
