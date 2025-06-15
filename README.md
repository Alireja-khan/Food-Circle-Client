# 🍽️ FoodCircle - Food Sharing Website

Welcome to **FoodCircle**, a full-stack food sharing web application where users can donate and request food. It’s designed to help reduce food waste and support those in need.

This app is built with **React**, **Firebase**, **MongoDB**, and **Express**, with a clean UI using **Tailwind CSS**, **Chakra UI**, **Daisy UI**, and other modern libraries. It includes full **CRUD operations**, secure **authentication**, and responsive design.

---

## 🔗 Live Website

👉 [Live Link](https://utter-waste.surge.sh/)  
👉 [Clint Repository](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Alireja-khan)  
👉 [Server Repository](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Alireja-khan)

---

## 🎯 Purpose

FoodCircle allows users to:
- Donate food items with details.
- Browse available food donations.
- Request food securely.
- Manage their own food listings and requests.
- Check the donors Profile to appreciate them.

This platform promotes community sharing and food sustainability.

---

## 🚀 Key Features

### ✅ User System
- Login / Register with **Email & Password**
- **Google Social Login**
- User-specific data fetching (My Foods, My Requests)

### ✅ Food Management
- **Add Food**: Form with validation and auto-fill donor info
- **Update / Delete Food**
- **Available Foods Page**: With **sort by expire date and more**, and **layout toggle**
- **Request Food**: Changes status and moves to My Requests
- **Food Details Modal**: Detailed view and request system

### ✅ UI & UX
- Fully responsive (📱 mobile / 💻 desktop)
- **3-column to 2-column layout toggle**
- Eye-pleasing **color scheme** and **consistent spacing**
- SweetAlert2 for confirmation, error, and success notifications
- Framer Motion animation on the homepage

### ✅ Tech Stack
- **React 19**, **React Router DOM 7**
- **Firebase Auth**
- **MongoDB** with secure credentials
- **Express.js Server** (on Render / Vercel)
- **TanStack Query** with mutations
- **Axios + AxiosSecure Custom Hook**
- **Tailwind CSS**, **Chakra UI**, **DaisyUI**,
- **Framer Motion**, **Swiper**, **Lottie**, **SweetAlert2**

---

## 🧪 Pages & Routes

---------------------------------------------------------
| Route              | Description                      |
|--------------------|----------------------------------|
| `/`                | Home Page                        |
| `/available-foods` | All available foods              |
| `/add-food`        | Add new food (Private)           |
| `/manage-foods`    | Manage own foods (Private)       |
| `/my-requests`     | View food requests (Private)     |
| `/food/:id`        | Food detail + request modal      |
| `/login`           | User login                       |
| `/register`        | User registration                |
---------------------------------------------------------
---

## 🛡️ Security

- 🔐 **Firebase & MongoDB credentials** stored in `.env` variables
- 🔐 **JWT token** used for secure communication with server
- 🔐 Auth-protected private routes

---

## 🧩 Packages Used

-------------------------------------------------------------------------------------------------------------------------------------------------
| Category         | Packages                                                                                                                   |
|------------------|----------------------------------------------------------------------------------------------------------------------------|
| Core             | `react`, `react-dom`, `react-router-dom`, `vite`                                                                           |
| Auth & Backend   | `firebase`, `axios`, `jwt-decode`, `@tanstack/react-query`                                                                 |
| UI & Design      | `tailwindcss`, `daisyui`, `chakra-ui`, `framer-motion`, `preline`, `swiper`, `sweetalert2`, `lucide-react`, `lottie-react` |
| Utilities        | `class-variance-authority`, `typewriter-effect`, `react-icons`                                                             |
-------------------------------------------------------------------------------------------------------------------------------------------------
---

📬 Contact
Developer: [Md. Alireja Khan]
Email: ali2reja@.com

