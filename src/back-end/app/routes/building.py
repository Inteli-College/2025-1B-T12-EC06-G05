from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.building_services import register_building, delete_building, get_building_by_id, get_all_building, update_building, get_building_by_id_expedition

# Instancia o blueprint
building_bp = Blueprint('building', __name__, url_prefix='/building')

# Rotas de prédio
@building_bp.route('/register', methods=['POST'])
@jwt_required()
def register():
    data = request.get_json()
    return register_building(data)

@building_bp.route('/delete/<int:id_building>', methods=['DELETE'])
@jwt_required()
def delete(id_building):
    return delete_building(id_building)

@building_bp.route('<int:id_building>', methods=['GET'])
@jwt_required()
def get_expedition(id_building):
    return get_building_by_id(id_building)

@building_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all():
    return get_all_building()

@building_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update():
    data = request.get_json()
    return update_building(data)

@building_bp.route('/expedition/<int:id_expedition>', methods=['GET'])
@jwt_required()
def by_expedition(id_expedition):
    return get_building_by_id_expedition(id_expedition)