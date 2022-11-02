from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String(250), unique = True, nullable = False)
    email = db.Column(db.String(250), unique = True, nullable = False)
    password = db.Column(db.Text(), nullable = False)
    create_at = db.Column(db.DateTime(), default = datetime.now())
    update_at = db.Column(db.DateTime(), onupdate = datetime.now())
    
    def __repr__(self) -> str:
        return 'User>>>{self.username}'
    