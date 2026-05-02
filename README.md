🌾 Agriculture Support System – Frontend (UI Development)
👨‍💻 Developed by

Amar Kathayat

📌 Project Overview

The Agriculture Support System is a web-based platform designed to help farmers by allowing them to:

Submit crop-related problems
Receive responses from experts or admins
View weather updates
Access useful agricultural tips

This repository contains the frontend implementation, built using React (Vite), with full API integration and role-based functionality.

🎯 Purpose of Frontend
Provide a clean and user-friendly interface
Support multiple user roles (Farmer, Expert, Admin)
Display real-time data from backend APIs
Enable smooth interaction between users
👥 User Roles
Role	Features
Farmer	Upload problems, view own problems, check weather, view tips
Expert	View problems, respond to farmers
Admin	Manage problems, add tips, add weather
🚀 Features Implemented
🔐 Authentication
Login with role selection
Register with OTP verification
Forgot password UI
Local storage session management
🔒 Protected Routes
Role-based access using ProtectedRoute
Unauthorized users redirected automatically
🏠 Home Page
Landing page with system overview
Dynamic navigation
Dashboard redirection based on role
👨‍🌾 Farmer Dashboard
View own submitted problems
Status tracking (Pending / Solved)
Weather section (API-based)
Tips section (API-based)
Upload problem feature
👨‍🔬 Expert Dashboard
View all problems
Respond to problems
Status auto-updated to “Solved”
Dashboard statistics
👨‍💼 Admin Dashboard
Add crop tips
Add weather data
View all problems
System statistics
📋 Problem Management
View all problems
Search functionality
Filter by status
Clickable cards
Problem details page
Response system
📄 Problem Details Page
Full problem info
Show responses
“No responses yet” message
Submit response form
🌦️ Weather System
Fetch weather data from backend
View by location
Admin can add weather
💡 Tips System
Fetch tips from backend
Display tips
Admin can add tips
🎨 UI/UX Improvements
Responsive design
Card-based layout
Hover effects
Clean navigation
Role-based menus
🛠️ Tech Stack
React (Vite)
JavaScript (ES6+)
CSS (Custom Styling)
React Router DOM
Fetch API
📂 Folder Structure
src/
 ├── components/   → reusable UI components
 ├── pages/        → application pages
 ├── services/     → API calls
 ├── App.jsx       → routing
 ├── main.jsx      → entry point
 ├── index.css     → global styles
⚙️ Installation & Setup Guide
1. Clone Repository
git clone https://github.com/Jeetman07/Mount_Makalu.git

cd Mount_Makalu/agriculture-support-frontend
2. Install Dependencies
npm install
3. Start Frontend
npm run dev
4. Open in Browser
http://localhost:5173
⚠️ Important Notes
This runs on local development server
localhost:5173 works only on your machine
Backend must be running for full functionality
🔗 Backend Requirement

Start backend separately:

python app.py

Backend runs on:

http://127.0.0.1:5000
🌟 Key Highlights
✅ Role-based dashboards
✅ Fully functional problem system
✅ API integration (no mock data)
✅ Search & filter functionality
✅ Clickable UI cards
✅ Protected routes
✅ Dynamic weather and tips
🖼️ Screenshots (Add Your Images)

📊 Current Status
UI completed ✅
Backend integrated ✅
Authentication working ✅
Dashboards functional ✅
Problem system complete ✅
Weather & tips dynamic ✅


✍️ Reflection

This project helped me to:

Build a complete frontend using React
Implement role-based authentication
Work with real backend APIs
Design responsive dashboards
Improve UI/UX skills
