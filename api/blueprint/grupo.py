
import json
from api import db, Usuario, Grupo, Participacao, Discussao
from flask import jsonify

# Arquivo referente as funções do sistema para o grupo


# Cria grupo
def create_group(titulo, descricao, visibilidade, usuario_id):
    if(titulo is None):
        return jsonify({"message": "Título obrigatório"}), 400
    if(visibilidade is None):
        return jsonify({"message": "Visibilidade obrigatória"}), 400
    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
      
    user_already_exists = Usuario.query.filter_by(id=usuario_id).all()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
        
    grupo = Grupo(
      nome_grupo=titulo,
      descricao_grupo=descricao,
      visibilidade_grupo=visibilidade,
      status_grupo=1,
      usuario_id=usuario_id
    )
    
    if (grupo is None):
        return jsonify({"message": "Erro no servidor ao criar o grupo"}), 400
    
    
    # Add group to the database
    db.session.add(grupo)
    db.session.commit()
    
    participacao = Participacao(
      usuario_id=usuario_id,
      grupo_id=grupo.id,
      nivel_participacao=1
    )
    
    # Add participation to the database
    db.session.add(participacao)
    db.session.commit()
    
    return jsonify({"grupo": grupo.id})

# Lista os grupos para o front
# visibilidade_grupo = 1 => publico & visibilidade_grupo = 2 => privado
def get_group(usuario_id):
  
    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    user = Usuario.query.filter_by(id=usuario_id).one()
    
    if(user is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    if(user.perfil_usuario == 3):
        grupos = Grupo.query.filter_by(status_grupo=1).all()

    else:    
        # participacao = Participacao.query.filter_by(usuario_id=usuario_id).all()
        # grupo = participacao.join(Grupo).all()
        grupos = db.session.query(
            Grupo
        ).join(Participacao).filter(
            (Participacao.usuario_id == usuario_id) | (Grupo.visibilidade_grupo == 1)
        ).filter(Grupo.status_grupo == 1).all()
    
    result = []
    for grupo in grupos:
        podeEditar = False
        podeCriar = False
        participacao = Participacao.query.filter_by(usuario_id=int(usuario_id),grupo_id=int(grupo.id)).one_or_none()
    
        if (int(grupo.usuario_id) == int(usuario_id) or int(user.perfil_usuario) == 3):
            podeEditar = True
            podeCriar = True
        elif (participacao and int(participacao.nivel_participacao) == 2):
            podeCriar = True
            
        discussoes = Discussao.query.filter_by(grupo_id=grupo.id).all()        
        dresult = []
        for d in discussoes:
            criador = Usuario.query.filter_by(id=d.usuario_id).one_or_none()
            dresult.append({
              'id': d.id,
              'nome': d.titulo,
              'descricao': d.descricao,
              'usuario_id': d.usuario_id,
              'data_criacao': d.data_criacao_descricao, 
              'criador': criador.nome_usuario             
              })
        criador = Usuario.query.filter_by(id=grupo.usuario_id).one_or_none()
        result.append({
          'id': grupo.id,
          'nome': grupo.nome_grupo,
          'descricao': grupo.descricao_grupo,
          'data_criacao': grupo.data_criacao_grupo,
          'visibilidade': grupo.visibilidade_grupo,
          'status': grupo.status_grupo,
          'usuario_id': grupo.usuario_id,
          'podeEditar': podeEditar,
          'discussoes': dresult,
          'podeEditar': podeEditar,
          'podeCriar': podeCriar,
          'criador': criador.nome_usuario
          })
        
    return jsonify(result)

# Edita o grupo
def edit_group(titulo, descricao, visibilidade, arquivar, usuario_id, group_Id):
  
    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(group_Id is None):
        return jsonify({"message": "Grupo obrigatório"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=usuario_id).one()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
        
    participacao = Participacao.query.filter_by(usuario_id=usuario_id, grupo_id=group_Id).one_or_none()
    
    if (user_already_exists.perfil_usuario != 3 and (participacao is None or participacao.nivel_participacao != 1)):
        return jsonify({"message": "Usuário não tem permissão de editar esse grupo"}), 400
    
    
    status_grupo = 1
    if (arquivar == True):
        status_grupo = 2
    
    db.session.query(Grupo).filter(
        Grupo.id==group_Id
    ).update({
        Grupo.nome_grupo: titulo,
        Grupo.descricao_grupo: descricao,
        Grupo.visibilidade_grupo: visibilidade,
        Grupo.status_grupo: status_grupo,
    })
    
    db.session.commit()
    
    return jsonify({"message": "grupo atualizado"})

# Deleta o grupo
def delete_group(userId, groupId):
  
    if(userId is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(groupId is None):
        return jsonify({"message": "Grupo obrigatório"}), 400
      
    user_already_exists = Usuario.query.filter_by(id=userId).one_or_none()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
        
    participacao = Participacao.query.filter_by(usuario_id=userId, grupo_id=groupId).one_or_none()
    
    if (user_already_exists.perfil_usuario != 3 and (participacao is None or participacao.nivel_participacao != 1)):
        return jsonify({"message": "Usuário não tem permissão de excluir esse grupo"}), 400
    
    grupo = Grupo.query.filter_by(id=groupId).one()
    
    db.session.delete(grupo)
    db.session.commit()
    
    return jsonify({"grupo deletado": grupo.id})

# Lista os grupos de um usuário
def get_user_groups(usuario_id,visibilidade):

    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    user = Usuario.query.filter_by(id=usuario_id).one()
    
    if(user is None):
        return jsonify({"message": "Usuário inválido"}), 400
    

  
    grupos = db.session.query(
        Grupo
    ).filter(
        (Grupo.usuario_id == usuario_id) & (Grupo.visibilidade_grupo == visibilidade)
    ).all()
    
    result = []
    for grupo in grupos:
        discussoes = Discussao.query.filter_by(grupo_id=grupo.id).all()
        dresult = []
        for d in discussoes:
            dresult.append({
              'id': d.id,
              'nome': d.titulo,
              'descricao': d.descricao,
              'usuario_id': d.usuario_id,
              'data_criacao': d.data_criacao_descricao,
              })
        result.append({
          'id': grupo.id,
          'nome': grupo.nome_grupo,
          'descricao': grupo.descricao_grupo,
          'data_criacao': grupo.data_criacao_grupo,
          'visibilidade': grupo.visibilidade_grupo,
          'status': grupo.status_grupo,
          'usuario_id': grupo.usuario_id,
          'podeEditar': True,
          'discussoes': dresult,
          })
        
    return jsonify(result)

# Lista os grupos arquivados de um usuário
def get_user_shelved_groups(usuario_id, visibilidade):
  
    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    user = Usuario.query.filter_by(id=usuario_id).one()
    
    if(user is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    if(user.perfil_usuario == 3):
        grupos = db.session.query(
            Grupo
        ).filter(
            (Grupo.status_grupo == 2) & (Grupo.visibilidade_grupo == visibilidade)
        ).all()
    

    else:    
        grupos = db.session.query(
            Grupo
        ).filter(
            (Grupo.status_grupo == 2) & (Grupo.usuario_id == usuario_id) & (Grupo.visibilidade_grupo == visibilidade)
        ).all()
    
    result = []
    for grupo in grupos:
        discussoes = Discussao.query.filter_by(grupo_id=grupo.id).all()
        dresult = []
        for d in discussoes:
            dresult.append({
              'id': d.id,
              'nome': d.titulo,
              'descricao': d.descricao,
              'usuario_id': d.usuario_id,
              'data_criacao': d.data_criacao_descricao,
              })
        result.append({
          'id': grupo.id,
          'nome': grupo.nome_grupo,
          'descricao': grupo.descricao_grupo,
          'data_criacao': grupo.data_criacao_grupo,
          'visibilidade': grupo.visibilidade_grupo,
          'status': grupo.status_grupo,
          'usuario_id': grupo.usuario_id,
          'podeEditar': True,
          'discussoes': dresult,
          })
        
    return jsonify(result)