import os
import json
from datetime import datetime

def publish_expedition(api, path):
    with open(os.path.join(path, "expedition_info.json")) as f:
        data = json.load(f)
    return api.post("/expedition/register", data)

def publish_building(api, path, expedition_id):
    with open(os.path.join(path, "building_info.json")) as f:
        data = json.load(f)
    data["id_expedicao"] = expedition_id
    return api.post("/building/register", data)

def publish_image(api, path, filename, building_id, bucket_name="fissurai"):
    sentido = filename.split("_")[0]
    timestamp = int(filename.split("_")[-1].split(".")[0])

    local_path = os.path.join(path, filename)
    result_filename = f"detect_{filename}"
    result_path = os.path.join(path, "resultados", result_filename)

    s3_key = local_path.replace(os.path.sep, '_')
    result_s3_key = result_path.replace(os.path.sep, '_')

    s3_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"
    s3_result_url = f"https://{bucket_name}.s3.amazonaws.com/{result_s3_key}"

    payload = {
        "url": s3_url,
        "nome": filename,
        "hora_coleta": datetime.fromtimestamp(timestamp).isoformat(),
        "orientacao": sentido,
        "id_predio": building_id,
        "img_resultado": s3_result_url,
        "anotacao": "",
        "id_modelo": None
    }

    image_response = api.post("/image/add", payload)

    if image_response.status_code == 201:
        image_id = image_response.json().get("id")
        if image_id:
            publish_fissures(api, image_id, local_path)

    return image_response


def publish_fissures(api, image_id, image_path):
    fissure_file = os.path.splitext(image_path)[0] + ".txt"
    if not os.path.exists(fissure_file):
        return []

    with open(fissure_file, "r") as f:
        fissures = [line.strip().split(",") for line in f if "," in line]

    results = []
    for category, confidence in fissures:
        payload = {
            "confiabilidade": int(confidence),
            "categoria": category.lower(),
            "id_image": image_id
        }
        res = api.post("/fissure/add", payload)
        results.append((payload, res.status_code))

    return results

def publish_full_inspection(api, inspections_dir="imagens/inspecoes"):
    result = {"expeditions": [], "errors": []}

    for exp_name in os.listdir(inspections_dir):
        exp_path = os.path.join(inspections_dir, exp_name)
        if not os.path.isfile(os.path.join(exp_path, "expedition_info.json")):
            continue

        res = publish_expedition(api, exp_path)
        if res.status_code != 201:
            result["errors"].append((exp_name, res.text))
            continue

        expedition_id = res.json().get("id")
        result["expeditions"].append(exp_name)

        buildings_path = os.path.join(exp_path, "predios")
        for bname in os.listdir(buildings_path):
            bpath = os.path.join(buildings_path, bname)
            if not os.path.isfile(os.path.join(bpath, "building_info.json")):
                continue

            res = publish_building(api, bpath, expedition_id)
            if res.status_code != 201:
                result["errors"].append((bname, res.text))
                continue

            building_id = res.json().get("id")
            for fname in os.listdir(bpath):
                if fname.endswith((".jpg", ".png")) and not fname.startswith("detect_"):
                    img_res = publish_image(api, bpath, fname, building_id)
                    if img_res.status_code != 201:
                        result["errors"].append((fname, img_res.text))

    return result
