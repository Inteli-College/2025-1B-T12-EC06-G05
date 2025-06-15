from .building_services import  *
from .expedition_services import *
from .fissure_service import  *
from io import BytesIO
import json
from datetime import datetime
from fpdf import FPDF
from collections import defaultdict
import requests
import tempfile
import os
from PIL import Image
from io import BytesIO
import imghdr

    
def download_relatorio(id_predio):
    try:
        resBuilding, statusResBuilding = get_building_by_id(id_predio)
        if statusResBuilding == 500:
            raise Exception("Não existe prédio para esse id!")
        
        building = resBuilding.get_json()["building"]

        resExpedition, statusResExpedition = get_expedition_by_id(building["id_expedicao"])
        if statusResExpedition == 500:
            raise Exception("Erro ao encontrar a expedição ligada a esse prédio")
        
        expedition = resExpedition.get_json()["expedition"]

        resFissures, statusResFissures = get_fissures_by_predio(id_predio)
        if statusResFissures == 500:
            raise Exception("Não há fissuras para esse prédio!")
        fissures = resFissures.get_json()["fissures"]

        fissuras_termicas = fissures["termica"]
        fissuras_retracao = fissures["retracao"]

        total_fissures = len(fissuras_termicas) + len(fissuras_retracao)
        

        distribuicao_completa = defaultdict(lambda: {"termicas": 0, "retracao": 0, "total": 0})

        for fissura in fissuras_termicas:
            ori = fissura["orientacao"].lower()
            distribuicao_completa[ori]["termicas"] += 1

        for fissura in fissuras_retracao:
            ori = fissura["orientacao"].lower()
            distribuicao_completa[ori]["retracao"] += 1

        for ori, valores in distribuicao_completa.items():
            valores["total"] = valores["termicas"] + valores["retracao"]

        distribuicao_orientacao_completa = dict(distribuicao_completa)

        fissuras_por_orientacao = defaultdict(list)

        for fissura in fissuras_termicas:
            fissura_com_tipo = fissura.copy()
            fissuras_por_orientacao[fissura["orientacao"]].append(fissura_com_tipo)

        for fissura in fissuras_retracao:
            fissura_com_tipo = fissura.copy()
            fissuras_por_orientacao[fissura["orientacao"]].append(fissura_com_tipo)

        fissuras_agrupadas = dict(fissuras_por_orientacao)

        info_relatorio = {
            "nome_expedicao": expedition['nome'],
            "nome_predio": building['nome'],
            "endereco": expedition['localizacao'],
            "data_inspecao": expedition['ultima_att'],
            "responsavel": {
                "nome": expedition["nome_responsavel"],
                "email": expedition["email_responsavel"]
            },
            "total_fissuras": total_fissures,
            "fissuras_termicas": resFissures.get_json()["metricas"]["quantidade_termicas"],
            "fissuras_retracao": resFissures.get_json()["metricas"]["quantidade_retracao"],
            "distribuicao_orientacao": distribuicao_orientacao_completa,
            "fissuras": fissuras_agrupadas
        }

        pdf_buffer = generate_report(info_relatorio)
        return pdf_buffer, 200
    except Exception as e:
        return jsonify({"error": "Houve um erro ao gerar o relatório " + str(e)}), 500



