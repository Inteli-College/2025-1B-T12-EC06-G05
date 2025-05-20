from flask import Flask, Blueprint
from .config.database import db
import os
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy

from .app.models.user import User

app = Flask(__name__)
CORS(app)

# Configura o banco de dados para salvar na pasta `data/`
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "data", "database.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config['JWT_SECRET_KEY'] = 'Rachadores' 
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Inicializa o banco no app
db.init_app(app)

# Criando o banco de dados e tabelas
with app.app_context():
    db.create_all()

from .app.routes.users import user_bp

app.register_blueprint(user_bp)


# Configurando para iniciar o projeto
if __name__ == '__main__':
    app.run(
        debug=True,
        )