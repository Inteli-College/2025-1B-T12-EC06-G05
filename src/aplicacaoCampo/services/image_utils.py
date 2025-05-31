import cv2
import os
import glob
from PIL import Image

def save_image(frame, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    cv2.imwrite(path, frame)

def list_images_by_direction(folder_path, direction):
    pattern = f"{folder_path}/{direction}_*.[jp][pn]g"
    return sorted(glob.glob(pattern), reverse=True)

def list_detected_images_by_direction(folder_path, direction):
    pattern = f"{folder_path}/resultados/detect_{direction}_*.[jp][pn]g"
    return sorted(glob.glob(pattern), reverse=True)
