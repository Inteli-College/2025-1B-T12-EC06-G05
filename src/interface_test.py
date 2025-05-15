import streamlit as st
import time
import os
import socket
import cv2
import glob
from PIL import Image, ImageFile

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
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    return cap

def stop_video_capture():
    send_command('streamoff')

def show_inspection_page(inspection_name):
    st.title(f"Inspeção: {inspection_name}")
    if st.button("⬅️ Voltar para a Página Principal"):
        st.query_params = {}
        st.rerun()

    inspection_path = os.path.join(INSPECTIONS_DIR, inspection_name)
    os.makedirs(inspection_path, exist_ok=True)

    st.subheader("📹 Live Feed do Drone")
    run_key = f"run_{inspection_name}"
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
                filename = os.path.join(inspection_path, f"foto_{timestamp}.jpg")
                cv2.imwrite(filename, frame)
                st.success(f"Imagem salva em: {filename}")
                foto = False

            time.sleep(0.05)  # Ajuste o tempo conforme necessário para equilibrar desempenho e qualidade

        st.session_state.cap.release()
        stop_video_capture()
        del st.session_state.cap

    else:
        st.write('Live feed parado.')

    st.subheader("🖼️ Galeria de Fotos")
    image_files = sorted(glob.glob(f"{inspection_path}/*.[jp][pn]g"), reverse=True)
    if image_files:
        cols = st.columns(3)
        for i, img_path in enumerate(image_files):
            img = Image.open(img_path)
            with cols[i % 3]:
                st.image(img, caption=os.path.basename(img_path), use_container_width=True)
    else:
        st.info("Nenhuma foto capturada ainda.")

def show_main_page():
    st.title("Painel de Inspeções - Drone Tello")
    os.makedirs(INSPECTIONS_DIR, exist_ok=True)

    with st.expander("➕ Cadastrar Nova Inspeção"):
        new_name = st.text_input("Nome da nova inspeção:")
        if st.button("Criar Inspeção") and new_name.strip():
            inspection_path = os.path.join(INSPECTIONS_DIR, new_name.strip())
            if not os.path.exists(inspection_path):
                os.makedirs(inspection_path)
                st.success(f"Inspeção '{new_name}' criada.")
                st.query_params = {"inspection": new_name.strip()}
                st.rerun()
            else:
                st.error("Inspeção com esse nome já existe.")

    st.subheader("Inspeções Existentes")
    folders = sorted(
        [name for name in os.listdir(INSPECTIONS_DIR)
         if os.path.isdir(os.path.join(INSPECTIONS_DIR, name))],
        reverse=True
    )

    if folders:
        cols = st.columns(3)
        for i, folder in enumerate(folders):
            with cols[i % 3]:
                if st.button(folder):
                    st.query_params = {"inspection": folder}
                    st.rerun()
    else:
        st.info("Nenhuma inspeção cadastrada.")

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

st.sidebar.title("Navegação")
page = st.sidebar.radio("Ir para:", ["Página Principal", "Todas as Imagens"])

params = st.query_params
if "inspection" in params:
    show_inspection_page(params["inspection"])
else:
    if page == "Página Principal":
        show_main_page()
    elif page == "Todas as Imagens":
        show_all_images_page()