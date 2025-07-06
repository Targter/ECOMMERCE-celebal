// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Link, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Link to="/login" />;
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return <Link to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Link to="/login" replace />;
  }

  if (isAdmin && user.role !== "admin") {
    console.log("dur to this");
    return <Link to="/account" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
