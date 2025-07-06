import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    // Mock submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      // Add toast notification here if desired (e.g., react-toastify)
      alert("Form submitted successfully!"); // Temporary for demo
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 mt-[90px]">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mt-4 animate-fade-in">
            We're here to help! Reach out with any questions or feedback.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Name"
                  aria-label="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Email"
                  aria-label="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Message"
                  aria-label="Your Message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Submit contact form"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaEnvelope size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info and Social Media */}
          <div className="lg:w-1/2 space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-red-500" size={20} />
                  <a
                    href="mailto:bansalabhay00@gmail.com"
                    className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                    aria-label="Email us"
                  >
                    bansalabhay00@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-red-500" size={20} />
                  <a
                    href="tel:+917973446163"
                    className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                    aria-label="Call us"
                  >
                    +91 7973446163
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500" size={20} />
                  <p className="text-gray-700">
                    123 E-Commerce St, Shop City, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Follow Us
              </h2>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter size={28} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook size={28} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram size={28} />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Our Location
              </h2>
              <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
