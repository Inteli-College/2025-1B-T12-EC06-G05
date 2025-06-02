---
sidebar_position: 1

custom_edit_url: null
title: "Streamlit"
---

# Streamlit

## Executando a aplicação com Streamlit

&emsp;Para executar a interface local da aplicação de campo utilizando Streamlit, siga os passos abaixo:

### 1. Acesse o diretório correto do projeto

```bash
cd src
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

### 4. Extraia o modelo 
- O modelo YOLO está compactado como best.7z. Extraia esse arquivo para obter o modelo no formato .pt.
- Após a extração, verifique se o arquivo best.pt está na pasta correta (src/modelo).


### 5. Execute a aplicação com Streamlit

```bash
streamlit run interface.py
```

&emsp;Agora você já conseguirá visualizar e utilizar a aplicação localmente através do navegador.

