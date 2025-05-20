from flask import request, Blueprint
from ..services.user_services import register_user, login_user

# Instancia o blueprint
user_bp = Blueprint('user', __name__, url_prefix='/')

#Rotas do usuario
@user_bp.route('/register', methods=['POST'])
def register():
    # Puxa os dados do body
    data = request.get_json()
    # Chama o service responsável por essa rota
    return register_user(data)

@user_bp.route('/login', methods=['POST'])
def login():
    # Puxa os dados do body
    data = request.get_json()
    # Chama o service responsável por essa rota
    return login_user(data)

