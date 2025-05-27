from flask import request, Blueprint
from ..services.fissure_service import *
from flask_jwt_extended import jwt_required

fissure_bp = Blueprint('fissure', __name__, url_prefix='/fissure')

@fissure_bp.route('/add', methods=['POST'])
#@jwt_required()
def add():
    data = request.get_json()
    return create_fissure(data)

@fissure_bp.route('/all', methods=['GET'])
#@jwt_required()
def all():
    return get_all_fissures()

@fissure_bp.route('/<id_fissure>', methods=['GET'])
#@jwt_required()
def by_id(id_fissure):
    return get_fissure_by_id(id_fissure)

@fissure_bp.route('/delete/<id_fissure>', methods=['DELETE'])
#@jwt_required()
def delete(id_fissure):
    return delete_fissure(id_fissure)

@fissure_bp.route('/update', methods=['PATCH'])
#@jwt_required()
def update():
    data = request.get_json()
    return update_fissure(data)

@fissure_bp.route('/predio/<id_predio>', methods=['GET'])
def get_by_predio(id_predio):
    return get_fissures_by_predio(id_predio)