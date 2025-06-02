import os
import time
import glob
import json
from pathlib import Path
from PIL import Image
import streamlit as st
import cv2
from services.drone import start_video_capture, stop_video_capture
from services.model import run_detection_model, get_images_with_cracks

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

    col_info, col_capa = st.columns([6, 2])
    
    with col_info:
        info_path = os.path.join(building_path, 'building_info.json')
        if os.path.exists(info_path):
            with open(info_path, 'r') as f:
                building_info = json.load(f)
                st.markdown("### Informações do Prédio")
                st.write(f"**Nome:** {building_info.get('nome', '')}")
                st.write(f"**Complemento:** {building_info.get('complemento', '')}")
                st.write(f"**Descrição:** {building_info.get('descricao', '')}")
        
    with col_capa:
            if building_info.get("foto_fachada"):
                img_path = os.path.join(building_path, building_info["foto_fachada"])
                if os.path.exists(img_path):
                    st.image(img_path, caption="Foto da Fachada", width=300)

    if "sentido_atual" not in st.session_state:
        st.session_state.sentido_atual = None
    if "andar_atual" not in st.session_state:
        st.session_state.andar_atual = ""

    col_menu, col_main = st.columns([1, 4], gap="large")

    with col_menu:
        st.write("**Selecione o sentido**")
        sentidos_opcoes = [
            "Não informado", "Norte", "Nordeste", "Leste", "Sudeste",
            "Sul", "Sudoeste", "Oeste", "Noroeste"
        ]
        st.session_state.sentido_atual = st.selectbox("Sentido", sentidos_opcoes, index=0)

        st.text_input("Andar atual", key="andar_atual")
        
        st.markdown(f"**Sentido atual:** {st.session_state.sentido_atual or 'Nenhum selecionado'}")
        st.markdown(f"**Andar atual:** {st.session_state.andar_atual or 'Não informado'}")

    with col_main:
        st.markdown(f"**Visualizar a imagem do drone** ")
        os.makedirs(building_path, exist_ok=True)
        run_key = f"run_{building_path}"
        if run_key not in st.session_state:
            st.session_state[run_key] = False

        if st.checkbox('visualizar', key=run_key):
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

        st.subheader("📷 Todas as imagens do prédio por sentido")
        sentidos_opcoes_exibicao = [
            "Não informado", "Norte", "Nordeste", "Leste", "Sudeste",
            "Sul", "Sudoeste", "Oeste", "Noroeste"
        ]

        for sentido in sentidos_opcoes_exibicao:
            sentido_images = []
            for f in os.listdir(building_path):
                if f.lower().endswith((".jpg", ".jpeg", ".png")) and not f.startswith("detect_") and f.startswith(f"{sentido}_"):
                    sentido_images.append(f)
            if sentido_images:
                st.markdown(f"### {sentido} ({len(sentido_images)} imagens)")
                cols = st.columns(3)
                for i, file in enumerate(sorted(sentido_images, reverse=True)):
                    img_path = os.path.join(building_path, file)
                    with cols[i % 3]:
                        st.image(Image.open(img_path), use_container_width=True)
                        st.caption(file)
                        

        if st.button("Rodar Modelo"):
            with st.spinner("Executando modelo de detecção de rachaduras..."):
                model_path = Path("modelo") / "best_new.pt"
                if model_path.exists():
                    result, crack_counts = run_detection_model(str(model_path), building_path)
                    st.session_state.crack_counts = crack_counts
                    st.session_state.building_path = building_path
                    st.query_params = {
                        "inspection": Path(building_path).parents[1].name,
                        "building": Path(building_path).name,
                        "modelo": "ok"
                    }
                    st.rerun()
                else:
                    st.error(f"Modelo não encontrado em '{model_path}'")


