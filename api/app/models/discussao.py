from app import db
import datetime


class Discussao(db.Model):
    __tablename__ = "discussao"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.Text(), nullable=True)
    data_criacao_descricao = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.now
    )
    grupo_id = db.Column(
        db.Integer,
        db.ForeignKey("grupo.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=True,
    )
    usuario_id = db.Column(
        db.Integer,
        db.ForeignKey("usuario.id", onupdate="CASCADE", ondelete="SET NULL"),
        nullable=True,        
    )

    def __repr__(self):
        return "<Discussão %r>" % self.name
