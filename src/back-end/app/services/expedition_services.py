from flask_jwt_extended import create_access_token
from ..models.expedition import Expedition
from ..models.user import User
from ...config.database import db
from flask import jsonify
from werkzeug.exceptions import NotFound, BadRequest

def register_expedition(data):
    
    required = ["nome", "localizacao", "data_criacao", "ultima_att"]
    for field in required:
        if not data.get(field):
            raise BadRequest(f"Campo obrigatório ausente: {field}")

        user = User.query.filter_by(email=email_user).first()

    try:        
        new_expedition = Expedition(
            nome=data["nome"],
            localizacao=data["localizacao"],
            data_criacao=data["data_criacao"],
            ultima_att=data["ultima_att"],
            id_responsavel=4,
            descricao=data.get("descricao"),
            foto_capa=data.get("foto_capa")
        )
        db.session.add(new_expedition)
        db.session.commit()
        return jsonify({"message": "Expedição registrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_expedition(id_expedition):
    expedition = Expedition.query.get(id_expedition)
    if not expedition:
        return jsonify({"error": "Expedição não encontrada"}), 404
    
    
    try:
        db.session.delete(expedition)
        db.session.commit()
        return jsonify({"message": "Expedição deletado com sucesso!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def get_expedition_by_id(id_expedition):
    try:
        expedition = db.session.get(Expedition, id_expedition)
        if not Expedition:
            raise Exception("Expedição não encontrado!")

        return jsonify({
            "message": "Expedição encontrado com sucesso",
            "Expedição": expedition.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_all_expeditions():
    try:
        expeditions = Expedition.query.all()
        if not expeditions:
            raise Exception("Não há expedições!")

        return jsonify({
            "message": "Expedições encontrados com sucesso",
            "expeditions": [expedition.as_dict() for expedition in expeditions]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def search_expedition_by_nome(q: str):
    
    if not q:
        return []
    
    print(q)
    
    try:
        results = Expedition.query.filter(Expedition.data_criacao.icontains(q)).limit(20).all()

        if not results:
            raise NotFound(f"Não foi encontrada nenhuma expedição contendo '{q}'.")

        # converte para lista de dicts
        payload = [exp.as_dict() for exp in results]
        return {"message": "Expedições encontradas", "results": payload}, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def search_expedition_by_data_criacao(q: str):
    
    if not q:
        return []
    
    print(q)
    
    try:
        results = Expedition.query.filter(Expedition.data_criacao.icontains(q)).limit(20).all()

        if not results:
            raise NotFound(f"Não foi encontrada nenhuma expedição contendo '{q}'.")

        # converte para lista de dicts
        payload = [exp.as_dict() for exp in results]
        return {"message": "Expedições encontradas", "results": payload}, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_expedition_by_id(id_expedition):
    try:
        expedition = db.session.get(Expedition, id_expedition)
        if not Expedition:
            raise Exception("Expedição não encontrado!")

        return jsonify({
            "message": "Expedição encontrado com sucesso",
            "Expedição": expedition.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
