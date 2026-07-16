# Spread Fast 📦

**Spread Fast** is a comprehensive, full-stack logistics and courier management system. It seamlessly connects customers sending parcels, delivery riders executing the deliveries, and administrators overseeing the entire operation. 

Whether it's same-city rapid delivery or nationwide distribution, Spread Fast handles booking, secure payments, real-time tracking, and rider dispatching all in one place.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

---

## 🔗 Important Links
- **Live Website (Client):** [https://spread-fast.web.app/](https://spread-fast.web.app/)
- **Server Repository:** [https://github.com/NahidRuhan/Spread-Fast-Server](https://github.com/NahidRuhan/Spread-Fast-Server)

---

## 🌟 Key Features

### 👤 For Users (Customers)
- **Book Parcels:** Easily schedule pickups and deliveries with detailed weight, parcel type, and specific delivery instructional data.
- **Visual Live Tracking:** Track the exact workflow stage of a parcel (from *Pending* to *Delivered*) using a live, visual timeline.
- **Secure Payments:** Integrated with Stripe for seamless, secure checkout sessions for delivery charges.
- **Payment History & Receipts:** Keep track of all paid deliveries, tracking IDs, and transaction IDs.
- **Manage Parcels:** View, track, and delete (if unpaid) your booked parcels.

### 🛵 For Delivery Riders
- **Smart Dispatch System:** View available delivery requests instantly based on your registered district, location, and current work status.
- **Accept & Manage Deliveries:** Accept deliveries and update transit statuses step-by-step (e.g., *Picked Up*, *At Origin Hub*, *Delivered*).
- **Dynamic Earnings:** Automatically calculates rider earnings based on delivery type (80% for same-city, 35% for cross-district).
- **Work Status Toggle:** Toggle between 'Available' and 'Unavailable' seamlessly right from the navigation bar to control incoming requests.

### 👑 For Administrators
- **Global Parcel Management:** Oversee every parcel in the system, track items currently at the hub, and manually update transit statuses.
- **Rider Management:** Review rider applications, verify bike details, and approve or reject riders.
- **User Management:** Search through users, manage roles (promote to Admin), and handle platform moderation.
- **Complex Logistics Routing:** Manage multi-step logistics routing across different districts (Warehouse ↔ Hub ↔ Destination).

---

## 🛠️ Tech Stack

### **Frontend (`spread-fast-client`)**
- **React.js (Vite):** Fast, modern UI development.
- **Tailwind CSS & DaisyUI:** Responsive, utility-first styling and beautiful pre-built components.
- **React Router DOM:** Client-side routing, protected routes, and role-based access control.
- **TanStack Query (React Query)** - Powerful data fetching, caching, and state synchronization.
- **Firebase Authentication:** Secure social and email/password login.
- **SweetAlert2 & Lucide React:** Interactive modals, alerts, and modern iconography.

### **Backend (`spread-fast-server`)**
- **Node.js & Express.js:** Robust server and RESTful API infrastructure.
- **MongoDB:** Flexible NoSQL database for handling parcels, users, riders, and payments.
- **Stripe API:** Processing secure online payments and managing checkout sessions.
- **Custom Authentication Middleware:** Securely verifying requests from the frontend using Firebase Admin tokens.

---

## 📦 Dependencies

The frontend client relies on a robust ecosystem of modern React libraries and tools.

### Core Dependencies
- **Core Framework:** `react` (^19.2.6), `react-dom` (^19.2.6)
- **Routing & Data Fetching:** `react-router` / `react-router-dom` (^7.15.1), `@tanstack/react-query` (^5.100.11), `axios` (^1.16.1)
- **UI & Styling:** `tailwindcss` (^4.3.0), `@tailwindcss/vite` (^4.3.0)
- **Icons & Feedback:** `lucide-react` (^1.16.0), `react-icons` (^5.6.0), `sweetalert2` (^11.26.25)
- **Maps & Visuals:** `leaflet` (^1.9.4), `react-leaflet` (^5.0.0-rc.2), `react-fast-marquee` (^1.6.5), `react-responsive-carousel` (^3.2.23)
- **Forms & Authentication:** `react-hook-form` (^7.76.0), `firebase` (^12.13.0)

### Development Dependencies
- **Build Tooling:** `vite` (^8.0.12), `@vitejs/plugin-react` (^6.0.1)
- **UI Components:** `daisyui` (^5.5.19)
- **Linting & Types:** `eslint` (^10.3.0), `@types/react` (^19.2.14), `@types/react-dom` (^19.2.3)

---

## 📁 Project Structure
```
spread-fast/
├── spread-fast-client/          # React Frontend (Vite)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, SVGs
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/             # Custom React Hooks (useAuth, useAxiosSecure)
│   │   ├── layouts/           # Main and Dashboard wrappers
│   │   ├── pages/             # Route-level components
│   │   ├── routes/            # React Router configurations
│   │   └── main.jsx           # App entry point
│   └── firebase.json          # Firebase Hosting configuration
│
└── spread-fast-server/          # Node/Express Backend
    ├── middleware/            # JWT & Role-verification middlewares
    ├── index.js               # Main server and route definitions
    └── vercel.json            # Vercel Serverless configuration
```

---

## 🚀 Local Development Setup

Follow these steps to set up the project on your local machine.

### Prerequisites
- Node.js (v16+)
- MongoDB Database (Atlas or Local)
- Stripe Account (for payment keys)
- Firebase Project (for Authentication keys & Hosting)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/spread-fast.git
cd spread-fast
```

### 2. Set Up the Server
```bash
cd spread-fast-server
npm install
```
Create a `.env` file in the `spread-fast-server` root directory:
```env
PORT=3000
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
STRIPE_SECRET=your_stripe_secret_key
SITE_DOMAIN=http://localhost:5173
```
Start the server:
```bash
npm run start
```

### 3. Set Up the Client
```bash
cd ../spread-fast-client
npm install
```
Create a `.env.local` file in the `spread-fast-client` root directory:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```
Start the client:
```bash
npm run dev
```

---

## 📦 Architecture Highlights

- **Serverless Ready:** The backend is configured with `vercel.json` and exports the Express app directly, making it 100% ready for Vercel Serverless Functions.
- **Mobile First:** The entire dashboard layout, including complex data tables and multi-step modals, is built to be perfectly responsive on mobile devices.
- **Optimistic UI Updates:** Using TanStack Query's `refetch()`, UI components (like status changes or parcel deletions) update instantaneously without hard page reloads.

---

*Built with ❤️ for rapid and reliable parcel delivery.*
