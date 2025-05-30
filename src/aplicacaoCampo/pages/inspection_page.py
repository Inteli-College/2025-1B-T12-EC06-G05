import os
import json
import streamlit as st

def render_inspection_page(inspection_name, inspections_dir):
    if st.button("⬅️ Voltar para a pagina inicial"):
        st.query_params = {}
        st.rerun()

    inspection_path = os.path.join(inspections_dir, inspection_name)
    info_path = os.path.join(inspection_path, 'expedition_info.json')

    col1, col2 = st.columns([6, 2])

    if os.path.exists(info_path):
        with open(info_path, 'r') as f:
            expedition_info = json.load(f)

            with col1: 
                st.markdown("### Informações da Expedição")
                if expedition_info.get('nome'):
                    st.write(f"**Nome:** {expedition_info['nome']}")
                if expedition_info.get('localizacao'):
                    st.write(f"**Localização:** {expedition_info['localizacao']}")
                if expedition_info.get('descricao'):
                    st.write(f"**Descrição:** {expedition_info['descricao']}")
                if expedition_info.get('data_criacao'):
                    st.write(f"**Criada em:** {expedition_info['data_criacao']}")

            with col2:
                if expedition_info.get("foto_capa"):
                    img_path = os.path.join(inspection_path, expedition_info["foto_capa"])
                    if os.path.exists(img_path):
                        st.image(img_path, caption="Foto de Capa", width=300)

    building_dir = os.path.join(inspection_path, "predios")
    os.makedirs(building_dir, exist_ok=True)

    st.subheader("Prédios Existentes")
    buildings = sorted(os.listdir(building_dir), reverse=True)
    if buildings:
        for b in buildings:
            display_name = b
            if st.button(f"Abrir {display_name}"):
                st.query_params = {"inspection": inspection_name, "building": b}
                st.rerun()
    else:
        st.write("Nenhum prédio encontrado para essa expedição.")

    st.subheader("Adicionar Novo Prédio")
    nome_predio = st.text_input("Nome do Prédio")
    complemento = st.text_input("Complemento")
    descricao = st.text_area("Descrição")
    foto_fachada = st.file_uploader("Foto da Fachada (opcional)", type=["png", "jpg", "jpeg"])

    if st.button("Adicionar Prédio") and nome_predio.strip() and complemento.strip():
        building_name = nome_predio.strip()
        new_path = os.path.join(building_dir, building_name)

        if not os.path.exists(new_path):
            os.makedirs(new_path)

            fachada_path = ""
            if foto_fachada is not None:
                ext = foto_fachada.name.split('.')[-1]
                fachada_nome = f"fachada_{inspection_name}_{building_name}.{ext}"
                fachada_full_path = os.path.join(new_path, fachada_nome)
                with open(fachada_full_path, "wb") as f:
                    f.write(foto_fachada.read())
                fachada_path = fachada_nome

            building_data = {
                'id_expedicao': inspection_name,
                'nome': building_name,
                'complemento': complemento.strip(),
                'descricao': descricao.strip() if descricao else "",
                'foto_fachada': fachada_path
            }

            with open(os.path.join(new_path, 'building_info.json'), 'w') as f:
                json.dump(building_data, f, indent=4)

            st.success(f"Prédio '{building_name}' adicionado.")
            st.query_params = {"inspection": inspection_name, "building": building_name}
            st.rerun()
        else:
            st.error("Esse prédio já existe.")
