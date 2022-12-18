import uuid
from os import access
from src.constants.http_status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT
from flask import Blueprint, app, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
import validators
from  flask_jwt_extended  import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from src.database import Users, db, Videos, Likes
import json


admin = Blueprint("admin",__name__,url_prefix="/api/v1/admin")

@admin.get('/get_all_users')
@jwt_required()
def get_all_users():
    users = Users.query.all()
    users_list = []
    for user in users:
        users_list.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        })
    return jsonify({
        "users": users_list
    }), HTTP_200_OK

@admin.patch('/update_user/<id>')
@jwt_required()
def update_user(id):
    admin = Users.query.filter_by(id=get_jwt_identity()).first()
    if admin.role != "admin" and get_jwt_identity() != id:
        return jsonify({'error': "You are not admin"}), HTTP_401_UNAUTHORIZED

    user = Users.query.filter_by(id=id).first()
    if user is None:
        return jsonify({'error': "User not found"}), HTTP_400_BAD_REQUEST

    for key in request.json:
        if key == "username":
            username = request.json[key]
            if len(username) < 3:
                return jsonify({'error': "User is too short"}), HTTP_400_BAD_REQUEST
            if not username.isalnum() or " " in username:
                return jsonify({'error': "Username should be alphanumeric, also no spaces"}), HTTP_400_BAD_REQUEST
            if Users.query.filter_by(username=username).first() is not None and user.username != username:
                return jsonify({'error': "username is taken"}), HTTP_409_CONFLICT
            user.username = username
        elif key == "email":
            email = request.json[key]
            if not validators.email(email):
                return jsonify({'error': "Email is not valid"}), HTTP_400_BAD_REQUEST
            if Users.query.filter_by(email=email).first() is not None and user.email != email:
                return jsonify({'error': "Email is taken"}), HTTP_409_CONFLICT
            user.email = email
        elif key == "role":
            role = request.json[key]
            if role != "admin" and role != "user":
                return jsonify({'error': "Role is not valid"}), HTTP_400_BAD_REQUEST
            user.role = role
        else:
            return jsonify({'error': "Invalid key"}), HTTP_400_BAD_REQUEST

    db.session.commit()

    return jsonify({
        'message': "User updated",
        'user': {
            'username': user.username, "email": user.email, "role": user.role
        }
        }), HTTP_200_OK

@admin.delete('/delete_user/<id>')
@jwt_required()
def delete_user(id):
    admin = Users.query.filter_by(id=get_jwt_identity()).first()
    if admin.role != "admin" and get_jwt_identity() != id:
        return jsonify({'error': "You are not admin"}), HTTP_401_UNAUTHORIZED

    user = Users.query.filter_by(id=id).first()
    if user is None:
        return jsonify({'error': "User not found"}), HTTP_400_BAD_REQUEST

    db.session.query(Users).filter(Users.id==id).delete()
    db.session.commit()

    return jsonify({
        'message': "User deleted",
        'user': {
            'username': user.username, "email": user.email, "role": user.role
        }
        }), HTTP_200_OK

