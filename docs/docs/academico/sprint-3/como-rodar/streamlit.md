---
sidebar_position: 3
custom_edit_url: null
title: "Streamlit"
---

# Streamlit

## Executando a aplicação com Streamlit

&emsp;Para executar a interface local da aplicação de campo utilizando Streamlit, siga os passos abaixo:

### 1. Acesse o diretório correto do projeto

```bash
cd src/aplicacaoCampo
```

### 2. Crie e ative um ambiente virtual

```bash
python -m venv venv
# Para Windows
venv\Scripts\activate
# Para Mac/Linux
source venv/bin/activate
```

### 3. Instale as dependências do projeto

```bash
pip install -r requirements.txt
```

### 4. Execute a aplicação com Streamlit

```bash
streamlit run app.py
```

&emsp;Agora você já conseguirá visualizar e utilizar a aplicação localmente através do navegador.

## Configurando as credenciais da API

&emsp;Para que a aplicação consiga subir imagens e criar entidades (expedições, prédios, fissuras) por meio da API, é necessário criar um arquivo `.env` dentro da pasta `src/aplicacaoCampo` com as seguintes variáveis:

```env
API_BASE_URL=http://127.0.0.1:5000
API_EMAIL=seu_email
API_PASSWORD=sua_senha
```

&emsp;Essas credenciais podem ser criadas diretamente pela nossa API ou por meio da aplicação web.

## Requisitos adicionais

&emsp;Além de rodar a aplicação Streamlit, certifique-se de que:

- O **backend da aplicação** está ativo (a execução está descrita em outra seção).
- A **AWS está corretamente configurada** para envio das imagens ao S3 (também explicado em outra seção).
- O **modelo de detecção**, localizado na pasta `modelo`, deve estar como `.pt`. O arquivo `.pt` utilizado pelo YOLO está salvo no formato `.7z` e deve ser extraído antes de executar a aplicação. Certifique-se de que o arquivo `.pt` esteja presente na pasta para que o modelo funcione corretamente.

&emsp;Com todos esses elementos configurados, a aplicação estará pronta para uso completo em ambiente local.