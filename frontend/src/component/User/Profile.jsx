
//
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name || "User"}'s Profile | ECOMMERCE`} />
          <div className="min-h-screen bg-gray-100 py-4 ">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
                My Profile
              </h1>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar Section */}
                <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                  <img
                    src={user?.avatar?.url || "/default-profile.png"}
                    alt={user?.name || "User Profile"}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-md mb-4"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                  <Link
                    to="/me/update"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                    aria-label="Edit profile"
                  >
                    Edit Profile
                  </Link>
                </div>

                {/* Profile Details */}
                <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Profile Details
                  </h2>
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <p className="font-medium w-32">Full Name:</p>
                      <span>{user?.name || "Not available"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <p className="font-medium w-32">Email:</p>
                      <span>{user?.email || "Not available"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <p className="font-medium w-32">Joined On:</p>
                      <span>{formatDate(user?.createdAt)}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/orders"
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                      aria-label="View my orders"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/password/update"
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                      aria-label="Change password"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
