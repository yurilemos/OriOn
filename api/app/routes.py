from app import app
import requests
from flask import request, jsonify
from app.blueprint.login import login_user, register_user


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
