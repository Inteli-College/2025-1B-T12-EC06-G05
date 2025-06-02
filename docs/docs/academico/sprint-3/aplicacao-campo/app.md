---
sidebar_position: 6
custom_edit_url: null
---

# app.py

&emsp;O arquivo `app.py` é o ponto de entrada principal da aplicação de campo. Ele é responsável por orquestrar a navegação entre as páginas e controlar o fluxo geral da aplicação com base no estado da sessão e nos parâmetros de URL.

&emsp;Ao iniciar, o aplicativo configura a interface usando Streamlit, desativando a sidebar padrão e ajustando o layout para ocupar a largura total da tela. A seguir, ele decide qual página deve ser renderizada com base nas condições abaixo:

- &emsp;Se não houver um `user_id` na sessão, a página de login é exibida (`render_login`).
- &emsp;Se o usuário estiver logado, mas não houver expedição selecionada, a página de início é mostrada (`render_start_page`).
- &emsp;Se uma expedição estiver selecionada mas nenhum prédio, a tela de inspeção é exibida (`render_inspection_page`).
- &emsp;Se houver um prédio selecionado, a aplicação carrega a visualização do prédio (`render_building_page`) ou, caso haja um parâmetro de modelo, exibe os resultados da detecção de fissuras (`render_model_results_page`).

&emsp;Esse controle centralizado torna o `app.py` o núcleo de navegação da aplicação e garante que cada etapa do fluxo de inspeção seja carregada no momento apropriado.