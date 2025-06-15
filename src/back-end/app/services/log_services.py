from ..models.log import Log
from ..models.user import User 
from ...config.database import db
from flask import jsonify
from werkzeug.exceptions import NotFound, BadRequest
from datetime import datetime, date

def register_log(data):
    required = ["id_responsavel", "status", "descricao"]
    for field in required:
        if data.get(field) is None:
            raise BadRequest(f"Campo obrigatório ausente: {field}")

    try:
        user = User.query.get(data['id_responsavel'])
        if not user:
            raise NotFound("Usuário responsável não encontrado.")

        new_log = Log(
            id_responsavel=data['id_responsavel'],
            data=datetime.now(),
            status=data['status'],
            descricao=data['descricao']
        )

        db.session.add(new_log)
        db.session.commit()
        return jsonify({"message": "Log registrado com sucesso!", "logInformation": new_log.as_dict(), "id": new_log.id}), 201

    except (BadRequest, NotFound) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), e.code if isinstance(e, NotFound) else 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao registrar log: " + str(e)}), 500

def delete_log(id_log):
    log = Log.query.get(id_log)
    if not log:
        return jsonify({"error": "Log não encontrado"}), 404

    try:
        db.session.delete(log)
        db.session.commit()
        return jsonify({"message": "Log deletado com sucesso!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao deletar log: " + str(e)}), 500

def update_log(data):
    if 'id' not in data:
        raise BadRequest("ID do log é obrigatório para a atualização.")

    try:
        log = db.session.get(Log, data['id'])
        if not log:
            raise NotFound("Log não encontrado!")

        updatable_fields = ["status", "descricao"]

        for field in updatable_fields:
            if field in data:
                setattr(log, field, data[field])

        db.session.commit()

        return jsonify({
            "message": "Log atualizado com sucesso!",
            "log": log.as_dict()
            }), 200

    except (NotFound, BadRequest) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), e.code if isinstance(e, NotFound) else 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao atualizar log: " + str(e)}), 500

def get_logs_by_id(id_log):
    try:
        log = db.session.get(Log, id_log)
        if not log:
            raise NotFound("Log não encontrado!")

        return jsonify({
            "message": "Log encontrado com sucesso",
            "log": log.as_dict()
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar log por ID: " + str(e)}), 500


def get_logs_by_status(status_code):
    try:
        logs = Log.query.filter_by(status=status_code).all()
        if not logs:
            raise NotFound(f"Nenhum log encontrado com status: {status_code}!")

        return jsonify({
            "message": f"Logs encontrados com sucesso para status {status_code}",
            "logs": [log.as_dict() for log in logs]
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar logs por status: " + str(e)}), 500

def get_logs_by_user_id(id_user, current_user_email):
    try:
        requester_user = User.query.filter_by(email=current_user_email).first()
        if not requester_user:
            raise NotFound("Usuário logado não encontrado.")

        target_user = User.query.get(id_user)
        if not target_user:
            raise NotFound("Usuário dos logs não encontrado.")
        
        if requester_user.id != target_user.id and requester_user.cargo.lower() != "admin":
            return jsonify({"error": "Acesso negado. Você não tem permissão para visualizar logs de outros usuários."}), 403

        logs = Log.query.filter_by(id_responsavel=id_user).all()

        if not logs:
            return jsonify({"message": f"Nenhum log encontrado para o usuário ID: {id_user}."}), 200

        return jsonify({
            "message": f"Logs encontrados com sucesso para o usuário ID: {id_user}",
            "logs": [log.as_dict() for log in logs]
        }), 200

    except (NotFound, BadRequest) as e:
        return jsonify({"error": str(e)}), e.code if isinstance(e, NotFound) else 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar logs por usuário: " + str(e)}), 500

def get_logs_by_date(log_date_str):
    if not log_date_str:
        return jsonify({"message": "Nenhum termo de busca fornecido para a data."}), 200

    try:
        search_date = datetime.strptime(log_date_str, '%Y-%m-%d').date()
        start_of_day = datetime.combine(search_date, datetime.min.time())
        end_of_day = datetime.combine(search_date, datetime.max.time())

        logs = Log.query.filter(Log.data.between(start_of_day, end_of_day)).all()

        if not logs:
            raise NotFound(f"Nenhum log encontrado para a data: {log_date_str}!")

        return jsonify({
            "message": f"Logs encontrados com sucesso para a data: {log_date_str}",
            "logs": [log.as_dict() for log in logs]
        }), 200

    except ValueError:
        return jsonify({"error": "Formato de data inválido. Use 'YYYY-MM-DD'."}), 400
    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar logs por data: " + str(e)}), 500

def get_all_logs(current_user_email):
    try:
        requester_user = User.query.filter_by(email=current_user_email).first()
        if not requester_user:
            raise NotFound("Usuário logado não encontrado.")
        
        if requester_user.cargo.lower() != "admin":
            return jsonify({"error": "Acesso negado. Apenas administradores podem visualizar todos os logs."}), 403 

        logs = Log.query.all()
        if not logs:
            raise NotFound("Não há logs registrados!")

        return jsonify({
            "message": "Todos os logs encontrados com sucesso",
            "logs": [log.as_dict() for log in logs]
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar todos os logs: " + str(e)}), 500