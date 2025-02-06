"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [user.serialize() for user in users]
    return jsonify({"Users List: ":users_list})

@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())

@api.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    new_user = User(
        email=data['email'],
        password=data['password'],
        is_active=data.get('is_active', True)
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)

    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.is_active = data.get('is_active', user.is_active)

    db.session.commit()
    return jsonify(user.serialize())

@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user/login', methods=['POST'])
def login_user():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Aquí deberías implementar la lógica para verificar las credenciales del usuario
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        # Suponiendo que el login fue exitoso
        return jsonify({
            "message": "Login successful",
            "user": user.serialize()
        }), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401


if __name__ == '__main__':
    db.create_all()
    api.run(debug=True)