# System Design Document - Agriculture Support System

## 1. System Architecture
- Frontend: React.js
- Backend: Flask (Python)
- Database: MongoDB
- Communication: REST APIs

## 2. Database Schema (ER Diagram)

### Collections and Fields:

#### Farmer Collection
| Field | Type | Description |
|-------|------|-------------|
| farmer_id | String | Primary Key |
| name | String | Farmer's full name |
| phone | String | Contact number |
| location | String | Farming area |
| password | String | Hashed password |
| created_at | Date | Account creation date |

#### CropProblem Collection
| Field | Type | Description |
|-------|------|-------------|
| problem_id | String | Primary Key |
| farmer_id | String | Foreign Key |
| title | String | Problem title |
| description | String | Problem details |
| image_url | String | Uploaded image path |
| status | String | pending/solved |
| created_at | Date | Submission date |

#### Response Collection
| Field | Type | Description |
|-------|------|-------------|
| response_id | String | Primary Key |
| problem_id | String | Foreign Key |
| responder_id | String | Expert/Admin ID |
| responder_role | String | expert/admin |
| message | String | Response text |
| created_at | Date | Response date |

#### Expert Collection
| Field | Type | Description |
|-------|------|-------------|
| expert_id | String | Primary Key |
| name | String | Expert name |
| specialization | String | Area of expertise |
| contact | String | Phone/Email |
| password | String | Hashed password |

#### Admin Collection
| Field | Type | Description |
|-------|------|-------------|
| admin_id | String | Primary Key |
| name | String | Admin name |
| email | String | Contact email |
| password | String | Hashed password |

#### Weather Collection
| Field | Type | Description |
|-------|------|-------------|
| weather_id | String | Primary Key |
| location | String | City/Area |
| temperature | Float | Current temp |
| humidity | Float | Humidity % |
| condition | String | Sunny/Rainy/Cloudy |
| date | Date | Record date |

#### CropTip Collection
| Field | Type | Description |
|-------|------|-------------|
| tip_id | String | Primary Key |
| title | String | Tip title |
| description | String | Tip details |
| crop_type | String | Related crop |
| created_at | Date | Creation date |

## 3. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /send_otp | Send OTP for registration |
| POST | /register | Register user (farmer/expert/admin) |
| POST | /login | User login |
| GET | /tips | Get all crop tips |
| GET | /weather | Get all weather data |
| GET | /problems | Get all crop problems |
| POST | /add_problem | Add new crop problem |
| POST | /respond | Add response to problem |
| POST | /add_tip | Add new crop tip |
| POST | /add_weather | Add weather data |
| POST | /send_reset_otp | Send OTP for password reset |
| POST | /reset_password | Reset password |

## 4. Project Roadmap

| Week | Tasks |
|------|-------|
| Week 1-2 | Requirements, Tech Stack, Team formation |
| Week 3-4 | ER Diagram, System Design, API planning |
| Week 5-6 | Database setup, Backend development, Testing |
| Week 7 | Frontend integration, Final submission |

## 5. Git Workflow

- Repository: https://github.com/Jeetman07/Mount_Makalu
- Branches: main, frontend-design, backend
- Team members: Jeetman (Coordinator), Amar (Frontend), Purushottam (Backend)