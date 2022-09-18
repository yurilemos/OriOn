from app import db
import datetime


class Assunto(db.Model):
    __tablename__ = "assunto"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text(), nullable=True)
    data_criacao_descricao = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.now
    )
    data_ult_atualizacao = db.Column(db.DateTime, nullable=True)
    discussao_id = db.Column(
        db.Integer,
        db.ForeignKey("discussao.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=True,        
    )
    usuario_id = db.Column(
        db.Integer,
        db.ForeignKey("usuario.id", onupdate="CASCADE", ondelete="SET NULL"),
        nullable=True,
    )

    def __repr__(self):
        return "<Assunto %r>" % self.name


