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
    video: list
    likes: list
    create_at: datetime
    update_at: datetime


    id = db.Column(db.String(250), primary_key = True)
    username = db.Column(db.String(250), unique = True, nullable = False)
    email = db.Column(db.String(250), unique = True, nullable = False)
    password = db.Column(db.Text(), nullable = False)
    role = db.Column(db.String(80),nullable = False, default = "user")

    video = db.relationship("Videos",backref='users', lazy=True)
    likes = db.relationship("Likes",backref='users', lazy=True)
    dislikes = db.relationship("DisLikes",backref='users', lazy=True)
    comments = db.relationship("Comments",backref='users', lazy=True)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())

@dataclass
class Videos(db.Model):
    id: str
    title: str
    description: str
    url: str
    user: Users
    likes: list
    comments: list
    create_at: datetime
    update_at: datetime

    id = db.Column(db.String(250),primary_key = True)
    url = db.Column(db.String(250), nullable = False)
    title = db.Column(db.String(250), nullable = False)
    description = db.Column(db.Text())
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE"),nullable=False)
    
    likes = db.relationship('Likes', backref='videos', lazy=True)
    dislikes = db.relationship('DisLikes',backref='videos', lazy=True)
    comments = db.relationship("Comments",backref='videos', lazy=True)

    user = db.relationship('Users', backref='Videos', viewonly=True, lazy=True)
    
    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())
    
@dataclass
class Likes(db.Model):
    id: str
    user: Users
    video: Videos
    create_at: datetime
    update_at: datetime

    id = db.Column(db.String(250),primary_key = True)
    video_id = db.Column(db.String(250),db.ForeignKey("videos.id", onupdate = "CASCADE", ondelete = "CASCADE"),nullable=False)
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE" ),nullable=False)
    
    video = db.relationship('Videos', backref='Likes', viewonly=True, lazy=True)
    user = db.relationship('Users', backref='Likes', viewonly=True, lazy=True)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())

@dataclass
class DisLikes(db.Model):
    id: str
    user: Users
    video: Videos
    create_at: datetime
    update_at: datetime

    id = db.Column(db.String(250),primary_key = True)
    user_id = db.Column(db.String(250),db.ForeignKey("users.id", onupdate = "CASCADE", ondelete = "CASCADE" ),nullable=False)
    video_id = db.Column(db.String(250),db.ForeignKey("videos.id", onupdate = "CASCADE", ondelete = "CASCADE" ),nullable=False)

    video = db.relationship('Videos', backref='DisLikes', viewonly=True, lazy=True)
    user = db.relationship('Users', backref='DisLikes', viewonly=True, lazy=True)

    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())



@dataclass
class Comments(db.Model):
    id: str
    user: Users
    video: Videos
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

