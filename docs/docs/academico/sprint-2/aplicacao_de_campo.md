---
sidebar_position: 3
custom_edit_url: null
title: "Aplicação de campo"
---

# Aplicação de campo

## Introdução

&emsp;Para o desenvolvimento da tela de bordo foi utilizada a biblioteca `Streamlit` que nos permitiu construir uma interface web prática para a o projeto. Por meio dela conseguimos realizar a capturadas de imagens do drone, organizar elas em expedições e prédios, e posteriormente analisadas por um modelo de classificação baseado em YOLO para identificação de fissuras.

&emsp; A seguir, documentamos as principais funções responsáveis pela captura de imagens, exibição das expedições e utilização do modelo treinado.

## Captura de Imagens do Drone

### `start_video_capture()`

&emsp; Inicia a captura de vídeo do drone utilizando protocolo UDP.

```python
def start_video_capture():
    send_command('command')     
    send_command('streamon')    
    cap = cv2.VideoCapture(VIDEO_STREAM)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 2) 
    return cap
```

* Envia os comandos `command` e `streamon` para o drone.
* Inicializa a captura com `cv2.VideoCapture`.
* Define um buffer mínimo para reduzir latência.
* Retorna o objeto `cap` do OpenCV para leitura dos frames.

## Listagem das Expedições Locais

### `show_main_page()`

&emsp; Renderiza a tela inicial da aplicação.

```python
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
```

&emsp; Essa tela permite:

* Criar uma nova expedição com o nome e prédio inicial.
* Exibir dinamicamente as expedições existentes localmente.
* Acesar as expecições.
* Exibir dinamicamente o nome e data de criação de cada expedição.

&emsp; Cada expedição pode ser acessada clicando no botão "Abrir", o que redireciona para a tela específica da expedição.

## Execução do Modelo de classificação

### `run_model(model_path, image_folder)`

&emsp; Passa todas as imagens de uma pasta pelo modelo e retorna a detecção de fissuras em cada uma delas.

```python
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
```

**Parâmetros:**

* `model_path`: Caminho para o arquivo `.pt` do modelo YOLO.
* `image_folder`: Pasta contendo as imagens da inspeção.

**Processo:**

1. Carrega o modelo com `YOLO(model_path)`.
2. Percorre todas as imagens da pasta.
3. Executa a predição e salva as imagens anotadas em uma subpasta `resultados/`.
4. Conta as ocorrências de cada tipo de fissura detectada.

# Conclusão

&emsp; Em resumo, a aplicação de campo construída com Streamlit permitiu a integração eficiente entre a captura de imagens via drone, organização em expedições e análise automatizada por meio de um modelo de classificação baseado em YOLO. Essa estrutura proporciona uma interface intuitiva e funcional para inspeções visuais, otimizando o processo de identificação de fissuras em edificações.
