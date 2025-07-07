# A Modern E-Commerce Platform

![ShopSphere Banner](https://via.placeholder.com/1200x400.png?text=ShopSphere+E-Commerce)

**ShopSphere** is a full-stack e-commerce platform built with a focus on delivering a seamless shopping experience, robust admin capabilities, and a visually stunning, red-accented UI. Powered by React, Redux, and Tailwind CSS, it combines modern web technologies with an intuitive design to cater to both customers and administrators. Whether you're browsing products, managing your cart, or analyzing sales data, ShopSphere offers a professional and engaging experience.

## Table of Contents
- [Features](#features)
- [Why ShopSphere is Unique](#why-shopsphere-is-unique)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
ShopSphere offers a comprehensive set of features designed for both end-users and administrators:

### User Features
- **Product Browsing & Search**: Explore a wide range of products with a powerful search and filter system (`Search`, `Products`, `ProductCard` components).
- **Shopping Cart**: Add, update, or remove items with real-time updates and total calculations (`Cart` component).
- **Secure Checkout**: Multi-step checkout process with shipping details, order confirmation, and Stripe-powered payment processing (`Shipping`, `CheckoutSteps`, `ConfirmOrder`, `Payment` components).
- **User Authentication**: Secure login, signup, and password recovery with a modern UI (`LoginSignUp`, `ForgotPassword` components).
- **Profile Management**: View and update user details, including name, email, and password (`Profile`, `UpdateProfile` components).
- **Order History**: Track past orders with detailed views of shipping, payment, and items (`MyOrders`, `OrderDetails` components).

### Admin Features
- **Admin Dashboard**: Visualize key metrics (revenue, products, orders, users) with interactive Chart.js line and doughnut charts (`Dashboard` component).
- **Product Management**: View, create, and manage products with stock tracking (`Sidebar`, `/admin/products`, `/admin/product/new`).
- **Order Management**: Monitor and manage all customer orders (`Sidebar`, `/admin/orders`).
- **User Management**: Oversee user accounts and roles (`Sidebar`, `/admin/users`).
- **Review Management**: Handle product reviews for quality control (`Sidebar`, `/admin/reviews`).

## Why ShopSphere is Unique
ShopSphere stands out with its combination of functionality, aesthetics, and user experience:

- **Stunning Red-Accented UI**: A cohesive design with a bold red theme (`#ef4444`) across buttons, links, and charts, creating a vibrant and professional look consistent in components like `Header`, `Footer`, `OrderDetails`, and `Payment`.
- **Smooth Animations**: Subtle fade-in effects (`animate-fade-in`) and hover transitions (`hover:shadow-lg`, `hover:bg-red-50`) enhance interactivity without overwhelming users.
- **Responsive Design**: Fully responsive layout with Tailwind CSS, ensuring seamless experiences on mobile, tablet, and desktop (e.g., grid layouts in `Dashboard`, `Products`).
- **Interactive Admin Panel**: Dynamic charts (Chart.js) for revenue and stock status, with a fixed sidebar for intuitive navigation (`Dashboard`, `Sidebar`).
- **Secure and Robust**: Stripe integration for secure payments, Redux for state management, and authentication checks to protect routes (`Payment`, `Profile`, `OrderDetails`).
- **Accessible**: ARIA labels, keyboard navigation, and semantic HTML ensure inclusivity across all components.

## Technologies Used
- **Frontend**:
  - React.js: Component-based UI
  - Redux: State management for products, cart, orders, and users
  - React Router: Client-side routing
  - Tailwind CSS: Utility-first styling
  - Chart.js: Interactive data visualizations
  - Stripe (via `@stripe/react-stripe-js`): Payment processing
  - React Icons: Consistent iconography
- **Backend** (assumed):
  - Node.js/Express: API endpoints (e.g., `/api/v1/payment/process`)
  - Axios: API requests
- **Others**:
  - JavaScript (ES6+)
  - HTML5 & CSS3

## Installation
Follow these steps to set up ShopSphere locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/shopsphere.git
   cd shopsphere
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

4. **Run the Backend** (if applicable):
   Ensure your Node.js/Express backend is running (e.g., on `http://localhost:5000`).

5. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`.

## Usage
1. **Customer Flow**:
   - Browse products via the homepage or search bar.
   - Add items to the cart and proceed to checkout.
   - Enter shipping details, confirm the order, and complete payment via Stripe.
   - View and manage your profile and order history.

2. **Admin Flow**:
   - Access the admin panel at `/admin/dashboard` (requires authentication).
   - Monitor revenue, product stock, orders, and users with interactive charts.
   - Manage products, orders, users, and reviews via the sidebar navigation.

## Project Structure
```plaintext
shopsphere/
├── public/
│   ├── logo.png           # Logo for Header and Sidebar
│   └── default-product.png # Fallback product image
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MetaData.jsx
│   │   ├── product/
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Products.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── LoginSignUp.jsx
│   │   ├── cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── Shipping.jsx
│   │   │   ├── CheckoutSteps.jsx
│   │   │   ├── ConfirmOrder.jsx
│   │   │   └── Payment.jsx
│   │   ├── user/
│   │   │   ├── Profile.jsx
│   │   │   ├── UpdateProfile.jsx
│   │   │   └── MyOrders.jsx
│   │   ├── order/
│   │   │   └── OrderDetails.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       └── Sidebar.jsx
│   ├── reducers/store/
│   │   ├── slice/
│   │   │   ├── productSlice.js
│   │   │   ├── orderSlice.js
│   │   │   └── userSlice.js
│   └── App.jsx
├── .env                   # Environment variables
├── package.json
└── README.md
```

## Screenshots
### Homepage
![Homepage](https://via.placeholder.com/800x400.png?text=ShopSphere+Homepage)
Browse products with a vibrant red-themed UI.

### Checkout
![Checkout](https://via.placeholder.com/800x400.png?text=ShopSphere+Checkout)
Multi-step checkout with secure Stripe payment.

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400.png?text=ShopSphere+Admin+Dashboard)
Interactive charts for revenue and stock status.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the project’s coding style and includes tests where applicable.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out to:
- **GitHub**: [your-username](https://github.com/your-username)
- **Email**: your.email@example.com

---

⭐ **Star this repository** if you find ShopSphere useful! Your support helps us grow and improve.