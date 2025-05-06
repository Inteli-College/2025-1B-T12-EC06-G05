import cv2
import socket
import time

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('', 9000))
sock.sendto(b'command', ('192.168.10.1', 8889))
time.sleep(1)
sock.sendto(b'streamon', ('192.168.10.1', 8889))
time.sleep(2)

cap = cv2.VideoCapture("udp://0.0.0.0:11111")

img_counter = 0

if not cap.isOpened():
    print("Erro ao abrir o stream.")
    exit()

def send_command(cmd: str):
    sock.sendto(cmd.encode('utf-8'), ('192.168.10.1', 8889))

try:
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Falha ao receber frame.")
            continue

        frame = cv2.resize(frame, (640, 480))
        cv2.imshow("Tello - Video Direct", frame)

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
        elif key == ord(' '):
            img_name = "imagens/fotos/opencv_frame_{}.png".format(img_counter)
            cv2.imwrite(img_name, frame)
            print("{} written!".format(img_name))
            img_counter += 1

except KeyboardInterrupt:
    print("\n[CTRL+C] Interrupção detectada!")

finally:
    cap.release()
    cv2.destroyAllWindows()
    send_command("streamoff")
    sock.close()