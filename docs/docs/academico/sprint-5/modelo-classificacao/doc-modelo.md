---
sidebar_position: 1  
custom_edit_url: null  
---

# Classificação de Fissuras com Visão Computacional

### Objetivo Geral

&emsp;O objetivo deste projeto foi desenvolver uma solução baseada em visão computacional para identificar, localizar e classificar fissuras em fachadas. O foco foi construir um sistema modular e escalável, com possibilidade de integração a drones para inspeções automatizadas em edificações. Durante o desenvolvimento, percorremos etapas de pesquisa, testes e implementação, buscando um modelo funcional e adequado às necessidades do setor da construção civil.


### Estratégia Técnica

&emsp;A arquitetura do sistema foi organizada em uma **pipeline de três etapas**, com modelos independentes para **segmentação**, **detecção** e **classificação** de fissuras. Essa divisão permitiu ajustes mais específicos em cada componente, facilitando diagnósticos e modificações conforme necessário. Além disso, a modularidade também favoreceu a adaptação do sistema a mudanças futuras, como substituição de modelos ou ajustes de parâmetros.

#### As etapas foram estruturadas da seguinte forma:

1. **Segmentação de Fissuras** – *YOLOv8m-Cracks*  
   Geração de máscaras para delimitar áreas com fissuras nas imagens.

2. **Detecção de Fissuras** – *YOLOv8m*  
   Localização das fissuras nas regiões segmentadas por meio de bounding boxes.

3. **Classificação das Fissuras** – *YOLOv8m-cls*  
   Classificação das fissuras detectadas nos tipos: **retratação** e **térmica**.


### Desenvolvimento e Aprendizados

#### 1. Segmentação

&emsp;O modelo de segmentação foi treinado com um dataset público da plataforma Roboflow, utilizado após a perda das anotações manuais feitas via MakeSense.ai. Apesar de que as imagens não representassem completamente o contexto específico do projeto, o modelo foi capaz de identificar fissuras com consistência visual. É importante mencionar que um desafio encontrado foi a **superposição de máscaras**, o que impactou a etapa de detecção. Além disso, a falta de dados próprios dificultou uma maior generalização, reforçando a importância da curadoria de dados.

#### 2. Detecção

&emsp;A etapa de detecção obteve resultados razoáveis, mesmo com inconsistências na segmentação. O modelo conseguiu localizar as fissuras com boa precisão, demonstrando que a separação da tarefa em etapas contribuiu para o desempenho geral.  

#### 3. Classificação

&emsp;A etapa final apresentou métricas estáveis de acurácia. O modelo feito foi capaz de distinguir os dois tipos de fissuras definidos no escopo do projeto, e a divisão do pipeline em tarefas específicas contribuiu para distribuir a complexidade entre modelos distintos.


### Processos de Otimização

&emsp;Nosso grupo utilizou o **Grid Search** como técnica para ajuste de hiperparâmetros em cada etapa, esse processo permitiu testar combinações e selecionar aquelas com melhor desempenho nos conjuntos de validação.  Alḿ disso, a documentação da Ultralytics foi utilizada como referência para aprofundar o uso da arquitetura YOLOv8.


### Considerações Finais

&emsp;O projeto evidenciou a viabilidade de uma abordagem modular para o diagnóstico automatizado de fissuras em fachadas. Apesar de limitações como a perda de dados anotados e a ausência de imagens realistas, foi possível construir uma pipeline funcional, com desempenho consistente e possibilidade de aprimoramento. O modelo está preparado para futuras integrações com drones e interfaces web.