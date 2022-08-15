import datetime
import json
from app import app
import requests
from flask import request, jsonify
from app.blueprint.login import login_user, register_user, logout_user
from flask_jwt_extended import create_access_token, get_jwt,get_jwt_identity, jwt_required


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.datetime.now(datetime.timezone.utc)
        target_timestamp = datetime.datetime.timestamp(now + datetime.timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
    
    
@app.route("/")
def index():
    return "teste"



@app.route("/login", methods=["POST"])
def login():
    # save image from the database
    content = request.json
    login = content.get("login", None)
    senha = content.get("senha", None)
    
    try:
        return login_user(login, senha)
    except ValueError as e:
        print(e)
        return jsonify({"message": "Erro no servidor no login"}), 400
    
     
     
@app.route("/sair", methods=["POST"])
def logout():
    try:
        return logout_user()
    except ValueError as e:
        print(e)
        return jsonify({"message": "Erro no servidor no login"}), 400   

@app.route("/register", methods=["POST"])
def register():
    # save image from the database
    content = request.json
    login = content.get("login", None)
    senha = content.get("senha", None)
    nome = content.get("nome", None)
    
    try:
        return register_user(login, senha, nome)
    except ValueError as e:
        print(e)       
        return jsonify({"message": "Erro no servidor no registro"}), 400


@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body