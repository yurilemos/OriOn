from app import db, Usuario, Assunto, Discussao, Fala
from flask import jsonify


def get_assunto(id):
    if (id is None):
        return jsonify({"message": "Id da discussão obrigatório"}), 400
    
    assunto = Assunto.query.filter_by(id=id).one()
    
    if (assunto is None):
        return jsonify({"message": "Assunto inválido"}), 400
    
    falas = Fala.query.filter_by(assunto_id=id).all()
    fresult = []

    for f in falas:
        fresult.append({
            'id': f.id,
            'conteudo': f.conteudo,
            'data_criacao_fala': f.data_criacao_fala,
            'data_ult_atualizacao_fala': f.data_ult_atualizacao_fala,
            'imagem_virtual': f.imagem_virtual,
            'imagem_real': f.imagem_real,
            'tamanho': f.tamanho,
            'arquivo_virtual': f.arquivo_virtual,
            'arquivo_real': f.arquivo_real,
            'arquivo_tamanho': f.arquivo_tamanho,
            'url': f.url,
            'assunto_id': f.assunto_id,
            'usuario_id': f.usuario_id,
            'relacao_id': f.relacao_id,
        })
    
    return jsonify({
        "id": assunto.id,
        "titulo": assunto.titulo,
        "descricao": assunto.descricao,
        "data_criacao": assunto.data_criacao_descricao,
        "data_ult_atualizacao": assunto.data_ult_atualizacao,
        "discussao_id": assunto.discussao_id,
        "usuario_id": assunto.usuario_id,
        "falas":  fresult
    })


def create_assunto(titulo, descricao, discussao_id, usuario_id):
    print(titulo)
    print(descricao)
    print(discussao_id)
    print(usuario_id)
    if (titulo is None):
        return jsonify({"message": "Título obrigatório"}), 400
    if (discussao_id is None):
        return jsonify({"message": "Discussão obrigatória"}), 400
    if (usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=usuario_id).one()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    discussion_already_exists = Discussao.query.filter_by(id=discussao_id).one()
        
    if (discussion_already_exists is None):
        return jsonify({"message": "Grupo inválido"}), 400
        
    assunto = Assunto(
        titulo=titulo,
        descricao=descricao,
        discussao_id=discussion_already_exists.id,
        usuario_id=user_already_exists.id
    )
    
    if (assunto is None):
        return jsonify({"message": "Erro no servidor ao criar a discussao"}), 400
    
    # Add discussion to the database
    db.session.add(assunto)
    db.session.commit()
    
    return jsonify({"discussao": assunto.id})
