from ..models.fissure import Fissure
from ...config.database import db
from flask import jsonify

def create_fissure(data):
    try:
        newFissure = Fissure(
            confiabilidade = data['confiabilidade'],
            categoria = data['categoria'].lower(),
            id_image = data['id_image']
        )

        db.session.add(newFissure)
        db.session.commit()

        return jsonify({"message": "Fissura registrada com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_all_fissures():
    try:
        fissures = Fissure.query.all()
        if not fissures:
            raise Exception("Não há fissuras!")

        return jsonify({
            "message": "Fissuras encontradas com sucesso",
            "fissures": [fissure.as_dict() for fissure in fissures]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_fissure_by_id(id_fissure):
    try:
        fissure = db.session.get(Fissure, id_fissure)
        if not fissure:
            raise Exception("Fissura não encontrada!")

        return jsonify({
            "message": "Fissura encontrada com sucesso",
            "fissure": fissure.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_fissure(id_fissure):
    try:
        fissure = db.session.get(Fissure, id_fissure)
        if not fissure:
            raise Exception("Fissure não encontrado!")

        db.session.delete(fissure)
        db.session.commit()
        return jsonify({"message": "Fissura deletada com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def update_fissure(data):
    try:
        fissure = db.session.get(Fissure, data['id'])
        if not fissure:
            raise Exception("Fissura não encontrada!")
        
        fissure.confiabilidade = data.get('confiabilidade', fissure.confiabilidade)
        fissure.categoria = data.get('categoria', fissure.categoria)
        fissure.id_image = data.get('id_image', fissure.id_image)
        
        db.session.commit()

        return jsonify({
            "message": "Fissura atualizada com sucesso!",
            "fissure": fissure.as_dict()
            }), 200

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500