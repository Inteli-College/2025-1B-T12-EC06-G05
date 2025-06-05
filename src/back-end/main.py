import os
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta


# importa a instância do SQLAlchemy
from .config.database import db
from sqlalchemy import create_engine

# importa todos os seus models para registro no metadata
from .app.models.user       import User
from .app.models.expedition import Expedition
from .app.models.model      import Model 
from .app.models.building   import Building
from .app.models.image      import Image
from .app.models.fissure    import Fissure


# importa seus blueprints
from .app.routes.users import user_bp
from .app.routes.expeditions import expedition_bp
from .app.routes.models import model_bp
from .app.routes.fissures import fissure_bp
from .app.routes.images import image_bp
from .app.routes.building import building_bp

# Load environment variables from .env
load_dotenv()

jwt = JWTManager()  # <- só instancia aqui, sem app
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Fetch variables
    USER = os.getenv("user")
    PASSWORD = os.getenv("password")
    HOST = os.getenv("host")
    PORT = os.getenv("port")
    DBNAME = os.getenv("dbname")

    # Construct the SQLAlchemy connection string
    DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"
        
    # Create the SQLAlchemy engine
    engine = create_engine(DATABASE_URL)

    # Test the connection
    try:
        with engine.connect() as connection:
            print("Connection successful!")
    except Exception as e:
        print(f"Failed to connect: {e}")
    
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

    # Chave secreta do JWT
    app.config['JWT_SECRET_KEY'] = 'Rachadores' 
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=7)


    jwt.init_app(app)
    bcrypt.init_app(app) 

    # Inicializa o banco no app
    db.init_app(app)

    # Criando o banco de dados e tabelas
    with app.app_context():
        db.create_all()

    # Registrando as rotas 
    app.register_blueprint(user_bp)
    app.register_blueprint(expedition_bp)
    app.register_blueprint(model_bp)
    app.register_blueprint(fissure_bp)
    app.register_blueprint(image_bp)
    app.register_blueprint(building_bp)

    return app

# Configurando para iniciar o projeto
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)