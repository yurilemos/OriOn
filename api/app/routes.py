import datetime
import json
from app import app, Usuario
import requests
from flask import request, jsonify
from app.blueprint.login import login_user, register_user, logout_user
from app.blueprint.grupo import get_group, create_group,edit_group, delete_group, get_user_groups, get_user_shelved_groups
from app.blueprint.discussao import get_discussao, create_discussion, edit_discussion, delete_discussion
from app.blueprint.assunto import get_assunto, create_assunto, edit_assunto, delete_assunto
from app.blueprint.fala import get_fala, create_fala, delete_fala
from app.blueprint.gerenciaUsuario import get_users, get_user_search, add_users, delete_user_from_group, change_user_Permission
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
@jwt_required()
def grupo():
    if request.method == "GET":
        # read images from the database
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = get_group(userId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar os grupos de discussão"}), 400
        
    if request.method == "POST":
        # save image in the database
        content = request.json        
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        visibilidade = content.get("visibilidade", None)
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = create_group(titulo, descricao, visibilidade, userId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao criar o grupo de discussão"}), 400
        
    if request.method == "PUT":
        # save image in the database
        content = request.json
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        visibilidade = content.get("visibilidade", None)
        arquivar = content.get("arquivar", None)
        groupId = content.get("grupo_id", None)
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = edit_group(titulo, descricao, visibilidade, arquivar, userId, groupId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o grupo de discussão"}), 400
    
    if request.method == "DELETE":
        groupId = request.args.get("groupId")
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = delete_group(userId, groupId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao deletar o grupo de discussão"}), 400
 
        
@app.route("/discussao", methods=["POST", "GET", "DELETE", "PUT"])
@jwt_required()
def discussao():
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        try:
            result = get_discussao(id,userId)
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
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = create_discussion(titulo, descricao, grupo_id, userId)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a discussão"}), 400
    if request.method == "PUT":
        # save image in the database
        content = request.json
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)
        discussionId = content.get("discussao_id", None)
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = edit_discussion(titulo, descricao, userId, discussionId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar a discussão"}), 400
    if request.method == "DELETE":
        # read images from the database
        discussionId = request.args.get("discussionId")
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = delete_discussion(userId, discussionId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400

    
@app.route("/assunto", methods=["POST", "GET", "DELETE", "PUT"])
@jwt_required()
def assunto():
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id 
        try:
            result = get_assunto(id,userId)
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
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = create_assunto(titulo, descricao, discussao_id, userId)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar o assunto"}), 400
    if request.method == "PUT":
        # save image in the database
        content = request.json
        titulo = content.get("titulo", None)
        descricao = content.get("descricao", None)        
        assuntoId = content.get("assunto_id", None)
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        
        try:
            result = edit_assunto(titulo, descricao, userId, assuntoId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o assunto"}), 400
    if request.method == "DELETE":
        assuntoId = request.args.get("assuntoId")
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        try:
            result = delete_assunto(userId, assuntoId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400
    
    
@app.route("/fala", methods=["POST", "GET", "DELETE"])
@jwt_required()
def fala():
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id
        try:
            result = get_fala(id,userId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a fala"}), 400
    if request.method == "POST":
        content = request.json        
        conteudo = content.get("conteudo", None)
        assunto_id = content.get("assunto_id", None)
        fala_id = content.get("fala_id", None) 
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id       
        
        try:
            result = create_fala(conteudo, assunto_id, userId, fala_id)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a discussão"}), 400
    if request.method == "DELETE":
        falaId = request.args.get("falaId")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id  
        
        try:
            result = delete_fala(userId, falaId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400

@app.route("/gerencia-usuario", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def gerenciaUsuario():
    if request.method == "GET":            
        id = request.args.get("groupId")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id        
        try:
            result = get_users(id, userId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar os participantes desse grupo"}), 400
        
    if request.method == "POST":
        content = request.json        
        id = content.get("groupId", None)
        userList = content.get("userList", None)
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id                     
        
        try:
            result = add_users(id, userList, userId)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a discussão"}), 400
        
    if request.method == "PUT":
        # save image in the database
        content = request.json
        groupId = content.get("groupId", None)
        nivel_participacao = content.get("nivel_participacao", None)
        userId = content.get("userId", None)        
        
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userRequestId = user.id
        
        try:
            result = change_user_Permission(groupId, nivel_participacao, userId, userRequestId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o assunto"}), 400
        
    if request.method == "DELETE":
        id = request.args.get("groupId", None)
        userId = request.args.get("userId", None)  
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userRequestId = user.id   
        try:
            result = delete_user_from_group(id, userId, userRequestId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400
        
@app.route("/gerencia-usuario/pesquisa", methods=["GET"])
@jwt_required()
def pesquisaUsuario():
    if request.method == "GET":            
        id = request.args.get("groupId")
        search = request.args.get("search")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id 
        try:
            result = get_user_search(id,search,userId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar os usuários"}), 400
        
@app.route("/meus-grupos", methods=["GET"])
@jwt_required()
def meusGrupos():
    if request.method == "GET":            
        # read images from the database
        visibilidade = request.args.get("visibilidade")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id 
        
        try:
            result = get_user_groups(userId,visibilidade)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar os grupos de discussão"}), 400
        
@app.route("/meus-grupos-arquivados", methods=["GET"])
@jwt_required()
def meusGruposArquivados():
    if request.method == "GET":            
        visibilidade = request.args.get("visibilidade")
        user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
        userId = user.id 
        try:
            result = get_user_shelved_groups(userId,visibilidade)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar os grupos de discussão"}), 400
        
    
        
        
        