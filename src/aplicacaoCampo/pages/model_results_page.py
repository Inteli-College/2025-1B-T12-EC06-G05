import glob
import os
from pathlib import Path
from PIL import Image
import streamlit as st
from services.model import get_images_with_cracks

def render_model_results_page(building_path, crack_counts):
    building_name = Path(building_path).name
    if "_Andar_" in building_name:
        predio, andar = building_name.split("_Andar_", 1)
        title = f"Resultados de Detecção - {predio} - Andar {andar}"
    else:
        title = f"Resultados de Detecção - {building_name}"

    st.markdown(f"<h3>{title}</h3>", unsafe_allow_html=True)

    if st.button("⬅️ Voltar ao prédio"):
        st.query_params = {
            "inspection": Path(building_path).parents[1].name,
            "building": Path(building_path).name
        }
        st.rerun()

    if not crack_counts:
        st.warning("Nenhum resultado de detecção encontrado.")
        return

    st.subheader("📊 Quantidade de rachaduras detectadas")
    for crack_type, count in crack_counts.items():
        st.write(f"- **{crack_type.capitalize()}**: {count}")

    st.subheader("Detecção de Rachaduras (somente imagens com rachaduras)")
    sentidos = ["Norte", "Leste", "Sul", "Oeste"]
    images_with_cracks = get_images_with_cracks(building_path)

    for sentido in sentidos:
        sentido_images = []
        all_result_images = sorted(glob.glob(f"{building_path}/resultados/detect_{sentido}_*.[jp][pn]g"), reverse=True)

        for img_path in all_result_images:
            original_name = os.path.basename(img_path).replace("detect_", "")
            if original_name in images_with_cracks:
                sentido_images.append(img_path)

        if sentido_images:
            st.markdown(f"### {sentido} ({len(sentido_images)} detecções)")
            cols = st.columns(3)
            for i, img_path in enumerate(sentido_images):
                img = Image.open(img_path)
                with cols[i % 3]:
                    st.image(img, use_container_width=True)
                    st.caption(f"🔴 {os.path.basename(img_path)}")