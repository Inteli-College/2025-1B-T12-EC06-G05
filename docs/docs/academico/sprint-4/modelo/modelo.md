---
sidebar_position: 1
title: "Atualizações do Modelo"
sidebar_label: "Modelo"
---

## Objetivo

&emsp;Nesta sprint, nosso principal objetivo foi alcançar um avanço significativo na qualidade do nosso modelo para identificação e classificação de fissuras.  
&emsp;Embora os resultados das sprints anteriores fossem satisfatórios, entendemos que ainda havia bastante espaço para melhorias. Por isso, decidimos adotar uma nova estratégia, com o intuito de ir além dos resultados obtidos até então.


## Pipeline

&emsp;A solução escolhida foi a implementação de uma pipeline composta por três etapas, onde cada modelo teria uma função específica dentro do fluxo de processamento.

&emsp;As etapas da pipeline foram definidas da seguinte forma:

1. **Segmentação de fissuras** – Modelo utilizado: **YOLOv8m-Cracks**  
Responsável por identificar as regiões com fissuras dentro das imagens, gerando uma máscara de segmentação.

2. **Detecção de fissuras** – Modelo utilizado: **YOLOv8m**  
Responsável por localizar e delimitar as fissuras com base nas regiões segmentadas.

3. **Classificação das fissuras** – Modelo utilizado: **YOLOv8m-cls**  
Responsável por classificar as fissuras detectadas, se é de retração ou térmica.

&emsp;Essa divisão teve como objetivo permitir que cada modelo fosse treinado e ajustado de forma mais específica, melhorando assim a precisão de cada etapa.

## Etapa 1: Segmentação de Fissuras (YOLOv8m-Cracks)

&emsp;A primeira etapa da pipeline ficou a cargo do modelo **YOLOv8m-Cracks**, que teve como objetivo gerar **máscaras de segmentação**, destacando os pixels correspondentes às regiões onde existem fissuras.     
&emsp;Logo nos primeiros testes, o desempenho foi satisfatório: o modelo demonstrou boa capacidade de identificar áreas com fissuras nas imagens. No entanto, ao avançarmos nos testes, identificamos um problema importante: o modelo estava gerando múltiplas detecções em uma mesma região, ou seja, identificava várias fissuras sobre um único ponto da imagem. Essa duplicidade de detecção acabava afetando o desempenho das próximas etapas da pipeline.

&emsp;A seguir está um exemplo de uma imagem após passar pelo modelo de segmentação:

<p style={{textAlign: 'center'}}>Figura 1 - Resultado do Modelo de Segmentação</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/img-segmentada.jpeg").default} style={{width: 500}} alt="Resultado da etapa 1" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

### Problemas com o Dataset de Máscaras

&emsp;Inicialmente, havíamos começado a construir um conjunto de máscaras manualmente, utilizando a ferramenta de polígono no MakeSense.ai para demarcar com precisão as fissuras. No entanto, enfrentamos problemas técnicos que acabaram causando a perda definitiva dessas máscaras antes que conseguíssemos salvá-las.      
&emsp;Diante disso, optamos por utilizar um dataset público disponível no **Roboflow**, que já oferecia máscaras pré-anotadas para segmentação de fissuras.     
&emsp;Esse dataset apresentou uma qualidade de imagem superior à do dataset fornecido originalmente pelo parceiro, com melhor resolução e definição das fissuras.     
&emsp;Porém, ele também trouxe uma nova dificuldade: as fissuras presentes nesse dataset eram bem diferentes das que encontramos no nosso projeto, tanto em formato quanto em aspecto visual. Isso acabou gerando um descompasso entre o tipo de fissura que o modelo foi treinado para segmentar e as fissuras reais que ele precisava identificar.        
&emsp;Essa diferença entre os contextos dos datasets foi um dos principais fatores que impediram o modelo de alcançar um desempenho ideal nesta sprint. Mesmo assim, o modelo apresentou um avanço perceptível em comparação com as versões anteriores, o que reforça a efetividade da nova abordagem.


## Grid Search: Otimização de Hiperparâmetros

&emsp;Uma das ações que contribuiu para melhorar o desempenho, mesmo com as limitações do dataset, foi a realização de uma **Grid Search**.

