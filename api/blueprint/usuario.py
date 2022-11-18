
from api import db, Usuario
from flask import jsonify

# Retorna o usuário para o front
def get_usuario(userId):
    
    usuario = Usuario.query.filter_by(id=userId).one_or_none()
    
    if (usuario is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    return jsonify({
            "id": usuario.id, 
            "nome": usuario.nome_usuario, 
            "email": usuario.email_usuario, 
            "profile": usuario.perfil_usuario,
            "avatar": usuario.avatar
        })

# Edita o usuário
def edit_usuario(nome, avatar, userId):
    
    if (nome is None):
        return jsonify({"message": "Nome obrigatório"}), 400
    
    db.session.query(Usuario).filter(
        Usuario.id==userId
    ).update({
        Usuario.nome_usuario: nome,
        Usuario.avatar: avatar,
    })
    db.session.commit() 
    
    return "atualizado com sucesso"