from flask import request, Blueprint
from ..services.fissure_service import *
from flask_jwt_extended import jwt_required

fissure_bp = Blueprint('fissure', __name__, url_prefix='/fissure')

@fissure_bp.route('/add', methods=['POST'])
@jwt_required()
def add():
    data = request.get_json()
    return create_fissure(data)

@fissure_bp.route('/all', methods=['GET'])
@jwt_required()
def all():
    return get_all_fissures()

@fissure_bp.route('/<id_model>', methods=['GET'])
@jwt_required()
def by_id(id_model):
    return get_fissure_by_id(id_model)

@fissure_bp.route('/delete/<id_model>', methods=['DELETE'])
@jwt_required()
def delete(id_model):
    return delete_fissure(id_model)

@fissure_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update():
    data = request.get_json()
    return update_fissure(data)