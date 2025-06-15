from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.expedition_services import register_expedition, delete_expedition, get_expedition_by_id, get_all_expeditions, search_expedition_by_nome, search_expedition_by_data_criacao, update_expedition, get_expedition_by_responsible

# Instancia o blueprint
expedition_bp = Blueprint('expedition', __name__, url_prefix='/expedition')

# Rotas de expedição
@expedition_bp.route('/register', methods=['POST'])
@jwt_required()
def register():
    email_user = get_jwt_identity()
    data = request.get_json()
    return register_expedition(data, email_user)

@expedition_bp.route('/delete/<int:id_expedition>', methods=['DELETE'])
@jwt_required()
def delete(id_expedition):
    return delete_expedition(id_expedition)

@expedition_bp.route('<int:id_expedition>', methods=['GET'])
@jwt_required()
def get_expedition(id_expedition):
    return get_expedition_by_id(id_expedition)

@expedition_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all():
    return get_all_expeditions()

@expedition_bp.route('/search/nome', methods=['GET'])
@jwt_required()
def get_by_nome():
    q = request.args.get('q')
    return search_expedition_by_nome(q)

@expedition_bp.route('/search/data_criacao', methods=['GET'])
@jwt_required()
def get_by_data_criacao():
    q = request.args.get('q')
    return search_expedition_by_data_criacao(q)

@expedition_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update():
    data = request.get_json()
    return update_expedition(data)

@expedition_bp.route('/user/<id_user>', methods=['GET'])
@jwt_required()
def by_user(id_user):
    return get_expedition_by_responsible(id_user)
