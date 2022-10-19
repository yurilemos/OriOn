from app import db
import datetime


class Fala(db.Model):
    __tablename__ = "fala"

    id = db.Column(db.Integer, primary_key=True)
    conteudo = db.Column(db.Text(), nullable=False)
    data_criacao_fala = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.now
    )
    data_ult_atualizacao_fala = db.Column(db.DateTime, nullable=True)
    imagem_virtual = db.Column(db.String(256), nullable=True)
    imagem_real = db.Column(db.String(256), nullable=True)
    tamanho = db.Column(db.Integer, nullable=True)
    arquivo_virtual = db.Column(db.String(256), nullable=True)
    arquivo_real = db.Column(db.String(256), nullable=True)
    arquivo_tamanho = db.Column(db.Integer, nullable=True)
    url = db.Column(db.String(256), nullable=True)
    assunto_id = db.Column(
        db.Integer,
        db.ForeignKey("assunto.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )
    usuario_id = db.Column(
        db.Integer,
        db.ForeignKey("usuario.id", onupdate="CASCADE", ondelete="SET NULL"),
        nullable=True,
    )
    nome_usuario = db.Column(db.String(40), nullable=True) 
    classe_relacao_id = db.Column(
        db.Integer,
        db.ForeignKey("classe_relacao.id", onupdate="CASCADE", ondelete="SET NULL"),
        nullable=True,
    )
    fala_mae_id = db.Column(
        db.Integer,
        db.ForeignKey("fala.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=True,
    )

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
        db.Integer, 
        db.ForeignKey("classe_relacao.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=True,
    )

    def __repr__(self):
        return "<Relação fala %r>" % self.name


class RelacaoFalaFala(db.Model):
    __tablename__ = "relacao_fala"

    id = db.Column(db.Integer, primary_key=True)
    fala_mae_id = db.Column(db.Integer, db.ForeignKey("fala.id"), nullable=True)
    relacao_id = db.Column(
        db.Integer,
        db.ForeignKey("relacao.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=True,
    )

    def __repr__(self):
        return "<Relação fala %r>" % self.name