

import React, { Fragment, useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearErrors,
} from "../../reducers/store/slice/userSlice";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address";
    return "";
  };

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setFormError("");
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      setFormError(error);
      dispatch(clearErrors());
    }
    if (message) {
      setSuccessMessage(message);
      setEmail("");
      // Clear success message after 5 seconds
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, error, message]);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (formError) setFormError("");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password | ECOMMERCE" />
          <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Forgot Password
              </h2>
              <p className="text-gray-600 text-sm text-center mb-6">
                Enter your email address to receive a password reset link.
              </p>

              {successMessage && (
                <p className="text-green-500 text-sm text-center mb-4 animate-fade-in">
                  {successMessage}
                </p>
              )}
              {formError && (
                <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">
                  {formError}
                </p>
              )}

              <form onSubmit={forgotPasswordSubmit} className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                    <FaEnvelope className="text-gray-400 mx-3" size={16} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        formError ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-label="Email address for password reset"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Send password reset link"
                >
                  {loading ? (
                    <>
                      <FaEnvelope className="animate-pulse" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaEnvelope size={16} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
