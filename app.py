from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import json, os, uuid, datetime, random
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "apurushottam19@gmail.com"
app.config["MAIL_PASSWORD"] = "tiewoiyqzwsrigtl"

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

DEFAULT_TIPS = [
    {
        "id": "1",
        "title": "Water crops early",
        "description": "Water crops in the morning to reduce evaporation and improve absorption."
    },
    {
        "id": "2",
        "title": "Use organic fertilizer",
        "description": "Compost and organic fertilizer help improve soil quality naturally."
    }
]

DEFAULT_WEATHER = [
    {
        "id": "1",
        "location": "Espoo",
        "temperature": "10°C",
        "humidity": "75%",
        "condition": "Cloudy"
    },
    {
        "id": "2",
        "location": "Bardibas",
        "temperature": "29°C",
        "humidity": "68%",
        "condition": "Sunny"
    }
]


def load_data(filename):
    if not os.path.exists(filename):
        return []
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except:
        return []


def save_data(filename, data):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)


def seed_default_data():
    if not load_data(FILES["tip"]):
        save_data(FILES["tip"], DEFAULT_TIPS)

    if not load_data(FILES["weather"]):
        save_data(FILES["weather"], DEFAULT_WEATHER)


seed_default_data()


@app.route("/send_otp", methods=["POST"])
def send_otp():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email required"}), 400

    otp = str(random.randint(100000, 999999))
    otp_storage[email] = {
        "otp": otp,
        "expiry": datetime.datetime.now() + datetime.timedelta(minutes=10)
    }

    try:
        msg = Message(
            "Agriculture Support Verification",
            sender=app.config["MAIL_USERNAME"],
            recipients=[email]
        )
        msg.body = f"Your OTP code is: {otp}"
        mail.send(msg)
        return jsonify({"message": "OTP sent successfully"}), 200
    except Exception:
        return jsonify({"message": "Failed to send email"}), 500


@app.route("/send_reset_otp", methods=["POST"])
def send_reset_otp():
    data = request.get_json()

    email = data.get("email")
    role = data.get("role")

    if not email or not role:
        return jsonify({"message": "Email and role are required"}), 400

    if role not in ["farmer", "expert", "admin"]:
        return jsonify({"message": "Invalid role"}), 400

    users = load_data(FILES[role])
    user = next((u for u in users if u.get("email") == email), None)

    if not user:
        return jsonify({"message": "User not found"}), 404

    otp = str(random.randint(100000, 999999))
    otp_storage[email] = {
        "otp": otp,
        "expiry": datetime.datetime.now() + datetime.timedelta(minutes=10)
    }

    try:
        msg = Message(
            "Password Reset Verification",
            sender=app.config["MAIL_USERNAME"],
            recipients=[email]
        )
        msg.body = f"Your password reset OTP code is: {otp}"
        mail.send(msg)
        return jsonify({"message": "Reset OTP sent successfully"}), 200
    except Exception:
        return jsonify({"message": "Failed to send reset OTP"}), 500


