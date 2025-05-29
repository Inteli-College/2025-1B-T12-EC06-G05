from ..models.image import Image
from ...config.database import db
from flask import jsonify
import boto3
import uuid
import os


def create_image(data):
    try:
        newImage = Image(
            url=data['url'],
            nome=data['nome'],
            hora_coleta=data['hora_coleta'],
            orientacao=data['orientacao'],
            id_predio=data['id_predio'],
            img_resultado=data['img_resultado'],
            anotacao=data['anotacao'],
            id_modelo=data.get('id_modelo')
        )

        db.session.add(newImage)
        db.session.commit()

        return jsonify({"message": "Imagem registrada com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_all_images():
    try:
        images = Image.query.all()
        if not images:
            raise Exception("Não há imagens!")

        return jsonify({
            "message": "Imagens encontradas com sucesso",
            "images": [img.as_dict() for img in images]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_image_by_id(id_image):
    try:
        image = db.session.get(Image, id_image)
        if not image:
            raise Exception("Imagem não encontrada!")

        return jsonify({
            "message": "Imagem encontrada com sucesso",
            "image": image.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def delete_image(id_image):
    try:
        image = db.session.get(Image, id_image)
        if not image:
            raise Exception("Imagem não encontrada!")

        db.session.delete(image)
        db.session.commit()
        return jsonify({"message": "Imagem deletada com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def update_image(data):
    try:
        image = db.session.get(Image, data['id'])
        if not image:
            raise Exception("Imagem não encontrada!")

        image.url = data.get('url', image.url)
        image.nome = data.get('nome', image.nome)
        image.hora_coleta = data.get('hora_coleta', image.hora_coleta)
        image.orientacao = data.get('orientacao', image.orientacao)
        image.id_predio = data.get('id_predio', image.id_predio)
        image.img_resultado = data.get('img_resultado', image.img_resultado)
        image.anotacao = data.get('anotacao', image.anotacao)
        image.confiabilidade = data.get('confiabilidade', image.confiabilidade)
        image.id_modelo = data.get('id_modelo', image.id_modelo)

        db.session.commit()

        return jsonify({
            "message": "Imagem atualizada com sucesso!",
            "image": image.as_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
def get_images_by_predio(id_predio):
    try:
        images = Image.query.filter_by(id_predio=id_predio).all()
        if not images:
            raise Exception("Nenhuma imagem encontrada para este prédio!")

        return jsonify({
            "message": "Imagens encontradas com sucesso",
            "images": [img.as_dict() for img in images]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def upload_image(image):

    s3_client = boto3.client('s3')

    S3_BUCKET = 'fissurai'
    S3_REGION = 'us-east-1'

    if image.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400

    # Gera um nome único e limpo pro arquivo
    file_ext = os.path.splitext(image.filename)[1]
    s3_filename = f"{uuid.uuid4()}{file_ext}"

    try:
        s3_client.upload_fileobj(
            image,
            S3_BUCKET,
            s3_filename,
            ExtraArgs={'ContentType': image.content_type}
        )

        public_url = f"https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{s3_filename}"
        return jsonify({'url': public_url}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500