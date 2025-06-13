from flask import request, Blueprint
from ..services.modelo_services import *
from flask_jwt_extended import jwt_required, get_jwt_identity

model_bp = Blueprint('model', __name__, url_prefix='/model')

@model_bp.route('/add', methods=['POST'])
@jwt_required()
def add():
    data = request.get_json()
    return create_model(data)

@model_bp.route('/all', methods=['GET'])
@jwt_required()
def all():
    return get_all_models()

@model_bp.route('/<id_model>', methods=['GET'])
@jwt_required()
def by_id(id_model):
    return get_modelo_by_id(id_model)

@model_bp.route('/delete/<id_model>', methods=['DELETE'])
@jwt_required()
def delete(id_model):
    return delete_model(id_model)

@model_bp.route('/update', methods=['PATCH'])
@jwt_required()
def update():
    data = request.get_json()
    return update_model(data)

@model_bp.route('/run', methods=['POST'])
@jwt_required()
def run_model_direct():
    data = request.get_json()
    model_path = "models/modelo.pt"
    bucket_name = "fissurai"
    return run_model_service(data, model_path, bucket_name)


@model_bp.route('/run/building/<int:id_predio>', methods=['POST'])
@jwt_required()
def run_model_from_building(id_predio):
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
    model_path = os.path.join(base_dir, 'modelo', 'best_new.pt')
    bucket_name = "fissurai"
    return run_model_for_building(id_predio, model_path, bucket_name)
