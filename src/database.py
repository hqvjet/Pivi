from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid



db = SQLAlchemy()

likes = db.Table('like',
    db.Column('user_id', db.String(250), db.ForeignKey('users.id'), primary_key=True),
    db.Column('video_id', db.String(250), db.ForeignKey('videos.id'), primary_key=True)
)
class Users(db.Model):
    id = db.Column(db.String(250), primary_key = True)
    username = db.Column(db.String(250), unique = True, nullable = False)
    email = db.Column(db.String(250), unique = True, nullable = False)
    password = db.Column(db.Text(), nullable = False)
    role = db.Column(db.String(80),nullable = False, default = "user")
    video = db.relationship("Videos",backref='users', lazy=True)
    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())
class Videos(db.Model):
    id = db.Column(db.String(250),primary_key = True)
    tittle = db.Column(db.String(250), nullable = False)
    description = db.Column(db.Text())
    user_id = db.Column(db.String(250),db.ForeignKey("users.id"),nullable=False)
    likes = db.relationship('Users', secondary=likes, lazy='subquery',
        backref=db.backref('videos', lazy=True))

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())
    