### O que é Grid Search?

&emsp;Grid Search é uma técnica usada para encontrar a melhor combinação de hiperparâmetros para um modelo de machine learning.

&emsp;Modelos como o YOLO oferecem diversos hiperparâmetros que podem impactar o desempenho, como:

- Taxa de aprendizado
- Número de épocas de treinamento
- Tamanho do batch
- Threshold de confiança, entre outros.

&emsp;Como não existe uma configuração padrão que funcione para todos os projetos, o Grid Search consiste em testar diferentes combinações desses parâmetros de forma sistemática, até encontrar o conjunto que entrega os melhores resultados.


## Etapa 2: Detecção de Fissuras (YOLOv8m)

&emsp;A segunda etapa da nossa pipeline foi a detecção das fissuras, utilizando o modelo **YOLOv8m**. Essa etapa teve como objetivo localizar as fissuras nas imagens segmentadas, criando caixas delimitadoras (bounding boxes) ao redor de cada fissura identificada.     
&emsp;Apesar de a etapa de segmentação não ter sido ideal, o modelo de detecção apresentou um desempenho muito positivo. Ele conseguiu lidar bem com as imperfeições vindas da segmentação, mostrando robustez na tarefa de localizar com precisão as fissuras.     
&emsp;Esse resultado mostra que a arquitetura em etapas foi uma escolha acertada, pois mesmo com uma entrada com ruído (máscaras com pequenas falhas ou excesso de regiões detectadas), o modelo de detecção conseguiu realizar um refinamento eficiente.       
&emsp;Além disso, o uso de um modelo especializado para detecção permitiu trabalhar melhor com os bounding boxes, deixando as regiões de interesse mais bem definidas e organizadas para a etapa seguinte.


## Etapa 3: Classificação das Fissuras (YOLOv8m-cls)

&emsp;Na terceira e última etapa da pipeline, utilizamos o **YOLOv8m-cls**, com a responsabilidade de classificar os tipos de fissuras detectadas. O modelo recebeu como entrada as regiões previamente localizadas pelo YOLOv8m de detecção e, a partir disso, realizou a classificação de cada fissura.        
&emsp;Mesmo considerando os desafios enfrentados nas etapas anteriores, o modelo de classificação obteve resultados bastante satisfatórios. Ele conseguiu distinguir bem os diferentes tipos de fissura, com um bom nível de acurácia.      
&emsp;Esse desempenho reforça mais uma vez a força da abordagem em pipeline, pois o fato de termos isolado cada tarefa (segmentar, detectar e classificar) permitiu que cada modelo focasse exclusivamente na sua função, sem a necessidade de "compensar" falhas de outras etapas.     
&emsp;Outro ponto positivo é que, com as fissuras já bem localizadas pela etapa de detecção, o classificador teve uma base mais consistente para tomar suas decisões.

&emsp;A seguir estão dois exemplos de classificação, um de fissura térmica e outro de fissura de retração: 

---

<p style={{textAlign: 'center'}}>Figura 2 - Resultado do Modelo de Classificação</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/img-FT.jpeg").default} style={{width: 500}} alt="Resultado da etapa 3" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

<p style={{textAlign: 'center'}}>Figura 3 - Resultado do Modelo de Classificação</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/img-FR.jpeg").default} style={{width: 500}} alt="Resultado da etapa 3" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

## Conclusão Geral da Sprint

&emsp;A adoção de uma pipeline dividida em três etapas foi, sem dúvida, um passo importante para a evolução do nosso projeto.   
&emsp;Apesar de termos enfrentado limitações significativas, como a perda das máscaras originais e a utilização de um dataset que não representava tão bem as características reais das nossas imagens, conseguimos avançar.    
&emsp;Tanto o modelo de segmentação quanto os de detecção e classificação apresentaram melhorias claras em relação aos resultados obtidos nas sprints anteriores.   
&emsp;A realização do Grid Search foi um diferencial importante para otimizar os modelos, principalmente na etapa de segmentação.   
&emsp;Sabemos que o modelo atual ainda não é o ideal e que os problemas com o dataset tiveram um peso considerável nesse resultado. No entanto, os aprendizados obtidos nesta sprint deixam a equipe mais preparada para os próximos passos.
