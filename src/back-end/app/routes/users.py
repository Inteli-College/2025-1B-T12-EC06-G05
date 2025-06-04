from flask import request, Blueprint
from ..services.user_services import register_user, login_user, delete_user, get_user_by_id, get_users_by_cargo, get_all_users, update_user
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User

# Instancia o blueprint
user_bp = Blueprint('user', __name__, url_prefix='/user')

#Rotas do usuario
@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return register_user(data)

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return login_user(data)

@user_bp.route('/delete/<id_user>', methods=['DELETE'])
@jwt_required()
def delete(id_user):
    email_admin = get_jwt_identity()
    return delete_user(id_user, email_admin)

@user_bp.route('<int:id_user>', methods=['GET'])
@jwt_required()
def get_user(id_user):
    email_user = get_jwt_identity()
    return get_user_by_id(id_user, email_user)

@user_bp.route('/cargo/<cargo>', methods=['GET'])
@jwt_required()
def users_by_cargo(cargo):
    return get_users_by_cargo(cargo)

@user_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all():
    return get_all_users()

@user_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update():
    data = request.get_json()
    email_user = get_jwt_identity()
    return update_user(email_user, data)