@app.route("/reset_password", methods=["POST"])
def reset_password():
    data = request.get_json()

    email = data.get("email")
    role = data.get("role")
    user_otp = data.get("otp")
    new_password = data.get("new_password")

    if not email or not role or not user_otp or not new_password:
        return jsonify({"message": "Missing required fields"}), 400

    if role not in ["farmer", "expert", "admin"]:
        return jsonify({"message": "Invalid role"}), 400

    if email not in otp_storage:
        return jsonify({"message": "OTP not sent for this email"}), 400

    stored_otp = otp_storage[email]["otp"]
    expiry = otp_storage[email]["expiry"]

    if datetime.datetime.now() > expiry:
        del otp_storage[email]
        return jsonify({"message": "OTP expired"}), 400

    if stored_otp != user_otp:
        return jsonify({"message": "Invalid OTP"}), 400

    users = load_data(FILES[role])
    user_found = False

    for user in users:
        if user.get("email") == email:
            user["password"] = generate_password_hash(new_password)
            user_found = True
            break

    if not user_found:
        return jsonify({"message": "User not found"}), 404

    save_data(FILES[role], users)
    del otp_storage[email]

    return jsonify({"message": "Password reset successfully"}), 200


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    user_otp = data.get("otp")
    role = data.get("role")
    password = data.get("password")
    name = data.get("name")

    if not email or not user_otp or not role or not password or not name:
        return jsonify({"message": "Missing required fields"}), 400

    if role not in ["farmer", "expert", "admin"]:
        return jsonify({"message": "Invalid role"}), 400

    if email not in otp_storage:
        return jsonify({"message": "OTP not sent for this email"}), 400

    stored_otp = otp_storage[email]["otp"]
    expiry = otp_storage[email]["expiry"]

    if datetime.datetime.now() > expiry:
        del otp_storage[email]
        return jsonify({"message": "OTP expired"}), 400

    if stored_otp != user_otp:
        return jsonify({"message": "Invalid OTP"}), 400

    users = load_data(FILES[role])

    if any(u.get("email") == email for u in users):
        return jsonify({"message": "User already exists"}), 400

    new_user = {
        "id": str(uuid.uuid4()),
        "email": email,
        "name": name,
        "password": generate_password_hash(password),
        "role": role,
        "created_at": str(datetime.datetime.now())
    }

    if role == "farmer":
        new_user.update({
            "phone": data.get("phone", ""),
            "location": data.get("location", "")
        })
    elif role == "expert":
        new_user.update({
            "specialization": data.get("specialization", "")
        })

    users.append(new_user)
    save_data(FILES[role], users)

    del otp_storage[email]

    return jsonify({"message": "Registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not email or not password or not role:
        return jsonify({"message": "Missing required fields"}), 400

    if role not in FILES:
        return jsonify({"message": "Invalid role"}), 400

    users = load_data(FILES[role])
    user = next((u for u in users if u["email"] == email), None)

    if user and check_password_hash(user["password"], password):
        user_data = {k: v for k, v in user.items() if k != "password"}
        return jsonify({"message": "Login successful", "user": user_data}), 200

    return jsonify({"message": "Invalid email or password"}), 401


@app.route("/problems", methods=["GET"])
def get_all_problems():
    return jsonify(load_data(FILES["problem"])), 200


@app.route("/problems/<id>", methods=["GET"])
def get_single_problem(id):
    problems = load_data(FILES["problem"])
    problem = next((p for p in problems if p["problem_id"] == id), None)

    if problem:
        responses = load_data(FILES["response"])
        problem_responses = [r for r in responses if r["problem_id"] == id]
        return jsonify({"problem": problem, "responses": problem_responses}), 200

    return jsonify({"message": "Problem not found"}), 404


@app.route("/add_problem", methods=["POST"])
def add_problem():
    farmer_id = request.form.get("farmer_id")
    title = request.form.get("title")
    description = request.form.get("description")
    file = request.files.get("image")

    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400

    image_url = ""
    if file and file.filename:
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


@app.route("/respond", methods=["POST"])
def give_response():
    data = request.get_json()

    problem_id = data.get("problem_id")
    responder_id = data.get("responder_id")
    responder_name = data.get("responder_name")
    message = data.get("message")

    if not problem_id or not responder_name or not message:
        return jsonify({"message": "Missing required fields"}), 400

    responses = load_data(FILES["response"])

    new_res = {
        "response_id": str(uuid.uuid4()),
        "problem_id": problem_id,
        "responder_id": responder_id,
        "responder_name": responder_name,
        "message": message,
        "created_at": str(datetime.datetime.now())
    }

    responses.append(new_res)
    save_data(FILES["response"], responses)

    problems = load_data(FILES["problem"])
    for p in problems:
        if p["problem_id"] == problem_id:
            p["status"] = "solved"

    save_data(FILES["problem"], problems)

    return jsonify({"message": "Response recorded"}), 201


@app.route("/tips", methods=["GET"])
def get_tips():
    return jsonify(load_data(FILES["tip"])), 200


@app.route("/add_tip", methods=["POST"])
def add_tip():
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400

    tips = load_data(FILES["tip"])

    new_tip = {
        "id": str(uuid.uuid4()),
        "title": title,
        "description": description
    }

    tips.append(new_tip)
    save_data(FILES["tip"], tips)

    return jsonify({"message": "Tip added successfully", "tip": new_tip}), 201


@app.route("/weather", methods=["GET"])
def get_all_weather():
    return jsonify(load_data(FILES["weather"])), 200


@app.route("/weather/<location>", methods=["GET"])
def get_weather(location):
    all_weather = load_data(FILES["weather"])
    local_weather = [
        w for w in all_weather
        if w.get("location", "").lower() == location.lower()
    ]

    return jsonify(local_weather), 200


@app.route("/add_weather", methods=["POST"])
def add_weather():
    data = request.get_json()

    location = data.get("location")
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    condition = data.get("condition")

    if not location or not temperature or not humidity or not condition:
        return jsonify({"message": "All weather fields are required"}), 400

    weather = load_data(FILES["weather"])

    new_weather = {
        "id": str(uuid.uuid4()),
        "location": location,
        "temperature": temperature,
        "humidity": humidity,
        "condition": condition
    }

    weather.append(new_weather)
    save_data(FILES["weather"], weather)

    return jsonify({"message": "Weather added successfully", "weather": new_weather}), 201


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
