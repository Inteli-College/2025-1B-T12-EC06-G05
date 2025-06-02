---
sidebar_position: 2
custom_edit_url: null
title: "Execução do Modelo"
---

# Execução do Modelo

## Sobre o modelo de detecção

&emsp;O modelo utilizado na aplicação é baseado em **YOLOv8**, e é responsável por identificar e classificar fissuras nas imagens capturadas durante as inspeções.

&emsp;A execução do modelo é feita automaticamente pela aplicação Streamlit, mas exige que alguns arquivos estejam corretamente posicionados antes da execução.

## Pré-requisitos

Antes de executar o modelo, certifique-se de que:

- A aplicação foi iniciada corretamente com o Streamlit;
- As imagens de inspeção já foram capturadas ou carregadas para o prédio desejado;
- O modelo `.pt` está disponível no local esperado.

### 1. Estrutura esperada do modelo

```bash
src/
└── modelo/
    └── best.pt
```

- O arquivo best.pt é gerado a partir da extração do compactado best.7z como explicado no tutorial de como rodar o streamlit

## Executando o modelo pela interface

&emsp;A execução é feita diretamente pela interface Streamlit. Siga os passos abaixo:

### 1. Acesse a interface após rodar o streamlit

- executa a aplicação com streamlit

```bash

streamlit run interface.py
```

- A interface será iniciada no navegador em:
```bash
http://localhost:8501
```


### 2. Navegue até o prédio desejado

- Crie ou selecione uma inspeção existente.
- Selecione um prédio com imagens.
- Clique em "Rodar modelo" ou equivalente, na tela de visualização do prédio.

### 3. Resultado da execução

- As imagens detectadas são salvas automaticamente em:

```bash
src/imagens/inspecoes/NomeDaInspecao/predios/NomeDoPredio/resultados/
```
- A contagem de fissuras por tipo é exibida na interface.

## Observações

- O modelo é executado automaticamente usando a função run_model(...), que realiza a inferência com o YOLOv8.
- Apenas imagens .jpg e .png são processadas.
- É necessário garantir que o arquivo best.pt esteja presente antes de executar o modelo.

 Com todos os arquivos no lugar, o modelo será executado corretamente dentro do fluxo da aplicação.


