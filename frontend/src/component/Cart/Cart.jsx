// import React, { Fragment } from "react";
// import "./Cart.css";
// import CartItemCard from "./CartItemCard";
// import { useSelector, useDispatch } from "react-redux";
// // import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
// import {
//   addItemsToCart,
//   removeItemsFromCart,
// } from "../../reducers/store/slice/cartSlice";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const Cart = () => {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   // increaseQuantity
//   const increaseQuantity = (id, quantity, stock) => {
//     const newQty = quantity + 1;
//     // console.log("called");
//     if (stock <= quantity) {
//       return;
//     }
//     dispatch(addItemsToCart({ id: id, quantity: newQty }));
//   };

//   const decreaseQuantity = (id, quantity) => {
//     // console.log("Decrease quantity called", id, quantity);
//     const newQty = quantity - 1;
//     if (1 >= quantity) {
//       return;
//     }
//     dispatch(addItemsToCart({ id: id, quantity: newQty }));
//   };

//   const deleteCartItems = (id) => {
//     dispatch(removeItemsFromCart(id));
//   };

//   const checkoutHandler = () => {
//     navigate("/login?redirect=shipping");
//   };

//   const ab = (a, b) => {
//     console.log("abcalled", a, b);
//   };
//   return (
//     <Fragment>
//       {cartItems.length === 0 ? (
//         <div className="emptyCart">
//           {/* <RemoveShoppingCartIcon /> */}
//           <FaShoppingCart size={20} />
//           <div>No Product in Your Cart</div>
//           <Link to="/products">View Products</Link>
//         </div>
//       ) : (
//         <Fragment>
//           <div className="cartPage">
//             <div className="cartHeader">
//               <p>Product</p>
//               <p>Quantity</p>
//               <p>Subtotal</p>
//             </div>

//             {cartItems &&
//               cartItems.map((item) => (
//                 <div className="cartContainer" key={item.product}>
//                   <CartItemCard item={item} deleteCartItems={deleteCartItems} />
//                   <div className="cartInput">
//                     <button
//                       onClick={() => {
//                         decreaseQuantity(item.product, item.quantity);
//                       }}
//                     >
//                       -
//                     </button>
//                     <input type="number" value={item.quantity} readOnly />
//                     <button
//                       onClick={() =>
//                         increaseQuantity(
//                           item.product,
//                           item.quantity,
//                           item.stock
//                         )
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="cartSubtotal">{`₹${
//                     item.price * item.quantity
//                   }`}</p>
//                 </div>
//               ))}

//             <div className="cartGrossProfit">
//               <div></div>
//               <div className="cartGrossProfitBox">
//                 <p>Gross Total</p>
//                 <p>{`₹${cartItems.reduce(
//                   (acc, item) => acc + item.quantity * item.price,
//                   0
//                 )}`}</p>
//               </div>
//               <div></div>
//               <div className="checkOutBtn">
//                 <button onClick={checkoutHandler}>Check Out</button>
//               </div>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Cart;

//

import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../reducers/store/slice/cartSlice";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    const newQty = quantity + 1;
    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) {
      return;
    }
    const newQty = quantity - 1;
    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 animate-fade-in mt-[90px]">
          <div className="text-center">
            <FaShoppingCart className="text-gray-400 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart and start shopping!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
              aria-label="View products"
            >
              <FaShoppingCart size={16} />
              View Products
            </Link>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="min-h-screen bg-gray-100 py-12 mt-[90px]">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
                Your Cart
              </h1>
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Cart Header */}
                <div className="hidden md:grid grid-cols-6 gap-4 border-b border-gray-200 pb-4 mb-4">
                  <p className="col-span-3 text-sm font-semibold text-gray-700">
                    Product
                  </p>
                  <p className="col-span-1 text-sm font-semibold text-gray-700 text-center">
                    Quantity
                  </p>
                  <p className="col-span-1 text-sm font-semibold text-gray-700 text-center">
                    Subtotal
                  </p>
                  <p className="col-span-1 text-sm font-semibold text-gray-700 text-center">
                    Remove
                  </p>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4 border-b border-gray-200 items-center"
                  >
                    <div className="col-span-3">
                      <CartItemCard
                        item={item}
                        deleteCartItems={deleteCartItems}
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center space-x-2">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                        disabled={item.quantity <= 1}
                        className={`px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 ${
                          item.quantity <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center border rounded-md px-2 py-1 bg-gray-50"
                        aria-label={`Quantity of ${item.name}`}
                      />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                        disabled={item.quantity >= item.stock}
                        className={`px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 ${
                          item.quantity >= item.stock
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="col-span-1 text-sm font-medium text-gray-800 text-center">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => deleteCartItems(item.product)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Cart Summary */}
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="w-full sm:w-1/2">
                      <div className="bg-gray-50 rounded-md p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                          Cart Summary
                        </h2>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="font-medium">
                              ₹{cartTotal.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-600">Tax (5%)</p>
                            <p className="font-medium">
                              ₹{(cartTotal * 0.05).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex justify-between font-semibold text-gray-800">
                            <p>Total</p>
                            <p>₹{(cartTotal * 1.05).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={checkoutHandler}
                      className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                      aria-label="Proceed to checkout"
                    >
                      <FaShoppingCart size={16} />
                      Proceed to Checkout
                    </button>
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

export default Cart;
