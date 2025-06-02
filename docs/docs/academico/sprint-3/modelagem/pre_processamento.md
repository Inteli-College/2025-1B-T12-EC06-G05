---
title: "Pré-processamento de Imagens para Treinamento"
sidebar_label: "Pré-processamento"
sidebar_position: 2
---

# Pré-processamento para Treinamento do Modelo

&emsp;Durante esta Sprint, a equipe de desenvolvimento focou no pré-processamento das imagens que seriam utilizadas para treinar o modelo YOLOv12 para detecção de fissuras. O processo de pré-processamento foi dividido em duas etapas principais: labeling das imagens e o pré-processamento automatizado realizado pelo YOLOv12.

## Labeling com a ferramenta MakeSense.ai

&emsp;A primeira etapa crucial para o treinamento do modelo foi o labeling das imagens. Para isso, utilizamos a ferramenta [MakeSense.ai](https://www.makesense.ai/), uma plataforma online de anotação de imagens que permite gerar as anotações necessárias para o treinamento, no formato adequado para o YOLO. Com essa ferramenta, conseguimos gerar arquivos de texto que definem as caixas delimitadoras e as classes das fissuras presentes nas imagens.

&emsp;O processo de labelização com o MakeSense.ai foi feito da seguinte forma:
1. Carregamento das imagens: As imagens de teste, geradas por inteligência artificial, conforme [Geração de Imagens](#../../../sprint-3/modelagem/geracao_imagens), foram carregadas na plataforma MakeSense.ai.
2. Anotação das fissuras: Para cada imagem, desenhamos caixas delimitadoras ao redor das fissuras visíveis, de acordo com as classes predefinidas.
3. Exportação: Após a anotação de todas as imagens, exportamos os arquivos de anotação no formato YOLO, onde cada imagem foi associada a um arquivo `.txt` contendo as coordenadas da caixa delimitadora (normalizadas) e o ID da classe.

&emsp;Esse processo de labeling foi importante para fornecer ao modelo as informações necessárias para aprender a identificar e classificar as fissuras nas imagens durante o treinamento.

## Pré-processamento do YOLOv12

&emsp;Após a etapa de labeling, as imagens e anotações estavam prontas para serem usadas no treinamento do modelo YOLOv12. Vale ressaltar que o YOLOv12 já realiza automaticamente várias etapas de pré-processamento, o que torna desnecessário adicionar uma pipeline de pré-processamento adicional. Por isso, o fluxo inicialmente mapeado na sprint anterior foi desconsiderado, apesar de que ainda assim trouxe vários entendimentos sobre como melhor entender as imagens.

### Etapas de Pré-processamento no YOLOv12

&emsp;O YOLOv12 já inclui as seguintes etapas de pré-processamento de imagens, o que significa que não há necessidade de realizar esse pré-processamento separadamente:

- Redimensionamento das Imagens: O YOLOv12 redimensiona automaticamente todas as imagens para um tamanho fixo durante o treinamento (geralmente 416x416 ou 640x640 pixels), o que assegura que o modelo receba imagens em um formato consistente e adequado para a rede neural.
  
- Normalização de Pixels: Os valores dos pixels são normalizados para o intervalo [0,1], o que ajuda na convergência do modelo e melhora a performance durante o treinamento. Este processo é feito automaticamente e garante que o modelo trabalhe com dados em uma escala adequada.

- Conversão para Tensor: O YOLOv12 converte as imagens carregadas em tensores que podem ser passados pelas redes neurais convolucionais. O formato do tensor geralmente será de `[batch_size, channels, height, width]`, onde `channels` é 3 (para imagens RGB).

- Aumento de Dados (Data Augmentation): Durante o treinamento, o YOLOv12 aplica técnicas automáticas de aumento de dados para melhorar a robustez do modelo. Isso pode incluir:
  - Rotação aleatória das imagens
  - Escala (zoom) das imagens
  - Mudança de brilho, contraste e saturação
  - Espelhamento horizontal ou vertical
  - Translação e corte aleatório (crop)

&emsp;Essas técnicas aumentam a diversidade do conjunto de treinamento sem a necessidade de manipulação manual, permitindo que o modelo aprenda a generalizar melhor.

### Por que não é necessário adicionar outra pipeline de pré-processamento?

&emsp;Considerando as etapas de pré-processamento já incorporadas no YOLOv12, não há necessidade de aplicar outro pipeline de pré-processamento nas imagens antes do treinamento. As razões para isso são:

1. Redimensionamento e Normalização Automáticos: O YOLOv12 já redimensiona as imagens para o tamanho adequado e normaliza os pixels, preparando as imagens de forma ideal para o modelo.
  
2. Aumento de Dados Incorporado: O aumento de dados durante o treinamento já ajuda a criar uma maior diversidade nas imagens, sem a necessidade de aplicar técnicas adicionais de pré-processamento nas imagens manualmente.

3. Eficiência do Modelo: Como o YOLOv12 já realiza o pré-processamento necessário, isso otimiza o tempo de treinamento e a eficiência do processo, sem a necessidade de adicionar mais etapas ao pipeline.

## Conclusão

&emsp;O processo de pré-processamento realizado durante esta Sprint foi eficiente, com o uso da ferramenta MakeSense.ai para labelizar as imagens de maneira rápida e precisa. Além disso, a robustez do YOLOv12, com seu conjunto completo de pré-processamento embutido, garantiu que as imagens fossem preparadas adequadamente para o treinamento, sem a necessidade de uma pipeline adicional. Com isso, conseguimos otimizar o tempo e os recursos e garantir que o modelo fosse treinado de maneira eficaz para detectar fissuras em condições reais de inspeção predial.

&emsp;A escolha de utilizar imagens geradas com inteligência artificial foi essencial para garantir a diversidade do conjunto de dados e preencher a lacuna de dados reais, o que permitiu que o modelo fosse treinado de forma robusta e adaptada a diferentes condições de superfícies e ambientes.
