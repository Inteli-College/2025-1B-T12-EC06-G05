---
sidebar_position: 4
custom_edit_url: null
---

# modelo

&emsp;A pasta `modelo` armazena os arquivos dos modelos de visão computacional utilizados pela aplicação de campo. Esses modelos são responsáveis por realizar a detecção de fissuras nas imagens capturadas, utilizando algoritmos treinados previamente.

&emsp;Atualmente, os modelos são carregados e executados pelo serviço `model.py`, que utiliza a biblioteca `ultralytics` com arquitetura YOLO para análise das imagens. A presença dos arquivos nessa pasta é essencial para que a funcionalidade de detecção funcione corretamente durante a execução da aplicação.

&emsp;Essa estrutura facilita a troca ou atualização dos modelos sem a necessidade de modificar o restante do código da aplicação.