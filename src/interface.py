import streamlit as st
import time
import os
import socket
from PIL import Image, ImageFile
import glob
from ultralytics import YOLO
from pathlib import Path
import cv2
import shutil
import json

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
        return "Nenhuma imagem encontrada para rodar o modelo.", {}

    results_folder = os.path.join(image_folder, "resultados")
    os.makedirs(results_folder, exist_ok=True)

    crack_counts = {}
    images_with_cracks = []  # Lista para armazenar imagens com rachaduras

    for img_path in images:
        img = Image.open(img_path)
        results = model(img)[0]

        result_img_path = os.path.join(
            results_folder, f"detect_{os.path.basename(img_path)}"
        )
        results.save(filename=result_img_path)

        # Verificar se há detecções na imagem
        has_cracks = len(results.boxes) > 0
        
        if has_cracks:
            images_with_cracks.append(os.path.basename(img_path))
            for box in results.boxes:
                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                crack_counts[class_name] = crack_counts.get(class_name, 0) + 1

    # Salvar lista de imagens com rachaduras
    crack_info_path = os.path.join(results_folder, "crack_info.json")
    with open(crack_info_path, 'w') as f:
        json.dump({
            'images_with_cracks': images_with_cracks,
            'crack_counts': crack_counts
        }, f)

    return "Modelo executado com sucesso!", crack_counts

def simulate_cloud_upload(selected_images, building_path):
    """Simula o upload para a nuvem e remove imagens locais"""
    try:
        # Simular upload (aqui você adicionaria a lógica real de upload)
        st.info("Simulando upload para a nuvem...")
        time.sleep(2)  # Simular tempo de upload
        
        # Remover imagens selecionadas localmente
        for img_path in selected_images:
            if os.path.exists(img_path):
                os.remove(img_path)
                # Também remover resultado correspondente se existir
                result_path = os.path.join(building_path, "resultados", f"detect_{os.path.basename(img_path)}")
                if os.path.exists(result_path):
                    os.remove(result_path)
        
        return True, f"Upload concluído! {len(selected_images)} imagens enviadas e removidas localmente."
    except Exception as e:
        return False, f"Erro no upload: {str(e)}"

def get_images_with_cracks(building_path):
    """Retorna apenas imagens que têm rachaduras detectadas"""
    crack_info_path = os.path.join(building_path, "resultados", "crack_info.json")
    if os.path.exists(crack_info_path):
        with open(crack_info_path, 'r') as f:
            crack_info = json.load(f)
            return crack_info.get('images_with_cracks', [])
    return []

