---
sidebar_position: 1
custom_edit_url: null
---

# Documentação Final do Projeto  
## Classificação de Fissuras em Alvenaria com Visão Computacional

### Objetivo Geral

&emsp;O objetivo deste projeto foi desenvolver uma solução baseada em visão computacional para identificar, localizar e classificar fissuras em estruturas de alvenaria. Nosso foco foi construir um sistema robusto, modular e escalável, capaz de ser integrado a drones para inspeções automatizadas em edificações.  
&emsp;Ao longo do projeto, percorremos diversas etapas de pesquisa, experimentação e implementação, com o intuito de alcançar um modelo confiável e compatível com as demandas reais do setor da construção civil.

---

### Estratégia Técnica

&emsp;A arquitetura do sistema foi estruturada em uma **pipeline de três etapas**, composta por modelos independentes para **segmentação**, **detecção** e **classificação** de fissuras. Essa divisão estratégica permitiu uma maior flexibilidade nos ajustes de hiperparâmetros, facilitando diagnósticos e melhorias pontuais em cada parte do processo.  
&emsp;Além disso, a modularidade favoreceu a escalabilidade do projeto, permitindo substituições ou melhorias futuras sem comprometer o restante da solução.

#### As etapas foram organizadas da seguinte forma:

1. **Segmentação de Fissuras** – *YOLOv8m-Cracks*  
   Geração de máscaras de segmentação para delimitar áreas com fissuras na imagem.

2. **Detecção de Fissuras** – *YOLOv8m*  
   Localização precisa das fissuras nas regiões segmentadas, por meio de bounding boxes.

3. **Classificação das Fissuras** – *YOLOv8m-cls*  
   Classificação das fissuras detectadas em dois tipos: **retratação** e **térmica**.

---

### Desenvolvimento e Aprendizados

#### 1. Segmentação

&emsp;O modelo de segmentação foi treinado com um dataset público da plataforma Roboflow, utilizado como alternativa após a perda das anotações manuais feitas via MakeSense.ai.  
&emsp;Embora o domínio das imagens não refletisse fielmente o contexto real do nosso projeto, o modelo apresentou resultados satisfatórios, identificando fissuras com consistência visual.  
&emsp;Um desafio recorrente foi a **superposição de máscaras** sobre a mesma fissura, o que impactou a etapa seguinte. A ausência de dados próprios limitou o desempenho ideal, mas a experiência evidenciou a importância da curadoria de dados para a generalização do modelo.

#### 2. Detecção

&emsp;A etapa de detecção demonstrou bom desempenho mesmo com as inconsistências herdadas da segmentação. O modelo conseguiu refinar e localizar as fissuras com boa precisão, validando a eficácia da abordagem em camadas.  
&emsp;Esse resultado mostrou que a estratégia de dividir a tarefa em módulos independentes foi uma decisão acertada, permitindo que o sistema contornasse imperfeições anteriores.

#### 3. Classificação

&emsp;A etapa final de classificação foi a que apresentou **melhores métricas de acurácia**, mesmo considerando os ruídos anteriores.  
&emsp;O modelo foi capaz de diferenciar de forma consistente os dois tipos de fissura definidos no escopo do projeto. Essa robustez reforça o valor de separar o pipeline em tarefas especializadas, diminuindo o risco de sobrecarga de um único modelo.

---

### Processos de Otimização

&emsp;Um dos principais recursos utilizados ao longo do projeto foi a técnica de **Grid Search**, aplicada para encontrar os melhores hiperparâmetros em cada modelo. A abordagem sistemática de testes elevou a qualidade dos resultados, especialmente nas etapas de segmentação e classificação.  
&emsp;O estudo aprofundado da documentação da Ultralytics também foi essencial para explorarmos todo o potencial da arquitetura YOLOv8.

---

### Considerações Finais

&emsp;O projeto demonstrou a viabilidade de uma abordagem modular para o diagnóstico automatizado de fissuras em alvenaria. Mesmo com desafios como a perda de anotações personalizadas e a limitação de dados realistas, conseguimos entregar uma pipeline funcional, com bons resultados de desempenho e clara margem para aprimoramento.  
&emsp;A estrutura desenvolvida já se mostra pronta para futuras integrações com sistemas de drones e interfaces web, ampliando sua aplicabilidade em cenários reais.  
&emsp;Mais do que uma entrega técnica, o projeto proporcionou aprendizados importantes em engenharia de dados, adaptação de modelos pré-treinados e organização de fluxos complexos em visão computacional.  
&emsp;Com os conhecimentos adquiridos e os resultados alcançados, estamos confiantes de que esta solução representa um passo promissor rumo à modernização dos métodos de inspeção predial.
