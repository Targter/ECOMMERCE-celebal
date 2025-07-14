import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../reducers/store/slice/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { error, products, loading } = useSelector((state) => state.product);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          toast.success("Product deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete product");
        });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/products");
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                All Products
              </h1>

              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* <Link
                  to="/admin/product/new"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <FiPlus /> Add Product
                </Link> */}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {filteredProducts?.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No products found</p>
                    <Link
                      to="/admin/product/new"
                      className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <FiPlus /> Create your first product
                    </Link>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts?.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="truncate max-w-xs inline-block">
                              {product._id}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm ${
                              product.Stock <= 10
                                ? "text-red-600 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {product.Stock}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{product.price.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <Link
                                to={`/admin/product/${product._id}`}
                                className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                title="Edit"
                              >
                                <FiEdit2 size={16} />
                                <span className="hidden md:inline">Edit</span>
                              </Link>
                              <button
                                onClick={() =>
                                  deleteProductHandler(
                                    product._id,
                                    product.name
                                  )
                                }
                                className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                                <span className="hidden md:inline">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
