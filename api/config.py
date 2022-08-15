from datetime import timedelta
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "*********"
    SQLALCHEMY_DATABASE_URI = os.environ.get(
      "SQLALCHEMY_DATABASE_URI"
    ) or "postgresql+psycopg2://postgres:1998@localhost:5433/orion"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "please-remember-to-change-me"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
