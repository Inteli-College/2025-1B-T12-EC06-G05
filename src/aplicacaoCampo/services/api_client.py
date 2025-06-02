import requests

class APIClient:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

    def post(self, endpoint, data):
        return requests.post(f"{self.base_url}{endpoint}", headers=self.headers, json=data)