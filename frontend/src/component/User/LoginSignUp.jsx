// import React, { Fragment, useRef, useState, useEffect } from "react";
// import "./LoginSignUp.css";
// import Loader from "../layout/Loader/Loader";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// // import { clearErrors, login, register } from "../../actions/userAction";
// import {
//   login,
//   register,
//   clearErrors,
// } from "../../reducers/store/slice/userSlice";

// const LoginSignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.user
//   );

//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab = useRef(null);

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const { name, email, password } = user;

//   const [avatar, setAvatar] = useState("/Profile.png");
//   const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

//   const loginSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email: loginEmail, password: loginPassword }));
//   };

//   const registerSubmit = (e) => {
//     e.preventDefault();
//     const myForm = new FormData();
//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("password", password);
//     myForm.set("avatar", avatar);
//     dispatch(register(myForm));
//   };

//   const registerDataChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar(reader.result);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };
//   // console.log("locatioN:", location.search);
//   // console.log("locatioN:", location.search.split("=")[1]);
//   // console.log("locatioN:", location.search);
//   const redirect = location.search ? location.search.split("=")[1] : "account/";

//   useEffect(() => {
//     if (error) {
//       dispatch(clearErrors());
//     }
//     if (isAuthenticated) {
//       console.log("navigated to :", redirect);
//       // navigate(redirect);
//       navigate("/" + redirect);
//     }
//   }, [dispatch, error, navigate, isAuthenticated, redirect]);

//   const switchTabs = (e, tab) => {
//     if (tab === "login") {
//       switcherTab.current.classList.add("shiftToNeutral");
//       switcherTab.current.classList.remove("shiftToRight");
//       registerTab.current.classList.remove("shiftToNeutralForm");
//       loginTab.current.classList.remove("shiftToLeft");
//     }
//     if (tab === "register") {
//       switcherTab.current.classList.add("shiftToRight");
//       switcherTab.current.classList.remove("shiftToNeutral");
//       registerTab.current.classList.add("shiftToNeutralForm");
//       loginTab.current.classList.add("shiftToLeft");
//     }
//   };

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="LoginSignUpContainer">
//           <div className="LoginSignUpBox">
//             <div>
//               <div className="login_signUp_toggle">
//                 <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
//                 <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
//               </div>
//               <button ref={switcherTab}></button>
//             </div>

//             {/* Login Form */}
//             <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
//               <div className="loginEmail">
//                 <FaEnvelope />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   required
//                   value={loginEmail}
//                   onChange={(e) => setLoginEmail(e.target.value)}
//                 />
//               </div>
//               <div className="loginPassword">
//                 <FaLock />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   required
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />
//               </div>
//               <Link to="/password/forgot">Forgot Password?</Link>
//               <input type="submit" value="Login" className="loginBtn" />
//             </form>

//             {/* Registration Form */}
//             <form
//               className="signUpForm"
//               ref={registerTab}
//               encType="multipart/form-data"
//               onSubmit={registerSubmit}
//             >
//               <div className="signUpName">
//                 <FaUser />
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   required
//                   name="name"
//                   value={name}
//                   onChange={registerDataChange}
//                 />
//               </div>
//               <div className="signUpEmail">
//                 <FaEnvelope />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   required
//                   name="email"
//                   value={email}
//                   onChange={registerDataChange}
//                 />
//               </div>
//               <div className="signUpPassword">
//                 <FaLock />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   required
//                   name="password"
//                   value={password}
//                   onChange={registerDataChange}
//                 />
//               </div>

//               <div id="registerImage">
//                 <img src={avatarPreview} alt="Avatar Preview" />
//                 <input
//                   type="file"
//                   name="avatar"
//                   accept="image/*"
//                   onChange={registerDataChange}
//                 />
//                 <FaImage className="upload-icon" />
//               </div>
//               <input type="submit" value="Register" className="signUpBtn" />
//             </form>
//           </div>
//         </div>
//       )}
//     </Fragment>
//   );
// };

// export default LoginSignUp;

//

