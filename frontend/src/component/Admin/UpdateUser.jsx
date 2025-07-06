// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { useAlert } from "react-alert";
// // import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// // import MailOutlineIcon from "@material-ui/icons/MailOutline";
// // import PersonIcon from "@material-ui/icons/Person";
// // import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// import SideBar from "./Sidebar";
// import { UPDATE_USER_RESET } from "../../constants/userConstants";
// import {
//   getUserDetails,
//   updateUser,
//   clearErrors,
// } from "../../actions/userAction";
// import Loader from "../layout/Loader/Loader";

// const UpdateUser = ({ history, match }) => {
//   const dispatch = useDispatch();
//   // const alert = useAlert();

//   const { loading, error, user } = useSelector((state) => state.userDetails);

//   const {
//     loading: updateLoading,
//     error: updateError,
//     isUpdated,
//   } = useSelector((state) => state.profile);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");

//   const userId = match.params.id;

//   useEffect(() => {
//     if (user && user._id !== userId) {
//       dispatch(getUserDetails(userId));
//     } else {
//       setName(user.name);
//       setEmail(user.email);
//       setRole(user.role);
//     }
//     if (error) {
//       // alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (updateError) {
//       // alert.error(updateError);
//       dispatch(clearErrors());
//     }

//     if (isUpdated) {
//       // alert.success("User Updated Successfully");
//       history.push("/admin/users");
//       dispatch({ type: UPDATE_USER_RESET });
//     }
//   }, [dispatch, error, history, isUpdated, updateError, user, userId]);

//   const updateUserSubmitHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("role", role);

//     dispatch(updateUser(userId, myForm));
//   };

//   return (
//     <Fragment>
//       <MetaData title="Update User" />
//       <div className="dashboard">
//         <SideBar />
//         <div className="newProductContainer">
//           {loading ? (
//             <Loader />
//           ) : (
//             <form
//               className="createProductForm"
//               onSubmit={updateUserSubmitHandler}
//             >
//               <h1>Update User</h1>

//               <div>
//                 {/* <PersonIcon /> */}
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 {/* <MailOutlineIcon /> */}
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div>
//                 {/* <VerifiedUserIcon /> */}
//                 <select value={role} onChange={(e) => setRole(e.target.value)}>
//                   <option value="">Choose Role</option>
//                   <option value="admin">Admin</option>
//                   <option value="user">User</option>
//                 </select>
//               </div>

//               <button
//                 id="createProductBtn"
//                 type="submit"
//                 disabled={
//                   updateLoading ? true : false || role === "" ? true : false
//                 }
//               >
//                 Update
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateUser;

//

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiUser, FiMail, FiShield, FiSave } from "react-icons/fi";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  getUserDetails,
  updateUser,
  clearErrors,
  getAllUsers,
} from "../../reducers/store/slice/userSlice";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const { loading, error, users } = useSelector((state) => state.user);
  // console.log("user in update user : :", user);
  console.log("to update user ID; ", userId);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [e, sete] = useState(false);
  useEffect(() => {
    const targetUserFromList = users.find((u) => u._id === userId);
    if (users && targetUserFromList) {
      console.log("Found user in users array:", targetUserFromList);
      setName(targetUserFromList.name);
      setEmail(targetUserFromList.email);
      setRole(targetUserFromList.role);
    } else {
      // If users array is empty, dispatch getAllUsers
      if (users.length === 0) {
        console.log("Users array empty, fetching all users...");
        dispatch(getAllUsers());
      } else {
        sete("user Not found in database");
      }
    }
    if (error) {
      dispatch(clearErrors());
    }

    if (updateError) {
      dispatch(clearErrors());
    }
  }, [dispatch, updateError, users, userId]);

  const updateUserSubmitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    const result = await dispatch(updateUser({ id: userId, userData: myForm }));
    // console.log("result after done::", result.meta.requestStatus);
    const status = result.meta.requestStatus;
    if (status == "fulfilled") {
      navigate("/admin/users");
    }
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Update User
            </h1>

            {loading ? (
              <Loader />
            ) : e ? (
              <div className=" rounded">
                <p className="bg-red-50 p-4 ">
                  Error: User not found in database{" "}
                </p>
                <Link to="/admin/users">
                  <p className="mt-4 text-red-500 text-xl">Back to Home</p>
                </Link>
              </div>
            ) : (
              <form onSubmit={updateUserSubmitHandler} className="space-y-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 mb-2 font-medium">
                    <FiUser /> Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 mb-2 font-medium">
                    <FiMail /> Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 mb-2 font-medium">
                    <FiShield /> Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={updateLoading || role === ""}
                  className={`flex items-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
                    updateLoading || role === ""
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FiSave /> {updateLoading ? "Updating..." : "Update User"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;

//
