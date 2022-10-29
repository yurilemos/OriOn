from http.client import OK
from api import app, db, Usuario, jwt
from datetime import datetime
from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from api.serializers.usuario_serializer import UsuarioSerializer
from flask_jwt_extended import create_access_token, get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager


def login_user(login, senha):
    if(login is None):
        return jsonify({"message": "Usuário vázio"}), 400
    if(senha is None):
        return jsonify({"message": "Senha vázia"}), 400
        
    usuario = Usuario.query.filter_by(login=login).first() 
        
    # login inválido
    if (usuario is None):
        return jsonify({"message": "Usuário ou senha inválido"}), 400
        
    # senha inválida
    if(check_password_hash(usuario.senha, senha) is False):
        return jsonify({"message": "Usuário ou senha inválido"}), 400
    
    usuario.data_pen_visita_usuario = usuario.data_ult_visita_usuario
    usuario.data_ult_visita_usuario = datetime.now()
    
    # Update user to the database
    db.session.add(usuario)
    db.session.commit()
    access_token = create_access_token(identity=login)
    
    return jsonify({
        "access_token": access_token, 
        "user": {
            "userId": usuario.id, 
            "name": usuario.nome_usuario, 
            "email": usuario.email_usuario, 
            "profile": usuario.perfil_usuario,
            "avatar": usuario.avatar
        }
    })


def logout_user():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


def register_user(login, senha, nome):
    hashsenha = generate_password_hash(senha)
        
    user_already_exists = Usuario.query.filter_by(login=login).all()        
    if user_already_exists:
        return jsonify({"message": "Usuário já existe"}), 400
        
    usuario = Usuario(
      login=login,
      senha=hashsenha,
      perfil_usuario=1,
      email_usuario=login,
      nome_usuario=nome   
    )
        
    # Add user to the database
    db.session.add(usuario)
    db.session.commit() 
                    
    return jsonify({"usuário": UsuarioSerializer().dump(usuario)})