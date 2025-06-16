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
&emsp;Adotar essa abordagem nos deu mais autonomia no desenvolvimento e ajustes finos. Antes, só conseguíamos alterar hiperparâmetros dentro de um modelo único. Com a divisão em etapas, conseguimos treinar cada parte separadamente, testar variações específicas e, consequentemente, alcançar resultados mais precisos e controlados.

 As etapas da pipeline foram definidas da seguinte forma:

&emsp;As etapas da pipeline foram definidas da seguinte forma:

1. **Segmentação de fissuras** – Modelo utilizado: **YOLOv8m-Cracks**  
Responsável por identificar as regiões com fissuras dentro das imagens, gerando uma máscara de segmentação.

2. **Detecção de fissuras** – Modelo utilizado: **YOLOv8m**  
Responsável por localizar e delimitar as fissuras com base nas regiões segmentadas.

3. **Classificação das fissuras** – Modelo utilizado: **YOLOv8m-cls**  
Responsável por classificar as fissuras detectadas, se é de retração ou térmica.

&emsp;Essa divisão permitiu um foco mais específico em cada etapa do processo, melhorando a precisão geral do sistema e tornando o fluxo de desenvolvimento mais modular e eficiente.

## Desenvolvimento da Pipeline
&emsp;Com a definição da nossa abordagem em três etapas, iniciamos o desenvolvimento individual de cada modelo que compõe a pipeline. Por ser uma estrutura modular, tivemos mais liberdade para testar e ajustar os modelos separadamente, o que nos trouxe mais autonomia e controle sobre o desempenho geral.        
&emsp;Diferente do que acontecia nas sprints anteriores, onde só conseguíamos alterar alguns poucos hiperparâmetros de um único modelo integrado, agora foi possível fazer um trabalho mais aprofundado de análise e otimização em cada parte do fluxo.     
&emsp;Durante esse processo, percebemos que encontrar uma boa configuração de hiperparâmetros para os modelos não era simples. Cada etapa (segmentação, detecção e classificação) apresentava comportamentos diferentes e exigia parâmetros específicos. Por isso, optamos por utilizar a técnica de Grid Search, que nos permitiu testar de forma sistemática diversas combinações de parâmetros. Estudamos a documentação oficial da Ultralytics para entender melhor todas as opções disponíveis de configuração e, com isso, conseguimos melhorias significativas nos resultados de cada modelo.        
&emsp;Após o treinamento e ajuste de cada etapa, partimos para a integração da pipeline, garantindo que a saída de um modelo fosse adequadamente formatada e processada para ser utilizada como entrada na etapa seguinte. Essa integração permitiu que o sistema trabalhasse de forma sequencial e eficiente, aproveitando o melhor de cada modelo.


### Etapa 1: Segmentação de Fissuras (YOLOv8m-Cracks)

&emsp;A primeira etapa da pipeline ficou a cargo do modelo YOLOv8m-Cracks, que teve como objetivo gerar máscaras de segmentação, destacando os pixels correspondentes às regiões onde existem fissuras.             
&emsp;Durante o início da sprint, enfrentamos um contratempo importante, perdemos as imagens que havíamos anotado manualmente no MakeSense.ai para a tarefa de segmentação. Diante disso, buscamos uma solução rápida e viável para não comprometer o andamento do projeto.     
&emsp;Optamos por utilizar um dataset público da plataforma Roboflow, que já trazia as máscaras de segmentação prontas. Apesar de esse conjunto de dados apresentar características um pouco diferentes do nosso cenário real, ele foi essencial para garantir que conseguíssemos treinar o modelo de segmentação.      
&emsp;Logo nos primeiros testes com esse dataset, o desempenho foi satisfatório, o modelo demonstrou boa capacidade de identificar áreas com fissuras nas imagens. No entanto, conforme avançamos, percebemos que o modelo estava gerando múltiplas detecções sobre uma mesma região, ou seja, várias marcações sobre um único ponto da imagem. Essa duplicidade acabava impactando o desempenho das próximas etapas da pipeline.

&emsp;Essas limitações, tanto pela ausência de anotações personalizadas quanto pela diferença entre o dataset público e a realidade do projeto, foram motivos para que não conseguíssemos atingir um modelo ideal nesta sprint, porém será algo a ser trabalhado futuramente. 


&emsp;A seguir está um exemplo de uma imagem após passar pelo modelo de segmentação:

<p style={{textAlign: 'center'}}>Figura 1 - Resultado do Modelo de Segmentação</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/img-segmentada.jpeg").default} style={{width: 500}} alt="Resultado da etapa 1" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

&emsp;Durante essa etapa, enfrentamos um contratempo: estávamos desenvolvendo nosso próprio conjunto de máscaras com a ferramenta MakeSense.ai, mas por problemas técnicos, as anotações foram perdidas antes que pudéssemos salvá-las. Como alternativa, utilizamos um dataset público do Roboflow, que já trazia máscaras anotadas.       
&emsp;Esse novo dataset trouxe uma qualidade de imagem superior, porém apresentava fissuras com características visuais bem diferentes das imagens do nosso projeto. Essa diferença de domínio afetou o desempenho final da segmentação, impedindo que chegássemos no modelo ideal, mas ainda assim conseguimos observar um avanço claro em relação às versões anteriores, graças à nova abordagem e à otimização com Grid Search.


## Etapa 2: Detecção de Fissuras (YOLOv8m)

&emsp;A segunda etapa da pipeline foi a detecção das fissuras, utilizando o modelo YOLOv8m. Essa etapa teve como objetivo localizar as fissuras nas imagens segmentadas, criando caixas delimitadoras (bounding boxes) ao redor de cada fissura identificada.    
&emsp;Mesmo com algumas imperfeições trazidas pela segmentação, o modelo de detecção apresentou um desempenho bastante positivo. Ele conseguiu lidar bem com os excessos e pequenas falhas nas máscaras, mostrando robustez na tarefa de localizar com precisão as fissuras.           
&emsp;Esse resultado reforçou que a arquitetura em etapas foi uma decisão acertada, pois mesmo com entradas com algum ruído, o modelo de detecção foi capaz de fazer um bom refinamento das regiões de interesse.




## Etapa 3: Classificação das Fissuras (YOLOv8m-cls)

&emsp;Na terceira e última etapa da pipeline, utilizamos o YOLOv8m-cls, com a responsabilidade de classificar os tipos de fissuras detectadas. O modelo recebeu como entrada as regiões previamente localizadas e, a partir disso, realizou a classificação entre os dois tipos de fissura definidos no projeto: retração e térmica.               
&emsp;Mesmo considerando os desafios enfrentados nas etapas anteriores, o modelo de classificação obteve resultados bastante satisfatórios, conseguindo distinguir bem os diferentes tipos de fissura com um bom nível de acurácia.          
&emsp;Esse desempenho reforça novamente a eficácia da abordagem em pipeline. O fato de termos isolado cada tarefa (segmentar, detectar e classificar) permitiu que cada modelo focasse exclusivamente na sua função, sem a necessidade de compensar falhas das outras etapas.

&emsp;A seguir estão dois exemplos de classificação, um de fissura térmica e outro de fissura de retração: 


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
