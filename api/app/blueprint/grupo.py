
import json
from app import db, Usuario, Grupo, Participacao, Discussao
from flask import jsonify


      
      
def create_group(titulo, descricao, visibilidade, usuario_id):
    if(titulo is None):
        return jsonify({"message": "Título obrigatório"}), 400
    if(visibilidade is None):
        return jsonify({"message": "Visibilidade obrigatória"}), 400
    if(usuario_id is None):
        return jsonify({"message": "Usuário obrigatório"}), 400
      
    user_already_exists = Usuario.query.filter_by(id=usuario_id).all()
    
    if (user_already_exists is None):
        return jsonify({"message": "Usuário inválido"}), 400
        
    grupo = Grupo(
      nome_grupo=titulo,
      descricao_grupo=descricao,
      visibilidade_grupo=visibilidade,
      status_grupo=1,
      usuario_id=usuario_id
    )
    
    print(grupo)
    print(grupo.id)
    
    if (grupo is None):
        return jsonify({"message": "Erro no servidor ao criar o grupo"}), 400
    
    
    # Add group to the database
    db.session.add(grupo)
    db.session.commit()
    
    participacao = Participacao(
      usuario_id=usuario_id,
      grupo_id=grupo.id,
      nivel_participacao=1
    )
    
    # Add participation to the database
    db.session.add(participacao)
    db.session.commit()
    
    return jsonify({"grupo": grupo.id})


def get_group(usuario_id):
  
    
    if(usuario_id is None):
        print('ENTROUUUUUU')
        return jsonify({"message": "Usuário obrigatório"}), 400
    
    user = Usuario.query.filter_by(id=usuario_id).one()
    
    if(user is None):
        return jsonify({"message": "Usuário inválido"}), 400
    
    if(user.perfil_usuario == 1):
        grupo = Grupo.query.all()
        return jsonify(grupo)
    
    # participacao = Participacao.query.filter_by(usuario_id=usuario_id).all()
    # grupo = participacao.join(Grupo).all()
    grupos = db.session.query(
      Grupo
    ).join(
      Participacao
    ).filter(
      Participacao.usuario_id == usuario_id,
    ).all()
    
    result = []
    for grupo in grupos:
        discussoes = Discussao.query.filter_by(grupo_id=grupo.id).all()
        dresult = []
        for d in discussoes:
            dresult.append({
              'id': d.id,
              'nome': d.titulo,
              'descricao': d.descricao,
              'usuario_id': d.usuario_id,
              'data_criacao': d.data_criacao_descricao,
              })
        result.append({
          'id': grupo.id,
          'nome': grupo.nome_grupo,
          'descricao': grupo.descricao_grupo,
          'data_criacao': grupo.data_criacao_grupo,
          'visibilidade': grupo.visibilidade_grupo,
          'status': grupo.visibilidade_grupo,
          'usuario_id': grupo.usuario_id,
          'discussoes': dresult,
          })
        
    return jsonify(result)
  