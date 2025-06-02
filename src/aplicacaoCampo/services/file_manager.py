import os

def create_inspection_and_building(inspection_name, building_name, base_dir='imagens/inspecoes'):
    inspection_path = os.path.join(base_dir, inspection_name)
    building_path = os.path.join(inspection_path, "predios", building_name)
    os.makedirs(building_path, exist_ok=True)
    return inspection_path, building_path

def get_existing_inspections(base_dir='imagens/inspecoes'):
    return sorted(
        [name for name in os.listdir(base_dir)
         if os.path.isdir(os.path.join(base_dir, name))],
        reverse=True
    )

def get_buildings_for_inspection(inspection_name, base_dir='imagens/inspecoes'):
    buildings_dir = os.path.join(base_dir, inspection_name, "predios")
    os.makedirs(buildings_dir, exist_ok=True)
    return sorted(os.listdir(buildings_dir), reverse=True)
