import uuid
from os import access
from src.constants.http_status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT
from flask import Blueprint, app, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
import validators
from  flask_jwt_extended  import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from src.database import Users, db, Videos, likes
import json


videos = Blueprint("videos",__name__,url_prefix="/api/v1/videos")

@videos.post('/create-video')
def create_videos():
    tittle = request.json['tittle']
    description = request.json['description']
    user_id = request.json['user_id']
    id = uuid.uuid4();
    
    videos = Videos(id = id,tittle=tittle, description=description, user_id=user_id)
    db.session.add(videos)
    db.session.commit()

    return jsonify({
        'message': "Videos created",
        'videos': {
            'tittle': tittle, "id": id
        }

    }), HTTP_201_CREATED

@videos.post('/like')
@jwt_required()
def like():
    user_id = get_jwt_identity()
    videos_id = request.json['video_id']
    
    user = Users.query.filter_by(id = user_id).first()
    video = Videos.query.filter_by(id=videos_id).first()
    
    video.likes.append(user)
    
    db.session.commit()
    return jsonify({
        'message': "Liked",
    }), HTTP_201_CREATED

@videos.get('/my-videos')
@jwt_required()
def my_videos():
    user_id = get_jwt_identity()
    user = Users.query.filter_by(id=user_id).first()
    res = []
    for video in user.video:
        res.append({
            'id':video.id,
            'tittle':video.tittle,
            'description':video.description,
            'like':len(video.likes),
            'create_at':str(video.create_at)
        })
    
    print(user.video)
    return jsonify(
        videos=res,
    ), HTTP_200_OK