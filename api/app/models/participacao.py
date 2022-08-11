from app import db


class Participacao(db.Model):
    __tablename__ = "participacao"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=True)
    grupo_id = db.Column(db.Integer, db.ForeignKey("grupo.id"), nullable=True)
    nivel_participacao = db.Column(db.SmallInteger, nullable=False)

    def __repr__(self):
        return "<Participacao %r>" % self.name