import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  clearErrors,
} from "../../reducers/store/slice/userSlice";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [registerErrors, setRegisterErrors] = useState({});

  const redirect = location.search ? location.search.split("=")[1] : "account";

  const validateLogin = () => {
    const errors = {};
    if (!loginEmail.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginEmail))
      errors.email = "Invalid email address";
    if (!loginPassword.trim()) errors.password = "Password is required";
    return errors;
  };

  const validateRegister = () => {
    const errors = {};
    if (!user.name.trim()) errors.name = "Name is required";
    if (!user.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      errors.email = "Invalid email address";
    if (!user.password.trim()) errors.password = "Password is required";
    else if (user.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!avatar || avatar === "/Profile.png")
      errors.avatar = "Profile picture is required";
    return errors;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    setLoginErrors({});
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const errors = validateRegister();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    setRegisterErrors({});
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setRegisterErrors((prev) => ({
            ...prev,
            avatar: "Please upload an image file",
          }));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
            setRegisterErrors((prev) => ({ ...prev, avatar: "" }));
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      setRegisterErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const switchTabs = (tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("translate-x-0");
      switcherTab.current.classList.remove("translate-x-full");
      registerTab.current.classList.add("hidden");
      loginTab.current.classList.remove("hidden");
    } else if (tab === "register") {
      switcherTab.current.classList.add("translate-x-full");
      switcherTab.current.classList.remove("translate-x-0");
      registerTab.current.classList.remove("hidden");
      loginTab.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    if (error) {
      setLoginErrors((prev) => ({ ...prev, server: error }));
      setRegisterErrors((prev) => ({ ...prev, server: error }));
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 mt-[90px]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              {/* Tabs */}
              <div className="relative mb-6">
                <div className="flex justify-between bg-gray-200 rounded-md p-1">
                  <button
                    onClick={() => switchTabs("login")}
                    className="flex-1 py-2 text-sm font-medium text-gray-700 hover:text-red-500 transition-colors duration-200 focus:outline-none"
                    aria-label="Switch to Login tab"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => switchTabs("register")}
                    className="flex-1 py-2 text-sm font-medium text-gray-700 hover:text-red-500 transition-colors duration-200 focus:outline-none"
                    aria-label="Switch to Register tab"
                  >
                    Register
                  </button>
                </div>
                <div
                  ref={switcherTab}
                  className="absolute top-0 h-1 bg-red-500 rounded-md w-1/2 transition-transform duration-300"
                ></div>
              </div>

              {/* Server Error */}
              {(loginErrors.server || registerErrors.server) && (
                <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">
                  {loginErrors.server || registerErrors.server}
                </p>
              )}

              {/* Login Form */}
              <form ref={loginTab} onSubmit={loginSubmit} className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="loginEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                    <FaEnvelope className="text-gray-400 mx-3" size={16} />
                    <input
                      type="email"
                      id="loginEmail"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        loginErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-label="Email address for login"
                      required
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {loginErrors.email}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="loginPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                    <FaLock className="text-gray-400 mx-3" size={16} />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      id="loginPassword"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        loginErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      aria-label="Password for login"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="px-3 text-gray-400 hover:text-red-500 focus:outline-none"
                      aria-label={
                        showLoginPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showLoginPassword ? (
                        <FaEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {loginErrors.password}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <Link
                    to="/password/forgot"
                    className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                    aria-label="Forgot your password?"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Login"
                >
                  <FaEnvelope size={16} />
                  Login
                </button>
              </form>

              {/* Register Form */}
              <form
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                className="space-y-6 hidden"
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
                      value={user.name}
                      onChange={registerDataChange}
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        registerErrors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      aria-label="Name for registration"
                      required
                    />
                  </div>
                  {registerErrors.name && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {registerErrors.name}
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
                      value={user.email}
                      onChange={registerDataChange}
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        registerErrors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      aria-label="Email address for registration"
                      required
                    />
                  </div>
                  {registerErrors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {registerErrors.email}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-red-500">
                    <FaLock className="text-gray-400 mx-3" size={16} />
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={user.password}
                      onChange={registerDataChange}
                      className={`w-full px-4 py-2 border-l-0 rounded-md focus:outline-none ${
                        registerErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      aria-label="Password for registration"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }
                      className="px-3 text-gray-400 hover:text-red-500 focus:outline-none"
                      aria-label={
                        showRegisterPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showRegisterPassword ? (
                        <FaEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {registerErrors.password}
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
                    <div className="flex-1">
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Upload profile picture"
                      />
                      <FaImage
                        className="absolute right-3 top-9 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>
                  {registerErrors.avatar && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {registerErrors.avatar}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Register"
                >
                  <FaUser size={16} />
                  Register
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
