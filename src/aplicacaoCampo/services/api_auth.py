import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:5000")


def login_and_get_token(API_EMAIL, API_PASSWORD):
    if not API_EMAIL or not API_PASSWORD:
        raise ValueError(f"Credenciais não encontradas, email: {API_EMAIL}, senha: {API_PASSWORD}")

    response = requests.post(
        f"{API_BASE_URL}/user/login",
        json={"email": API_EMAIL, "senha": API_PASSWORD},
        headers={"Content-Type": "application/json"}
    )

    if response.status_code == 200:
        return response.json().get("access_token"), response.json().get("id")
    else:
        raise Exception(f"Erro ao fazer login: {response.text}")