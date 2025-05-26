from flask_jwt_extended import create_access_token
from ..models.model import Model
from ..models.user import User

from ...config.database import db
from flask import jsonify

def create_model(data):
    try:
        newModel = Model(
            url = data['url'],
            nome = data['nome_modelo'].lower(),
            tipo = data['tipo'].lower(),
            loss = data['loss'],
            loss_tipo = data['loss_tipo'].lower()
        )

        db.session.add(newModel)
        db.session.commit()

        return jsonify({"message": "Modelo registrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_all_models():
    try:
        models = Model.query.all()
        if not models:
            raise Exception("Não há modelos!")

        return jsonify({
            "message": "Modelos encontrados com sucesso",
            "models": [model.as_dict() for model in models]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_modelo_by_id(id_model):
    try:
        model = db.session.get(Model, id_model)
        if not model:
            raise Exception("Modelo não encontrado!")

        return jsonify({
            "message": "Modelo encontrado com sucesso",
            "model": model.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_model(id_model):
    try:
        model = db.session.get(Model, id_model)
        if not model:
            raise Exception("Modelo não encontrado!")

        db.session.delete(model)
        db.session.commit()
        return jsonify({"message": "Modelo deletado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def update_model(data):
    try:
        model = db.session.get(Model, data['id'])
        if not model:
            raise Exception("Modelo não encontrado!")
        
        model.url = data.get('url', model.url)
        model.nome = data.get('nome', model.nome)
        model.tipo = data.get('tipo', model.tipo)
        model.loss = data.get('loss', model.loss)
        model.loss_tipo = data.get('loss_tipo', model.loss_tipo)
        
        db.session.commit()

        return jsonify({
            "message": "Modelo atualizado com sucesso!",
            "model": model.as_dict()
            }), 200

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500