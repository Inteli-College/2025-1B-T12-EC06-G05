from flask import request, Blueprint
from ..services.user_services import register_user, login_user

user_bp = Blueprint('user', __name__, url_prefix='/')

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return register_user(data)

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return login_user(data)

