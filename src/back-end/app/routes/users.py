from flask import request, Blueprint
from ..services.user_services import register_user, login_user, delete_user, get_user_by_id, get_users_by_cargo, get_all_users
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

@user_bp.route('<id_user>', methods=['GET'])
def get_user(id_user):
    return get_user_by_id(id_user)

@user_bp.route('/cargo/<cargo>', methods=['GET'])
def users_by_cargo(cargo):
    return get_users_by_cargo(cargo)

@user_bp.route('/all', methods=['GET'])
def get_all():
    return get_all_users()
