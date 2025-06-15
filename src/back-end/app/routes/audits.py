from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity 
from ..services.audit_services import *

audit_bp = Blueprint('audit', __name__, url_prefix='/audit')

@audit_bp.route('/register', methods=['POST'])
@jwt_required()
def register_audit_route():
    email_user = get_jwt_identity()
    data = request.get_json()
    return register_audit(data, email_user)

@audit_bp.route('/delete/<int:id_audit>', methods=['DELETE'])
@jwt_required()
def delete_audit_route(id_audit):
    return delete_audit(id_audit)

@audit_bp.route('/<int:id_audit>', methods=['GET'])
@jwt_required()
def get_audit_route(id_audit):
    return get_audit_by_id(id_audit)

@audit_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update_audit_route():
    data = request.get_json()
    return update_audit(data)

@audit_bp.route('/fissure/<int:fissure_id>', methods=['GET'])
@jwt_required()
def get_audits_by_fissure_route(fissure_id):
    return get_audits_by_fissure_id(fissure_id)

@audit_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_audits_by_user_route(user_id):
    email_user = get_jwt_identity()
    return get_audits_by_user_id(user_id, email_user)

@audit_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_audits_route():
    email_user = get_jwt_identity()
    return get_all_audits(email_user)