import os
import streamlit as st

def render_inspection_page(inspection_name, inspections_dir):
    if st.button("⬅️ Voltar para a pagina inicial"):
        st.query_params = {}
        st.rerun()

    st.write(f"Expedição: {inspection_name}")
    building_dir = os.path.join(inspections_dir, inspection_name, "predios")
    os.makedirs(building_dir, exist_ok=True)

    st.subheader("Adicionar Novo Prédio")
    new_building = st.text_input("Nome do novo prédio")

    if st.button("Adicionar Prédio") and new_building.strip():
        building_name = new_building.strip()
        new_path = os.path.join(building_dir, building_name)
        if not os.path.exists(new_path):
            os.makedirs(new_path)
            st.success(f"Prédio '{new_building}' adicionado.")
            st.query_params = {"inspection": inspection_name, "building": building_name}
            st.rerun()
        else:
            st.error("Esse prédio já existe.")

    st.subheader("Prédios Existentes")
    buildings = sorted(os.listdir(building_dir), reverse=True)
    for b in buildings:
        display_name = b
        if st.button(f"Abrir {display_name}"):
            st.query_params = {"inspection": inspection_name, "building": b}
            st.rerun()
