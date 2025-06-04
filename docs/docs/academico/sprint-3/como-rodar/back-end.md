---
sidebar_position: 3
custom_edit_url: null
title: "Back-end"
---

# Inicialização do *Back-end* localmente

## Pré-requisitos

Para inicializar o *back-end* locamente é necessário ter os seguintes programas instalados em sua máquina:

- Python
- Pip

Ademais, caso você queira fazer baixar nosso repositório via terminal é preciso ter instalado o Git e ter feito sua conexão SSH com sua conta do github

## Passo a passo:

### Baixando o repositório do grupo

- **Via terminal, caso tenha o Git baixado em seu pc:**

&emsp;Abra um terminal no diretório desejado e digite o seguinte comando:

``` git clone git@github.com:Inteli-College/2025-2A-T12-EC06-G05.git ```

- **Via site do github baixando:**

&emsp;Acesse o nosso repositório no github no seguinte link:
[Link do Repositório no GitHub](https://github.com/Inteli-College/2025-1A-T12-EC05-G03/)


&emsp;Clique no botão verde escrito **Code** e vá em **download ZIP**.

&emsp;Após o download, descompacte o nosso arquivo .zip no diretório o qual você deseja

### Criação e ativação do ambiente virtual

&emsp; Abra um terminal no diretório onde está foi baixado o repositório da equipe e digite os seguintes comando seguinte comando:

``` cd src/back-end ```

 - **No Windows**:

 ``` python -m venv venv ```

 ``` .\venv\Scripts\activate ```
 - **No Linux/Mac**:

```python3 -m venv venv```

```source venv/bin/activate```

### Instalação das dependências

&emsp;No mesmo terminal anterior digite o seguinte comando:

```pip install -r requirements.txt```

### Inicialização da aplicação

&emsp;Ainda no mesmo terminal digite os seguintes comandos:

```cd ..```


```python -m back-end.main```

Nesse contexto, seguindo os passos acima da maneira correta será possível acessar os ***endpoints*** do nosso *back-end* por meio do seguinte URL:

``http://127.0.0.1:5000``
