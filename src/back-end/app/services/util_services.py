import requests
import boto3

def download_image_from_url(url, save_path):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Erro ao baixar imagem: {url}")
    with open(save_path, 'wb') as f:
        f.write(response.content)
        
def upload_file_to_s3(filepath, bucket, key):
    s3 = boto3.client('s3')
    s3.upload_file(filepath, bucket, key)
