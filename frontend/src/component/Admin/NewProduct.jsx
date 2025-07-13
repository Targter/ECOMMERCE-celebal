import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
} from "../../reducers/store/slice/productSlice";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  FiBox,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiDatabase,
  FiImage,
  FiPlus,
} from "react-icons/fi";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.product);

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    Stock: 0,
    images: [],
    ratings: 0,
    imagesPreview: [],
    numOfReviews: 0,
    reviews: [],
  });

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, navigate, success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "Stock" ? Number(value) : value,
    }));
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    console.log("prodict data price:", productData.price);
    myForm.set("name", productData.name);
    myForm.set("price", 34);
    myForm.set("description", productData.description);
    myForm.set("category", productData.category);
    myForm.set("Stock", 345);
    myForm.set("ratings", 45);
    myForm.set("numOfReviews", 2);
    myForm.set("reviews", JSON.stringify(productData.reviews));
    // console.log("image:", image);
    productData.images.forEach((image) => {
      myForm.append("images", image.file);
    });

    const formDataObj = {};
    myForm.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log("FormData contents:", formDataObj);

    // console.log("Form Data Object:", formObject);

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const mockImages = files.map((file, index) => {
      return {
        public_id: `mock_public_id_${index}`,
        url: URL.createObjectURL(file), // temporary preview URL (no actual upload)
      };
    });
    console.log("mocKImages:", mockImages);
    setProductData((prev) => ({
      ...prev,
      images: mockImages,
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MetaData title="Create Product" />
      <SideBar />

      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FiPlus className="mr-2" /> Create Product
          </h1>

          <form onSubmit={createProductSubmitHandler} className="space-y-6">
            {/* Product Name */}
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2">
                <FiBox className="mr-2" /> Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                required
                value={productData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2">
                <FiDollarSign className="mr-2" /> Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                required
                min="0"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2">
                <FiFileText className="mr-2" /> Description
              </label>
              <textarea
                name="description"
                placeholder="Product description"
                value={productData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2">
                <FiGrid className="mr-2" /> Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2">
                <FiDatabase className="mr-2" /> Stock
              </label>
              <input
                type="number"
                name="Stock"
                placeholder="Available stock"
                required
                min="0"
                value={productData.Stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label className="flex items-center text-gray-700 mb-2">
                <FiImage className="mr-2" /> Product Images
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiImage className="w-8 h-8 mb-3 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Image Previews */}
            {productData.imagesPreview.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {productData.imagesPreview.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
