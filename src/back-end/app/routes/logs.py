from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.log_services import *

log_bp = Blueprint('log', __name__, url_prefix='/log')

@log_bp.route('/register', methods=['POST'])
@jwt_required()
def register_log_route():
    data = request.get_json()
    return register_log(data)

@log_bp.route('/delete/<int:id_log>', methods=['DELETE'])
@jwt_required()
def delete_log_route(id_log):
    return delete_log(id_log)

@log_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update_log_route():
    data = request.get_json()
    return update_log(data)

@log_bp.route('/<int:id_log>', methods=['GET'])
@jwt_required()
def get_log_by_id_route(id_log):
    return get_logs_by_id(id_log)

@log_bp.route('/status/<int:status_code>', methods=['GET'])
@jwt_required()
def get_logs_by_status_route(status_code):
    return get_logs_by_status(status_code)

@log_bp.route('/user/<int:id_user>', methods=['GET'])
@jwt_required()
def get_logs_by_user_route(id_user):
    email_user = get_jwt_identity()
    return get_logs_by_user_id(id_user, email_user)

@log_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_logs_route():
    email_user = get_jwt_identity()
    return get_all_logs(email_user)