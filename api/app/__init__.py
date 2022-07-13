from crypt import methods
import datetime
import os
from flask_sqlalchemy import SQLAlchemy
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from flask_migrate import Migrate

from config import Config


load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG
app.config.from_object(Config)

db = SQLAlchemy(app)


class Usuario(db.Model):
    __tablename__ = "usuario"

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(20), nullable=False)
    senha = db.Column(db.String(128), nullable=False)
    perfil_usuario = db.Column(db.String(20), nullable=False)
    email_usuario = db.Column(db.String(100), nullable=False)
    nome_usuario = db.Column(db.String(40), nullable=True)
    data_ult_visita_usuario = db.Column(db.DateTime, nullable=True)
    data_pen_visita_usuario = db.Column(db.DateTime, nullable=True)
    tags_usuario = db.Column(db.Text(), nullable=True)
    
    def __repr__(self):
        return "<Usuário %r>" % self.id
    

class Grupo(db.Model):
    __tablename__ = "grupo"

    id = db.Column(db.Integer, primary_key=True)
    nome_grupo = db.Column(db.String(50), nullable=False)
    descricao_grupo = db.Column(db.Text(), nullable=True)
    data_criacao_grupo = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow
    )
    visibilidade_grupo = db.Column(db.SmallInteger, unique=False, nullable=True)
    status_grupo = db.Column(db.SmallInteger, unique=False, nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=True)

    def __repr__(self):
        return "<Grupo %r>" % self.name


class Participacao(db.Model):
    __tablename__ = "participacao"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=True)
    grupo_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)
    nivel_participacao = db.Column(db.SmallInteger, nullable=False)

    def __repr__(self):
        return "<Participacao %r>" % self.name


class Discussao(db.Model):
    __tablename__ = "discussao"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.Text(), nullable=True)
    data_criacao_descricao = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow
    )
    grupo_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)

    def __repr__(self):
        return "<Discussão %r>" % self.name


class Assunto(db.Model):
    __tablename__ = "assunto"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text(), nullable=True)
    data_criacao_descricao = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow
    )
    data_ult_atualizacao = db.Column(db.DateTime, nullable=True)
    discussao_id = db.Column(db.Integer, db.ForeignKey("discussao.id"), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)

    def __repr__(self):
        return "<Assunto %r>" % self.name
    
    
class Fala(db.Model):
    __tablename__ = "fala"

    id = db.Column(db.Integer, primary_key=True)
    conteudo = db.Column(db.Text(), nullable=False)
    data_criacao_fala = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow
    )
    data_ult_atualizacao_fala = db.Column(db.DateTime, nullable=True)
    imagem_virtual = db.Column(db.String(256), nullable=True)
    imagem_real = db.Column(db.String(256), nullable=True)
    tamanho = db.Column(db.Integer, nullable=True)
    arquivo_virtual = db.Column(db.String(256), nullable=True)
    arquivo_real = db.Column(db.String(256), nullable=True)
    arquivo_tamanho = db.Column(db.Integer, nullable=True)
    url = db.Column(db.String(256), nullable=True)
    assunto_id = db.Column(db.Integer, db.ForeignKey("assunto.id"), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    relacao_id = db.Column(db.Integer, db.ForeignKey("relacao.id"), nullable=True)

    def __repr__(self):
        return "<Fala %r>" % self.name

 
class ClasseRelacao(db.Model):
    __tablename__ = "classe_relacao"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(30), nullable=True)

    def __repr__(self):
        return "<Classe relação %r>" % self.name


class Relacao(db.Model):
    __tablename__ = "relacao"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(30), nullable=True)
    classe_relacao_id = db.Column(
        db.Integer, db.ForeignKey("classe_relacao.id"), nullable=True
    )

    def __repr__(self):
        return "<Relação fala %r>" % self.name


class RelacaoFalaFala(db.Model):
    __tablename__ = "relacao_fala"

    id = db.Column(db.Integer, primary_key=True)
    fala_mae_id = db.Column(db.Integer, db.ForeignKey("fala.id"), nullable=True)
    relacao_id = db.Column(db.Integer, db.ForeignKey("relacao.id"), nullable=True)

    def __repr__(self):
        return "<Relação fala %r>" % self.name

 
class ConfiguracaoPadrao(db.Model):
    __tablename__ = "customização_padrao"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(20), nullable=False)
    descricao = db.Column(db.String(50), nullable=True)
    valor = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return "<Customização Padrão %r>" % self.name


class Customizacao(db.Model):
    __tablename__ = "customização"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)
    customizacao_padrao_id = db.Column(
        db.Integer, db.ForeignKey("customização_padrao.id"), nullable=True
    )
    valor = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return "<Customização %r>" % self.name
# pylint: disable=wrong-import-position


from app import routes, models  # noqa

# pylint: enable=wrong-import-position
db.init_app(app)
migrate = Migrate(app, db)
