from flask import request, Blueprint, send_file
from ..services.report_services import *
from flask_jwt_extended import jwt_required

report_bp = Blueprint('report', __name__, url_prefix='/report')

@report_bp.route('/<int:id_predio>', methods=['GET'])
#@jwt_required()
def teste(id_predio):
    pdf_buffer = download_relatorio(id_predio)

    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name=f"relatorio_{id_predio}.pdf",
        mimetype="application/pdf"
    )

