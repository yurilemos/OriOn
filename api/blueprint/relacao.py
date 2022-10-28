from api import db, ClasseRelacao
from flask import jsonify

def cria_relacao(nome, estilo, perfil_usuario):
  
    if (perfil_usuario != 3):
        return jsonify({"message": "Usuário não tem autorização para criar relação"}), 400
  
    if (nome is None):
        return jsonify({"message": "Nome da relação obrigatório"}), 400
      
    relacao_exist = db.session.query(ClasseRelacao).filter_by(nome=nome).one_or_none()
    
    if (nome is not None):
        return jsonify({"message": "Nome já existe"}), 400
    
    relacao = ClasseRelacao(nome=nome, estilo=estilo)
  
    db.session.add(relacao)
    db.session.commit()
    return nome + ' criado'
  
def get_relacao():
    
    relacao = db.session.query(ClasseRelacao).all()
    
    result = []
    for r in relacao:
        result.append({
            'id': r.id,
            'nome': r.nome,
            'estilo': r.estilo
        })

    return jsonify(result)