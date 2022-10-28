
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

from api.models.usuario import Usuario, ConfiguracaoPadrao, Customizacao
from api.models.grupo import Grupo
from api.models.discussao import Discussao
from api.models.assunto import Assunto
from api.models.fala import Fala, ClasseRelacao, Relacao, RelacaoFalaFala
from api.models.participacao import Participacao
from api import routes  # noqa

# pylint:enable=wrong-import-position
db.init_app(app)
migrate = Migrate(app, db)
