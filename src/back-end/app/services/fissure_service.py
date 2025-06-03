from ..models.fissure import Fissure
from ..models.building import Building
from ..models.image import Image
from ...config.database import db
from flask import jsonify

def create_fissure(data):
    try:
        newFissure = Fissure(
            confiabilidade = data['confiabilidade'],
            categoria = data['categoria'].lower(),
            id_image = data['id_image'],
            url_fissura = data['url_fissura']
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
        fissure.url_fissura= data.get('url_fissura', fissure.url_fissura)
        
        db.session.commit()

        return jsonify({
            "message": "Fissura atualizada com sucesso!",
            "fissure": fissure.as_dict()
            }), 200

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500
    
def get_fissures_by_predio(id_predio):
    try:
        fissures = db.session.query(Fissure).join(Image).filter(Image.id_predio == id_predio).all()
        if not fissures:
            raise Exception("Não há fissuras nesse prédio")
        
        resultado = {
            "termica": [],
            "retracao": []
        }

        sem_class = []


        for fissure in fissures:
            categoria = fissure.categoria
            if fissure.categoria in resultado:
                resultado[categoria].append(fissure.as_dict())
            else:
                sem_class.append(fissure.as_dict())

        return jsonify({
            "message": "Fissuras encontradas com sucesso",
            "fissures": resultado,
            "sem-classificacao": sem_class
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500