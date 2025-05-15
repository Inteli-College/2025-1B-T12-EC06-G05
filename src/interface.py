import streamlit as st
import time
import os
import socket
from PIL import Image, ImageFile
import glob
from ultralytics import YOLO
from pathlib import Path
from djitellopy import Tello
import cv2

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
        return "Nenhuma imagem encontrada para rodar o modelo.", {}

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
    if st.button("⬅️ Voltar para a pagina principal"):
        st.query_params = {}
        st.rerun()
    st.write(f"Expedição: {inspection_name}")

    building_dir = os.path.join(INSPECTIONS_DIR, inspection_name, "predios")
    os.makedirs(building_dir, exist_ok=True)

    st.subheader("Adicionar Novo Prédio")
    new_building = st.text_input("Nome do novo prédio")
    if st.button("Adicionar Prédio") and new_building.strip():
        new_path = os.path.join(building_dir, new_building.strip())
        if not os.path.exists(new_path):
            os.makedirs(new_path)
            st.success(f"Prédio '{new_building}' adicionado.")
            st.query_params = {"inspection": inspection_name, "building": new_building.strip()}
            st.rerun()
        else:
            st.error("Esse prédio já existe.")

    st.subheader("Prédios Existentes")
    buildings = sorted(os.listdir(building_dir), reverse=True)
    for b in buildings:
        if st.button(f"Abrir {b}"):
            st.query_params = {"inspection": inspection_name, "building": b}
            st.rerun()

def show_building_page(building_path):
    col_top = st.columns([1, 5, 1])
    with col_top[0]:
        if st.button("⬅️", key="voltar_predio"):
            inspection_path = Path(building_path).parents[1]
            st.query_params = {"inspection": inspection_path.name}
            st.rerun()
    with col_top[1]:
        st.markdown(f"<h3 style='text-align: center;'>Expedição {Path(building_path).parents[1].name} - Prédio {Path(building_path).name}</h3>", unsafe_allow_html=True)

    if "sentido_atual" not in st.session_state:
        st.session_state.sentido_atual = None

    col_menu, col_main = st.columns([1, 4])

    with col_menu:
        st.write("**Selecione a sentido qual quer começar a gravar**")
        for sentido in ["Norte", "Leste", "Sul", "Oeste"]:
            if st.button(sentido):
                st.session_state.sentido_atual = sentido

    with col_main:
        st.markdown(f"**Sentido atual:** {st.session_state.sentido_atual or 'Nenhum selecionado'}")
        
        if st.button("Tirar Foto", key="tirar_foto_predio"):
            if st.session_state.sentido_atual:
                try:
                    tello = Tello()
                    tello.connect()
                    tello.streamon()

                    frame = tello.get_frame_read().frame
                    timestamp = int(time.time())
                    filename = f"{building_path}/{st.session_state.sentido_atual}_{timestamp}.jpg"

                    cv2.imwrite(filename, frame)
                    st.success(f"Imagem salva em: {filename}")

                    tello.streamoff()
                    tello.end()
                    st.rerun()

                except Exception as e:
                    st.error(f"Erro ao capturar a imagem do drone: {e}")
            else:
                st.warning("Selecione um sentido antes de tirar a foto.")

        st.subheader("Fotos tiradas por sentido")
        sentidos = ["Norte", "Leste", "Sul", "Oeste"]
        for sentido in sentidos:
            sentido_images = sorted(glob.glob(f"{building_path}/{sentido}_*.[jp][pn]g"), reverse=True)
            if sentido_images:
                st.markdown(f"### {sentido}")
                cols = st.columns(3)
                for i, img_path in enumerate(sentido_images):
                    img = Image.open(img_path)
                    with cols[i % 3]:
                        st.image(img, use_container_width=True)

        if st.button("Salvar Detecção", key="salvar_modelo_predio"):
            model_path = 'best.pt'
            if os.path.exists(model_path):
                result, crack_counts = run_model(model_path, building_path)
                st.success(result)
                st.subheader("📊 Detecções por Tipo de Rachadura")
                for crack_type, count in crack_counts.items():
                    st.write(f"- **{crack_type.capitalize()}**: {count}")
            else:
                st.error("Modelo 'best.pt' não encontrado na pasta da inspeção.")


def show_main_page():
    os.makedirs(INSPECTIONS_DIR, exist_ok=True)
    col1, col2 = st.columns([1, 2], gap="large")

    with col1:
        st.subheader("Criar nova Expedição")
        new_name = st.text_input("Nome da Expedição")
        new_building = st.text_input("Nome do Prédio")
        if st.button("Iniciar"):
            if new_name.strip() and new_building.strip():
                inspection_path = os.path.join(INSPECTIONS_DIR, new_name.strip())
                building_path = os.path.join(inspection_path, "predios", new_building.strip())
                if not os.path.exists(building_path):
                    os.makedirs(building_path)
                    st.success(f"Inspeção '{new_name}' e prédio '{new_building}' criados.")
                    st.query_params = {"inspection": new_name.strip(), "building": new_building.strip()}
                    st.rerun()
                else:
                    st.error("Essa expedição e/ou prédio já existem.")


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
        building_path = os.path.join(INSPECTIONS_DIR, folder, "predios")
        if os.path.isdir(building_path):
            for sub in os.listdir(building_path):
                imgs = glob.glob(f"{os.path.join(building_path, sub)}/*.[jp][pn]g")
                all_images.extend([(img, f"{folder}/{sub}") for img in imgs])

    all_images.sort(reverse=True)

    if all_images:
        cols = st.columns(3)
        for i, (img_path, folder) in enumerate(all_images):
            img = Image.open(img_path)
            with cols[i % 3]:
                st.image(img, caption=f"{folder}/{os.path.basename(img_path)}", use_container_width=True)
    else:
        st.info("Nenhuma imagem capturada ainda.")

st.image("imagens/logo.png", width=200)

st.title("Computador de Bordo para captura de fissuras")

if "user_id" not in st.session_state:
    user_id = st.text_input("Insira seu id de usuário para começar", placeholder="ID usuário")

    if st.button("Entrar") and user_id.strip():
        st.session_state.user_id = user_id.strip()
        st.rerun()
else:
    st.sidebar.title(f"Navegação - Usuário: {st.session_state.user_id}")
    page = st.sidebar.radio("Ir para:", ["Página Principal", "Todas as Imagens"])

    params = st.query_params
    if "inspection" in params:
        if "building" in params:
            building_path = os.path.join(INSPECTIONS_DIR, params["inspection"], "predios", params["building"])
            show_building_page(building_path)
        else:
            show_inspection_page(params["inspection"])
    else:
        if page == "Página Principal":
            show_main_page()
        elif page == "Todas as Imagens":
            show_all_images_page()

    if st.sidebar.button("Sair"):
        del st.session_state.user_id
        st.rerun()
