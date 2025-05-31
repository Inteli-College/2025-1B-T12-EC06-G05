---
sidebar_position: 2
custom_edit_url: null
---

# Start Page

&emsp; Essa página é responsável pela criação de novas expedições e pela visualização das expedições já criadas localmente.

&emsp; Na lateral esquerda, o usuário pode criar uma nova expedição informando o nome, localização, descrição e uma imagem de capa opcional. Esses dados são salvos em um arquivo `expedition_info.json`, junto com a data de criação e o ID do responsável. A estrutura da pasta da expedição é criada automaticamente no diretório local.

&emsp; Na lateral direita, são exibidas todas as expedições salvas, com seus respectivos nomes e datas. É possível abrir cada expedição clicando no botão correspondente.

&emsp; Além disso tem um botão para subir imagens, que ao clicar, as imagens locais são enviadas para o bucket S3, e a API é acionada para criar automaticamente as entidades de expedição, prédios, imagens e fissuras. Esse processo permite que os dados já apareçam prontos na aplicação web. Após a publicação, os dados locais são limpos.

&emsp; Essa tela concentra grande parte da interação inicial com o sistema e foi pensada para facilitar o fluxo de trabalho de quem está em campo.