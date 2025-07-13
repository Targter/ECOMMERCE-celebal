

//
import React from "react";
import { FaShippingFast, FaCheckCircle, FaCreditCard } from "react-icons/fa";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { label: "Shipping", icon: <FaShippingFast className="text-2xl" /> },
    { label: "Confirm Order", icon: <FaCheckCircle className="text-2xl" /> },
    { label: "Payment", icon: <FaCreditCard className="text-2xl" /> },
  ];

  return (
    <div className="flex justify-center items-center py-6 bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative w-full sm:w-auto"
            role="group"
            aria-label={`Checkout step ${index + 1}: ${step.label}`}
          >
            {/* Icon and Label */}
            <div
              className={`flex flex-col items-center transition-all duration-300 ${
                activeStep >= index ? "text-red-500" : "text-gray-400"
              }`}
            >
              <div
                className={`rounded-full p-3 ${
                  activeStep >= index ? "bg-red-100" : "bg-gray-200"
                } transition-colors duration-300`}
              >
                {step.icon}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  activeStep >= index ? "text-red-500" : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block absolute top-5 left-1/2 w-full h-1 -ml-[50%] ${
                  activeStep > index ? "bg-red-500" : "bg-gray-300"
                } transition-colors duration-300 z-0`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
