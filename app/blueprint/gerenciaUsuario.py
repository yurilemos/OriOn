
import json
from app import db, Usuario, Grupo, Participacao, Discussao
from flask import jsonify




def get_users(id,userId):
  
    if(id is None):        
        return jsonify({"message": "Grupo obrigatório"}), 400
    
    grupo = db.session.query(Grupo).filter(Grupo.id == id).one()
    criador = db.session.query(Usuario).filter(Usuario.id == grupo.usuario_id).one()
    membrosEditores = db.session.query(
      Usuario
      ).filter(
        (Participacao.grupo_id == id) & (Usuario.id == Participacao.usuario_id) & (Usuario.id != criador.id) & (Participacao.nivel_participacao == 2)
      ).all()
    membrosLeitores = db.session.query(
      Usuario
      ).filter(
        (Participacao.grupo_id == id) & (Usuario.id == Participacao.usuario_id) & (Usuario.id != criador.id) & (Participacao.nivel_participacao != 2)
      ).all()

    result = [{
          "id": criador.id,
          "key": criador.id, 
          "nome": criador.nome_usuario, 
          "email": criador.email_usuario, 
          "profile": criador.perfil_usuario,
          "owner": True,
          "nivel_participacao": 1
          }]
    
    for usuario in membrosEditores:
        result.append({
          "id": usuario.id, 
          "key": usuario.id, 
          "nome": usuario.nome_usuario, 
          "email": usuario.email_usuario, 
          "profile": usuario.perfil_usuario,
          "owner": False,
          "nivel_participacao": 2         
          })
    
    for usuario in membrosLeitores:
        result.append({
          "id": usuario.id, 
          "key": usuario.id, 
          "nome": usuario.nome_usuario, 
          "email": usuario.email_usuario, 
          "profile": usuario.perfil_usuario,
          "owner": False,
          "nivel_participacao": 3
          
          })
        
    
        
    return jsonify(result)
  
def change_user_Permission(groupId, nivel_participacao, userId, userRequestId):
  
    if(nivel_participacao is None or nivel_participacao == 1):        
        return jsonify({"message": "Nivel de participação inválido"}), 400
  
    if(groupId is None):        
        return jsonify({"message": "Grupo obrigatório"}), 400
  
    if(userId is None):        
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    grupo = db.session.query(Grupo).filter(Grupo.id == groupId).one()
    
    usuario = db.session.query(Usuario).filter(Usuario.id == userRequestId).one()
    
    if(grupo.usuario_id != userRequestId and usuario.perfil_usuario != 3):
        return jsonify({"message": "Usuário não tem permissao para editar a permissão de usuários"}), 400
      
    participacao = db.session.query(
      Participacao
    ).filter_by(
      usuario_id=userId,grupo_id=groupId
    ).one()
    
    if(participacao is None):
        return jsonify({"message": "Usuário não participa desse grupo"}), 400
    
    db.session.query(Participacao).filter_by(id=participacao.id).update({
        Participacao.nivel_participacao: int(nivel_participacao),
    })

    db.session.commit()
        
    return jsonify({'id alterado': userId})
  

def get_user_search(id, search, userId):
  
  
    if(id is None):        
        return jsonify({"message": "Grupo obrigatório"}), 400
      
      
    membros = db.session.query(
      Usuario
      ).filter(
        (Participacao.grupo_id == id) & (Usuario.id == Participacao.usuario_id)
      ).all()
      
    
    
    usuarios = db.session.query(
      Usuario
      ).filter(
        (Usuario.nome_usuario.ilike(f'%{search}%'))
        | (Usuario.email_usuario.ilike(f'%{search}%'))
      ).limit(5).all()
                

    result = []
    for usuario in usuarios:
        result.append({
          "id": usuario.id, 
          "nome": usuario.nome_usuario, 
          "email": usuario.email_usuario, 
          "profile": usuario.perfil_usuario,
          "owner": False
          })
        
    return jsonify(result)
  
def add_users(id, userList, userId):    
    if(id is None):        
        return jsonify({"message": "Grupo obrigatório"}), 400
      
    if(userList == []):        
        return jsonify({"message": "Usuário(s) que quer adicionar obrigatório"}), 400
      
    grupo = db.session.query(Grupo).filter(Grupo.id == id).one()
    
    for user in userList:
      newMember = Participacao(
        usuario_id=user,
        grupo_id=id,
        nivel_participacao=3
      )
      db.session.add(newMember)
      db.session.commit()
        
    return jsonify({'id':id})
  
def delete_user_from_group(id, userId, userResquestId):
  
    if(id is None):        
        return jsonify({"message": "Grupo obrigatório"}), 400
      
    if(userId is None):        
        return jsonify({"message": "Usuário obrigatório"}), 400
  
    participacao = Participacao.query.filter_by(usuario_id=userId, grupo_id=id).one()
    
    if(participacao is None):        
        return jsonify({"message": "Usuário não participa desse grupo"}), 400
      
    grupo = Grupo.query.filter_by(id=id).one()
    
    if(grupo.usuario_id == userId):        
        return jsonify({"message": "Usuário não pode deletar o dono do grupo"}), 400
      
    db.session.delete(participacao)
    db.session.commit()
  
    return jsonify({'id':id})