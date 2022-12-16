from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dataclasses import dataclass
import uuid



db = SQLAlchemy()

@dataclass
class Users(db.Model):
    id: str
    username: str
    email: str
    role: str
    videos: object
    create_at: datetime
    update_at: datetime


    id = db.Column(db.String(250), primary_key = True)
    username = db.Column(db.String(250), unique = True, nullable = False)
    email = db.Column(db.String(250), unique = True, nullable = False)
    password = db.Column(db.Text(), nullable = False)
    role = db.Column(db.String(80),nullable = False, default = "user")

    videos = db.relationship("Videos",backref='Users', lazy=True)
    likes = db.relationship("Likes",backref='Users', lazy=True)
    dislikes = db.relationship("DisLikes",backref='Users', lazy=True)
    comments = db.relationship("Comments",backref='Users', lazy=True)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())

@dataclass
class Videos(db.Model):
    id: str
    title: str
    description: str
    likes: list
    url: str
    dislikes : list
    comments: list
    watch: int
    create_at: datetime
    update_at: datetime

    id = db.Column(db.String(250),primary_key = True)
    url = db.Column(db.Text(), nullable = False)
    title = db.Column(db.String(250), nullable = False)
    description = db.Column(db.Text())
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE"),nullable=False)
    watch = db.Column(db.Integer(), default = 0)

    likes = db.relationship('Likes', backref='Videos', lazy=True)
    dislikes = db.relationship('DisLikes',backref='Videos', lazy=True)
    comments = db.relationship("Comments",backref='Videos', lazy=True)

    user = db.relationship('Users', backref='Videos', viewonly=True, lazy=True)
    
    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())
    
@dataclass
class Likes(db.Model):
    id: str
    user_id: str
    video_id: str
    create_at: datetime
    update_at: datetime

    id = db.Column(db.String(250),primary_key = True)
    video_id = db.Column(db.String(250),db.ForeignKey("videos.id", onupdate = "CASCADE", ondelete = "CASCADE"),nullable=False)
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE" ),nullable=False)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())

@dataclass
class DisLikes(db.Model):
    id: str
    user_id: str
    video_id: str
    create_at: datetime
    update_at: datetime

    id = db.Column(db.String(250),primary_key = True)
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE" ),nullable=False)
    video_id = db.Column(db.String(250),db.ForeignKey("videos.id", onupdate = "CASCADE", ondelete = "CASCADE" ),nullable=False)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())



@dataclass
class Comments(db.Model):
    id: str
    user_id: str
    video_id: str
    content: str
    create_at: datetime
    update_at: datetime
    
    id = db.Column(db.String(250),primary_key = True)
    content = db.Column(db.Text(), nullable = False)
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE"),nullable=False)
    video_id = db.Column(db.String(250),db.ForeignKey("videos.id", onupdate = "CASCADE", ondelete = "CASCADE"),nullable=False)

    video = db.relationship('Videos', backref='Comments', viewonly=True, lazy=True)
    user = db.relationship('Users', backref='Comments', viewonly=True, lazy=True)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())


