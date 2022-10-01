import datetime
import json
from app import app
import requests
from flask import request, jsonify
from app.blueprint.login import login_user, register_user, logout_user
from app.blueprint.grupo import get_group, create_group,edit_group, delete_group
from app.blueprint.discussao import get_discussao, create_discussion, edit_discussion, delete_discussion
from app.blueprint.assunto import get_assunto, create_assunto, delete_assunto
from app.blueprint.fala import get_fala, create_fala, delete_fala
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


@app.route("/grupo", methods=["GET", "POST", "PUT" ,"DELETE"])
def grupo():
    if request.method == "GET":
        # read images from the database
        userId = request.args.get("userId")
        try:
            result = get_group(userId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar os grupos de discussão"}), 400
        
    if request.method == "POST":
        # save image in the database
        content = request.json
        print(content)
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        visibilidade = content.get("visibilidade", None)
        usuario_id = content.get("usuario_id", None)
        
        try:
            result = create_group(titulo, descricao, visibilidade, usuario_id)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao criar o grupo de discussão"}), 400
        
    if request.method == "PUT":
        # save image in the database
        content = request.json
        print(content)
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        visibilidade = content.get("visibilidade", None)
        arquivar = content.get("arquivar", None)
        usuario_id = content.get("usuario_id", None)
        groupId = content.get("grupo_id", None)
        
        try:
            result = edit_group(titulo, descricao, visibilidade, arquivar, usuario_id, groupId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o grupo de discussão"}), 400
    
    if request.method == "DELETE":
        userId = request.args.get("userId")
        groupId = request.args.get("groupId")
        
        try:
            result = delete_group(userId, groupId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao deletar o grupo de discussão"}), 400
 
        
@app.route("/discussao", methods=["POST", "GET", "DELETE", "PUT"])
def discussao():
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        try:
            result = get_discussao(id)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400
    if request.method == "POST":
        # save image in the database
        content = request.json        
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        grupo_id = content.get("grupo_id", None)
        usuario_id = content.get("usuario_id", None)
        
        try:
            result = create_discussion(titulo, descricao, grupo_id, usuario_id)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a discussão"}), 400
    if request.method == "PUT":
        # save image in the database
        content = request.json
        print(content)
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        usuario_id = content.get("usuario_id", None)
        discussionId = content.get("discussao_id", None)
        
        try:
            result = edit_discussion(titulo, descricao, usuario_id, discussionId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar a discussão"}), 400
    if request.method == "DELETE":
        # read images from the database
        userId = request.args.get("userId")
        discussionId = request.args.get("discussionId")
        try:
            result = delete_discussion(userId, discussionId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400

    
@app.route("/assunto", methods=["POST", "GET", "DELETE"])
def assunto():
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        try:
            result = get_assunto(id)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar o assunto"}), 400
    if request.method == "POST":
        # save image in the database
        content = request.json        
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        discussao_id = content.get("discussao_id", None)
        usuario_id = content.get("usuario_id", None)
        
        try:
            result = create_assunto(titulo, descricao, discussao_id, usuario_id)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar o assunto"}), 400
    if request.method == "DELETE":
        # read images from the database
        userId = request.args.get("userId")
        assuntoId = request.args.get("assuntoId")
        try:
            result = delete_assunto(userId, assuntoId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400
    
    
@app.route("/fala", methods=["POST", "GET", "DELETE"])
def fala():
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        try:
            result = get_fala(id)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a fala"}), 400
    if request.method == "POST":
        content = request.json        
        conteudo = content.get("conteudo", None)
        assunto_id = content.get("assunto_id", None)
        usuario_id = content.get("usuario_id", None)
        fala_id = content.get("fala_id", None)        
        
        try:
            result = create_fala(conteudo, assunto_id, usuario_id, fala_id)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a discussão"}), 400
    if request.method == "DELETE":
        userId = request.args.get("userId")
        falaId = request.args.get("falaId")
        try:
            result = delete_fala(userId, falaId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400

    