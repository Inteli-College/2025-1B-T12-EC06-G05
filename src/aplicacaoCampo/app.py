import os
import streamlit as st
from pages.login_page import render_login
from pages.start_page import render_start_page
from pages.inspection_page import render_inspection_page
from pages.building_page import render_building_page
from pages.model_results_page import render_model_results_page

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

if "user_email" not in st.session_state or "user_senha" not in st.session_state:
    render_login()
else:
    params = st.query_params
    if "inspection" not in params:
        render_start_page(INSPECTIONS_DIR)
    elif "building" not in params:
        render_inspection_page(params["inspection"], INSPECTIONS_DIR)
    elif "building" in params:
        building_path = os.path.join(INSPECTIONS_DIR, params["inspection"], "predios", params["building"])
        if "modelo" in params:
            crack_counts = st.session_state.get("crack_counts", {})
            render_model_results_page(building_path, crack_counts)
        else:
            render_building_page(building_path)