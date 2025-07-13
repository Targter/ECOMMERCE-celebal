

import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../reducers/store/slice/userSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { FaUser, FaEnvelope, FaImage } from "react-icons/fa";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isUpdated, loading } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/default-profile.png");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address";
    return newErrors;
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (avatar instanceof File) {
      formData.set("avatar", avatar);
    }
    dispatch(updateProfile(formData));
  };

  const updateProfileDataChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Please upload an image file",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(file);
          setErrors((prev) => ({ ...prev, avatar: "" }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    const setters = { name: setName, email: setEmail };
    setters[field](value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar?.url || "/default-profile.png");
    }

    if (error) {
      setErrors((prev) => ({ ...prev, server: error }));
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setSuccessMessage("Profile updated successfully!");
      dispatch(loadUser());
      navigate("/account");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [dispatch, error, isUpdated, user, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile | ECOMMERCE" />
          <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Update Profile
              </h2>
              <p className="text-gray-600 text-sm text-center mb-6">
                Update your profile information below.
              </p>

              {successMessage && (
                <p className="text-green-500 text-sm text-center mb-4 animate-fade-in">
                  {successMessage}
                </p>
              )}
              {errors.server && (
                <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">
                  {errors.server}
                </p>
              )}

              <form
                onSubmit={updateProfileSubmit}
                encType="multipart/form-data"
                className="space-y-6"
              >
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                    <FaUser className="text-gray-400 mx-3" size={16} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-label="Name for profile update"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.name}
                    </p>
                  )}
                </div>

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
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-label="Email address for profile update"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 relative">
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Upload profile picture"
                      />
                      <FaImage
                        className="absolute right-3 top-3 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>
                  {errors.avatar && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.avatar}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Update profile"
                >
                  <FaUser size={16} />
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
