from flask import Flask
import os
from src.auth import auth
from src.bookmarks import bookmarks
from src.database import db
from flask_jwt_extended import JWTManager

def create_app(test_config=None):
    app = Flask(__name__,
    instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI")
        )

    else:
        app.config.from_mapping(test_config)

    @app.get("/")
    def index():
        return "Hello";

    @app.get("/hello")
    def hello():
        return {"message": "Hello!"}

    db.app = app
    db.init_app(app)
    
    JWTManager(app)
    
    app.register_blueprint(auth)
    app.register_blueprint(bookmarks)
    
    return app