import os
import json
from datetime import datetime
import streamlit as st

def publish_expedition(api, path, bucket_name="fissurai"):
    with open(os.path.join(path, "expedition_info.json")) as f:
        data = json.load(f)
    
    if data.get("foto_capa"):
        s3_key = os.path.join(path, data["foto_capa"]).replace(os.path.sep, "_")
        data["foto_capa"] = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

    res = api.post("/expedition/register", data)
    return res


def publish_building(api, path, expedition_id, bucket_name="fissurai"):
    with open(os.path.join(path, "building_info.json")) as f:
        data = json.load(f)
    data["id_expedicao"] = expedition_id
    
    if data.get("foto_fachada"):
        s3_key = os.path.join(path, data["foto_fachada"]).replace(os.path.sep, "_")
        data["foto_fachada"] = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

    res = api.post("/building/register", data)
    return res


def publish_image(api, path, filename, building_id, bucket_name="fissurai"):
    sentido = filename.split("_")[0]
    parts = filename.split("_")
    if len(parts) < 3:
        return None
    timestamp_str = parts[2].split(".")[0]
    try:
        timestamp = int(timestamp_str)
    except ValueError:
        return None

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

    fissures_json_path = os.path.join(path, "resultados", "fissures_per_image.json")

    if image_response and image_response.status_code == 201:
        image_id = image_response.json().get("id")
        if image_id:
            publish_fissures(api, image_id, filename, fissures_json_path)

    return image_response


def publish_fissures(api, image_id, image_name, fissures_json_path):
    if not os.path.exists(fissures_json_path):
        return []

    with open(fissures_json_path, "r") as f:
        fissures_dict = json.load(f)

    fissuras = fissures_dict.get(image_name, [])
    if not fissuras:
        return []

    results = []
    for fissura in fissuras:
        try:
            confiabilidade = int(fissura.get("confiabilidade", 0) * 100)
        except Exception:
            confiabilidade = 0

        categoria = fissura.get("categoria", "").lower()
        payload = {
            "confiabilidade": confiabilidade,
            "categoria": categoria,
            "id_image": image_id
        }

        res = api.post("/fissure/add", payload)
        results.append((payload, res.status_code if res else "No response"))

    return results


def publish_full_inspection(api, inspections_dir="imagens/inspecoes"):
    result = {"expeditions": [], "errors": []}

    for exp_name in os.listdir(inspections_dir):
        exp_path = os.path.join(inspections_dir, exp_name)
        if not os.path.isfile(os.path.join(exp_path, "expedition_info.json")):
            continue

        res = publish_expedition(api, exp_path)
        if res is None or res.status_code != 201:
            result["errors"].append((exp_name, res.text if res else "No response"))
            continue

        expedition_id = res.json().get("id")
        result["expeditions"].append(exp_name)

        buildings_path = os.path.join(exp_path, "predios")
        for bname in os.listdir(buildings_path):
            bpath = os.path.join(buildings_path, bname)
            if not os.path.isfile(os.path.join(bpath, "building_info.json")):
                continue

            res = publish_building(api, bpath, expedition_id)
            if res is None or res.status_code != 201:
                result["errors"].append((bname, res.text if res else "No response"))
                continue

            building_id = res.json().get("id")
            for fname in os.listdir(bpath):
                if fname.endswith((".jpg", ".png")) and not fname.startswith("detect_"):
                    parts = fname.split("_")
                    if len(parts) >= 3:
                        try:
                            int(parts[2].split(".")[0])
                        except ValueError:
                            continue
                        img_res = publish_image(api, bpath, fname, building_id)
                        if img_res is None or img_res.status_code != 201:
                            result["errors"].append((fname, img_res.text if img_res else "No response"))

    with st.expander("Resultado da Publicação", expanded=True):
        if result["errors"]:
            st.error("Alguns erros ocorreram durante a publicação:")
            for item, msg in result["errors"]:
                st.write(f"- {item}: {msg}")
        else:
            st.success("Todas as expedições, prédios e imagens foram publicadas com sucesso!")

    return result
