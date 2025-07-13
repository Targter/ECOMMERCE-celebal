const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel.js");
const Order = require("../models/orderModel.js");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
router.post("/create-order", isAuthenticatedUser, async (req, res) => {
  const { amount, cartItems, shippingInfo } = req.body;

  console.log("Create-order request body:", JSON.stringify(req.body, null, 2));

  // Validate request body
  if (!amount || !cartItems || !Array.isArray(cartItems) || !shippingInfo) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${[
        !amount && "amount",
        !cartItems && "cartItems",
        !Array.isArray(cartItems) && "cartItems (must be an array)",
        !shippingInfo && "shippingInfo",
      ]
        .filter(Boolean)
        .join(", ")}`,
    });
  }

  // Validate cartItems structure
  if (
    cartItems.some(
      (item) =>
        !item.productId ||
        !item.quantity ||
        !item.price ||
        !item.name ||
        !item.image
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Each cart item must include productId, quantity, price, name, and image",
    });
  }

  // Validate shippingInfo
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.pinCode ||
    !shippingInfo.phoneNo
  ) {
    return res.status(400).json({
      success: false,
      message:
        "shippingInfo must include address, city, state, country, pinCode, and phoneNo",
    });
  }

  try {
    const options = {
      amount: Number(amount) * 100, // Convert to paisa
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to create order",
          error: error.message,
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// Verify payment and create order
router.post("/verify-payment", isAuthenticatedUser, async (req, res) => {
  console.log(
    "Verify-payment request body:",
    JSON.stringify(req.body, null, 2)
  );

  const { paymentId, orderId, signature, orderDetails } = req.body;

  // Log individual fields
  console.log("paymentId:", paymentId);
  console.log("orderId:", orderId);
  console.log("signature:", signature);
  console.log("orderDetails:", orderDetails);

  // Check if orderDetails exists
  if (!orderDetails) {
    return res.status(400).json({
      success: false,
      message: "orderDetails is missing or undefined",
    });
  }

  const {
    cartItems,
    shippingInfo,
    subtotal,
    shippingCharges,
    tax,
    totalPrice,
  } = orderDetails;

  // Log destructured fields
  console.log("cartItems:", cartItems);
  console.log("shippingInfo:", shippingInfo);
  console.log("subtotal:", subtotal);
  console.log("shippingCharges:", shippingCharges);
  console.log("tax:", tax);
  console.log("totalPrice:", totalPrice);
  console.log("req.user:", req.user);

  // Validate request body
  const missingFields = [];
  if (!paymentId) missingFields.push("paymentId");
  if (!orderId) missingFields.push("orderId");
  if (!signature) missingFields.push("signature");
  if (!cartItems) missingFields.push("cartItems");
  if (!shippingInfo) missingFields.push("shippingInfo");
  if (subtotal === undefined || subtotal === null)
    missingFields.push("subtotal");
  if (shippingCharges === undefined || shippingCharges === null)
    missingFields.push("shippingCharges");
  if (tax === undefined || tax === null) missingFields.push("tax");
  if (totalPrice === undefined || totalPrice === null)
    missingFields.push("totalPrice");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Validate cartItems structure
  if (
    !Array.isArray(cartItems) ||
    cartItems.some(
      (item) =>
        !item.productId ||
        !item.quantity ||
        !item.price ||
        !item.name ||
        !item.image
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "cartItems must be an array with each item containing productId, quantity, price, name, and image",
    });
  }

  // Validate shippingInfo
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.pinCode ||
    !shippingInfo.phoneNo
  ) {
    return res.status(400).json({
      success: false,
      message:
        "shippingInfo must include address, city, state, country, pinCode, and phoneNo",
    });
  }

  try {
    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    console.log("expectedSignature:", expectedSignature);
    console.log("receivedSignature:", signature);

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed.",
      });
    }

    // Create Payment
    const payment = new Payment({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      user: req.user._id,
      amount: totalPrice,
      status: "Paid",
    });

    await payment.save();

    // Create Order
    const order = new Order({
      user: req.user._id,
      shippingInfo: {
        ...shippingInfo,
        pinCode: Number(shippingInfo.pinCode), // Convert to number
        phoneNo: Number(shippingInfo.phoneNo), // Convert to number
      },
      orderItems: cartItems.map((item) => ({
        product: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      paymentInfo: {
        id: paymentId,
        status: "Paid",
      },
      paidAt: Date.now(),
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCharges,
      totalPrice,
      orderStatus: "Processing",
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error in payment verification or order creation:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification or order creation failed",
      error: error.message,
    });
  }
});

// Get payment route (for testing)
router.get("/get-payment", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment route is working",
  });
});

module.exports = router;
