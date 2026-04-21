from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import json, os, uuid, datetime, random
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password'
mail = Mail(app)

otp_storage = {}

FILES = {
    "farmer": "farmers.json",
    "expert": "experts.json",
    "admin": "admins.json",
    "problem": "problems.json",
    "response": "responses.json",
    "tip": "tips.json",
    "weather": "weather.json"
}


def load_data(filename):
    if not os.path.exists(filename): return []
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except:
        return []


def save_data(filename, data):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)


# --- Routes ---

@app.route('/send_otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    email = data.get("email")
    if not email: return jsonify({"message": "Email required"}), 400

    otp = str(random.randint(100000, 999999))
    otp_storage[email] = {
        "otp": otp,
        "expiry": datetime.datetime.now() + datetime.timedelta(minutes=10)
    }

    try:
        msg = Message("Agriculture Support Verification",
                      sender=app.config['MAIL_USERNAME'],
                      recipients=[email])
        msg.body = f"Your OTP code is: {otp}"
        mail.send(msg)
        return jsonify({"message": "OTP sent successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Failed to send email"}), 500


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    user_otp = data.get("otp")
    role = data.get("role")

    if email not in otp_storage or otp_storage[email]["otp"] != user_otp:
        return jsonify({"message": "Invalid or expired OTP"}), 400

    users = load_data(FILES[role])
    if any(u.get("email") == email for u in users):
        return jsonify({"message": "User already exists"}), 400

    new_user = {
        "id": str(uuid.uuid4()),
        "email": email,
        "name": data.get("name"),
        "password": generate_password_hash(data.get("password")),
        "role": role,
        "created_at": str(datetime.datetime.now())
    }

    if role == "farmer":
        new_user.update({"phone": data.get("phone"), "location": data.get("location")})
    elif role == "expert":
        new_user.update({"specialization": data.get("specialization")})

    users.append(new_user)
    save_data(FILES[role], users)
    return jsonify({"message": "Registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if role not in FILES:
        return jsonify({"message": "Invalid role"}), 400

    users = load_data(FILES[role])
    user = next((u for u in users if u["email"] == email), None)

    if user and check_password_hash(user["password"], password):
        user_data = {k: v for k, v in user.items() if k != "password"}
        return jsonify({"message": "Login successful", "user": user_data}), 200

    return jsonify({"message": "Invalid email or password"}), 401


@app.route('/problems', methods=['GET'])
def get_all_problems():
    problems = load_data(FILES["problem"])
    return jsonify(problems), 200


@app.route('/problems/<id>', methods=['GET'])
def get_single_problem(id):
    problems = load_data(FILES["problem"])
    problem = next((p for p in problems if p["problem_id"] == id), None)
    if problem:
        responses = load_data(FILES["response"])
        problem_responses = [r for r in responses if r["problem_id"] == id]
        return jsonify({"problem": problem, "responses": problem_responses}), 200
    return jsonify({"message": "Problem not found"}), 404


@app.route('/add_problem', methods=['POST'])
def add_problem():
    farmer_id = request.form.get("farmer_id")
    title = request.form.get("title")
    description = request.form.get("description")
    file = request.files.get("image")

    image_url = ""
    if file:
        filename = secure_filename(file.filename)
        unique_name = f"{uuid.uuid4()}_{filename}"
        path = os.path.join(UPLOAD_FOLDER, unique_name)
        file.save(path)
        image_url = f"/uploads/{unique_name}"

    problems = load_data(FILES["problem"])
    new_problem = {
        "problem_id": str(uuid.uuid4()),
        "farmer_id": farmer_id,
        "title": title,
        "description": description,
        "image_url": image_url,
        "status": "pending",
        "created_at": str(datetime.datetime.now())
    }
    problems.append(new_problem)
    save_data(FILES["problem"], problems)
    return jsonify({"message": "Problem submitted successfully"}), 201


@app.route('/respond', methods=['POST'])
def give_response():
    data = request.get_json()
    responses = load_data(FILES["response"])

    new_res = {
        "response_id": str(uuid.uuid4()),
        "problem_id": data.get("problem_id"),
        "responder_id": data.get("responder_id"),
        "responder_name": data.get("responder_name"),
        "message": data.get("message"),
        "created_at": str(datetime.datetime.now())
    }
    responses.append(new_res)
    save_data(FILES["response"], responses)

    problems = load_data(FILES["problem"])
    for p in problems:
        if p["problem_id"] == data.get("problem_id"):
            p["status"] = "solved"
    save_data(FILES["problem"], problems)

    return jsonify({"message": "Response recorded"}), 201


@app.route('/tips', methods=['GET'])
def get_tips():
    return jsonify(load_data(FILES["tip"])), 200


@app.route('/weather/<location>', methods=['GET'])
def get_weather(location):
    all_weather = load_data(FILES["weather"])
    local_weather = [w for w in all_weather if w["location"].lower() == location.lower()]
    return jsonify(local_weather if local_weather else {"message": "No data for this location"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
