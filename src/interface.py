import streamlit as st
import time
import os
import socket
from PIL import Image, ImageFile
import glob

ImageFile.LOAD_TRUNCATED_IMAGES = True

FRAME_PATH = "shared_frames/latest.jpg"
INSPECTIONS_DIR = "imagens/inspeções"
DRONE_ADDR = ('192.168.10.1', 8889)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def send_command(cmd: str):
    sock.sendto(cmd.encode('utf-8'), DRONE_ADDR)

def show_inspection_page(inspection_name):
    st.title(f"Inspeção: {inspection_name}")

    if st.button("⬅️ Voltar para a Página Principal"):
        st.query_params = {}
        st.rerun()

    inspection_path = os.path.join(INSPECTIONS_DIR, inspection_name)
    os.makedirs(inspection_path, exist_ok=True)

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
