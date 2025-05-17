import streamlit as st
import time
import os
import socket
from PIL import Image, ImageFile
import glob
from ultralytics import YOLO
from pathlib import Path
import cv2

st.set_page_config(layout="wide")

ImageFile.LOAD_TRUNCATED_IMAGES = True

FRAME_PATH = "shared_frames/latest.jpg"
INSPECTIONS_DIR = "imagens/inspecoes"
DRONE_ADDR = ('192.168.10.1', 8889)
VIDEO_STREAM = 'udp://0.0.0.0:11111'

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def send_command(cmd: str, wait: float = 0.2):
    sock.sendto(cmd.encode('utf-8'), DRONE_ADDR)
    time.sleep(wait)

def start_video_capture():
    send_command('command')     
    send_command('streamon')    

    cap = cv2.VideoCapture(VIDEO_STREAM)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 2) 
    return cap

def stop_video_capture():
    send_command('streamoff')

def load_model(model_path):
    try:
        model = YOLO(model_path)
        return model
    except Exception as e:
        st.error(f"Erro ao carregar o modelo: {e}")
        return None

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
                    filename = f"{building_path}/{st.session_state.sentido_atual}_{timestamp}.jpg"
                    cv2.imwrite(filename, frame)
                    st.success(f"Imagem salva em: {filename}")
                    foto = False

            st.session_state.cap.release()
            stop_video_capture()
            del st.session_state.cap

        else:
            st.write('Live feed parado.')

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

        if st.button("Rodar Modelo"):
            model_path = 'best.pt'
            if os.path.exists(model_path):
                result, crack_counts = run_model(model_path, building_path)
                st.session_state.crack_counts = crack_counts
                st.session_state.building_path = building_path
                st.query_params = {
                    "inspection": Path(building_path).parents[1].name,
                    "building": Path(building_path).name,
                    "modelo": "ok"
                }
                st.rerun()

def show_model_results_page(building_path):
    st.markdown(f"<h3>Resultados de Detecção - {Path(building_path).name}</h3>", unsafe_allow_html=True)

    if st.button("⬅️ Voltar ao prédio"):
        st.query_params = {
            "inspection": Path(building_path).parents[1].name,
            "building": Path(building_path).name
        }
        st.rerun()

    crack_counts = st.session_state.get("crack_counts", {})
    if not crack_counts:
        st.warning("Nenhum resultado de detecção encontrado.")
        return

    st.subheader("📊 Quantidade de rachaduras detectadas")
    for crack_type, count in crack_counts.items():
        st.write(f"- **{crack_type.capitalize()}**: {count}")

    st.subheader("Detecção de Rachaduras")
    sentidos = ["Norte", "Leste", "Sul", "Oeste"]
    for sentido in sentidos:
        sentido_images = sorted(glob.glob(f"{building_path}/resultados/detect_{sentido}_*.[jp][pn]g"), reverse=True)
        if sentido_images:
            st.markdown(f"### {sentido}")
            cols = st.columns(3)
            for i, img_path in enumerate(sentido_images):
                img = Image.open(img_path)
                with cols[i % 3]:
                    st.image(img, use_container_width=True)


def show_main_page():
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

st.image("imagens/logo.png", width=200)

st.title("Computador de Bordo para captura de fissuras")

if "user_id" not in st.session_state:
    user_id = st.text_input("Insira seu id de usuário para começar", placeholder="ID usuário")

    if st.button("Entrar") and user_id.strip():
        st.session_state.user_id = user_id.strip()
        st.rerun()
else:

    params = st.query_params
    if "inspection" in params:
        if "building" in params:
            building_path = os.path.join(INSPECTIONS_DIR, params["inspection"], "predios", params["building"])
            if "modelo" in params:
                show_model_results_page(building_path)
            else:
                show_building_page(building_path)
        else:
            show_inspection_page(params["inspection"])
    else:
        show_main_page()

