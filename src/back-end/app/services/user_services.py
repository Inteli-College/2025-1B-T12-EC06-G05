from flask_jwt_extended import create_access_token
from ..models.user import User
from ...config.database import db
from flask import jsonify

def register_user(data):
    from ...main import bcrypt  # Importa o bcrypt do main
    try:
        email = data['email']
        senha = data['senha']

        if User.query.filter_by(email=email).first():
            raise Exception("Email já cadastrado")

        hashed_senha = bcrypt.generate_password_hash(senha).decode('utf-8')
        cargo_user = data['cargo'].lower()
        new_user = User(
            email=email,
            senha=hashed_senha,
            nome_completo=data['nome_completo'],
            cargo=cargo_user
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Usuário registrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def login_user(data):
    from ...main import bcrypt  # Importa o bcrypt do main
    try:
        email = data['email']
        senha = data['senha']

        user = User.query.filter_by(email=email).first()

        if not user or not bcrypt.check_password_hash(user.senha, senha):
            raise Exception("Usuário ou senha inválidos")

        access_token = create_access_token(identity=email)

        return jsonify(access_token=access_token, cargo_user=user.cargo), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_user(id_user, email_admin):
    try:
        admin = User.query.filter_by(email=email_admin).first()
        if admin.cargo.lower() != "admin":
            raise Exception("Você não possui permissão para deletar outros usuários")

        user = db.session.get(User, id_user)
        if not user:
            raise Exception("Usuário não encontrado!")

        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuário deletado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_user_by_id(id_user, email_user):
    try:
        u = User.query.filter_by(email=email_user).first()
        user = db.session.get(User, id_user)
        if not user:
            raise Exception("Usuário não encontrado!")
        
        if u.id != id_user:
            if u.cargo.lower() != "admin":
                raise Exception(f"Você não possui permissão para acessar outros usuários")
        

        return jsonify({
            "message": "Usuário encontrado com sucesso",
            "user": user.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_users_by_cargo(cargo):
    try:
        cargo = cargo.lower()
        users = User.query.filter_by(cargo=cargo).all()
        if not users:
            raise Exception("Não há usuários com esse cargo")

        return jsonify({
            "message": "Usuários encontrados com sucesso",
            "users": [user.as_dict() for user in users]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_all_users():
    try:
        users = User.query.all()
        if not users:
            raise Exception("Não há usuários!")

        return jsonify({
            "message": "Usuários encontrados com sucesso",
            "users": [user.as_dict() for user in users]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def update_user(email_user, data):
    from ...main import bcrypt  # Importa o bcrypt do main
    try:
        u = User.query.filter_by(email=email_user).first()
        user_update = db.session.get(User, data["id"])
        if not user_update:
            raise Exception("Usuário não encontrado!")
        
        if u.id != data['id']:
            if u.cargo.lower() != "admin":
                raise Exception("Você não possui permissão para alterar outros usuários")

        user_update.email = data.get('email', user_update.email)
        user_update.nome_completo = data.get('nome_completo', user_update.nome_completo)
        user_update.cargo = data.get('cargo', user_update.cargo)

        senha_nova = data.get('senha_nova')
        senha_antiga = data.get('senha_antiga')

        if senha_nova:
            if not senha_antiga:
                raise Exception("Senha antiga é obrigatória para alterar a senha.")

            if bcrypt.check_password_hash(user_update.senha, senha_antiga):
                nova_senha = bcrypt.generate_password_hash(senha_nova).decode('utf-8')
                user_update.senha = nova_senha
            else:
                raise Exception("Senha anterior incorreta.")

        db.session.commit()
        return jsonify({
            "message": "Usuário atualizado com sucesso!",
            "user": user_update.as_dict()
        }), 200

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500

def get_user_by_token(email_user):
    try:
        user = User.query.filter_by(email=email_user).first()
        if not user:
            raise Exception("Usuário não encontrado!")

        return jsonify({
            "message": "Usuário encontrado com sucesso",
            "user": user.as_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500