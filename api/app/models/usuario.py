from app import db
import datetime


class Usuario(db.Model):
    __tablename__ = "usuario"

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(256), nullable=False)
    senha = db.Column(db.String(128), nullable=False)
    perfil_usuario = db.Column(db.SmallInteger, nullable=False)
    email_usuario = db.Column(db.String(256), nullable=False)
    nome_usuario = db.Column(db.String(40), nullable=True)    
    data_ult_visita_usuario = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.now
    )
    data_pen_visita_usuario = db.Column(db.DateTime, nullable=True)
    tags_usuario = db.Column(db.Text(), nullable=True)
    
    def __repr__(self):
        return "<Usuário %r>" % self.id


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
