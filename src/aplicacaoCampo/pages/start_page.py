import os
import time
import json
from datetime import datetime
import streamlit as st
from services.s3_uploader import upload_images_to_s3
from services.api_auth import login_and_get_token
from services.api_client import APIClient
from services.publish_service import publish_full_inspection

def render_start_page(inspections_dir):
    col1, col2 = st.columns([1, 2], gap="large")

    with col1:
        st.subheader("Criar nova Expedição")
        new_name = st.text_input("Nome da Expedição")
        localizacao = st.text_input("Localização")
        descricao = st.text_area("Descrição")
        foto_capa = st.file_uploader("Foto de Capa (opcional)", type=["png", "jpg", "jpeg"])

        if st.button("Iniciar"):
            user_id = st.session_state.get("user_id")
            if all([new_name.strip(), localizacao.strip(), user_id]):
                inspection_path = os.path.join(inspections_dir, new_name.strip())
                predios_path = os.path.join(inspection_path, "predios")

                if not os.path.exists(predios_path):
                    os.makedirs(predios_path)

                    foto_capa_path = ""
                    if foto_capa is not None:
                        ext = foto_capa.name.split('.')[-1]
                        capa_nome = f"capa_{new_name.strip()}.{ext}"
                        capa_path = os.path.join(inspection_path, capa_nome)
                        with open(capa_path, "wb") as f:
                            f.write(foto_capa.read())
                        foto_capa_path = capa_nome

                    now = datetime.now()
                    data_formatada = now.strftime("%d-%m-%Y")

                    expedition_data = {
                        'nome': new_name.strip(),
                        'localizacao': localizacao.strip(),
                        'data_criacao': data_formatada,
                        'ultima_att': data_formatada,
                        'id_responsavel': user_id,
                        'descricao': descricao.strip() if descricao else "",
                        'foto_capa': foto_capa_path
                    }

                    with open(os.path.join(inspection_path, 'expedition_info.json'), 'w') as f:
                        json.dump(expedition_data, f, indent=4)

                    st.success(f"Inspeção '{new_name}' criada com sucesso.")
                    st.query_params = {"inspection": new_name.strip()}
                    st.rerun()
                else:
                    st.error("Essa expedição já existe.")

    with col2:
        st.subheader("Expedições")
        folders = sorted(
            [name for name in os.listdir(inspections_dir)
             if os.path.isdir(os.path.join(inspections_dir, name))],
            reverse=True
        )

        mid_index = len(folders) // 2
        col3, col4 = st.columns([1, 1], gap="medium")

        for col, folder_group in zip((col3, col4), (folders[:mid_index], folders[mid_index:])):
            with col:
                for folder in folder_group:
                    creation_time = time.strftime('%d/%m/%Y', time.localtime(os.path.getctime(os.path.join(inspections_dir, folder))))
                    st.markdown(f"""
                        <div style='background-color: #6892ad; border-radius: 10px; padding: 10px; margin-bottom: 10px; display: flex; align-items: center;'>
                            <div style='width: 60px; height: 60px; background-color: #ccc; margin-right: 15px; border-radius: 5px;'></div>
                            <div>
                                <strong style='color: black;'>{folder}</strong><br>
                                <span style='color: black;'>{creation_time}</span>
                            </div>
                        </div>
                    """, unsafe_allow_html=True)
                    if st.button(f"Abrir {folder}"):
                        st.query_params = {"inspection": folder}
                        st.rerun()

    if "inspection" not in st.query_params:
        if st.button("📤 Subir imagens"):
            with st.spinner("Subindo imagens para S3 e publicando na API..."):
                upload_images_to_s3()
                try:
                    token = login_and_get_token(st.session_state.get("user_email"), st.session_state.get("user_senha"))
                    api = APIClient("http://127.0.0.1:5000", token)
                    result = publish_full_inspection(api)
                    if result['errors']:
                        st.error(f"Erros durante a publicação: {result['errors']}")
                except Exception as e:
                    st.error(f"Erro durante upload ou publicação: {e}")
