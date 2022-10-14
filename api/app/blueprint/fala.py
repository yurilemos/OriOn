from app import db, Usuario, Assunto, Discussao, Fala, Grupo, Participacao
from flask import jsonify


def get_children(id):
    if (id is None): return []
    fc = []
    falasChildren = Fala.query.filter_by(fala_mae_id=id).all()
    for f in falasChildren:
        fc.append({
            'id': f.id,
            'content': f.conteudo,
            'datetime': f.data_criacao_fala,                        
            'usuario_id': f.usuario_id,
            'author': f.nome_usuario,            
            'children': get_children(f.id),
        })
    return fc


def get_fala(id, userId):
    if (id is None):
        return jsonify({"message": "Id do assunto obrigatório"}), 400
    
    assunto = Assunto.query.filter_by(id=id).one()
    
    if (assunto is None):
        return jsonify({"message": "Assunto inválido"}), 400
    
    falas = Fala.query.filter_by(assunto_id=id, fala_mae_id=None).all()
    fresult = []

    for f in falas:
        fresult.append({
            'id': f.id,
            'content': f.conteudo,
            'datetime': f.data_criacao_fala,                        
            'usuario_id': f.usuario_id,
            'author': f.nome_usuario,            
            'children': get_children(f.id),
        })
    
    return jsonify(fresult)


def create_fala(conteudo, assunto_id, usuario_id, fala_id):
    if (conteudo is None):
        return jsonify({"message": "Conteúdo obrigatório"}), 400
    if (assunto_id is None):
        return jsonify({"message": "Assunto obrigatório"}), 400
    if (usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if (fala_id != None):
        fala_already_exist = Fala.query.filter_by(id=fala_id).one()
        if (fala_already_exist is None):
            return jsonify({"message": "Fala inválida"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=usuario_id).one()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    assunto_already_exists = Assunto.query.filter_by(id=assunto_id).one()
        
    if (assunto_already_exists is None):
        return jsonify({"message": "Assunto inválido"}), 400
      
        
    fala = Fala(
        conteudo=conteudo,
        assunto_id=assunto_already_exists.id,
        usuario_id=user_already_exists.id,
        nome_usuario=user_already_exists.nome_usuario,
        fala_mae_id=fala_id
    )
    
    if (fala is None):
        return jsonify({"message": "Erro no servidor ao criar a fala"}), 400
    
    # Add discussion to the database
    db.session.add(fala)
    db.session.commit()
    
    return jsonify({"fala": fala.id})


def delete_fala(userId, falaId):

    if(userId is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    if(falaId is None):
        return jsonify({"message": "Fala obrigatória"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=userId).all()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    
    fala = Fala.query.filter_by(id=falaId).one()
    
    if (fala is None):
        return jsonify({"message": "Fala inválida"}), 400
    
    assunto = Assunto.query.filter_by(id=fala.assunto_id).one()
    
    discussao = Discussao.query.filter_by(id=assunto.discussao_id).one()
    
    grupo = Grupo.query.filter_by(id=discussao.grupo_id).one()
    
    
    if (grupo.visibilidade_grupo == 2):
        print('entrou')
        participacao = Participacao.query.filter_by(usuario_id=userId, grupo_id=grupo.id).one()
        if(partifipacao is None):
            return jsonify({"message": "Usuário não tem permissão de excluir esse assunto"}), 400
    
    if (int(fala.usuario_id) != int(userId)):
        return jsonify({"message": "Usuário não tem permissão de excluir esse assunto"}), 400
    
    
    db.session.delete(fala)
    db.session.commit()
    
    return jsonify({"fala deletada": fala.id})
