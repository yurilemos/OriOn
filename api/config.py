import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "*********"
    SQLALCHEMY_DATABASE_URI = os.environ.get(
      "SQLALCHEMY_DATABASE_URI"
    ) or "postgresql+psycopg2://postgres:1998@localhost:5433/orion"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
