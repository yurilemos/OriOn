from app import app, db, Usuario
import requests
from flask import request, abort
from werkzeug.security import generate_password_hash, check_password_hash


@app.route("/")
def index():
    return "teste"


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID "}
    params = {"query": word}
    response = requests.get(url="teste", headers=headers, params=params)

    data = response.json()
    return data


@app.route("/login", methods=["GET", "POST"])
def login():
    print('ENTROOOOOOOOOOOOOU')
    if request.method == "GET":
        # save image from the database
        login = request.args.get("login")
        senha = request.args.get("senha")
        usuario = Usuario.query.filter_by(login=login).first()        
        hashsenha = generate_password_hash(senha)    
        if(usuario.senha != hashsenha):
            abort(400, description='Senha inválida')    
        # result = images_collection.insert_one(image)
        # inserted_id = result.inserted_id
        return usuario
    if request.method == "POST":
        # save image from the database
        content = request.json
        login = content.get("login", None)
        senha = content.get("senha", None)
        print(senha)
        hashsenha = generate_password_hash(senha)
        print(hashsenha)
        
        user_already_exists = Usuario.query.filter_by(login=login).all()        
        if user_already_exists:
            abort(400, description='Usuário com já existente')
        
        usuario = Usuario(
            login=login,
            senha=hashsenha,
            perfil_usuario='Administrador',
            email_usuario=login    
        )
        
        # Add user to the database
        db.session.add(usuario)
        db.session.commit() 
                    
        return usuario


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    if request.method == "DELETE":
        # delete image from the database
        # result = images_collection.delete_one({"_id": image_id})
        result = ""
        if not result:
            return {"error": "Image wasn't deleted. Please try again"}, 500
        # if result and not result.deleted_count:
        # return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}
