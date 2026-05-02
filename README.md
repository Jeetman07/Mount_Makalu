🌾 Agriculture Support System – Frontend
👨‍💻 Developed by : Amar Kathayat

📌 Project Overview

The Agriculture Support System is a web-based platform designed to help farmers by allowing them to:

Submit crop-related problems
Receive responses from experts or admins
View weather updates
Access useful agricultural tips

This repository contains the frontend implementation, built using React (Vite) with full API integration and role-based functionality.

🎯 Purpose of Frontend
Provide a clean and user-friendly interface
Support multiple user roles (Farmer, Expert, Admin)
Display real-time data from backend APIs
Enable smooth interaction between users

👥 User Roles & Features

👨‍🌾 Farmer dashboard
Upload crop problems
View own problems
Check weather updates
View agricultural tips

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
Full problem information
Display responses
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
   
4. Start Frontend
   npm run dev


🌟 Key Highlights
✅ Role-based dashboards
✅ Fully functional problem system
✅ API integration (no mock data)
✅ Search & filter functionality
✅ Clickable UI cards
✅ Protected routes
✅ Dynamic weather and tips

✍️ Reflection

This project helped me to:

Build a complete frontend using React
Implement role-based authentication
Work with real backend APIs
Design responsive dashboards
Improve UI/UX skills
