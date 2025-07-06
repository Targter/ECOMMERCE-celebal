// import React from "react";
// import "./sidebar.css";
// import logo from "../../images/logo.png";
// import { Link } from "react-router-dom";
// // import { TreeView, TreeItem } from "@material-ui/lab";
// // import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// // import PostAddIcon from "@material-ui/icons/PostAdd";
// // import AddIcon from "@material-ui/icons/Add";
// // import ImportExportIcon from "@material-ui/icons/ImportExport";
// // import ListAltIcon from "@material-ui/icons/ListAlt";
// // import DashboardIcon from "@material-ui/icons/Dashboard";
// // import PeopleIcon from "@material-ui/icons/People";
// // import RateReviewIcon from "@material-ui/icons/RateReview";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <Link to="/">
//         <img src={logo} alt="Ecommerce" />
//       </Link>
//       <Link to="/admin/dashboard">
//         <p>Dashboard</p>
//       </Link>
//       <Link>
//         {/* <TreeView
//           defaultCollapseIcon={<ExpandMoreIcon />}
//           defaultExpandIcon={<ImportExportIcon />}
//         >
//           <TreeItem nodeId="1" label="Products">
//             <Link to="/admin/products">
//               <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
//             </Link>

//             <Link to="/admin/product">
//               <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
//             </Link>
//           </TreeItem>
//         </TreeView> */}
//         tree view
//       </Link>
//       <Link to="/admin/orders">
//         <p>
//           {/* <ListAltIcon /> */}
//           Orders
//         </p>
//       </Link>
//       <Link to="/admin/users">
//         <p>
//           {/* <PeopleIcon />  */}
//           Users
//         </p>
//       </Link>
//       <Link to="/admin/reviews">
//         <p>
//           {/* <RateReviewIcon /> */}
//           Reviews
//         </p>
//       </Link>
//     </div>
//   );
// };

// export default Sidebar;

//

import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiPlusCircle,
  FiList,
  FiStar,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className=" h-full w-auto bg-white shadow-md ">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Ecommerce" className="h-10" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Products Dropdown */}
          <li className="group">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <div className="flex items-center">
                <FiShoppingBag className="mr-3" />
                <span>Products</span>
              </div>
              <FiChevronDown className="group-hover:rotate-180 transition-transform" />
            </div>
            <ul className="pl-8 mt-1 hidden group-hover:block">
              <li>
                <Link
                  to="/admin/products"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiList className="mr-3 text-sm" />
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/product/new"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiPlusCircle className="mr-3 text-sm" />
                  <span>Create Product</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Orders */}
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiList className="mr-3" />
              <span>Orders</span>
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link
              to="/admin/users"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiUsers className="mr-3" />
              <span>Users</span>
            </Link>
          </li>

          {/* Reviews */}
          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiStar className="mr-3" />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
