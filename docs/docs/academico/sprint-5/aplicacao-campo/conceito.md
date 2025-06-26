---
sidebar_position: 1
custom_edit_url: null
title: "O que é?"
---

# Aplicação de Campo

## Conceito

&emsp;A Aplicação de Campo faz parte do projeto e foi desenvolvida para funcionar, em grande parte, de forma offline. Isso permite que os pilotos de drone a utilizem durante expedições em prédios, mesmo sem acesso à internet, como nos casos em que o computador está conectado diretamente ao drone.

&emsp;Por meio da aplicação, é possível capturar imagens utilizando comunicação via UDP com o drone. Essas imagens são salvas localmente no computador. Quando houver acesso à internet, elas podem ser enviadas para a nuvem. Assim que o envio é concluído, as imagens são apagadas do computador do usuário, liberando espaço e mantendo apenas a versão armazenada remotamente, que pode ser acessada pela nossa aplicação web.

&emsp; Na Aplicação de Campos utilizamos as seguintes tecnologias:
- **Python** (linguagem base)
- **Streamlit** (para criação da interface web)
- **Ultralytics** (implementação do modelo)
- **Boto3** (SDK para integração com serviços AWS)
- **OpenCV** (biblioteca para processamento de imagens)
- **Comunicação UDP** (para comunicação direta com o drone durante as expedições)

&emsp;Nesta seção, você encontrará informações sobre essa aplicação, como sua experiência de uso (UX) e os testes de usabilidade realizados.