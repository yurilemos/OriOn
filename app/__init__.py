
import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from config import Config
from flask_jwt_extended import JWTManager


load_dotenv(dotenv_path="./.env.local")

DEBUG = bool(os.environ.get("DEBUG", True))

ma = Marshmallow()

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG
app.config.from_object(Config)
jwt = JWTManager(app)

db = SQLAlchemy(app)
ma.init_app(app)


# pylint:disable=wrong-import-position

from app.models.usuario import Usuario, ConfiguracaoPadrao, Customizacao
from app.models.grupo import Grupo
from app.models.discussao import Discussao
from app.models.assunto import Assunto
from app.models.fala import Fala, ClasseRelacao, Relacao, RelacaoFalaFala
from app.models.participacao import Participacao
from app import routes  # noqa

# pylint:enable=wrong-import-position
db.init_app(app)
migrate = Migrate(app, db)
