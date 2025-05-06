import cv2
import socket
import time
import os

# Cria pasta "Imagens/videos" se não existir
output_dir = os.path.expanduser("imagens/videos")
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "video.mp4")

# Conexão com o drone Tello
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('', 9000))
sock.sendto(b'command', ('192.168.10.1', 8889))
time.sleep(1)
sock.sendto(b'streamon', ('192.168.10.1', 8889))
time.sleep(3)  # tempo maior para estabilizar o stream

# Conecta ao stream de vídeo via UDP
cap = cv2.VideoCapture("udp://0.0.0.0:11111")

# Checa se o stream abriu corretamente
if not cap.isOpened():
    print("Erro ao abrir o stream.")
    exit()

frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Define codec mp4v e cria o gravador de vídeo
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, 20.0, (frame_width, frame_height))

# Função para enviar comandos ao drone
def send_command(cmd: str):
    sock.sendto(cmd.encode('utf-8'), ('192.168.10.1', 8889))

# Loop principal
try:
    while True:
        ret, frame = cap.read()
        if not ret or frame is None or frame.size == 0:
            print("Falha ao receber frame.")
            continue

        frame = cv2.resize(frame, (frame_width, frame_height))
        cv2.imshow("Tello - Video Direct", frame)

        out.write(frame)

        key = cv2.waitKey(1) & 0xFF

        if key == ord('q'):
            print("Encerrando...")
            break

        elif key == ord('t'):
            print("Decolando...")
            send_command("takeoff")

        elif key == ord('l'):
            print("Pousando...")
            send_command("land")

finally:
    out.release()
    cap.release()
    cv2.destroyAllWindows()
    send_command("streamoff")
    sock.close()