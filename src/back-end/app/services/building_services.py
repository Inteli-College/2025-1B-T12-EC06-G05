from ..models.building import Building
from ...config.database import db
from flask import jsonify
from werkzeug.exceptions import NotFound, BadRequest
from ...datetime import datetime_sp_string

def register_building(data):
    
    required = ["nome", "complemento", "id_expedicao"]
    for field in required:
        if not data.get(field):
            raise BadRequest(f"Campo obrigatório ausente: {field}")

    try:        
        new_building = Building(
            id_expedicao=data['id_expedicao'],
            nome=data["nome"],
            complemento=data["complemento"],
            descricao=data.get("descricao"),
            foto_fachada=data.get("foto_fachada")
        )
        
        db.session.add(new_building)
        db.session.commit()
        return jsonify({"message": "Prédio registrado com sucesso!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def delete_building(id_building):
    building = Building.query.get(id_building)
    if not building:
        return jsonify({"error": "Prédio não encontrado"}), 404
    
    try:
        db.session.delete(building)
        db.session.commit()
        return jsonify({"message": "Prédio deletado com sucesso!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def get_building_by_id(id_building):
    try:
        building = db.session.get(Building, id_building)
        if not building:
            raise Exception("Prédio não encontrado!")

        return jsonify({
            "message": "Prédio encontrado com sucesso",
            "building": building.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_all_building():
    try:
        buildings = Building.query.all()
        if not buildings:
            raise Exception("Não há prédios!")

        return jsonify({
            "message": "Prédios encontradas com sucesso",
            "buildings": [building.as_dict() for building in buildings]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_building(data):
    try:
        building = db.session.get(Building, data['id'])
        if not building:
            raise Exception("Prédio não encontrada!")

        for field in ["id_expedicao", "nome", "complemento", "descricao", "foto_capa"]:
            if field in data:
                setattr(building, field, data[field])

        db.session.commit()

        return jsonify({
            "message": "Prédio atualizada com sucesso!",
            "building": building.as_dict()
            }), 200

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500
    
def get_building_by_id_expedition(id_expedition):
    try:
        buildings = Building.query.filter_by(id_expedicao=id_expedition).all()
        if not buildings:
            raise Exception("Nenhuma prédio encontrada para esta expedição!")

        return jsonify({
            "message": "Prédios encontradas com sucesso",
            "buildings": [building.as_dict() for building in buildings]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
