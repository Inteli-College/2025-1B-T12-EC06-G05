from flask_jwt_extended import create_access_token
from ..models.user import User
from ...config.database import db
from flask import jsonify

def register_user(data):
    from ...main import bcrypt  # Importa o bcrypt do main

    email = data['email']
    senha = data['senha']

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email já Cadastrado!"}), 400

    hashed_senha = bcrypt.generate_password_hash(senha).decode('utf-8')
    new_user = User(
        email=email, 
        senha=hashed_senha,
        nome_completo=data['nome_completo'],
        cargo = data['cargo']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

def login_user(data):
    from ...main import bcrypt  # Importa o bcrypt do main

    email = data['email']
    senha = data['senha']

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.senha, senha):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200

    return jsonify({"error": "Usuário ou senha inválidos"}), 401
