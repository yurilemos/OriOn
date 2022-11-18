
import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from config import Config
from flask_jwt_extended import JWTManager

# Pega as variáveis do ambiente .env
load_dotenv(dotenv_path="./.env.local")

# Set flag Debug
DEBUG = bool(os.environ.get("DEBUG", True))

ma = Marshmallow()

# Inicializa app
app = Flask(__name__)
CORS(app)

# Configura o app
app.config["DEBUG"] = DEBUG
app.config.from_object(Config)
# Inicializa ferramente de autenticação e token integrada com o app
jwt = JWTManager(app)

# Declara banco de dados integrado com o app
db = SQLAlchemy(app)
ma.init_app(app)


# pylint:disable=wrong-import-position
# Importa Models e as rotas do sistema
from api.models.usuario import Usuario, ConfiguracaoPadrao, Customizacao
from api.models.grupo import Grupo
from api.models.discussao import Discussao
from api.models.assunto import Assunto
from api.models.fala import Fala, ClasseRelacao, Relacao, RelacaoFalaFala
from api.models.participacao import Participacao
from api import routes  # noqa

# pylint:enable=wrong-import-position
# Inicializa banco de dados
db.init_app(app)
# Checa alterações feitas no no app que afetem o banco de dados
migrate = Migrate(app, db)
