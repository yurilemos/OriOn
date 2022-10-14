from app import db, Usuario, Grupo, Discussao, Assunto, Participacao
from flask import jsonify


def get_discussao(id, userId):
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

def edit_discussion(titulo, descricao, usuario_id, discussionId):

    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(discussionId is None):
        return jsonify({"message": "Discussao obrigatória"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=usuario_id).all()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    
    discussao = Discussao.query.filter_by(id=discussionId).one()
    
    if (discussao is None):
        return jsonify({"message": "Discusão inválida"}), 400
    
    grupo = Grupo.query.filter_by(id=discussao.grupo_id).one()
        
    participacao = Participacao.query.filter_by(usuario_id=usuario_id, grupo_id=grupo.id).one()
    
    if (participacao is None or participacao.nivel_participacao != 1):
        return jsonify({"message": "Usuário não tem permissão de editar essa discussão"}), 400
    
    
    db.session.query(Discussao).filter(
        Discussao.id==discussionId
    ).update({
        Discussao.titulo: titulo,
        Discussao.descricao: descricao,    
    })
    
    db.session.commit()
    
    return jsonify({"message": "Discussão atualizada"})

def delete_discussion(userId, discussionId):
  
    if(userId is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(discussionId is None):
        return jsonify({"message": "Discussao obrigatória"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=userId).all()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    
    discussao = Discussao.query.filter_by(id=discussionId).one()
    
    if (discussao is None):
        return jsonify({"message": "Discusão inválida"}), 400
    
    grupo = Grupo.query.filter_by(id=discussao.grupo_id).one()
        
    participacao = Participacao.query.filter_by(usuario_id=userId, grupo_id=grupo.id).one()
    
    if (participacao is None or participacao.nivel_participacao != 1):
        return jsonify({"message": "Usuário não tem permissão de excluir essa discussão"}), 400
    
    
    db.session.delete(discussao)
    db.session.commit()
    
    return jsonify({"discussão deletada": discussao.id})
