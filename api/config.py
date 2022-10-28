from datetime import timedelta
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "*********"
    # SQLALCHEMY_DATABASE_URI = os.environ.get(
    #  "SQLALCHEMY_DATABASE_URI"
    # ) or "postgresql+psycopg2://postgres:1998@localhost:5433/orion"
    SQLALCHEMY_DATABASE_URI = os.environ.get(
      "SQLALCHEMY_DATABASE_URI"
    ) or "postgres://gdncnrrawsumbw:52434c0f81f620e4815fa3eef6312f5b24c6dec88a985ccbaa31dae0a7a40a53@ec2-3-220-207-90.compute-1.amazonaws.com:5432/d2tgal3hv4dv2e"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "please-remember-to-change-me"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
