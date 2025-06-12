from flask_jwt_extended import create_access_token
from ..models.model import Model
from ..models.image import Image
from ..models.user import User
from ultralytics import YOLO
from PIL import Image as PilImage
import tempfile
import os
from ...config.database import db
from flask import jsonify
from .util_services import download_image_from_url, upload_file_to_s3
from .fissure_service import create_fissure

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
    
def run_model_service(data, model_path, bucket_name):
    try:
        image_data_list = data.get("imagens", [])
        if not image_data_list:
            return jsonify({"error": "Nenhuma imagem fornecida."}), 400

        model = YOLO(model_path)
        fissuras_criadas = []

        with tempfile.TemporaryDirectory() as tmp_dir:
            for item in image_data_list:
                image_id = item.get("id")
                image_url = item.get("url")
                if not image_id or not image_url:
                    continue

                local_image_path = os.path.join(tmp_dir, f"{image_id}.jpg")
                download_image_from_url(image_url, local_image_path)

                image = PilImage.open(local_image_path)
                result = model(image)[0]

                if len(result.boxes) == 0:
                    continue

                result_image_path = os.path.join(tmp_dir, f"detection_{image_id}.jpg")
                result.save(filename=result_image_path)

                s3_key = f"detections/detection_{image_id}.jpg"
                upload_file_to_s3(result_image_path, bucket_name, s3_key)
                s3_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

                for box in result.boxes:
                    class_id = int(box.cls[0])
                    confidence = float(box.conf[0])

                    fissura_data = {
                        "id_image": image_id,
                        "categoria": model.names[class_id],
                        "confiabilidade": confidence,
                        "url_fissura": s3_url
                    }

                    _, status = create_fissure(fissura_data)
                    if status == 201:
                        fissuras_criadas.append(fissura_data)

        if not fissuras_criadas:
            return jsonify({"message": "Nenhuma fissura detectada."}), 200

        return jsonify({
            "message": "Detecção e registro de fissuras concluídos!",
            "total": len(fissuras_criadas)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def run_model_for_building(building_id, model_path, bucket_name):
    try:
        imagens = Image.query.filter_by(id_predio=building_id).all()

        if not imagens:
            return jsonify({"error": "Nenhuma imagem encontrada para este prédio."}), 404

        image_data_list = [{"id": imagem.id, "url": imagem.url} for imagem in imagens]
        request_data = {"imagens": image_data_list}

        return run_model_service(request_data, model_path, bucket_name)

    except Exception as e:
        return jsonify({"error": str(e)}), 500