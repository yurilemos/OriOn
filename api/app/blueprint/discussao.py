from app import db, Usuario, Grupo, Discussao, Assunto
from flask import jsonify


def get_discussao(id):
    if (id is None):
        return jsonify({"message": "Id da discussão obrigatório"}), 400
    
    discussao = Discussao.query.filter_by(id=id).one()
    
    if (discussao is None):
        return jsonify({"message": "Id da discussão obrigatório"}), 400
    
    assuntos = Assunto.query.filter_by(discussao_id=id).all()
    aresult = []
    for a in assuntos:
        aresult.append({
            'id': a.id,
            'nome': a.titulo,
            'descricao': a.descricao,
            'usuario_id': a.usuario_id,
            'data_criacao': a.data_criacao_descricao,
            'data_ult_atualizacao': a.data_ult_atualizacao,
        })
        
    return jsonify({
        "id": discussao.id, 
        "titulo": discussao.titulo,
        "descricao": discussao.descricao,
        "data_criacao": discussao.data_criacao_descricao,
        "grupo_id": discussao.grupo_id,
        "usuario_id": discussao.usuario_id,
        "assuntos":  aresult
    })


def create_discussion(titulo, descricao, grupo_id, usuario_id):
    if (titulo is None):
        return jsonify({"message": "Título obrigatório"}), 400
    if (grupo_id is None):
        return jsonify({"message": "Grupo obrigatório"}), 400
    if (usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
      
    user_already_exists = Usuario.query.filter_by(id=usuario_id).one()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
      
    group_already_exists = Grupo.query.filter_by(id=grupo_id).one()
        
    if (group_already_exists is None):
        return jsonify({"message": "Grupo inválido"}), 400
        
    discussao = Discussao(
      titulo=titulo,
      descricao=descricao,
      grupo_id=group_already_exists.id,
      usuario_id=user_already_exists.id
    )
    
    if (discussao is None):
        return jsonify({"message": "Erro no servidor ao criar a discussao"}), 400
    
    # Add discussion to the database
    db.session.add(discussao)
    db.session.commit()
    
    return jsonify({"discussao": discussao.id})

  