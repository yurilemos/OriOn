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
from app.blueprint.relacao import cria_relacao, get_relacao
from app.blueprint.usuario import get_usuario, edit_usuario
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
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id
    if request.method == "GET":
        # read images from the database
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
        
        try:
            result = edit_group(titulo, descricao, visibilidade, arquivar, userId, groupId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o grupo de discussão"}), 400
    
    if request.method == "DELETE":
        groupId = request.args.get("groupId")
        
        try:
            result = delete_group(userId, groupId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao deletar o grupo de discussão"}), 400
 
        
@app.route("/discussao", methods=["POST", "GET", "DELETE", "PUT"])
@jwt_required()
def discussao():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
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
        
        try:
            result = edit_discussion(titulo, descricao, userId, discussionId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar a discussão"}), 400
    if request.method == "DELETE":
        # read images from the database
        discussionId = request.args.get("discussionId")
        
        try:
            result = delete_discussion(userId, discussionId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400

    
@app.route("/assunto", methods=["POST", "GET", "DELETE", "PUT"])
@jwt_required()
def assunto():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id 
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        
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
        
        try:
            result = edit_assunto(titulo, descricao, userId, assuntoId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o assunto"}), 400
    if request.method == "DELETE":
        assuntoId = request.args.get("assuntoId")
        
        try:
            result = delete_assunto(userId, assuntoId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400
    
    
@app.route("/fala", methods=["POST", "GET", "DELETE"])
@jwt_required()
def fala():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id  
    perfil_usuario = user.perfil_usuario
    if request.method == "GET":
        # read images from the database
        id = request.args.get("id")
        try:
            result = get_fala(id,userId,perfil_usuario)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a fala"}), 400
    if request.method == "POST":
        content = request.json        
        conteudo = content.get("conteudo", None)
        assunto_id = content.get("assunto_id", None)
        fala_id = content.get("fala_id", None) 
        relacao_id = content.get("relacao_id", None) 
        
        
        try:
            result = create_fala(conteudo, assunto_id, userId, fala_id, relacao_id)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a discussão"}), 400
    if request.method == "DELETE":
        falaId = request.args.get("falaId") 
        
        try:
            result = delete_fala(userId, falaId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400

@app.route("/gerencia-usuario", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def gerenciaUsuario():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id 
    if request.method == "GET":            
        id = request.args.get("groupId")
        
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
        userRequestId = content.get("userId", None)        
        
        try:
            result = change_user_Permission(groupId, nivel_participacao, userRequestId, userId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao editar o assunto"}), 400
        
    if request.method == "DELETE":
        id = request.args.get("groupId", None)
        userRequestId = request.args.get("userId", None)    
        try:
            result = delete_user_from_group(id, userRequestId, userId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar a discussão"}), 400
        
@app.route("/gerencia-usuario/pesquisa", methods=["GET"])
@jwt_required()
def pesquisaUsuario():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id 
    if request.method == "GET":            
        id = request.args.get("groupId")
        search = request.args.get("search")
        try:
            result = get_user_search(id,search,userId)
            return result
        except ValueError as e:
            print(e)   
            return jsonify({"message": "Erro no servidor ao buscar os usuários"}), 400
        
@app.route("/meus-grupos", methods=["GET"])
@jwt_required()
def meusGrupos():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id 
    if request.method == "GET":            
        # read images from the database
        visibilidade = request.args.get("visibilidade")
        
        try:
            result = get_user_groups(userId,visibilidade)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar os grupos de discussão"}), 400
        
@app.route("/meus-grupos-arquivados", methods=["GET"])
@jwt_required()
def meusGruposArquivados():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id 
    if request.method == "GET":            
        visibilidade = request.args.get("visibilidade")
        try:
            result = get_user_shelved_groups(userId,visibilidade)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar os grupos de discussão"}), 400
        
@app.route("/relacao", methods=["GET","POST"])
@jwt_required()
def relacaoFala():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.perfil_usuario 
    if request.method == "GET":            
        try:
            result = get_relacao()
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar as relações da fala"}), 400
    if request.method == "POST":
        content = request.json        
        nome = content.get("nome", None)
        estilo = content.get("estilo", None)                               
        
        try:
            result = cria_relacao(nome,estilo,perfil_usuario)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a relação"}), 400
        
@app.route("/usuario", methods=["GET","PUT"])
@jwt_required()
def usuario():
    user = Usuario.query.filter_by(email_usuario=get_jwt_identity()).first()
    userId = user.id 
    if request.method == "GET":            
        try:
            result = get_usuario(userId)
            return result
        except ValueError as e:
            print(e)       
            return jsonify({"message": "Erro no servidor ao buscar dados do usuário"}), 400
    if request.method == "PUT":
        content = request.json        
        nome = content.get("nome", None) 
        avatar = content.get("avatar", None)                                  
        
        try:
            result = edit_usuario(nome, avatar, userId)
            return result
        except ValueError as e:
            print(e)     
            return jsonify({"message": "Erro no servidor ao criar a relação"}), 400
        
    
        
        
        