from api.app import db


class Participacao(db.Model):
    __tablename__ = "participacao"

    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=True)
    grupo_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)
    nivel_participacao = db.Column(db.SmallInteger(1), nullable=False)

    def __repr__(self):
        return "<Participacao %r>" % self.name