def show_inspection_page(inspection_name):
    if st.button("⬅️ Voltar para a pagina principal"):
        st.query_params = {}
        st.rerun()
    st.write(f"Expedição: {inspection_name}")

    building_dir = os.path.join(INSPECTIONS_DIR, inspection_name, "predios")
    os.makedirs(building_dir, exist_ok=True)

    st.subheader("Adicionar Novo Prédio")
    col1, col2 = st.columns(2)
    with col1:
        new_building = st.text_input("Nome do novo prédio")
    with col2:
        new_floor = st.text_input("Andar do prédio", placeholder="Ex: 1, 2, Térreo")
    
    if st.button("Adicionar Prédio") and new_building.strip() and new_floor.strip():
        # Incluir o andar no nome da pasta
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
        # Extrair nome do prédio e andar para exibição
        if "_Andar_" in b:
            building_name, floor_part = b.split("_Andar_", 1)
            display_name = f"{building_name} - Andar {floor_part}"
        else:
            display_name = b
            
        if st.button(f"Abrir {display_name}"):
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
        # Extrair informações do prédio e andar
        building_name = Path(building_path).name
        if "_Andar_" in building_name:
            predio, andar = building_name.split("_Andar_", 1)
            title = f"Expedição {Path(building_path).parents[1].name} - Prédio {predio} - Andar {andar}"
        else:
            title = f"Expedição {Path(building_path).parents[1].name} - Prédio {building_name}"
        st.markdown(f"<h3 style='text-align: center;'>{title}</h3>", unsafe_allow_html=True)

    if "sentido_atual" not in st.session_state:
        st.session_state.sentido_atual = None

    col_menu, col_main = st.columns([1, 4])

    with col_menu:
        st.write("**Selecione a sentido qual quer começar a gravar**")
        for sentido in ["Norte", "Leste", "Sul", "Oeste"]:
            if st.button(sentido):
                st.session_state.sentido_atual = sentido

        # Botão para upload na nuvem
        st.markdown("---")
        st.write("**Upload para Nuvem**")
        if st.button("☁️ Subir para Nuvem", type="primary"):
            st.session_state.show_upload_dialog = True

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

        # Dialog para seleção de imagens para upload
        if st.session_state.get('show_upload_dialog', False):
            st.markdown("### 📤 Selecionar Imagens para Upload")
            
            all_images = sorted(glob.glob(f"{building_path}/*.[jp][pn]g"), reverse=True)
            images_with_cracks = get_images_with_cracks(building_path)
            
            if all_images:
                selected_images = []
                
                col_select, col_actions = st.columns([3, 1])
                with col_actions:
                    if st.button("Selecionar Todas"):
                        st.session_state.select_all = True
                    if st.button("Desmarcar Todas"):
                        st.session_state.select_all = False
                    if st.button("❌ Cancelar"):
                        st.session_state.show_upload_dialog = False
                        st.rerun()

                with col_select:
                    st.write("**Imagens disponíveis para upload:**")
                    
                for img_path in all_images:
                    img_name = os.path.basename(img_path)
                    has_crack = img_name in images_with_cracks
                    crack_indicator = "🔴" if has_crack else "⚪"
                    
                    default_checked = st.session_state.get('select_all', has_crack)
                    if st.checkbox(f"{crack_indicator} {img_name}", value=default_checked, key=f"upload_{img_name}"):
                        selected_images.append(img_path)

                if selected_images:
                    if st.button("🚀 Confirmar Upload", type="primary"):
                        success, message = simulate_cloud_upload(selected_images, building_path)
                        if success:
                            st.success(message)
                            st.session_state.show_upload_dialog = False
                            # Reset select_all state
                            if 'select_all' in st.session_state:
                                del st.session_state.select_all
                            time.sleep(2)
                            st.rerun()
                        else:
                            st.error(message)
            else:
                st.info("Nenhuma imagem disponível para upload.")
                if st.button("Fechar"):
                    st.session_state.show_upload_dialog = False
                    st.rerun()

        st.subheader("Fotos tiradas por sentido (somente com rachaduras)")
        sentidos = ["Norte", "Leste", "Sul", "Oeste"]
        images_with_cracks = get_images_with_cracks(building_path)
        
        for sentido in sentidos:
            # Filtrar apenas imagens com rachaduras
            sentido_images = []
            all_sentido_images = sorted(glob.glob(f"{building_path}/{sentido}_*.[jp][pn]g"), reverse=True)
            
            for img_path in all_sentido_images:
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

    crack_counts = st.session_state.get("crack_counts", {})
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
        # Filtrar apenas imagens com rachaduras
        sentido_images = []
        all_result_images = sorted(glob.glob(f"{building_path}/resultados/detect_{sentido}_*.[jp][pn]g"), reverse=True)
        
        for img_path in all_result_images:
            # Extrair nome original da imagem do resultado
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

def show_main_page():
    col1, col2 = st.columns([1, 2], gap="large")

    with col1:
        st.subheader("Criar nova Expedição")
        new_name = st.text_input("Nome da Expedição")
        col_building, col_floor = st.columns(2)
        with col_building:
            new_building = st.text_input("Nome do Prédio")
        with col_floor:
            new_floor = st.text_input("Andar", placeholder="Ex: 1, 2, Térreo")
            
        if st.button("Iniciar"):
            if new_name.strip() and new_building.strip() and new_floor.strip():
                inspection_path = os.path.join(INSPECTIONS_DIR, new_name.strip())
                building_name = f"{new_building.strip()}_Andar_{new_floor.strip()}"
                building_path = os.path.join(inspection_path, "predios", building_name)
                if not os.path.exists(building_path):
                    os.makedirs(building_path)
                    st.success(f"Inspeção '{new_name}' e prédio '{new_building}' - Andar '{new_floor}' criados.")
                    st.query_params = {"inspection": new_name.strip(), "building": building_name}
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

# Interface principal
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