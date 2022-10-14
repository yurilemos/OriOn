
import json
from app import db, Usuario, Grupo, Participacao, Discussao
from flask import jsonify




def get_users(id,userId):
  
    if(id is None):        
        return jsonify({"message": "Grupo obrigatório"}), 400
    
    grupo = db.session.query(Grupo).filter(Grupo.id == id).one()
    criador = db.session.query(Usuario).filter(Usuario.id == grupo.usuario_id).one()
    membros = db.session.query(
      Usuario
      ).filter(
        (Participacao.grupo_id == id) & (Usuario.id == Participacao.usuario_id) & (Usuario.id != criador.id)
      ).all()

    result = [{
          "id": criador.id,
          "key": criador.id, 
          "nome": criador.nome_usuario, 
          "email": criador.email_usuario, 
          "profile": criador.perfil_usuario,
          "owner": True
          }]
    for usuario in membros:
        result.append({
          "id": usuario.id, 
          "key": usuario.id, 
          "nome": usuario.nome_usuario, 
          "email": usuario.email_usuario, 
          "profile": usuario.perfil_usuario,
          "owner": False
          })
        
    return jsonify(result)
  

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
    
    if (grupo.visibilidade_grupo == 1):
      return jsonify({"message": "Grupo público"}), 400
    
    for user in userList:
      newMember = Participacao(
        usuario_id=user,
        grupo_id=id,
        nivel_participacao=2
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