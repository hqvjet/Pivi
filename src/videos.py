import uuid
from os import access
from src.constants.http_status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT
from flask import Blueprint, app, request, jsonify, send_file
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import func
import validators
from  flask_jwt_extended  import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from src.database import Users, db, Videos, Likes, DisLikes, Comments
import json
# import cloudinary
# import cloudinary.uploader
# import cloudinary.api


videos = Blueprint("videos",__name__,url_prefix="/api/v1/videos")
# CRUD
# Create
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
        videos = Videos(id = id,url=f"{id}", title=title, description=description, user_id=user_id)
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

# Upload to cloudinary

# @videos.post("/upload-cloud")
# def upload_file():
  # cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), 
          # api_key=os.getenv('API_KEY'), 
          # api_secret=os.getenv('API_SECRET'))
  # upload_result = None
  # if request.method == 'POST':
    # file_to_upload = request.files['file']
    # if file_to_upload:
      # upload_result = cloudinary.uploader.upload(file_to_upload)
      # return jsonify(upload_result)

# Liked videos
@videos.get("/liked")
@jwt_required()
def liked_videos():
    user_id = get_jwt_identity()
    videos = Videos.query.join(Likes).filter(Likes.user_id == user_id).all()
    res = []
    for video in videos:
        res.append({
            "id": video.id,
            "title": video.title,
            "description": video.description,
            "url": video.url,
            "user_id": video.user_id,
            "owner": video.user.username,
            "watch": video.watch,
            "likes": len(video.likes),
            "dislikes": len(video.dislikes),
            "comments": len(video.comments)
        })
    return jsonify(
        videos=res
    ), HTTP_200_OK

# Read
@videos.get('/all-videos')
def all_videos():
    videos = Videos.query.order_by(func.random()).all()
    res = []
    for video in videos:
        res.append({
            'id':video.id,
            'title':video.title,
            'description':video.description,
            'like':len(video.likes),
            'dislike':len(video.dislikes),
            'comment': len(video.comments),
            'owner':video.user.username,
            'watch': video.watch,
            'create_at':str(video.create_at)
        })
    return jsonify(
            data=res
        ), HTTP_200_OK

# Update
@videos.patch('/update/<id>')
@jwt_required()
def update(id):
    user_id = get_jwt_identity()
    user = Users.query.filter_by(id=user_id).first()
    video = Videos.query.filter_by(id=id).first()
    if video:
        if video.user_id == user_id or user.role == "admin":
            # title = request.form['title']
            # description = request.form['description']
            # video.title = title
            # video.description = description

            for key in request.json:
                setattr(video, key, request.json[key])

            db.session.commit()
            return jsonify({
                'message': "Videos updated",
                'videos': {
                    "id": id
                }

            }), HTTP_201_CREATED
        else:
            return jsonify({
                'message': "Videos not updated",
                'detail': "You are not the owner of this video"
            }), HTTP_400_BAD_REQUEST
    else:
        return jsonify({
            'message': "Videos not updated",
            'detail': "Video not found"
        }), HTTP_400_BAD_REQUEST
# Delete
@videos.delete('/delete/<id>')
@jwt_required()
def delete(id):
    user_id = get_jwt_identity()
    user = Users.query.filter_by(id=user_id).first()
    video = Videos.query.filter_by(id=id).first()
    if video:
        if video.user_id == user_id or user.role == "admin":
            
            db.session.query(Videos).filter(Videos.id == id).delete()
            db.session.commit()
            return jsonify({
                'message': "Videos deleted",
                'videos': {
                    'id': id
                }

            }), HTTP_201_CREATED
        else:
            return jsonify({
                'message': "Videos not deleted",
                'detail': "You are not the owner of this video"
            }), HTTP_400_BAD_REQUEST
    else:
        return jsonify({
            'message': "Videos not deleted",
            'detail': "Video not found"
        }), HTTP_400_BAD_REQUEST


# Like
@videos.post('/like/<id>')
@jwt_required()
def like(id):
    user_id = get_jwt_identity()
    video = Videos.query.filter_by(id=id).first()
    if video:
        like = Likes.query.filter_by(user_id=user_id, video_id=id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            return jsonify({
                'message': "Videos unliked",
                'videos': {
                    'id': id
                }

            }), HTTP_201_CREATED
        else:
            like = Likes(id=uuid.uuid4(),user_id=user_id, video_id=id)
            db.session.add(like)
            db.session.commit()
            return jsonify({
                'message': "Videos liked",
                'videos': {
                    'id': id
                }

            }), HTTP_201_CREATED
    else:
        return jsonify({
            'message': "Videos not liked",
            'detail': "Video not found"
        }), HTTP_400_BAD_REQUEST

# DisLike
@videos.post('/dislike/<id>')
@jwt_required()
def dislike(id):
    user_id = get_jwt_identity()
    video = Videos.query.filter_by(id=id).first()
    if video:
        dislike = DisLikes.query.filter_by(user_id=user_id, video_id=id).first()
        if dislike:
            db.session.delete(dislike)
            db.session.commit()
            return jsonify({
                'message': "Videos undisliked",
                'videos': {
                    'id': id
                }

            }), HTTP_201_CREATED
        else:
            dislike = DisLikes(id=uuid.uuid4(), user_id=user_id, video_id=id)
            db.session.add(dislike)
            db.session.commit()
            return jsonify({
                'message': "Videos disliked",
                'videos': {
                    'id': id
                }

            }), HTTP_201_CREATED
    else:
        return jsonify({
            'message': "Videos not disliked",
            'detail': "Video not found"
        }), HTTP_400_BAD_REQUEST


@videos.post('/comment')
@jwt_required()
def comment():
    user_id = get_jwt_identity()
    videos_id = request.json['video_id']
    content = request.json['content']
    id = uuid.uuid4();
    comment = Comments( id=id, user_id=user_id, video_id=videos_id, content=content )
    db.session.add(comment)
    db.session.commit()
    return jsonify({
        'message': "Commented",
    }), HTTP_201_CREATED

#  Delete comment 


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
            'dislike':len(video.dislikes),
            'comments':len(video.comments),
            'watched':video.watch,
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
            'dislike':len(video.dislikes),
            'comment': 0,
            'owner':video.user.username,
            'watch': video.watch,
            'create_at':str(video.create_at)
        })
    return jsonify(
            data=res
        ), HTTP_200_OK



@videos.get('/video/<id>')
def video(id):
    video = Videos.query.filter_by(id=id).first()
    video.watch = video.watch + 1
    
    db.session.commit()

    comments = []
    for comment in video.comments:
        comments.append({
            'id':comment.id,
            'content':comment.content,
            'user':comment.user.username,
            'create_at':str(comment.create_at)
        })

    return jsonify({
        'id':video.id,
        'title':video.title,
        'description':video.description,
        'like':len(video.likes),
        'dislike':len(video.dislikes),
        'comment': comments,
        'owner':video.user.username,
        'watch': video.watch,
        'create_at':str(video.create_at)
    }), HTTP_200_OK

@videos.get('/get-thumbnail/<id>')
def getThumbnail(id):
    return send_file(f"static/thumbnails/{id}.jpg"), HTTP_200_OK

@videos.get('/get-video/<id>')
def getvideo(id):
    # video = Videos.query.filter_by(id=id).first()
    # video.watch = video.watch + 1
    # db.session.commit()
    return send_file(f"static/videos/{id}.mp4"), HTTP_200_OK

