import glob
import boto3
import os

def upload_file(base_folder='imagens/inspecoes', bucket='fissurai'):
    s3_client = boto3.client('s3')
    pattern = os.path.join(base_folder, '**', '*.*')
    for filepath in glob.iglob(pattern, recursive=True):
        if filepath.lower().endswith(('.png', '.jpg', '.jpeg')):
            s3_name = filepath.replace(os.path.sep, '_')
            print(f'Uploading {s3_name} to S3')
            s3_client.upload_file(filepath, bucket, s3_name)
