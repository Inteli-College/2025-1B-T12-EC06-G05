import streamlit as st
import os
from pages.login_page import render_login
from pages.start_page import render_start_page
from pages.inspection_page import render_inspection_page
from pages.building_page import render_building_page
from pages.model_results_page import render_model_results_page
from services.s3_uploader import upload_images_to_s3
from services.api_auth import login_and_get_token
from services.api_client import APIClient
from services.publish_service import publish_full_inspection

INSPECTIONS_DIR = 'imagens/inspecoes'

st.set_page_config(layout="wide", initial_sidebar_state="collapsed")

# Remove a sidebar
st.markdown("""
    <style>
        section[data-testid="stSidebar"] {
            display: none !important;
        }

        div[aria-expanded="false"][data-testid="collapsedControl"] {
            display: none !important;
        }

        div[data-testid="stAppViewContainer"] > div:first-child {
            display: none !important;
        }

        div[data-testid="stAppViewContainer"] > main {
            margin-left: 0 !important;
        }
    </style>
""", unsafe_allow_html=True)

if "user_id" not in st.session_state:
    render_login()
else:
    params = st.query_params

    if "inspection" in params:
        if "building" in params:
            building_path = os.path.join(INSPECTIONS_DIR, params["inspection"], "predios", params["building"])
            if "modelo" in params:
                crack_counts = st.session_state.get("crack_counts", {})
                render_model_results_page(building_path, crack_counts)
            else:
                render_building_page(building_path)
        else:
            render_inspection_page(params["inspection"], INSPECTIONS_DIR)
    else:
        render_start_page(INSPECTIONS_DIR)

    if st.button("📤 Subir imagens"):
        with st.spinner("Subindo imagens para S3 e publicando na API..."):
            upload_images_to_s3(base_folder=INSPECTIONS_DIR)
            try:
                token = login_and_get_token()
                api = APIClient("http://127.0.0.1:5000", token)
                result = publish_full_inspection(api, inspections_dir=INSPECTIONS_DIR)
                st.success(f"Expedições publicadas: {result['expeditions']}")
                if result['errors']:
                    st.error(f"Erros durante a publicação: {result['errors']}")
            except Exception as e:
                st.error(f"Erro durante upload ou publicação: {e}")
