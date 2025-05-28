import os
import time
import streamlit as st

def render_start_page(inspections_dir):
    col1, col2 = st.columns([1, 2], gap="large")

    with col1:
        st.subheader("Criar nova Expedição")
        new_name = st.text_input("Nome da Expedição")
        new_building = st.text_input("Nome do Prédio")

        if st.button("Iniciar"):
            if new_name.strip() and new_building.strip():
                building_name = new_building.strip()
                inspection_path = os.path.join(inspections_dir, new_name.strip())
                building_path = os.path.join(inspection_path, "predios", building_name)
                if not os.path.exists(building_path):
                    os.makedirs(building_path)
                    st.success(f"Inspeção '{new_name}' e prédio '{new_building}' criados.")
                    st.query_params = {"inspection": new_name.strip(), "building": building_name}
                    st.rerun()
                else:
                    st.error("Essa expedição e/ou prédio já existem.")

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