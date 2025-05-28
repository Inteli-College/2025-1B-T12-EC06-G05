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
    col1, col2 = st.columns(2)
    with col1:
        new_building = st.text_input("Nome do novo prédio")
    with col2:
        new_floor = st.text_input("Andar do prédio", placeholder="Ex: 1, 2, Térreo")

    if st.button("Adicionar Prédio") and new_building.strip() and new_floor.strip():
        building_name = f"{new_building.strip()}_Andar_{new_floor.strip()}"
        new_path = os.path.join(building_dir, building_name)
        if not os.path.exists(new_path):
            os.makedirs(new_path)
            st.success(f"Prédio '{new_building}' - Andar '{new_floor}' adicionado.")
            st.query_params = {"inspection": inspection_name, "building": building_name}
            st.rerun()
        else:
            st.error("Esse prédio e andar já existem.")

    st.subheader("Prédios Existentes")
    buildings = sorted(os.listdir(building_dir), reverse=True)
    for b in buildings:
        if "_Andar_" in b:
            building_name, floor_part = b.split("_Andar_", 1)
            display_name = f"{building_name} - Andar {floor_part}"
        else:
            display_name = b

        if st.button(f"Abrir {display_name}"):
            st.query_params = {"inspection": inspection_name, "building": b}
            st.rerun()
