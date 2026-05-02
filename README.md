🌾 Agriculture Support System – Frontend (UI Development)
👨‍💻 Developed by: Amar Kathayat

📌 Project Overview

The Agriculture Support System is a web-based platform designed to support farmers by allowing them to:

Submit crop-related problems
Receive responses from experts or admins
View weather updates
Access useful agricultural tips

This repository contains the frontend implementation of the system, developed using React (Vite).

The frontend provides a user-friendly interface, supports role-based access, and is fully integrated with backend APIs.

🎯 Purpose of Frontend

The goal of the frontend is to:

Provide an intuitive UI for different users (Farmer, Expert, Admin)
Display real-time data from backend APIs
Enable smooth interaction between users and the system
Ensure responsive and professional design
👥 User Roles & Access
Role	Access Features
Farmer	Upload problems, view own problems, check weather, view tips
Expert	View problems, respond to farmers
Admin	Manage problems, add tips, add weather

🚀 Features Implemented
🔐 1. Authentication System


User login with role selection


User registration with OTP verification (backend connected)


Forgot password UI


Session management using localStorage


Role-based redirection after login



🔒 2. Protected Routes


Implemented using ProtectedRoute.jsx


Restricts access based on user role


Prevents unauthorized access to dashboards



🏠 3. Home Page


Landing page with system introduction


Navigation buttons:


Get Started → Register


View Dashboard → Role-based dashboard




Dynamic behavior based on login status



👨‍🌾 4. Farmer Dashboard


View only own submitted problems


Problem status indicators:


Pending


Solved




Weather section (API-based)


Tips section (API-based)


Upload problem navigation



👨‍🔬 5. Expert Dashboard


View all crop problems


Respond to farmer problems


Status automatically updates to “Solved”


Dashboard statistics:


Total Problems


Pending


Solved





👨‍💼 6. Admin Dashboard


Full system control panel


Features:


Add crop tips


Add weather data


View all problems




Dashboard statistics:


Problems count


Weather count


Tips count





📋 7. Problem Management System


View all problems page


Search functionality


Filter by status (Pending / Solved)


Clickable cards (full card navigation)


Problem details page


Response submission system



📄 8. Problem Details Page


View full problem information


Display responses from experts/admins


Show "No responses yet" if empty


Submit response form (Expert/Admin)



🌦️ 9. Weather System


Fetch weather data from backend


Display weather by location


Admin can add weather entries



💡 10. Tips System


Fetch tips from backend


Display agricultural tips


Admin can add new tips



🎨 11. UI/UX Improvements


Fully responsive design


Card-based layout system


Hover effects and animations


Clean navigation bar


Role-based menu display


Consistent color theme



🛠️ Tech Stack


React (Vite) – Frontend framework


JavaScript (ES6+) – Logic


CSS (Custom Styling) – UI design


React Router DOM – Routing


Fetch API – Backend communication



📂 Folder Structure
src/ ├── components/ │    ├── Navbar.jsx │    ├── ProtectedRoute.jsx │    ├── WeatherCard.jsx │    ├── TipCard.jsx │    ├── ProblemCard.jsx │ ├── pages/ │    ├── Home.jsx │    ├── Login.jsx │    ├── Register.jsx │    ├── ForgotPassword.jsx │    ├── FarmerDashboard.jsx │    ├── ExpertDashboard.jsx │    ├── AdminDashboard.jsx │    ├── Problems.jsx │    ├── ProblemDetails.jsx │    ├── UploadProblem.jsx │    ├── WeatherPage.jsx │    ├── TipsPage.jsx │ ├── services/ │    └── api.js │ ├── App.jsx ├── main.jsx ├── index.css

⚙️ Installation & Setup Guide
1. Clone Repository
git clone https://github.com/Jeetman07/Mount_Makalu.gitcd agriculture-support-frontend

2. Install Dependencies
npm install

3. Start Frontend
npm run dev

4. Open in Browser
http://localhost:5173

🔗 Backend Requirement
Frontend requires backend server to be running.
Start Backend:
python app.py
Backend runs on:
http://127.0.0.1:5000

📊 Current Status


UI design completed ✅


Backend integration completed ✅


Authentication system working ✅


Role-based dashboards working ✅


Problem system fully functional ✅


Weather & tips dynamic ✅


Search & filter implemented ✅


Protected routes implemented ✅



📌 Notes


This repository contains frontend only


Backend is handled by another team member


No mock data is used (fully API-based)


Designed for academic project submission

✍️ Reflection (Frontend Developer)
During this project, I learned:

Building scalable UI using React

Implementing role-based authentication

Working with REST APIs

Designing responsive dashboards

Improving UI/UX for real users



