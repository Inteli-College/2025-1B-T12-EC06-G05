---
sidebar_position: 1
custom_edit_url: null
---

# Requisitos Funcionais

## Conceito

&emsp;De forma simplificada, os requisitos funcionais descrevem as ações específicas que um sistema ou aplicativo deve ser capaz de executar. Eles são as capacidades concretas e as operações que o software deve realizar para atender às necessidades e expectativas do usuário. (MIRANDA, 2024).

| RF#  | Descrição | Classificação | 
|------|-----------|------------------| 
| RF01 | O sistema deve identificar e classificar as fissuras. | Essencial | 
| RF02 | O sistema deve permitir o upload de arquivos para a identificação e classificação. | Essencial | 
| RF03 | O sistema deve fazer análise das imagens de forma síncrona. | Desejável | 
<details class="ver-mais"> 
  <summary>:mag: Ver mais requisitos</summary> 
| RF#  | Descrição | Regra de Negócio | 
|------|-----------|------------------| 
| RF04 | O sistema deve guardar o histórico de todas as expedições. | Essencial | 
| RF05 | O sistema deve mostrar as estatísticas sobre as expedições. | Importante | 
| RF06 | O sistema deve relacionar as fissuras detectadas com suas possíveis causas. | Desejável | 
| RF07 | O sistema deve identificar a espessura da fissura. | Desejável | 
| RF08 | O sistema deve ter um mecanismo de login | Importante | 
</details> 
 
### RF01 - O sistema deve identificar e classificar as fissuras.

&nbsp;&nbsp;&nbsp;&nbsp;O sistema deve incorporar um modelo de visão computacional capaz de identificar e classificar fissuras em imagens de revestimentos de fachadas de forma precisa. Esta é uma das funcionalidades mais importantes da solução, pois garante a detecção automática, substituindo o processo manual atualmente realizado.

### RF02 - O sistema deve permitir o upload de arquivos para a identificação e classificação.

&nbsp;&nbsp;&nbsp;&nbsp;Para viabilizar a classificação automática, o sistema deve permitir que o usuário faça o upload de arquivos de imagem. Após o envio, as imagens devem ser processadas corretamente, garantindo que estejam no formato e na qualidade exigidos pelo modelo de visão computacional. Dessa forma, asseguramos que o sistema consiga identificar e classificar as fissuras de maneira precisa e eficiente.

### RF03 - O sistema deve fazer análise das imagens de forma síncrona.

&nbsp;&nbsp;&nbsp;&nbsp;Além do envio, a análise das imagens deve ocorrer de forma síncrona, garantindo que o processamento aconteça imediatamente após o upload. O fluxo de captura, classificação, armazenamento no banco de dados e exposição dos resultados ao usuário deve ocorrer de maneira automatizada, assegurando rapidez e continuidade na experiência de uso.

### RF04 - O sistema deve guardar o histórico de todas as expedições.

&nbsp;&nbsp;&nbsp;&nbsp;Após a conclusão de uma expedição, em que o cliente realiza a captura e classificação das fissuras, todas as imagens geradas devem ser armazenadas no banco de dados do sistema. Além disso, essas informações devem estar disponíveis na interface, permitindo que o cliente acesse e consulte o histórico de expedições a qualquer momento de forma prática e organizada.

### RF05 - O sistema deve mostrar as estatísticas sobre as expedições.

&nbsp;&nbsp;&nbsp;&nbsp;Atendendo a uma demanda do cliente, o sistema deve disponibilizar estatísticas que apresentem informações-chave sobre as expedições realizadas. Entre os dados exibidos, devem constar, por exemplo, o tipo de fissura mais frequentemente classificado nas imagens. Dessa forma, o cliente poderá ter uma visão analítica e rápida sobre os resultados obtidos em campo.

### RF06 - O sistema deve relacionar as fissuras detectadas com suas possíveis causas.

&nbsp;&nbsp;&nbsp;&nbsp;Apesar de ter sido classificado como um requisito desejável, este item representa uma evolução importante da solução. Atualmente, estamos na Sprint 1 e ainda não recebemos a tabela de banco de dados necessária para o treinamento dos modelos. Caso essa tabela contenha informações que caracterizem as possíveis causas das fissuras, ou ainda, caso recebamos algum arquivo complementar que descreva as principais causas associadas a cada tipo de fissura, o sistema deverá utilizar esses dados para mapear automaticamente a origem provável das manifestações. Essas informações deverão ser exibidas de forma clara na interface para consulta dos usuários.

### RF07 - O sistema deve identificar a espessura da fissura.

&nbsp;&nbsp;&nbsp;&nbsp;Este é um requisito funcional desejável, que poderá ser implementado conforme a viabilidade técnica do projeto. A ideia é que o sistema utilize técnicas de análise de escala matemática para estimar a medida da espessura das fissuras presentes nas imagens capturadas. Caso essa abordagem se mostre viável, será possível enriquecer ainda mais o diagnóstico automatizado, oferecendo informações adicionais relevantes para a avaliação das manifestações patológicas.

### RF08 - O sistema deve ter um mecanismo de login

&nbsp;&nbsp;&nbsp;&nbsp;O sistema deve contar com um mecanismo de login para controle de acesso. Essa funcionalidade é fundamental para garantir a criação e a gestão de usuários, bem como a segurança e a rastreabilidade das alterações realizadas. Por meio do login, apenas pessoas autorizadas poderão acessar a plataforma, e todas as modificações feitas no sistema serão vinculadas ao usuário responsável, permitindo a identificação e auditoria das ações.

## Conclusão
&nbsp;&nbsp;&nbsp;&nbsp;A definição clara dos requisitos funcionais é essencial para guiar o desenvolvimento da solução, assegurando que todas as funcionalidades críticas, importantes e desejáveis sejam atendidas conforme as necessidades do cliente. Com isso, o projeto estabelece uma base sólida para a construção de um sistema eficiente, confiável e alinhado às expectativas dos usuários finais.

---

#### Referências:

MIRANDA, Luiz. QUERO BOLSA. Requisitos funcionais e não funcionais: o que são, diferenças e exemplos, 27 jan. 2024. Disponível em: https://querobolsa.com.br/revista/requisitos-funcionais-e-nao-funcionais. Acesso em: 26 abr. 2025.
