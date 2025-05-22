from flask import request, Blueprint
from ..services.modelo_services import *
from flask_jwt_extended import jwt_required, get_jwt_identity

# Instancia o blueprint
model_bp = Blueprint('model', __name__, url_prefix='/model')

#Rotas do usuario
@model_bp.route('/add', methods=['POST'])
def add():
    data = request.get_json()
    return create_model(data)

@model_bp.route('/all', methods=['GET'])
def all():
    return get_all_models()

@model_bp.route('/<id_model>', methods=['GET'])
def by_id(id_model):
    return get_modelo_by_id(id_model)

@model_bp.route('/delete/<id_model>', methods=['DELETE'])
def delete(id_model):
    return delete_model(id_model)

@model_bp.route('/update', methods=['PATCH'])
def update():
    data = request.get_json()
    return update_model(data)