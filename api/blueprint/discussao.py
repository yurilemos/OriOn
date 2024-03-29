from api import db, Usuario, Grupo, Discussao, Assunto, Participacao
from flask import jsonify

# Arquivo referente as funções do sistema para a discussão

# Lista a discussão para o front
def get_discussao(id, userId):
    if (id is None):
        return jsonify({"message": "Id da discussão obrigatório"}), 400
    
    discussao = Discussao.query.filter_by(id=id).one_or_none()
    
    if (discussao is None):
        return jsonify({"message": "Id da discussão obrigatório"}), 400
    
    usuario = Usuario.query.filter_by(id=userId).one_or_none()
    
    if (usuario is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    assuntos = Assunto.query.filter_by(discussao_id=id).all()
    aresult = []
    podeEditar = False
    podeCriar = False
    participacao = db.session.query(Participacao).filter_by(usuario_id=userId,grupo_id=discussao.grupo_id).one_or_none()    
    
    for a in assuntos:
        if (a.usuario_id == userId or usuario.perfil_usuario == 3 or discussao.usuario_id == userId):
            podeEditar = True
        else:
            podeEditar = False
        criador = Usuario.query.filter_by(id=a.usuario_id).one_or_none()
        aresult.append({
            'id': a.id,
            'nome': a.titulo,
            'descricao': a.descricao,
            'usuario_id': a.usuario_id,
            'data_criacao': a.data_criacao_descricao,
            'data_ult_atualizacao': a.data_ult_atualizacao,
            'podeEditar': podeEditar,
            'criador': criador.nome_usuario
        })
    
    if (participacao and participacao.nivel_participacao == 2):
        podeCriar = True
    if (usuario.perfil_usuario == 3 or discussao.usuario_id == userId):
        podeEditar = True 
        podeCriar = True 
    return jsonify({
        "id": discussao.id, 
        "titulo": discussao.titulo,
        "descricao": discussao.descricao,
        "data_criacao": discussao.data_criacao_descricao,
        "grupo_id": discussao.grupo_id,
        "usuario_id": discussao.usuario_id,
        "assuntos":  aresult,
        "podeEditar": podeEditar,
        "podeCriar": podeCriar
    })

# Cria a discussão
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
    
    participacao = Participacao.query.filter_by(usuario_id=usuario_id, grupo_id=group_already_exists.id).one_or_none()
    
    if ((participacao is None or (participacao.nivel_participacao != 1 and participacao.nivel_participacao != 2)) and user_already_exists.perfil_usuario != 3):
        return jsonify({"message": "Usuário não tem permissão de criar essa discussão"}), 400
        
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

# Edita a discussão
def edit_discussion(titulo, descricao, usuario_id, discussionId):

    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(discussionId is None):
        return jsonify({"message": "Discussao obrigatória"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=usuario_id).one_or_none()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    
    discussao = Discussao.query.filter_by(id=discussionId).one()
    
    if (discussao is None):
        return jsonify({"message": "Discusão inválida"}), 400
    
    grupo = Grupo.query.filter_by(id=discussao.grupo_id).one()
        
    
    if (grupo.usuario_id != usuario_id and discussao.usuario_id != usuario_id and user_already_exists.perfil_usuario != 3):
        return jsonify({"message": "Usuário não tem permissão de editar essa discussão"}), 400
    
    
    db.session.query(Discussao).filter(
        Discussao.id==discussionId
    ).update({
        Discussao.titulo: titulo,
        Discussao.descricao: descricao,    
    })
    
    db.session.commit()
    
    return jsonify({"message": "Discussão atualizada"})

# Deleta a discussão
def delete_discussion(userId, discussionId):

    if(userId is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(discussionId is None):
        return jsonify({"message": "Discussao obrigatória"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=userId).one_or_none()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    
    discussao = Discussao.query.filter_by(id=discussionId).one_or_none()
    
    if (discussao is None):
        return jsonify({"message": "Discusão inválida"}), 400
    
    grupo = Grupo.query.filter_by(id=discussao.grupo_id).one_or_none()
    
    if (grupo.usuario_id != userId and discussao.usuario_id != userId and user_already_exists.perfil_usuario != 3):
        return jsonify({"message": "Usuário não tem permissão de excluir essa discussão"}), 400
    
    
    db.session.delete(discussao)
    db.session.commit()
    
    return jsonify({"discussão deletada": discussao.id})
