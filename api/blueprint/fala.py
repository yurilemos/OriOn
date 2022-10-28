from api import db, Usuario, Assunto, Discussao, Fala, Grupo, Participacao
from flask import jsonify
from datetime import datetime


def days_between(d1, d2):
    d1 = datetime.strptime(d1, '%Y-%m-%d %H:%M:%S.%f') 
    d2 = datetime.strptime(str(d2), "%Y-%m-%d %H:%M:%S.%f")
    return abs((d2 - d1).days)


def get_children(id, userId, perfil_usuario):
    if (id is None): return []
    fc = []
    falasChildren = Fala.query.filter_by(fala_mae_id=id).all()
    now_date = str(datetime.now())
    for f in falasChildren:
        dias = days_between(now_date,f.data_criacao_fala)
        podeExcluir = ((f.usuario_id == userId and dias <= 1) or perfil_usuario == 3)
        fc.append({
            'id': f.id,
            'content': f.conteudo,
            'datetime': f.data_criacao_fala,                        
            'usuario_id': f.usuario_id,
            'author': f.nome_usuario,
            'relacao_id': f.classe_relacao_id,           
            'children': get_children(f.id, userId, perfil_usuario),
            'podeExcluir': podeExcluir  
        })
    return fc


def get_fala(id, userId, perfil_usuario):
    
    if (id is None):
        return jsonify({"message": "Id do assunto obrigatório"}), 400
    
    assunto = Assunto.query.filter_by(id=id).one()
    
    if (assunto is None):
        return jsonify({"message": "Assunto inválido"}), 400
    
    now_date = str(datetime.now())
    
    falas = Fala.query.filter_by(assunto_id=id, fala_mae_id=None).all()
    fresult = []
    
    discussao = db.session.query(Discussao).filter_by(id=assunto.discussao_id).one()
    
    participantes = []
    for p in Fala.query.distinct(Fala.usuario_id):
        user = db.session.query(Usuario).filter_by(id=p.usuario_id).first()        
        participantes.append({"id": user.id,"nome": user.nome_usuario, "avatar": user.avatar})
        
    
    podeEditar = False
    participacao = db.session.query(Participacao).filter_by(usuario_id=userId,grupo_id=discussao.grupo_id).one_or_none()
    if (perfil_usuario == 3 or (participacao and (participacao.nivel_participacao == 1 or participacao.nivel_participacao == 2))):
        podeEditar = True

    for f in falas:
        dias = days_between(now_date,f.data_criacao_fala)
        podeExcluir = ((f.usuario_id == userId and dias <= 1) or perfil_usuario == 3)
        fresult.append({
            'id': f.id,
            'content': f.conteudo,
            'datetime': f.data_criacao_fala,                        
            'usuario_id': f.usuario_id,
            'author': f.nome_usuario,
            'relacao_id': f.classe_relacao_id,           
            'children': get_children(f.id, userId, perfil_usuario),
            'podeExcluir': podeExcluir            
        })
    
    return jsonify({'falas':fresult, 'podeEditar': podeEditar, 'participantes': participantes})


def create_fala(conteudo, assunto_id, usuario_id, fala_id, relacao_id):
    if (conteudo is None):
        return jsonify({"message": "Conteúdo obrigatório"}), 400
    if (assunto_id is None):
        return jsonify({"message": "Assunto obrigatório"}), 400
    if (usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    user_already_exists = Usuario.query.filter_by(id=usuario_id).one()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    assunto_already_exists = Assunto.query.filter_by(id=assunto_id).one()
        
    if (assunto_already_exists is None):
        return jsonify({"message": "Assunto inválido"}), 400
    
    if (fala_id != None):
        fala_already_exist = Fala.query.filter_by(id=fala_id).one()
        if (fala_already_exist is None):
            return jsonify({"message": "Fala inválida"}), 400
        fala = Fala(
            conteudo=conteudo,
            assunto_id=assunto_already_exists.id,
            usuario_id=user_already_exists.id,
            nome_usuario=user_already_exists.nome_usuario,
            fala_mae_id=fala_id,
            classe_relacao_id=relacao_id
        )
    else:
        fala = Fala(
            conteudo=conteudo,
            assunto_id=assunto_already_exists.id,
            usuario_id=user_already_exists.id,
            nome_usuario=user_already_exists.nome_usuario,
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
    
    user_already_exists = Usuario.query.filter_by(id=userId).one_or_none()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    
    fala = Fala.query.filter_by(id=falaId).one()
    
    if (fala is None):
        return jsonify({"message": "Fala inválida"}), 400
    
    assunto = Assunto.query.filter_by(id=fala.assunto_id).one()
    
    discussao = Discussao.query.filter_by(id=assunto.discussao_id).one()
    
    grupo = Grupo.query.filter_by(id=discussao.grupo_id).one()
    
    
    if (user_already_exists.perfil_usuario != 3):
        participacao = Participacao.query.filter_by(usuario_id=userId, grupo_id=grupo.id).one_or_none()        
        if(participacao is None or participacao.nivel_participacao != 1):
            return jsonify({"message": "Usuário não tem permissão de excluir essa fala"}), 400
    
        if (int(fala.usuario_id) != int(userId)):
            return jsonify({"message": "Usuário não tem permissão de excluir essa fala"}), 400
    
    
    db.session.delete(fala)
    db.session.commit()
    
    return jsonify({"fala deletada": fala.id})
