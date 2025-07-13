<div align="center">

# 🛒 Buy Me - E-Commerce Platform
**_Your Ultimate Online Shopping Destination_**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

🛍️ A modern, full-featured e-commerce platform built with **React**, **Node.js**, **Express**, and **MongoDB**, offering a seamless shopping experience with secure payments via **Razorpay**.

[🚀 Live Demo](https://buy-me.vercel.app/) • [📚 GitHub Repository](https://github.com/Targter/ECOMMERCE-celebal.git) • [🐛 Report Bug](https://github.com/Targter/ECOMMERCE-celebal/issues)

<img src="public/screenshot.png" alt="Buy Me Homepage" width="700"/>

</div>

---

## 🌟 About Buy Me

**Buy Me** is a robust e-commerce web application designed to provide a seamless and secure online shopping experience. Built with **React** and **Node.js**, it features a responsive frontend, a scalable backend, and secure payment processing with **Razorpay**. The platform allows users to browse products, add items to their cart, provide shipping details, and complete purchases with confidence. With a focus on user experience and performance, **Buy Me** is ideal for both customers and administrators managing an online store.

---

## 🚀 Features

### Core Functionality
- **Product Browsing**: Explore a wide range of products with detailed views, including images, prices, and descriptions.
- **Shopping Cart**: Add, update, or remove items with real-time cart updates using **Redux**.
- **Checkout Process**: Multi-step checkout with shipping information and order confirmation.
- **Secure Payments**: Integrated with **Razorpay** for secure and reliable payment processing.
- **User Authentication**: Secure login and registration system for personalized shopping experiences.
- **Order Management**: Track orders and view order history (admin and user views).

### Payment Features
- **Razorpay Integration**: Supports payments in INR with real-time verification using Razorpay’s order and payment APIs.
- **Payment Verification**: Validates transactions using HMAC SHA256 signatures for security.
- **Order Confirmation**: Creates orders in MongoDB upon successful payment, with detailed order summaries.

### UI/UX & Accessibility
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices using **Tailwind CSS**.
- **Modern Interface**: Clean, user-friendly design with smooth animations and hover effects.
- **Feedback System**: Toast notifications for user actions (e.g., adding to cart, payment success/failure) using **react-toastify**.
- **Accessible**: Semantic HTML and ARIA labels for improved accessibility.

---

## 🛠 Tech Stack

| Category         | Technology             | Purpose                                                                     |
|------------------|------------------------|-----------------------------------------------------------------------------|
| 🚀 Frontend      | React 18              | Component-based UI for dynamic and interactive user experience              |
| 🎨 Styling       | Tailwind CSS          | Utility-first CSS framework for responsive and customizable designs         |
| 🧠 State Management | Redux Toolkit         | Centralized state management for cart and user data                        |
| 🔌 Backend       | Node.js, Express       | Scalable server-side API handling product, order, and payment logic         |
| 🗄️ Database      | MongoDB Atlas         | NoSQL database for storing products, users, orders, and payments            |
| 💳 Payment       | Razorpay              | Secure payment gateway for processing transactions                         |
| 🛡️ Authentication | JWT                   | Secure user authentication and session management                          |
| 📢 Notifications  | react-toastify        | User-friendly toast notifications for feedback                             |

---

## 🚀 Getting Started

Follow these steps to set up and run **Buy Me** locally:

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account or local MongoDB instance
- **Razorpay** account for payment integration (test mode recommended for development)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Targter/ECOMMERCE-celebal.git
   cd ECOMMERCE-celebal
   ```

2. **Install dependencies for both frontend and backend**:
   ```bash
   # Install backend dependencies
   cd b2
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `b2` folder with:
     ```env
     PORT=3005
     MONGODB_URI=<your-mongodb-uri>
     RAZORPAY_KEY_ID=<your-razorpay-key-id>
     RAZORPAY_SECRET=<your-razorpay-secret>
     JWT_SECRET=<your-jwt-secret>
     ```
   - Create a `.env` file in the `frontend` folder with:
     ```env
     VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
     VITE_API_URL=http://localhost:3005/api/v1
     ```

4. **Run the backend and frontend**:
   ```bash
   # In the b2 folder
   cd b2
   npm run dev

   # In a new terminal, in the frontend folder
   cd frontend
   npm run dev
   ```

5. **Open your browser**:
   - Navigate to `http://localhost:5173` (or the port shown in the frontend terminal) to access the frontend.
   - The backend runs on `http://localhost:3005`.

---

## 🎨 Customization & Enhancements

### Adding Products
- Populate the MongoDB `Product` collection with product data (name, price, images, stock).
- Update the backend API (`/api/v1/product/:id`) to return valid image URLs.

### Admin Features
- Implement an admin dashboard to manage products, orders, and users.
- Add endpoints for CRUD operations on products and order status updates.

### Payment Enhancements
- Support additional payment gateways (e.g., Stripe, PayPal).
- Add refund processing and payment history views.

### UI Customization
- Modify `frontend/tailwind.config.js` for custom themes or colors.
- Update component styles in `frontend/src` for specific visual tweaks.

---

## 🚀 Deployment

**Buy Me** is optimized for deployment on platforms like:
- **Vercel** (for the frontend)
- **Render** or **Heroku** (for the backend)
- **MongoDB Atlas** (for the database)

### Deployment Steps
1. **Frontend**:
   - Deploy the `frontend` folder to Vercel.
   - Set environment variables in Vercel’s dashboard (`VITE_RAZORPAY_KEY_ID`, `VITE_API_URL`).
2. **Backend**:
   - Deploy the `b2` folder to Render or Heroku.
   - Configure `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`, and `JWT_SECRET` in the platform’s environment settings.
3. **Database**:
   - Set up a MongoDB Atlas cluster and update `MONGODB_URI`.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository: `https://github.com/Targter/ECOMMERCE-celebal.git`.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Make changes and commit: `git commit -m "Add your feature"`.
4. Push to your fork: `git push origin feature/your-feature-name`.
5. Submit a pull request with a clear description.

Please ensure your code follows the existing style and includes relevant tests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">

**Built with passion for creating a seamless e-commerce experience.**

Special thanks to:
- 🌟 Razorpay for secure payment integration.
- 🎨 Tailwind CSS for a modern and responsive design.
- ⚛️ React and Redux Toolkit for a dynamic frontend.
- ☁️ MongoDB Atlas for reliable data storage.
- 🙌 The open-source community for continuous inspiration.

---

<sub>Made with ❤️ and 🛒 by [Your Name] to empower online shopping.</sub>

**[⭐ Star this repo](https://github.com/Targter/ECOMMERCE-celebal)** • **[🐛 Report Bug](https://github.com/Targter/ECOMMERCE-celebal/issues)** • **[💡 Request Feature](https://github.com/Targter/ECOMMERCE-celebal/issues)**

</div>