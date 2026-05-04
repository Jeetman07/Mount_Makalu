# 🌾 Agriculture Support System – Frontend

## 👨‍💻 Developed by
Amar Kathayat

---

## 📌 Project Overview

The Agriculture Support System is a web-based application designed to help farmers by allowing them to:

- Submit crop-related problems  
- Receive responses from experts or admins  
- View weather updates  
- Access useful agricultural tips  

This repository contains the frontend implementation built using React (Vite) with API integration and role-based functionality.

---

## 🎯 Purpose of Frontend

- Provide a clean and user-friendly interface  
- Support multiple user roles (Farmer, Expert, Admin)  
- Display real-time data from backend APIs  
- Enable smooth interaction between users  

---

## 👥 User Roles & Features

### 👨‍🌾 Farmer
- Upload crop problems  
- View submitted problems  
- Check weather updates  
- View agricultural tips  

### 👨‍🔬 Expert
- View all problems  
- Respond to farmer issues  
- Update problem status  

### 👨‍💼 Admin
- Manage problems  
- Add crop tips  
- Add weather data  
- View system statistics  

---

## 🚀 Features Implemented

### 🔐 Authentication
- Login page  
- Register page  
- Forgot password UI  
- Local storage session handling  

### 🔒 Protected Routes
- Role-based access control  
- Unauthorized users redirected automatically  

### 🏠 Home Page
- Landing page with system overview  
- Navigation to dashboards  

### 📊 Dashboards
- Farmer dashboard  
- Expert dashboard  
- Admin dashboard  

### 🧾 Problem Management
- View all problems  
- Search functionality  
- Filter by status (Pending / Solved)  
- Clickable problem cards  
- Problem details page  
- Response system  

### 🌦️ Weather System
- Fetch weather data from backend  
- View weather by location  
- Admin can add weather data  

### 💡 Tips System
- Fetch tips from backend  
- Display agricultural tips  
- Admin can add tips  

### 🎨 UI/UX Improvements
- Responsive design  
- Card-based layout  
- Hover effects  
- Clean navigation  
- Role-based menus  

---

## 🛠️ Tech Stack

- React (Vite)  
- JavaScript (ES6+)  
- CSS (Custom Styling)  
- React Router DOM  
- Fetch API  

---

## 📁 Folder Structure

src/  
 ├── components/ → reusable UI components  
 ├── pages/ → application pages  
 ├── services/ → API calls  
 ├── App.jsx → routing  
 ├── main.jsx → entry point  
 └── index.css → global styles  

---

## ⚙️ Installation & Setup Guide

### 1. Install Node.js  
https://nodejs.org/

Check:
node -v  
npm -v  

### 2. Clone Repository  
git clone https://github.com/Jeetman07/Mount_Makalu.git  
cd agriculture-support-frontend 

### 3. Switch to Frontend Branch  
git checkout frontend-design  

### 4. Install Dependencies  
npm install  

### 5. Run Frontend  
npm run dev  

### 6. Open in Browser  
http://localhost:5173  

---

## 🔗 Backend Requirement

Frontend requires backend server to fetch data (API calls).

Start backend:
python app.py

Backend API runs on:
http://127.0.0.1:5000

Frontend runs on:
http://localhost:5173  

---

## 🌟 Key Highlights

- Role-based dashboards  
- Full API integration  
- Search & filter functionality  
- Clickable UI cards  
- Protected routes  
- Dynamic weather & tips  

---

## ✍️ Reflection

- Learned React project structure and routing  
- Implemented role-based UI  
- Integrated frontend with backend APIs  
- Improved UI/UX design and responsiveness  
