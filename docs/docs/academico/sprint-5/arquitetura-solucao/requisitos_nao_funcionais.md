---
sidebar_position: 4
custom_edit_url: null
title: "Requisitos Não Funcionais"
---

# Requisitos Não Funcionais

## Introdução

&emsp;Os requisitos não funcionais tratam do **desempenho, confiabilidade, usabilidade e eficiência** do sistema. Diferente dos requisitos funcionais, que dizem respeito ao que o sistema faz, os não funcionais definem **como** essas funcionalidades devem se comportar, garantindo qualidade na entrega ao usuário. Abaixo, apresentamos os requisitos não funcionais definidos na fase inicial do projeto, juntamente com o resultado de sua avaliação durante os testes da Sprint 5.

## Tabela de Requisitos

| Código | Descrição                                                                                   | Requisito Associado | Métrica                  | Status na Sprint 5       | Observações                                                                      |
|--------|-----------------------------------------------------------------------------------------------|----------------------|--------------------------|---------------------------|-----------------------------------------------------------------------------------|
| RNF01  | O sistema deve identificar fissuras com acurácia mínima de 80%.                             | RF01                 | Acurácia ≥ 80%           | Parcialmente Atendido     | Acurácia entre 65% e 78% nos testes; precisa de melhoria.                        |
| RNF02  | O sistema deve processar cada imagem em até 10 segundos.                                    | RF03                 | Tempo ≤ 10s              | Parcialmente Atendido     | A maioria foi rápida, mas houve picos de lentidão com muitos arquivos.          |
| RNF03  | O sistema deve armazenar o histórico por pelo menos 1 ano.                                  | RF04                 | Retenção ≥ 1 ano         | Atendido                  | Simulações confirmam consistência e integridade dos dados antigos.              |
| RNF04  | O delay entre imagem real e visualização deve ser inferior a 5 segundos.                    | RF03                 | Delay ≤ 5s               | Atendido                  | Delay médio entre 2 e 3 segundos com drone.                                      |
| RNF05  | O processo de upload deve ser concluído com até 3 cliques.                                  | RF02                 | Cliques ≤ 3              | Atendido                  | Upload realizado com 2–3 cliques; fluxo considerado simples pelos usuários.     |

## Análise

&emsp;Os testes demonstraram que o sistema apresenta **ótimos resultados em termos de usabilidade e tempo de resposta**, especialmente no que diz respeito ao fluxo de upload e tempo de exibição da imagem do drone. O histórico de expedições também mostrou estar bem implementado, com garantia de integridade dos dados mesmo em simulações de longo prazo.

&emsp;Por outro lado, os dois requisitos mais exigentes — acurácia do modelo e tempo de processamento por imagem — **ainda não atingiram plenamente os níveis esperados**, embora tenham apresentado bons resultados gerais. Com ajustes e otimizações técnicas, ambos têm alto potencial de cumprimento total em breve.

&emsp;Assim, os requisitos não funcionais validam que o sistema já é confiável e eficiente na maior parte de sua operação, com foco futuro em **refinar a performance do modelo de IA e garantir consistência sob alta demanda**.
