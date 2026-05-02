# 🌾 Agriculture Support System API
### Developed by Purushottam Adhikari
A lightweight, Flask-based backend designed to bridge the gap between farmers and agricultural experts. This system handles secure user authentication, problem reporting with image support, and real-time agricultural data.

## 🚀 Key Features

*   **Role-Based Access:** Specialized workflows for **Farmers**, **Experts**, and **Admins**.
*   **OTP Verification:** Secure registration and password resets using `Flask-Mail` for email-based verification.
*   **Problem Management:** Support for uploading crop images and detailed descriptions of agricultural issues.
*   **Expert Solutions:** Real-time status updates (Pending → Solved) when experts provide responses to farmer queries.
*   **Information Services:** Built-in endpoints for localized weather tracking and daily farming tips.

---

## 🛠️ Tech Stack

*   **Framework:** Python / Flask
*   **Security:** Werkzeug (Password Hashing)
*   **Email:** Flask-Mail (SMTP)
*   **CORS:** Enabled for cross-platform frontend integration
*   **Storage:** Local JSON-based persistence (No complex database setup required)

---

## 📋 Prerequisites

- Python 3.8+
- A Gmail account with an **App Password** generated for OTP delivery.

---

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone Repository: https://github.com/Jeetman07/Mount_Makalu 
    ```

2.  **Install Dependencies**
    ```bash
    pip install flask flask-cors flask-mail
    ```

3.  **Environment Configuration**
    Update the `app.config` section in `app.py` with your credentials:
    ```python
    app.config["MAIL_USERNAME"] = "apurushottam19@gmail.com"
    app.config["MAIL_PASSWORD"] = "tiewoiyqzwsrigtl"
    ```

4.  **Run the Server**
    ```bash
    python app.py
    ```
    The API will be available at `[http://127.0.0.1:5000](http://127.0.0.1:5000)`.

---

## 📡 API Documentation

### 🔐 Authentication
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/send_otp` | `POST` | Generates and sends a 6-digit code for registration. |
| `/register` | `POST` | Creates a new user profile (requires a valid OTP). |
| `/login` | `POST` | Authenticates user and returns profile metadata. |
| `/send_reset_otp` | `POST` | Sends a verification code for password recovery. |
| `/reset_password` | `POST` | Updates password using a valid reset OTP. |

### 🚜 Problem Solving
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/problems` | `GET` | Retrieve a list of all reported farming issues. |
| `/add_problem` | `POST` | Submit a new issue (supports Multipart/Form-Data for images). |
| `/problems/<id>` | `GET` | View a specific problem and all expert responses. |
| `/respond` | `POST` | Allows experts to submit advice and mark a problem as 'Solved'. |

---

## 📂 Project Structure
```text
├── app.py              # Core application logic and API routes
├── uploads/            # Storage for uploaded crop/problem images
├── farmers.json        # Database for farmer accounts
├── experts.json        # Database for expert accounts
├── problems.json       # Central store for agricultural issues
└── responses.json      # Store for expert-provided solutions
