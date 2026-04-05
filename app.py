from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Temporary in-memory storage
users = {}
problems = [
    {
        "id": 1,
        "farmer_name": "Ram",
        "title": "Yellow leaves",
        "description": "My crop leaves are turning yellow.",
        "status": "Pending",
        "response": ""
    }
]


@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Agriculture Support System Backend Running"}), 200


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'farmer')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if username in users:
        return jsonify({"message": "User already exists"}), 400

    users[username] = {
        "password": password,
        "role": role
    }

    return jsonify({
        "message": "User created successfully",
        "user": {
            "username": username,
            "role": role
        }
    }), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if username not in users:
        return jsonify({"message": "User does not exist"}), 404

    if users[username]["password"] != password:
        return jsonify({"message": "Wrong password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "username": username,
            "role": users[username]["role"]
        }
    }), 200


@app.route('/problems', methods=['GET'])
def get_problems():
    return jsonify(problems), 200


@app.route('/add_problem', methods=['POST'])
def add_problem():
    data = request.get_json()

    farmer_name = data.get("farmer_name")
    title = data.get("title")
    description = data.get("description")

    if not farmer_name or not title or not description:
        return jsonify({"message": "Farmer name, title, and description are required"}), 400

    new_problem = {
        "id": len(problems) + 1,
        "farmer_name": farmer_name,
        "title": title,
        "description": description,
        "status": "Pending",
        "response": ""
    }

    problems.append(new_problem)

    return jsonify({
        "message": "Problem added successfully",
        "problem": new_problem
    }), 201


@app.route('/admin/problems', methods=['GET'])
def admin_get_problems():
    return jsonify(problems), 200


@app.route('/respond/<int:problem_id>', methods=['POST'])
def respond(problem_id):
    data = request.get_json()
    response_text = data.get("response")

    if not response_text:
        return jsonify({"message": "Response text is required"}), 400

    for problem in problems:
        if problem["id"] == problem_id:
            problem["response"] = response_text
            problem["status"] = "Answered"

            return jsonify({
                "message": "Response added successfully",
                "problem": problem
            }), 200

    return jsonify({"message": "Problem not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)