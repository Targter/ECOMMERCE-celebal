// import { Link } from "react-router-dom";
// import logo from "../../images/logo.png";
// import {
//   FiHome,
//   FiUsers,
//   FiShoppingBag,
//   FiPlusCircle,
//   FiList,
//   FiStar,
//   FiChevronDown,
//   FiChevronRight,
// } from "react-icons/fi";

// const Sidebar = () => {
//   return (
//     <div className=" h-full w-auto bg-white shadow-md ">
//       {/* Logo */}
//       <div className="p-4 border-b">
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="Ecommerce" className="h-10" />
//         </Link>
//       </div>

//       {/* Navigation */}
//       <nav className="p-4">
//         <ul className="space-y-2">
//           {/* Dashboard */}
//           <li>
//             <Link
//               to="/admin/dashboard"
//               className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
//             >
//               <FiHome className="mr-3" />
//               <span>Dashboard</span>
//             </Link>
//           </li>

//           {/* Products Dropdown */}
//           <li className="group">
//             <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
//               <div className="flex items-center">
//                 <FiShoppingBag className="mr-3" />
//                 <span>Products</span>
//               </div>
//               <FiChevronDown className="group-hover:rotate-180 transition-transform" />
//             </div>
//             <ul className="pl-8 mt-1 hidden group-hover:block">
//               <li>
//                 <Link
//                   to="/admin/products"
//                   className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
//                 >
//                   <FiList className="mr-3 text-sm" />
//                   <span>All Products</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/product/new"
//                   className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
//                 >
//                   <FiPlusCircle className="mr-3 text-sm" />
//                   <span>Create Product</span>
//                 </Link>
//               </li>
//             </ul>
//           </li>

//           {/* Orders */}
//           <li>
//             <Link
//               to="/admin/orders"
//               className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
//             >
//               <FiList className="mr-3" />
//               <span>Orders</span>
//             </Link>
//           </li>

//           {/* Users */}
//           <li>
//             <Link
//               to="/admin/users"
//               className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
//             >
//               <FiUsers className="mr-3" />
//               <span>Users</span>
//             </Link>
//           </li>

//           {/* Reviews */}
//           <li>
//             <Link
//               to="/admin/reviews"
//               className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
//             >
//               <FiStar className="mr-3" />
//               <span>Reviews</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

//

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiPlusCircle,
  FiList,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-red-100 text-red-600"
      : "text-gray-700 hover:bg-red-50 hover:text-red-600";

  return (
    <div className="h-full w-64 bg-white shadow-md ">
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
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                "/admin/dashboard"
              )}`}
              aria-label="Admin Dashboard"
            >
              <FiHome className="mr-3" size={18} />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Products Dropdown */}
          <li>
            <button
              onClick={toggleProducts}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-200 ${
                isActive("/admin/products") || isActive("/admin/product/new")
              }`}
              aria-label="Toggle Products Menu"
            >
              <div className="flex items-center">
                <FiShoppingBag className="mr-3" size={18} />
                <span>Products</span>
              </div>
              <FiChevronDown
                className={`transition-transform duration-200 ${
                  isProductsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`pl-8 mt-1 space-y-1 ${
                isProductsOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to="/admin/products"
                  className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive(
                    "/admin/products"
                  )}`}
                  aria-label="All Products"
                >
                  <FiList className="mr-3 text-sm" />
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/product/new"
                  className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive(
                    "/admin/product/new"
                  )}`}
                  aria-label="Create Product"
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
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                "/admin/orders"
              )}`}
              aria-label="All Orders"
            >
              <FiList className="mr-3" size={18} />
              <span>Orders</span>
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                "/admin/users"
              )}`}
              aria-label="All Users"
            >
              <FiUsers className="mr-3" size={18} />
              <span>Users</span>
            </Link>
          </li>

          {/* Reviews */}
          <li>
            <Link
              to="/admin/reviews"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive(
                "/admin/reviews"
              )}`}
              aria-label="All Reviews"
            >
              <FiStar className="mr-3" size={18} />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
