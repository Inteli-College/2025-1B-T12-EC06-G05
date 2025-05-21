from flask_jwt_extended import create_access_token
from ..models.user import User
from ...config.database import db
from flask import jsonify

def register_user(data):
    from ...main import bcrypt  # Importa o bcrypt do main

    # Busca do body as info do novo usuario
    email = data['email']
    senha = data['senha']

    # Verifica se o email já na está cadastrado
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email já Cadastrado!"}), 400

    # Colocando hash na senha
    hashed_senha = bcrypt.generate_password_hash(senha).decode('utf-8')

    # Criando o objeto do usuario
    new_user = User(
        email=email, 
        senha=hashed_senha,
        nome_completo=data['nome_completo'],
        cargo = data['cargo']
    )

    # Salva no DB o novo usuário
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

def login_user(data):
    from ...main import bcrypt  # Importa o bcrypt do main

    # Busca do body as info do novo usuario
    email = data['email']
    senha = data['senha']

    # Busca o usuario qual esta cadastrado nesse email
    user = User.query.filter_by(email=email).first()

    # Valida a senha pelo hash
    if user and bcrypt.check_password_hash(user.senha, senha):
        # Cria o token de acesso para o JWT
        access_token = create_access_token(identity=email)
        
        return jsonify(access_token=access_token), 200

    return jsonify({"error": "Usuário ou senha inválidos"}), 401
