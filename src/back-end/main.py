import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

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
from .app.models.result     import Result
from .app.models.audit      import Audit

# importa seus blueprints
from .app.routes.users import user_bp

# Load environment variables from .env
load_dotenv()

jwt = JWTManager()  # <- só instancia aqui, sem app
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app)

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

    jwt.init_app(app)
    bcrypt.init_app(app) 

    # Inicializa o banco no app
    db.init_app(app)

    # Criando o banco de dados e tabelas
    with app.app_context():
        db.create_all()

    # Registrando as rotas 
    app.register_blueprint(user_bp)

    return app

# Configurando para iniciar o projeto
if __name__ == '__main__':
    create_app().run(
        debug=True,
        )