---
sidebar_position: 4
custom_edit_url: null
title: "Testes com usuários"
---

# Testes do Computador de Bordo

## Introdução

&emsp;O computador de bordo é uma peça central para o sucesso das expedições de campo. Sua função é permitir que os pesquisadores realizem cadastros, registros fotográficos, execuções de modelos de detecção e organização das informações diretamente no ambiente externo, sem depender da interface web.  
&emsp;Dada a sua importância operacional e o impacto direto no andamento das atividades do IPT, desenvolvemos um conjunto de testes específicos para garantir que o sistema embarcado seja robusto, intuitivo e confiável. Esta seção documenta exclusivamente os testes realizados no computador de bordo, destacando cada funcionalidade, seus objetivos, critérios de aceitação e observações importantes identificadas durante a Sprint 5.

## Metodologia

&emsp;A execução dos testes foi feita com base em um roteiro estruturado de cenários de uso real, que envolvem desde o login no sistema até a execução do modelo de detecção e visualização dos resultados.  
&emsp;Os testes foram registrados em planilha própria ([acesso aqui](https://docs.google.com/spreadsheets/d/1NRKYfJO7C9gr6uq25u9kAVgcUwgoy1Zi5RVf5Xp149o/edit?usp=sharing)), onde foram anotados os comportamentos observados, as dificuldades enfrentadas pelos usuários e as sugestões de melhoria.

## Roteiro de Testes

### Cenário 1 - Login

- **Objetivo:** Verificar se o usuário consegue acessar o sistema usando seu ID.
- **Ações esperadas:** Campo de ID compreensível; botão de entrada funcional; redirecionamento correto para próxima tela.
- **Observações coletadas:** Todos os usuários conseguiram realizar o login. Nenhuma falha foi registrada neste processo.

### Cenário 2 - Tela Inicial (Expedições)

- **Objetivo:** Validar o processo de criação e visualização de expedições.
- **Testes realizados:**
  - Criação de nova expedição: preenchimento dos campos de nome, localização e descrição.
  - Upload de imagem de capa (opcional).
  - Listagem das expedições já criadas.
- **Critérios de sucesso:** Dados salvos corretamente; redirecionamento funcional ao clicar em "Abrir Expedição".
- **Observações:** O fluxo foi bem compreendido.

### Cenário 3 - Tela de Inspeção

- **Objetivo:** Avaliar a visualização e o gerenciamento de prédios dentro de uma expedição.
- **Testes realizados:**
  - Visualização de prédios existentes.
  - Criação de novo prédio com nome, complemento e descrição.
  - Upload de imagem de fachada (opcional).
- **Observações:** Todos os usuários conseguiram executar as ações com facilidade.

### Cenário 4 - Tela do Prédio

- **Objetivo:** Testar as ações de captura de foto, manipulação de informações e execução do modelo de detecção.
- **Testes realizados:**
  - Captura de foto.
  - Execução do modelo de detecção.
- **Critérios de sucesso:** Imagem salva corretamente; feedback visual claro após captura; modelo processado sem erros.
- **Observações:** Alguns usuários apresentaram dificuldade em encontrar o botão para rodar o modelo após a captura de diversas imagens, uma vez que o botão acompanha o scroll da pagina. As propostas de solução incluem a adição do botão na sidebar da aplicação para que ele permaneça sempre no mesmo lugar.

### Cenário 5 - Resultados da Detecção

- **Objetivo:** Verificar a exibição dos resultados e se o usuário consegue compreender a quantidade e localização das rachaduras detectadas.
- **Testes realizados:**
  - Abertura da tela de resultados.
  - Interpretação dos dados apresentados (quantidade de rachaduras e imagens).
- **Observações:** A interface foi compreendida com sucesso.

## Conclusões

&emsp;Os testes realizados com o computador de bordo mostraram que a ferramenta está madura e pronta para uso em campo. A maior parte dos usuários completou os cenários com sucesso e sem necessidade de auxílio. As observações feitas revelam oportunidades pontuais de melhoria na facilidade em identificar ações.  
&emsp;A equipe considerará esses pontos nos planos futuros do projeto para garantir uma experiência mais agradávelp para o usuário.
