---
sidebar_position: 1
custom_edit_url: null
title: "AWS"
---

# Configuração da AWS

## 1. Criando um bucket no Amazon S3

&emsp;Para que a aplicação possa armazenar imagens e resultados processados, é necessário criar um bucket no Amazon S3.

&emsp;Assista ao vídeo abaixo para entender como criar o bucket:

<div style={{margin: 25, textAlign: 'center'}}>
    <iframe width="900" height="506" src="https://www.youtube.com/embed/qaXN2T_CqbE" 
        title="Como criar um bucket no S3" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
</div>

&emsp;Após criar o bucket, anote o nome utilizado. Ele será necessário para configurar os arquivos da aplicação.

## 2. Configurando as credenciais da AWS

&emsp;Para que a aplicação possa enviar arquivos para o S3, é preciso configurar as credenciais da AWS em seu ambiente local.

&emsp;Veja o vídeo abaixo para aprender como configurar:

<div style={{margin: 25, textAlign: 'center'}}>
    <iframe width="900" height="506" src="https://www.youtube.com/embed/qxRCKc4YFOo" 
        title="Como configurar credenciais AWS CLI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
</div>

&emsp;Essas credenciais são armazenadas no arquivo:

- Linux/macOS: `~/.aws/credentials`
- Windows: `C:\Users\SEU_USUARIO\.aws\credentials`

## 3. Atualizando o nome do bucket na aplicação

&emsp;Por padrão, os arquivos `s3_uploader.py` e `publish_service.py` usam o nome `fissurai` como bucket. Se você escolheu outro nome, é necessário atualizá-lo nestes arquivos:

- `src/aplicacaoCampo/services/s3_uploader.py`
- `src/aplicacaoCampo/services/publish_service.py`

&emsp;Procure por:

```python
bucket = 'fissurai'
```

&emsp;E substitua pelo nome do seu bucket:

```python
bucket = 'nome-do-seu-bucket'
```

&emsp;Salve as alterações e sua aplicação estará pronta para usar o S3 corretamente.


## 4. Política Pública do Bucket S3

&emsp;Para que as imagens e arquivos armazenados no bucket do S3 possam ser acessados publicamente (por exemplo, visualizados pela aplicação web), é necessário adicionar uma política pública ao bucket.

&emsp;Utilize a seguinte política:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::fissurai/*"
        }
    ]
}
```

> Substitua `"fissurai"` pelo nome real do seu bucket, se for diferente.

&emsp;Essa política permite que qualquer pessoa (via navegador ou aplicação) consiga acessar os arquivos armazenados no bucket, desde que possua o link direto.

### Configurações adicionais no S3

&emsp;Para que essa política funcione, é necessário desabilitar as seguintes opções no painel de permissões do bucket:

- Block public access to buckets and objects granted through new access control lists (ACLs)
- Block public access to buckets and objects granted through any access control lists (ACLs)
- Block public access to buckets and objects granted through new public bucket or access point policies
- Block public and cross-account access to buckets and objects through any public bucket or access point policies

&emsp;Essas opções devem estar **desativadas** para permitir o acesso público.

### Observação

&emsp;Permitir acesso público significa que qualquer pessoa com o link poderá visualizar os arquivos. Garanta que isso esteja de acordo com os requisitos de segurança do seu projeto.