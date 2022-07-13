from api.app import db


class Assunto(db.Model):
    __tablename__ = "assunto"

    id = db.Column(db.Integer, primary_key=True)
    conteudo = db.Column(db.Text(), nullable=False)
    data_criacao_fala = db.Column(db.DateTime, nullable=False)
    data_ult_atualizacao_assunto = db.Column(db.DateTime, nullable=True)
    imagem_virtual = db.Column(db.String(256), nullable=True)
    imagem_real = db.Column(db.String(256), nullable=True)
    tamanho = db.Column(db.Integer(11), nullable=True)
    arquivo_virtual = db.Column(db.String(256), nullable=True)
    arquivo_real = db.Column(db.String(256), nullable=True)
    arquivo_tamanho = db.Column(db.Integer(11), nullable=True)
    url = db.Column(db.String(256), nullable=True)
    assunto_id = db.Column(db.Integer, db.ForeignKey("assunto.id"), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    relacao_id = db.Column(db.Integer, db.ForeignKey("relacao.id"), nullable=True)

    def __repr__(self):
        return "<Assunto %r>" % self.name


class ClasseRelacao(db.Model):
    __tablename__ = "relacao"

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

    fala_mae_id = db.Column(db.Integer, db.ForeignKey("fala.id"), nullable=True)
    relacao_id = db.Column(db.Integer, db.ForeignKey("relacao.id"), nullable=True)

    def __repr__(self):
        return "<Relação fala %r>" % self.name
