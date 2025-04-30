---
sidebar_position: 2
custom_edit_url: null
---

# Requisitos Não Funcionais

## Conceito

&emsp;Os Requisitos não funcionais (RNFs) são as características de um sistema que não estão diretamente relacionadas às suas funções específicas, mas sim à sua qualidade e desempenho. Eles descrevem "como" o sistema deve realizar suas funções, em vez de "o que" o sistema deve fazer. Exemplos incluem desempenho, usabilidade, confiabilidade, segurança e escalabilidade.

| **Identificador** | **Requisito Funcional Associado** | **Descrição** | **Métrica** | **Método de Teste** |
|-------------------|-----------------------------------|---------------|-------------|---------------------|
| RNF01 | RF01 | O sistema deve identificar fissuras com acurácia mínima de 80%. | Acurácia ≥ 80% | Realizar um conjunto de testes com imagens de fissuras conhecidas, e comparar os resultados com a classificação manual.|
| RNF02 | RF03 | O sistema deve identificar e classificar as fissuras em até 10 segundos por imagem. | Tempo de processamento ≤ 10 segundos | Submeter ao sistema 50 imagens e medir o tempo total de processamento para cada imagem. O tempo total de processamento de cada imagem deve ser inferior ou igual a 10 segundos. Utilizar ferramentas de monitoramento de desempenho para capturar o tempo de processamento. |
| RNF03 | RF04 | O sistema deve armazenar o histórico de expedições por pelo menos 1 ano. | Armazenamento ≥ 1 ano | Realizar o teste de armazenamento de dados por um período superior a 1 ano, simulando uma expedição por dia. Verificar se o histórico está acessível após esse período e garantir que os dados não foram corrompidos ou apagados. |

<details class="ver-mais"> 
  <summary>:mag: Ver mais requisitos</summary> 
| **Identificador** | **Requisito Funcional Associado** | **Descrição** | **Métrica** | **Método de Teste** |
|-------------------|-----------------------------------|---------------|-------------|---------------------|
| RNF04 | RF03 | O tempo de delay entre a imagem real e a recebida pelo computador deve ser inferior a 5 segundos.| Tempo de delay ≤ 5 segundos | É preciso medir em segundos o tempo de atualização da imagem, uma maneira de fazer isso é iniciar um timer em qualquer dispositivo eletrônico, rodar o drone 90º e medir a diferença de tempo entre o fim da movimentação real do drone e a apresentada na tela. |
| RNF05 | RF03 | Quando o usuário realizar o upload de arquivos para identificação e classificação de fissuras, o sistema deve permitir que o processo completo seja concluído com no máximo 3 cliques a partir da tela inicial. | Cliques até o upload de arquivos ≤ 3 | A partir da tela inicial, será realizado o upload de uma imagem de teste. Durante o processo, será contabilizada a quantidade de cliques necessários para acessar a tela de upload, selecionar o arquivo e confirmar o envio. 


</details> 
 
### RNF01 – O sistema deve identificar fissuras com acurácia mínima de 80%.

&nbsp;&nbsp;&nbsp;&nbsp;Este requisito busca garantir que o modelo de visão computacional tenha um desempenho aceitável. A acurácia mínima estabelecida é de 80%, o que significa que, ao ser submetido a um conjunto de imagens de fissuras conhecidas, o sistema deve produzir resultados que coincidam com a classificação manual em pelo menos 80% dos casos.

### RNF02 – O sistema deve identificar e classificar as fissuras em até 10 segundos por imagem.

&nbsp;&nbsp;&nbsp;&nbsp;O tempo de resposta do sistema é um aspecto importante da experiência do usuário. Este requisito define que o processamento de cada imagem, desde o upload até a exibição do resultado da classificação, não deve ultrapassar 10 segundos. A métrica será verificada por meio de testes com lotes de imagens e ferramentas de monitoramento de desempenho.

### RNF03 – O sistema deve armazenar o histórico de expedições por pelo menos 1 ano.

&nbsp;&nbsp;&nbsp;&nbsp;Para manter a rastreabilidade e permitir consultas posteriores, o sistema deve manter o histórico de expedições por um período mínimo de um ano. Essa retenção deve assegurar a integridade dos dados, permitindo ao usuário recuperar registros antigos sem perdas ou falhas.

### RNF04 – O tempo de delay entre a imagem real e a recebida pelo computador deve ser inferior a 5 segundos.

&nbsp;&nbsp;&nbsp;&nbsp;Nos casos em que a captura da imagem depende de um dispositivo externo, como um drone, este requisito define que o tempo de atraso entre a movimentação real do equipamento e a exibição da imagem na tela não deve ultrapassar 5 segundos. A medição será feita comparando o tempo da ação com o tempo de sua visualização no sistema.

### RNF05 – O sistema deve permitir que o upload de arquivos seja concluído com no máximo 3 cliques a partir da tela inicial.

&nbsp;&nbsp;&nbsp;&nbsp;A interface do sistema deve possibilitar ao usuário realizar o upload de uma imagem de forma simples e direta. Este requisito estabelece um limite de até três cliques para acessar a tela de upload, selecionar um arquivo e confirmar o envio, sem que haja recarregamentos ou navegação desnecessária.


## Conclusão
&nbsp;&nbsp;&nbsp;&nbsp;Os Requisitos Não Funcionais definidos visam estabelecer parâmetros claros de desempenho, usabilidade, armazenamento e tempo de resposta do sistema. Cada requisito está associado a uma métrica e a um método de teste, o que permite validar se o comportamento do sistema está de acordo com o esperado. Com isso, busca-se garantir que o sistema opere de forma adequada às necessidades identificadas, sem focar apenas nas funcionalidades principais.

#### Referências:

1. WIKIPÉDIA. Requisito não funcional. Disponível em: https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional. Acesso em: 28 abr. 2025.