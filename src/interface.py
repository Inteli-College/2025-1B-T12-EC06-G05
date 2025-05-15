import streamlit as st
import time
import os
import socket
from PIL import Image, ImageFile
import glob
from ultralytics import YOLO
from pathlib import Path

ImageFile.LOAD_TRUNCATED_IMAGES = True

FRAME_PATH = "shared_frames/latest.jpg"
INSPECTIONS_DIR = "imagens/inspecoes"
DRONE_ADDR = ('192.168.10.1', 8889)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

st.set_page_config(layout="wide")

def send_command(cmd: str):
    sock.sendto(cmd.encode('utf-8'), DRONE_ADDR)

def load_model(model_path):
    model = YOLO(model_path)
    model.eval()
    return model

def run_model(model_path, image_folder):
    model = load_model(model_path)
    images = sorted(glob.glob(f"{image_folder}/*.[jp][pn]g"), reverse=True)

    if not images:
        return "Nenhuma imagem encontrada para rodar o modelo."

    results_folder = os.path.join(image_folder, "resultados")
    os.makedirs(results_folder, exist_ok=True)

    crack_counts = {}

    for img_path in images:
        img = Image.open(img_path)
        results = model(img)[0]

        result_img_path = os.path.join(
            results_folder, f"detect_{os.path.basename(img_path)}"
        )
        results.save(filename=result_img_path)

        for box in results.boxes:
            class_id = int(box.cls[0])
            class_name = model.names[class_id]
            crack_counts[class_name] = crack_counts.get(class_name, 0) + 1

    return "Modelo executado com sucesso!", crack_counts

def show_inspection_page(inspection_name):
    st.title(f"Inspeção: {inspection_name}")

    if st.button("⬅️ Voltar para a Página Principal"):
        st.query_params = {}
        st.rerun()

    inspection_path = os.path.join(INSPECTIONS_DIR, inspection_name)
    os.makedirs(inspection_path, exist_ok=True)

    if st.button("Rodar Modelo"):
        model_path = 'best.pt'
        if os.path.exists(model_path):
            result, crack_counts = run_model(model_path, inspection_path)
            st.success(result)

            st.subheader("📊 Detecções por Tipo de Rachadura")
            for crack_type, count in crack_counts.items():
                st.write(f"- **{crack_type.capitalize()}**: {count}")
        else:
            st.error("Modelo 'best.pt' não encontrado na pasta da inspeção.")

    if st.button("Tirar Foto"):
        if os.path.exists(FRAME_PATH):
            img = Image.open(FRAME_PATH)
            filename = f"{inspection_path}/foto_{int(time.time())}.jpg"
            img.save(filename)
            st.success(f"Imagem salva em: {filename}")
            st.rerun()

    st.subheader("Galeria de Fotos")
    image_files = sorted(glob.glob(f"{inspection_path}/*.[jp][pn]g"), reverse=True)
    if image_files:
        cols = st.columns(3)
        for i, img_path in enumerate(image_files):
            img = Image.open(img_path)
            with cols[i % 3]:
                st.image(img, caption=os.path.basename(img_path), use_container_width=True)
    else:
        st.info("Nenhuma foto capturada ainda.")

    st.subheader("Resultados da Detecção")
    result_folder = os.path.join(inspection_path, "resultados")
    result_images = sorted(glob.glob(f"{result_folder}/*.[jp][pn]g"), reverse=True)
    if result_images:
        cols = st.columns(3)
        for i, img_path in enumerate(result_images):
            img = Image.open(img_path)
            with cols[i % 3]:
                st.image(img, caption=os.path.basename(img_path), use_container_width=True)
    else:
        st.info("Nenhuma imagem com detecção ainda.")

