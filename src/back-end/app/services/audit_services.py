from ..models.audit import Audit
from ..models.user import User
from ...config.database import db
from flask import jsonify
from werkzeug.exceptions import NotFound, BadRequest
from datetime import date
from ...datetime import datetime_sp

def register_audit(data, email_user):
    required = ["id_fissura"]
    for field in required:
        if data.get(field) is None:
            raise BadRequest(f"Campo obrigatório ausente: {field}")
    
    user = User.query.filter_by(email=email_user).first()
    if not user:
        raise NotFound("Usuário responsável não encontrado.")

    try:
        current_date = datetime_sp.date()

        new_audit = Audit(
            data_auditoria=current_date,
            id_fissura=data['id_fissura'],
            id_auditor=user.id,
            status=1,
            modified=data['modified'] if 'modified' in data else None
        )

        db.session.add(new_audit)
        db.session.commit()
        return jsonify({"message": "Auditoria registrada com sucesso!", "auditInformation": new_audit.as_dict(), "id": new_audit.id}), 201

    except BadRequest as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao registrar auditoria: " + str(e)}), 500

def delete_audit(id_audit):
    audit = Audit.query.get(id_audit)
    if not audit:
        return jsonify({"error": "Auditoria não encontrada"}), 404

    try:
        db.session.delete(audit)
        db.session.commit()
        return jsonify({"message": "Auditoria deletada com sucesso!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao deletar auditoria: " + str(e)}), 500

def update_audit(data):
    if 'id' not in data:
        raise BadRequest("ID da auditoria é obrigatório para a atualização.")

    try:
        audit = db.session.get(Audit, data['id'])
        if not audit:
            raise NotFound("Auditoria não encontrada!")

        updatable_fields = ["id_fissura", "id_auditor", "status"]

        for field in updatable_fields:
            if field in data:
                setattr(audit, field, data[field])

        audit.modified = datetime_sp.date()

        db.session.commit()

        return jsonify({
            "message": "Auditoria atualizada com sucesso!",
            "audit": audit.as_dict()
            }), 200

    except (NotFound, BadRequest) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), e.code if isinstance(e, NotFound) else 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao atualizar auditoria: " + str(e)}), 500

def get_audit_by_id(id_audit):
    try:
        audit = db.session.get(Audit, id_audit)
        if not audit:
            raise NotFound("Auditoria não encontrada!")

        return jsonify({
            "message": "Auditoria encontrada com sucesso",
            "audit": audit.as_dict()
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar auditoria: " + str(e)}), 500

def get_audits_by_fissure_id(id_fissura):
    try:
        audits = Audit.query.filter_by(id_fissura=id_fissura).all()
        if not audits:
            raise NotFound("Nenhuma auditoria encontrada para esta fissura!")

        return jsonify({
            "message": "Auditorias encontradas com sucesso",
            "audits": [audit.as_dict() for audit in audits]
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar auditorias por fissura: " + str(e)}), 500

def get_audits_by_user_id(id_auditor, email_user):
    try:
        u = User.query.filter_by(email=email_user).first()
        auditor = db.session.get(User, id_auditor)
        
        if not auditor:
            raise NotFound("Usuário auditor não encontrado!")

        if u.id != auditor.id:
            if u.cargo.lower() != "admin":
                raise Exception(f"Você não possui permissão para acessar outras auditorias")

        audits = Audit.query.filter_by(id_auditor=id_auditor).all()
        
        if not audits:
            raise NotFound("Nenhuma auditoria encontrada para este usuário!")
        
        return jsonify({
            "message": "Auditorias encontradas com sucesso",
            "audits": [audit.as_dict() for audit in audits]
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar auditorias por usuário: " + str(e)}), 500
    
def get_all_audits(email_user):
    try:
        current_user = User.query.filter_by(email=email_user).first()
        if not current_user:
            raise NotFound("Usuário não encontrado.")

        if current_user.cargo.lower() != "admin":
            return jsonify({"error": "Acesso negado. Apenas administradores podem visualizar todas as auditorias."}), 403

        audits = Audit.query.all()
        if not audits:
            raise NotFound("Não há auditorias registradas!")

        return jsonify({
            "message": "Todas as auditorias encontradas com sucesso",
            "audits": [audit.as_dict() for audit in audits]
        }), 200

    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Erro ao buscar todas as auditorias: " + str(e)}), 500