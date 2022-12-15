import uuid
from os import access
from src.constants.http_status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT
from flask import Blueprint, app, request, jsonify, send_file
from werkzeug.security import check_password_hash, generate_password_hash
import validators
from  flask_jwt_extended  import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from src.database import Users, db, Videos, Likes
import json


videos = Blueprint("videos",__name__,url_prefix="/api/v1/videos")

@videos.post('/create-video')
@jwt_required()
def create_videos():
    title = request.json['title']
    description = request.json['description']
    user_id = get_jwt_identity()
    url = request.json['url']
    id = uuid.uuid4();
    
    videos = Videos(id = id,url=url ,title=title, description=description, user_id=user_id)
    db.session.add(videos)
    db.session.commit()

    return jsonify({
        'message': "Videos created",
        'videos': {
            'title': title, "id": id
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
    for video in user.videos:
        res.append({
            'id':video.id,
            'title':video.title,
            'description':video.description,
            'like':len(video.likes),
            'create_at':str(video.create_at)
        })
    
    return jsonify(
        videos=res,
    ), HTTP_200_OK

@videos.get('/search')
def search():
    search = request.args.get('keyword')
    videos = Videos.query.filter(Videos.title.like(f"%{search}%")).all()
    res = []
    for video in videos:
        res.append({
            'id':video.id,
            'title':video.title,
            'description':video.description,
            'like':len(video.likes),
            'comment': 0,
            'owner':video.user.username,
            'watch': 0,
            'create_at':str(video.create_at)
        })
    return jsonify(
            data=res
        ), HTTP_200_OK

@videos.post('/upload')
@jwt_required()
def upload():
    user_id = get_jwt_identity()
    video = request.files['video']
    thumbnail = request.files['thumbnail']
    title = request.form['title']
    description = request.form['description']
    id = uuid.uuid4();
    try:
        video.save(f"src/static/videos/{id}.mp4")
        thumbnail.save(f"src/static/thumbnails/{id}.jpg")
        videos = Videos(id = id, title=title, description=description, user_id=user_id)
        db.session.add(videos)
        db.session.commit()
        return jsonify({
            'message': "Videos created",
            'videos': {
                'title': title, "id": id
            }

        }), HTTP_201_CREATED
    except Exception as e:
        print(e)
        return jsonify({
            'message': "Videos not created",
            'detail': str(e)
        }), HTTP_400_BAD_REQUEST


@videos.get('/all-videos')
def all_videos():
    videos = Videos.query.all()
    res = []
    for video in videos:
        res.append({
            'id':video.id,
            'title':video.title,
            'description':video.description,
            'like':len(video.likes),
            'comment': 0,
            'owner':video.user.username,
            'watch': 0,
            'create_at':str(video.create_at)
        })
    return jsonify(
            data=res
        ), HTTP_200_OK

@videos.get('/video/<id>')
def video(id):
    video = Videos.query.filter_by(id=id).first()
    return jsonify({
        'id':video.id,
        'title':video.title,
        'description':video.description,
        'like':len(video.likes),
        'comment': 0,
        'owner':video.user.username,
        'watch': 0,
        'create_at':str(video.create_at)
    }), HTTP_200_OK

@videos.get('/get-thumbnail/<id>')
def getThumbnail(id):
    return send_file(f"static/thumbnails/{id}.jpg"), HTTP_200_OK

@videos.get('/get-video/<id>')
def getvideo(id):
    return send_file(f"static/videos/{id}.mp4"), HTTP_200_OK

