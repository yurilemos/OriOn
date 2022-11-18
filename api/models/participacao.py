from api import db

# Tabela de participação de usuário com grupo de discussão
class Participacao(db.Model):
    __tablename__ = "participacao"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(
        db.Integer,
        db.ForeignKey("usuario.id", onupdate="CASCADE", ondelete="CASCADE"),
        unique=False,
        nullable=True,
    )
    grupo_id = db.Column(
        db.Integer,
        db.ForeignKey("grupo.id", onupdate="CASCADE", ondelete="CASCADE"),
        unique=False,
        nullable=True,
    )
    nivel_participacao = db.Column(db.SmallInteger, nullable=False)

    def __repr__(self):
        return "<Participacao %r>" % self.name
