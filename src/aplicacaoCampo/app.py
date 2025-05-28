import streamlit as st

import os
from pages.login_page import render_login
from pages.start_page import render_start_page
from pages.inspection_page import render_inspection_page
from pages.building_page import render_building_page
from pages.model_results_page import render_model_results_page
from services.s3_uploader import upload_images_to_s3

INSPECTIONS_DIR = 'imagens/inspecoes'

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
        upload_images_to_s3(base_folder=INSPECTIONS_DIR)