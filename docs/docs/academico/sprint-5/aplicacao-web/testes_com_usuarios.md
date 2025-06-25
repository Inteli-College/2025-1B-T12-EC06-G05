---
title: "Testes da Aplicação Web"
sidebar_position: 4
custom_edit_url: null
---

# Testes da Aplicação Web

## Introdução

&emsp;A aplicação web representa a principal interface de gerenciamento do sistema, sendo utilizada por técnicos para cadastrar, acompanhar e revisar expedições, prédios e análises de fissuras.  
&emsp;Para garantir que essa ferramenta seja de fato funcional, clara e confiável, conduzimos testes com usuários reais durante a Sprint 5.  
&emsp;Este documento relata os principais cenários testados, os comportamentos observados e os pontos de melhoria identificados com base na planilha de testes específica da aplicação web.

## Metodologia

&emsp;Os testes foram realizados com usuários representando o público-alvo do sistema, que executaram ações típicas da rotina de uso sem ajuda externa.  
&emsp;Os roteiros foram definidos com base nos requisitos funcionais e não funcionais da aplicação, abrangendo o fluxo de login, cadastro, criação de expedições e prédios, além da visualização e análise de fissuras.  
&emsp;As observações foram registradas na planilha oficial de testes da aplicação web ([acesso aqui](https://docs.google.com/spreadsheets/d/1htjLyD29iclL98XBn5KmsniMZo_bzDrgna1Gwxme31U/edit?usp=sharing)).

## Roteiro de Testes

### Cenário 1 - Login

- **Objetivo:** Verificar se o usuário consegue acessar sua conta ou navegar para o cadastro.
- **Testes realizados:**
  - Preenchimento de e-mail e senha.
  - Redirecionamento para a home após login.
  - Link de navegação para a página de cadastro.
- **Observações:** Tudo funcional, nenhum usuário apresentou problemas.

### Cenário 2 - Tela de Expedições

- **Objetivo:** Validar o uso de filtros e a criação de expedições.
- **Testes realizados:**
  - Filtrar expedições por nome e data.
  - Abrir o modal de criação.
  - Preencher os dados da expedição e adicionar imagem de capa.
- **Critérios de sucesso:** Modal funcional, campos obrigatórios bem definidos, feedback visual claro.
- **Observações:** Processo compreendido, porém usuários relataram que a necessidade de digitar a data no formato "01 Jan 2000" é pouco usual. Sugeriu-se a adoção do formato "DD/MM/AA".

### Cenário 3 - Tela de Prédios

- **Objetivo:** Garantir usabilidade na criação e no acesso a prédios.
- **Testes realizados:**
  - Visualização da lista de prédios.
  - Abertura do modal para criar novo prédio.
  - Acesso a prédio existente.
- **Observações:** O modal de criação foi compreendido sem dificuldades.

### Cenário 4 - Análise de Fissuras

- **Objetivo:** Verificar a navegação e as interações na tela de fissuras.
- **Testes realizados:**
  - Visualização de imagens.
  - Upload e seleção de direção.
  - Drag & drop entre categorias.
- **Critérios de sucesso:** Funcionalidade fluida e feedback visual claro para as ações.
- **Observações:** Interface bem recebida. Alguns usuários não perceberam de imediato que era possível arrastar imagens para alterar a categoria. Sugeriu-se melhorar a visibilidade da função de arrastar ao passar o mouse sobre a fissura.  
Além disso, um usuário relatou dificuldades para realizar o upload de imagens em formatos específicos. A sugestão apresentada foi destacar visualmente os formatos aceitos no momento do upload.

## Conclusões

&emsp;Os testes de usabilidade realizados na aplicação web demonstraram que a maioria das funcionalidades principais está bem implementada e compreensível para os usuários.  
&emsp;Pequenos ajustes visuais podem melhorar a experiência de uso, especialmente nas ações arrastáveis. Com base nessas observações, os planos futuros devem focar em guias visuais para ações menos óbvias, como o *drag and drop*.

&emsp;Com essas melhorias, a aplicação web estará ainda mais adequada para o uso cotidiano por técnicos do IPT.
