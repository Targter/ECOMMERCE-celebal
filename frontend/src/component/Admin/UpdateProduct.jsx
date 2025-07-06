// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   updateProduct,
//   getProductDetails,
// } from "../../actions/productAction";
// // import { useAlert } from "react-alert";
// // import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// // import AccountTreeIcon from "@material-ui/icons/AccountTree";
// // import DescriptionIcon from "@material-ui/icons/Description";
// // import StorageIcon from "@material-ui/icons/Storage";
// // import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// // import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import SideBar from "./Sidebar";
// import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

// const UpdateProduct = ({ history, match }) => {
//   const dispatch = useDispatch();
//   // const alert = useAlert();

//   const { error, product } = useSelector((state) => state.productDetails);

//   const {
//     loading,
//     error: updateError,
//     isUpdated,
//   } = useSelector((state) => state.product);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [Stock, setStock] = useState(0);
//   const [images, setImages] = useState([]);
//   const [oldImages, setOldImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);

//   const categories = [
//     "Laptop",
//     "Footwear",
//     "Bottom",
//     "Tops",
//     "Attire",
//     "Camera",
//     "SmartPhones",
//   ];

//   const productId = match.params.id;

//   useEffect(() => {
//     if (product && product._id !== productId) {
//       dispatch(getProductDetails(productId));
//     } else {
//       setName(product.name);
//       setDescription(product.description);
//       setPrice(product.price);
//       setCategory(product.category);
//       setStock(product.Stock);
//       setOldImages(product.images);
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
//       // alert.success("Product Updated Successfully");
//       history.push("/admin/products");
//       dispatch({ type: UPDATE_PRODUCT_RESET });
//     }
//   }, [
//     dispatch,
//     // alert,
//     error,
//     history,
//     isUpdated,
//     productId,
//     product,
//     updateError,
//   ]);

//   const updateProductSubmitHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("price", price);
//     myForm.set("description", description);
//     myForm.set("category", category);
//     myForm.set("Stock", Stock);

//     images.forEach((image) => {
//       myForm.append("images", image);
//     });
//     dispatch(updateProduct(productId, myForm));
//   };

//   const updateProductImagesChange = (e) => {
//     const files = Array.from(e.target.files);

//     setImages([]);
//     setImagesPreview([]);
//     setOldImages([]);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagesPreview((old) => [...old, reader.result]);
//           setImages((old) => [...old, reader.result]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <Fragment>
//       <MetaData title="Create Product" />
//       <div className="dashboard">
//         <SideBar />
//         <div className="newProductContainer">
//           <form
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={updateProductSubmitHandler}
//           >
//             <h1>Create Product</h1>

//             <div>
//               {/* <SpellcheckIcon /> */}
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               {/* <AttachMoneyIcon /> */}
//               <input
//                 type="number"
//                 placeholder="Price"
//                 required
//                 onChange={(e) => setPrice(e.target.value)}
//                 value={price}
//               />
//             </div>

//             <div>
//               {/* <DescriptionIcon /> */}

//               <textarea
//                 placeholder="Product Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 cols="30"
//                 rows="1"
//               ></textarea>
//             </div>

//             <div>
//               {/* <AccountTreeIcon /> */}
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Choose Category</option>
//                 {categories.map((cate) => (
//                   <option key={cate} value={cate}>
//                     {cate}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               {/* <StorageIcon /> */}
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 required
//                 onChange={(e) => setStock(e.target.value)}
//                 value={Stock}
//               />
//             </div>

//             <div id="createProductFormFile">
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={updateProductImagesChange}
//                 multiple
//               />
//             </div>

//             <div id="createProductFormImage">
//               {oldImages &&
//                 oldImages.map((image, index) => (
//                   <img key={index} src={image.url} alt="Old Product Preview" />
//                 ))}
//             </div>

//             <div id="createProductFormImage">
//               {imagesPreview.map((image, index) => (
//                 <img key={index} src={image} alt="Product Preview" />
//               ))}
//             </div>

//             <button
//               id="createProductBtn"
//               type="submit"
//               disabled={loading ? true : false}
//             >
//               Create
//             </button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateProduct;

//
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiBox,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiDatabase,
  FiImage,
  FiPlus,
  FiSave,
} from "react-icons/fi";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../reducers/store/slice/productSlice";
import Loader from "../layout/Loader/Loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const {
    error,
    product,
    loading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.product);
  console.log("Current product state:", product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
    if (!product || (product && product._id !== productId)) {
      console.log("Dispatching getProductDetails for productId:", productId);
      dispatch(getProductDetails(productId));
    } else if (product) {
      console.log("Populating form with product:", product);
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setCategory(product.category || "");
      setStock(product.Stock || 0);
      setOldImages(product.images || []);
    }

    if (error) {
      dispatch(clearErrors());
    }

    if (updateError) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");
    }
    // const id = productId;
    console.log("hereh::");
    // getProductDetails(productId);
    // consolel;
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((image) => myForm.append("images", image));
    dispatch(updateProduct({ id: productId, productData: myForm }));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="flex min-h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Update Product
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={updateProductSubmitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2 mb-2 font-medium">
                      <FiBox /> Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2 mb-2 font-medium">
                      <FiDollarSign /> Price
                    </label>
                    <input
                      type="number"
                      placeholder="Price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="flex items-center gap-2 mb-2 font-medium">
                      <FiFileText /> Description
                    </label>
                    <textarea
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2 mb-2 font-medium">
                      <FiGrid /> Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stock */}
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2 mb-2 font-medium">
                      <FiDatabase /> Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Stock"
                      required
                      value={Stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Images */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="flex items-center gap-2 mb-2 font-medium">
                      <FiImage /> Product Images
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                        <FiPlus /> Choose Files
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={updateProductImagesChange}
                          multiple
                          className="hidden"
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        {images.length > 0
                          ? `${images.length} images selected`
                          : "No images selected"}
                      </span>
                    </div>
                  </div>

                  {/* Image Previews */}
                  <div className="flex flex-wrap gap-4 md:col-span-2">
                    {oldImages?.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                        className="w-24 h-24 object-cover rounded border"
                      />
                    ))}
                    {imagesPreview.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Product Preview"
                        className="w-24 h-24 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FiSave /> {loading ? "Updating..." : "Update Product"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
