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
    ) or "postgresql://mzzxvewfvewvwh:fca49a07f175c0695e798721550a5b80b1bec63a0e485020595a9370e111c0c0@ec2-3-220-207-90.compute-1.amazonaws.com:5432/d7019qdapq8n25"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "please-remember-to-change-me"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
