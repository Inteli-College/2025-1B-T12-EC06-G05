import os
import time
import glob
from pathlib import Path
from PIL import Image
import streamlit as st
import cv2
from services.drone import start_video_capture, stop_video_capture
from services.model import run_detection_model, get_images_with_cracks
from services.s3_uploader import upload_images_to_s3

FRAME_PATH = "shared_frames/latest.jpg"

def render_building_page(building_path):
    col_top = st.columns([1, 5, 1])
    with col_top[0]:
        if st.button("⬅️", key="voltar_predio"):
            inspection_path = Path(building_path).parents[1]
            st.query_params = {"inspection": inspection_path.name}
            st.rerun()
    with col_top[1]:
        title = f"Expedição {Path(building_path).parents[1].name} - Prédio {Path(building_path).name}"
        st.markdown(f"<h3 style='text-align: center;'>{title}</h3>", unsafe_allow_html=True)

    if "sentido_atual" not in st.session_state:
        st.session_state.sentido_atual = None
    if "andar_atual" not in st.session_state:
        st.session_state.andar_atual = ""

    col_menu, col_main = st.columns([1, 4])

    with col_menu:
        st.write("**Selecione o sentido**")
        sentidos_opcoes = [
            "Norte", "Nordeste", "Leste", "Sudeste",
            "Sul", "Sudoeste", "Oeste", "Noroeste"
        ]
        st.session_state.sentido_atual = st.selectbox("Sentido", sentidos_opcoes, index=0)

        st.text_input("Andar atual", key="andar_atual")

        st.markdown("---")
        st.write("**Upload para S3**")
        if st.button("☁️ Upload de imagens para S3"):
            upload_images_to_s3()
            st.success("Imagens enviadas para o S3 com sucesso!")

    with col_main:
        st.markdown(f"**Sentido atual:** {st.session_state.sentido_atual or 'Nenhum selecionado'}")
        st.markdown(f"**Andar atual:** {st.session_state.andar_atual or 'Não informado'}")
        os.makedirs(building_path, exist_ok=True)
        run_key = f"run_{building_path}"
        if run_key not in st.session_state:
            st.session_state[run_key] = False

        if st.checkbox('Run', key=run_key):
            if 'cap' not in st.session_state:
                st.session_state.cap = start_video_capture()
            FRAME_WINDOW = st.empty()

            foto = st.button("📸 Tirar Foto")
            while st.session_state[run_key]:
                ret, frame = st.session_state.cap.read()
                if not ret:
                    FRAME_WINDOW.info("Aguardando frame do drone...")
                else:
                    cv2.imwrite(FRAME_PATH, frame)
                    FRAME_WINDOW.image(frame, channels="BGR", use_container_width=True)

                if foto:
                    timestamp = int(time.time())
                    andar = st.session_state.andar_atual or "andar_desconhecido"
                    filename = f"{building_path}/{st.session_state.sentido_atual}_{andar}_{timestamp}.jpg"
                    cv2.imwrite(filename, frame)
                    st.success(f"Imagem salva em: {filename}")
                    foto = False

            st.session_state.cap.release()
            stop_video_capture()
            del st.session_state.cap
        else:
            st.write('Live feed parado.')

        st.subheader("Fotos tiradas por sentido (com rachaduras)")
        sentidos_opcoes = [
            "Não informado", "Norte", "Nordeste", "Leste", "Sudeste",
            "Sul", "Sudoeste", "Oeste", "Noroeste"
        ]
        images_with_cracks = get_images_with_cracks(building_path)

        for sentido in sentidos_opcoes:
            sentido_images = []
            all_images = sorted(glob.glob(f"{building_path}/{sentido}_*.[jp][pn]g"), reverse=True)
            for img_path in all_images:
                img_name = os.path.basename(img_path)
                if img_name in images_with_cracks:
                    sentido_images.append(img_path)

            if sentido_images:
                st.markdown(f"### {sentido} ({len(sentido_images)} imagens com rachaduras)")
                cols = st.columns(3)
                for i, img_path in enumerate(sentido_images):
                    img = Image.open(img_path)
                    with cols[i % 3]:
                        st.image(img, use_container_width=True)
                        st.caption(f"🔴 {os.path.basename(img_path)}")

        if st.button("Rodar Modelo"):
            model_path = 'modelo/best.pt'
            if os.path.exists(model_path):
                result, crack_counts = run_detection_model(model_path, building_path)
                st.session_state.crack_counts = crack_counts
                st.session_state.building_path = building_path
                st.query_params = {
                    "inspection": Path(building_path).parents[1].name,
                    "building": Path(building_path).name,
                    "modelo": "ok"
                }
                st.rerun()
