import socket
import time
import cv2

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