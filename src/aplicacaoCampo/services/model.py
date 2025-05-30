from ultralytics import YOLO
import os
import glob
from PIL import Image
import json

def load_detection_model(model_path):
    return YOLO(model_path)

def run_detection_model(model_path, image_folder):
    model = load_detection_model(model_path)
    images = sorted(glob.glob(f"{image_folder}/*_*_*_*.[jp][pn]g"), reverse=True)
    if not images:
        return "Nenhuma imagem encontrada para rodar o modelo.", {}

    results_folder = os.path.join(image_folder, "resultados")
    os.makedirs(results_folder, exist_ok=True)

    crack_counts = {}
    images_with_cracks = []
    fissures_per_image = {}

    for img_path in images:
        img_name = os.path.basename(img_path)
        img = Image.open(img_path)
        results = model(img)[0]
        result_img_path = os.path.join(results_folder, f"detect_{img_name}")
        results.save(filename=result_img_path)

        if len(results.boxes) > 0:
            images_with_cracks.append(img_name)
            fissures_per_image[img_name] = []

            for box in results.boxes:
                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                confidence = float(box.conf[0])

                crack_counts[class_name] = crack_counts.get(class_name, 0) + 1
                fissures_per_image[img_name].append({
                    "categoria": class_name,
                    "confiabilidade": confidence
                })

    crack_info_path = os.path.join(results_folder, "crack_info.json")
    with open(crack_info_path, 'w') as f:
        json.dump({
            'images_with_cracks': images_with_cracks,
            'crack_counts': crack_counts
        }, f)

    fissures_json_path = os.path.join(results_folder, "fissures_per_image.json")
    with open(fissures_json_path, 'w') as f:
        json.dump(fissures_per_image, f)

    return "Modelo executado com sucesso!", crack_counts


def get_images_with_cracks(building_path):
    crack_info_path = os.path.join(building_path, "resultados", "crack_info.json")
    if os.path.exists(crack_info_path):
        with open(crack_info_path, 'r') as f:
            crack_info = json.load(f)
            return crack_info.get('images_with_cracks', [])
    return []
