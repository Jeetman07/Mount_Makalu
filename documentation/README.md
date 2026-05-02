# Agriculture Support System - Database Documentation

## Product Coordinator: Jeetman Shrestha

### Database Setup
- Database: MongoDB
- Name: Agriculture_Support
- Collections: 7 (Admin, Expert, Farmer, CropProblem, Response, CropTip, Weather)

### Collections Overview

| Collection | Documents | Description |
|------------|-----------|-------------|
| Admin | 2 | System administrators |
| Expert | 1 | Agricultural experts |
| Farmer | 1 | Registered farmers |
| CropProblem | 6 | Farmer crop issues |
| Response | 2 | Expert/admin responses |
| CropTip | 3 | Farming tips |
| Weather | 2 | Weather data |

### How to Import Database
1. Open MongoDB Compass
2. Connect to localhost:27017
3. Create database `Agriculture_Support`
4. Import JSON files from `/database` folder

### API Endpoints Tested
- GET /tips - Returns all crop tips
- GET /weather - Returns all weather data
- GET /problems - Returns all crop problems
- POST /register - User registration
- POST /login - User login

### Documentation Includes
- Product Vision Document
- ER Diagram
- System Design Document
- MongoDB Screenshots
- Jira Task Screenshots