from flask import request, Blueprint
from ..services.image_services import *
from flask_jwt_extended import jwt_required

image_bp = Blueprint('image', __name__, url_prefix='/image')

@image_bp.route('/add', methods=['POST'])
def add_image_route():
    data = request.get_json()
    return create_image(data)

@image_bp.route('/all', methods=['GET'])
@jwt_required()
def all_images_route():
    return get_all_images()

@image_bp.route('/<int:id_image>', methods=['GET'])
@jwt_required()
def image_by_id_route(id_image):
    return get_image_by_id(id_image)

@image_bp.route('/delete/<int:id_image>', methods=['DELETE'])
@jwt_required()
def delete_image_route(id_image):
    return delete_image(id_image)

@image_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update_image_route():
    data = request.get_json()
    return update_image(data)

@image_bp.route('/by_predio/<int:id_predio>', methods=['GET'])
@jwt_required()
def images_by_predio_route(id_predio):
    return get_images_by_predio(id_predio)
