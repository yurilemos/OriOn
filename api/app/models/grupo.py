from app import db
import datetime


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
        return "<Grupo %r>" % self.nome_grupo
