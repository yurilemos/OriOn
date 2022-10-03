
import json
from app import db, Usuario, Grupo, Participacao, Discussao
from flask import jsonify




def get_users(id):
  
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
          "nome": criador.nome_usuario, 
          "email": criador.email_usuario, 
          "profile": criador.perfil_usuario,
          "owner": True
          }]
    for usuario in membros:
        result.append({
          "id": usuario.id, 
          "nome": usuario.nome_usuario, 
          "email": usuario.email_usuario, 
          "profile": usuario.perfil_usuario,
          "owner": False
          })
        
    return jsonify(result)