def show_main_page():
    os.makedirs(INSPECTIONS_DIR, exist_ok=True)
    st.image("imagens/logo.png", width=200)

    st.title("Computador de Bordo para captura de fissuras")
    col1, col2 = st.columns([1, 2], gap="large")

    with col1:
        st.subheader("Criar nova Expedição")
        new_name = st.text_input("Nome da Expedição")
        new_building = st.text_input("Nome do Prédio")
        if st.button("Iniciar"):
            if new_name.strip() and new_building.strip():
                inspection_path = os.path.join(INSPECTIONS_DIR, f"{new_name.strip()} - {new_building.strip()}")
                if not os.path.exists(inspection_path):
                    os.makedirs(inspection_path)
                    st.success(f"Inspeção '{new_name}' criada.")
                    st.query_params = {"inspection": f"{new_name.strip()} - {new_building.strip()}"}
                    st.rerun()
                else:
                    st.error("Inspeção com esse nome já existe.")

    with col2:
        st.subheader("Expedições")
        folders = sorted(
            [name for name in os.listdir(INSPECTIONS_DIR)
             if os.path.isdir(os.path.join(INSPECTIONS_DIR, name))],
            reverse=True
        )

        mid_index = len(folders) // 2
        col3, col4 = st.columns([1, 1], gap="medium")

        with col3:
            for folder in folders[:mid_index]:
                creation_time = time.strftime('%d/%m/%Y', time.localtime(os.path.getctime(os.path.join(INSPECTIONS_DIR, folder))))
                st.markdown(f"""
                    <div style="background-color: #6892ad; border-radius: 10px; padding: 10px; margin-bottom: 10px; display: flex; align-items: center;">
                        <div style="width: 60px; height: 60px; background-color: #ccc; margin-right: 15px; border-radius: 5px;"></div>
                        <div>
                            <strong style="color: black;">{folder}</strong><br>
                            <span style="color: black;">{creation_time}</span>
                        </div>
                    </div>
                """, unsafe_allow_html=True)

                if st.button(f"Abrir {folder}"):
                    st.query_params = {"inspection": folder}
                    st.rerun()

        with col4:
            for folder in folders[mid_index:]:
                creation_time = time.strftime('%d/%m/%Y', time.localtime(os.path.getctime(os.path.join(INSPECTIONS_DIR, folder))))
                st.markdown(f"""
                    <div style="background-color: #6892ad; border-radius: 10px; padding: 10px; margin-bottom: 10px; display: flex; align-items: center;">
                        <div style="width: 60px; height: 60px; background-color: #ccc; margin-right: 15px; border-radius: 5px;"></div>
                        <div>
                            <strong style="color: black;">{folder}</strong><br>
                            <span style="color: black;">{creation_time}</span>
                        </div>
                    </div>
                """, unsafe_allow_html=True)

                if st.button(f"Abrir {folder}"):
                    st.query_params = {"inspection": folder}
                    st.rerun()


def show_all_images_page():
    st.title("📸 Todas as Imagens Capturadas")

    all_images = []
    for folder in os.listdir(INSPECTIONS_DIR):
        folder_path = os.path.join(INSPECTIONS_DIR, folder)
        if os.path.isdir(folder_path):
            imgs = glob.glob(f"{folder_path}/*.[jp][pn]g")
            all_images.extend([(img, folder) for img in imgs])

    all_images.sort(reverse=True)

    if all_images:
        cols = st.columns(3)
        for i, (img_path, folder) in enumerate(all_images):
            img = Image.open(img_path)
            with cols[i % 3]:
                st.image(img, caption=f"{folder}/{os.path.basename(img_path)}", use_container_width=True)
    else:
        st.info("Nenhuma imagem capturada ainda.")

if "user_id" not in st.session_state:
    st.title("Computador de Bordo para captura de fissuras")
    user_id = st.text_input("Insira seu id de usuário para começar", placeholder="ID usuário")

    if st.button("Entrar") and user_id.strip():
        st.session_state.user_id = user_id.strip()
        st.rerun()
else:
    st.sidebar.title(f"Navegação - Usuário: {st.session_state.user_id}")
    page = st.sidebar.radio("Ir para:", ["Página Principal", "Todas as Imagens"])

    params = st.query_params
    if "inspection" in params:
        show_inspection_page(params["inspection"])
    else:
        if page == "Página Principal":
            show_main_page()
        elif page == "Todas as Imagens":
            show_all_images_page()

    if st.sidebar.button("Sair"):
        del st.session_state.user_id
        st.rerun()