def generate_report(dados_json):
    if isinstance(dados_json, str):
        dados = json.loads(dados_json)
    else:
        dados = dados_json
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Cabeçalho do relatório
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="Relatório de Expedição Predial", ln=1, align='C')
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"{dados.get('nome_expedicao', '')} - {dados.get('nome_predio', '')}", ln=1, align='C')
    
    # Resumo Executivo
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(200, 10, txt="Resumo Executivo", ln=1)
    pdf.set_font("Arial", size=12)
    
    data_expedicao = dados.get('data_expedicao', datetime.now().strftime('%d/%m/%Y'))
    responsavel = dados.get('responsavel', {})
    resumo = (f"A expedição predial realizada no edifício de endereço {dados.get('endereco', '')}, "
              f"no dia {data_expedicao}, realizada por {responsavel.get('nome', '')}, "
              f"{responsavel.get('email', '')}. Durante a expedição foram encontradas "
              f"{dados.get('total_fissuras', 0)} fissuras, sendo {dados.get('fissuras_termicas', 0)} "
              f"térmicas e {dados.get('fissuras_retracao', 0)} de retração. Segue abaixo, o relatório "
              "com maior detalhamento da expedição.")
    
    pdf.multi_cell(0, 10, txt=resumo)
    pdf.ln(10)
    
    # Tabela de distribuição por orientação geográfica
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(200, 10, txt="Distribuição por Orientação Geográfica", ln=1)
    
    # Cabeçalho da tabela
    col_widths = [60, 40, 40, 40]
    headers = ["Orientação Geográfica", "Fissuras Térmicas", "Fissuras de Retração", "Total de Fissuras"]
    
    pdf.set_font("Arial", 'B', 10)
    for i, header in enumerate(headers):
        pdf.cell(col_widths[i], 10, txt=header, border=1)
    pdf.ln()
    
    # Dados da tabela
    pdf.set_font("Arial", size=10)
    orientacoes = {k.lower(): v for k, v in dados.get('distribuicao_orientacao', {}).items()}
    
    for orientacao in ["norte", "nordeste", "leste", "sudeste", "sul", "sudoeste", "oeste", "noroeste"]:
        dados_orientacao = orientacoes.get(orientacao, {"termicas": 0, "retracao": 0, "total": 0})
        pdf.cell(col_widths[0], 10, txt=orientacao.capitalize(), border=1)
        pdf.cell(col_widths[1], 10, txt=str(dados_orientacao['termicas']), border=1)
        pdf.cell(col_widths[2], 10, txt=str(dados_orientacao['retracao']), border=1)
        pdf.cell(col_widths[3], 10, txt=str(dados_orientacao['total']), border=1)
        pdf.ln()
    
    # Página 2 - Detalhamento por orientação geográfica
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="Detalhamento das fissuras por Orientação Geográfica", ln=1)
    
    fissuras = {k.lower(): v for k, v in dados.get('fissuras', {}).items()}
    

    for orientacao in fissuras:
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(200, 10, txt=f"Visão {orientacao}")
        for fissura in fissuras.get(orientacao, []):
            pdf.set_font("Arial",  size=12)
            pdf.ln(2)
            pdf.cell(200, 20, txt=f"Fissura {fissura.get('id', 'Erro')}", ln=1)
        

            if 'url_fissura' in fissura:
                try:
                    response = requests.get(fissura['url_fissura'])
                    response.raise_for_status()

                    # Verifica o tipo da imagem
                    tipo_imagem = imghdr.what(None, h=response.content)
                    
                    if tipo_imagem not in ['jpeg', 'png', 'gif']:
                        img = Image.open(BytesIO(response.content))
                        
                        # Salva em um arquivo temporário como a extensão correta
                        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp_file:
                            img.convert('RGB').save(tmp_file, format='JPEG')
                            tmp_file_path = tmp_file.name

                    elif tipo_imagem in ['jpeg', 'png', 'gif']:
                        # Salva direto com a extensão correta
                        ext = '.' + tipo_imagem
                        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp_file:
                            tmp_file.write(response.content)
                            tmp_file_path = tmp_file.name

                    else:
                        raise ValueError(f"Tipo de imagem não suportado: {tipo_imagem}")

                    img_width = 45
                    x_position = (210 - img_width) / 2
                    pdf.image(tmp_file_path, x=x_position, w=img_width)
                    pdf.ln(5)

                    os.remove(tmp_file_path)

                except Exception as e:
                    pdf.cell(200, 10, txt=f"Erro ao carregar imagem: {str(e)}", ln=1)


            pdf.set_font("Arial", size=11)
            descricao = (f"Descrição fissura {fissura.get('id', '')}:\n"
                        f"- Tipo de fissura: {fissura.get('categoria_atual', 'Arrumar isso')}\n"
                        f"- Descrição da fissura: {fissura.get('descricao', '')}\n"
                        f"- Confiabilidade: {fissura.get('confiabilidade', '')}%\n")
                        # f"- Na auditoria houve alteração: {'sim' if fissura.get('alteracao_auditoria', False) else 'não'}")
            
            pdf.multi_cell(0, 10, txt=descricao)
            pdf.ln(10)  

    pdf_bytes = pdf.output(dest='S').encode('latin1')  
    buffer = BytesIO(pdf_bytes)

    buffer.seek(0)
    return buffer
