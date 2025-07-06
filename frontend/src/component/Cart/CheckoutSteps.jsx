// // import React, { Fragment } from "react";
// // // import { div, Stepper, StepLabel, Step } from "@material-ui/core";
// // // import LocalShippingIcon from "@material-ui/icons/LocalShipping";
// // // import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
// // // import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
// // import "./CheckoutSteps.css";

// // const CheckoutSteps = ({ activeStep }) => {
// //   const steps = [
// //     {
// //       label: <div>Shipping Details</div>,
// //       // icon: <LocalShippingIcon />,
// //     },
// //     {
// //       label: <div>Confirm Order</div>,
// //       // icon: <LibraryAddCheckIcon />,
// //     },
// //     {
// //       label: <div>Payment</div>,
// //       // icon: <AccountBalanceIcon />,
// //     },
// //   ];

// //   const stepStyles = {
// //     boxSizing: "border-box",
// //   };

// //   return (
// //     <Fragment>
// //       {/* <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
// //         {steps.map((item, index) => (
// //           <Step
// //             key={index}
// //             active={activeStep === index ? true : false}
// //             completed={activeStep >= index ? true : false}
// //           >
// //             <StepLabel
// //               style={{
// //                 color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
// //               }}
// //               icon={item.icon}
// //             >
// //               {item.label}
// //             </StepLabel>
// //           </Step>
// //         ))}
// //       </Stepper> */}
// //       me
// //     </Fragment>
// //   );
// // };

// // export default CheckoutSteps;

// import React from "react";
// import { FaShippingFast } from "react-icons/fa";
// import { MdLibraryAddCheck } from "react-icons/md";
// import { RiBankFill } from "react-icons/ri";
// import "./CheckoutSteps.css";

// const CheckoutSteps = ({ activeStep }) => {
//   const steps = [
//     { label: "Shipping", icon: <FaShippingFast /> },
//     { label: "Confirm Order", icon: <MdLibraryAddCheck /> },
//     { label: "Payment", icon: <RiBankFill /> },
//   ];

//   return (
//     <div className="stepper-container mt-[90px]">
//       {steps.map((step, index) => (
//         <div
//           key={index}
//           className={`step ${activeStep >= index ? "active" : ""}`}
//         >
//           <div className="icon-container">{step.icon}</div>
//           <span className="label">{step.label}</span>
//           {index < steps.length - 1 && <div className="line" />}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckoutSteps;

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
