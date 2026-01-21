# 🍽️ Restaurant Management System

A full-stack web application for seamless restaurant operations and customer experience management. Features an intuitive admin dashboard, dynamic menu browsing, online reservations, secure payments, and real-time order tracking.

## ✨ Key Features

### 👤 User Features
- **Online Menu Browsing** - Explore categorized dishes with detailed descriptions and ratings
- **Smart Shopping Cart** - Add/remove items, view real-time total, persistent cart storage
- **Secure Checkout** - Stripe-integrated payment processing with order history
- **Table Reservations** - Book tables with date/time selection and availability checking
- **User Dashboard** - Track orders, reservations, and payment history
- **User Reviews** - Rate and review dishes to help other customers

### 🔧 Admin Features
- **Admin Dashboard** - Comprehensive overview of restaurant metrics
- **Menu Management** - Add, edit, and remove menu items with ease
- **Order Management** - Real-time order processing and status updates
- **User Management** - View and manage user accounts and permissions
- **Reservation Management** - Handle and organize table bookings
- **Analytics** - Track sales, popular items, and customer insights

### 🔐 Security & Authentication
- Firebase Authentication (Email/Password, Google Sign-in)
- JWT-based authorization for API security
- Role-based access control (Admin/User)
- Secure password handling with bcrypt

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library with hooks and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first styling framework
- **React Router v7** - Client-side navigation and routing
- **TanStack React Query** - Server state management and caching
- **Stripe.js** - Payment processing integration
- **Firebase** - Authentication and real-time features
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Efficient form state management
- **SweetAlert2** - Beautiful alert notifications
- **Axios** - HTTP client for API requests

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB** - NoSQL database
- **JWT (jsonwebtoken)** - Secure token authentication
- **Stripe API** - Payment processing
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource handling
- **Environment Variables** - Secure configuration management

## 📋 Project Structure

```
restaurant-management-client/
├── src/
│   ├── pages/           # Page components (Home, Shop, Dashboard, etc.)
│   ├── components/      # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout wrappers
│   ├── providers/      # Context providers
│   ├── routes/         # Route definitions & protection
│   ├── utils/          # Utility functions
│   └── firebase/       # Firebase configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB running locally or cloud instance
- Firebase project credentials
- Stripe API keys

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/restaurant-management-client.git
cd restaurant-management-client

# Install dependencies
npm install

# Create .env file with:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_STRIPE_PUBLIC_KEY=your_stripe_key

# Start development server
npm run dev
```

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/restaurant-management-server.git
cd restaurant-management-server

# Install dependencies
npm install

# Create .env file with:
DB_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
MONGODB_USER=your_username
MONGODB_PASS=your_password

# Start development server
npm run dev
```

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## 🔑 Core API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Menu
- `GET /menu` - Fetch all menu items
- `POST /menu` - Add new menu item (admin)
- `PUT /menu/:id` - Update menu item (admin)
- `DELETE /menu/:id` - Delete menu item (admin)

### Cart & Orders
- `POST /orders` - Create new order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details

### Reservations
- `POST /reservations` - Book a table
- `GET /reservations` - Get user reservations
- `PATCH /reservations/:id` - Update reservation status (admin)

### Payments
- `POST /payments/intent` - Create payment intent
- `POST /payments/confirm` - Confirm payment

## 🌐 Live Demo & Deployment

- **Frontend**: [Hosted on Vercel/Netlify]
- **Backend**: [Hosted on Render/Railway]
- **Database**: MongoDB Atlas

## 📸 Screenshots

[Add screenshots of key features]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see LICENSE file for details

## 👨‍💻 Author

[Your Name] - [GitHub Profile]

## 📧 Contact & Support

- Email: support@restaurant.com
- Issues: [GitHub Issues]
- Discord: [Community Server]

---

**Happy coding! 🚀** Built with ❤️ for restaurant management excellence
