---
sidebar_position: 1
custom_edit_url: null
---

# Testes

## Introdução 

&emsp;Um sistema que não consegue executar suas principais operações dificilmente pode ser considerado eficiente. Por outro lado, um sistema que realiza perfeitamente suas funções, mas falha ao se comunicar com o usuário, também deixa de oferecer o seu melhor. Em projetos como o atual, em que existem muitas funções e tarefas que impactam diretamente a vida do funcionário do IPT,  precisamos garantir que não existam falhas de nenhum desses dois tipos: nem funcionais, nem na experiência do usuário <br/>
&emsp;Uma das maneiras mais eficazes de fazer isso é por meio dos testes com usuários. Eles nos ajudam a validar se as funcionalidades implementadas estão de fato atendendo aos requisitos definidos. Testar não é apenas identificar erros, mas também confirmar se o sistema está alinhado às expectativas dos usuários, tanto em termos técnicos quanto de usabilidade. <br/>
&emsp; Nesta seção, apresentamos os roteiros de testes baseados nos requisitos funcionais e não funcionais, assim como os critérios utilizados para sua validação. Essa abordagem nos permite garantir maior controle de qualidade, promovendo uma entrega final mais consistente, relevante e sustentável ao IPT.<br/>

---

## Requisitos

&emsp;Para garantir que todos os aspectos sejam analisados com clareza, baseamo-nos em dois tipos principais de requisitos: os funcionais e os não funcionais. Nós já conversamos sobre eles lá na sprint 1. Ambos serão fundamentais para a qualidade da entrega final. Os requisitos funcionais asseguram que o sistema cumpra seus propósitos principais, enquanto os não funcionais garantem que isso seja feito de forma eficiente, intuitiva e estável. A seguir, apresentamos as tabelas elaboradas na primeira sprint, mas agora acompanhadas de seus critérios de aceitação e métodos de verificação, que serão importantes para debatermos os testes a serem feitos.

### Requisitos Funcionais

&emsp;Na primeira sprint deste módulo, definimos um conjunto de requisitos funcionais fundamentais para garantir que as funcionalidades básicas do projeto fossem devidamente testadas e avaliadas. Esses requisitos precisam ser cuidadosamente revisados e validados, para proporcionar uma experiência de usuário satisfatória.

| RF#  | Descrição | Classificação | Casos de Teste | Critérios de Aceitação |
|------|-----------|---------------|----------------|-----------------------|
| RF01 | O sistema deve identificar e classificar as fissuras. | Essencial | Testar upload de imagens com fissuras; validar se o sistema identifica e classifica corretamente. | O sistema identifica e classifica corretamente as fissuras em 60% das imagens testadas. |
| RF02 | O sistema deve permitir o upload de arquivos para a identificação e classificação. | Essencial | Testar upload de arquivos em formatos permitidos; verificar rejeição de formatos inválidos. | O sistema aceita arquivos nos formatos suportados e rejeita formatos inválidos com mensagem clara. |
| RF03 | O sistema deve fazer análise das imagens de forma síncrona. | Desejável | Testar se a análise inicia imediatamente após o upload e retorna resultado sem atraso. | A análise da imagem inicia automaticamente após o upload e o resultado é exibido em até 5 segundos. |
| RF04 | O sistema deve guardar o histórico de todas as expedições. | Essencial | Realizar várias expedições e verificar se todas ficam disponíveis no histórico do usuário. | Todas as expedições ficam registradas e acessíveis para o usuário em sua área de histórico. |
| RF05 | O sistema deve mostrar as estatísticas sobre as expedições. | Importante | Consultar a área de estatísticas e validar exibição correta dos dados agregados. | Estatísticas são exibidas corretamente com dados atualizados e relevantes para o usuário. |
| RF06 | O sistema deve relacionar as fissuras detectadas com suas possíveis causas. | Desejável | Verificar se o sistema apresenta causas possíveis para fissuras detectadas, quando base disponível. | O sistema apresenta possíveis causas para fissuras sempre que os dados associados estiverem disponíveis. |
| RF07 | O sistema deve identificar a espessura da fissura. | Desejável | Testar análise das imagens para estimar espessura e validar se valores são coerentes. | O sistema estima a espessura das fissuras com margem de erro inferior a 10%. |
| RF08 | O sistema deve ter um mecanismo de login | Importante | Testar criação de usuários, login válido, bloqueio para usuários não autorizados. | Apenas usuários cadastrados conseguem acessar o sistema, com autenticação segura e controle de sessão. |


&emsp;Esses requisitos funcionais são importantes para garantir que nenhuma funcionalidade vital do sistema seja negligenciada ou apresente falhas. O principal objetivo dos nossos testes é assegurar que todos esses recursos estejam contemplados de forma eficaz, respeitando também as métricas de qualidade previamente definidas. Como muitos desses requisitos são verificados de maneira indireta durante o uso do sistema, o roteiro de testes foi cuidadosamente planejado para garantir que cada um deles fosse avaliado, ainda que de forma não explícita.  

### Requisitos Não Funcionais

&emsp;Assim como os requisitos funcionais, os requisitos não funcionais também foram definidos ainda na primeira sprint, com base na visão inicial do projeto. Diferente dos funcionais, que descrevem o que o sistema deve fazer, os requisitos não funcionais estabelecem como o sistema deve se comportar, por exemplo, em termos de desempenho, usabilidade, segurança e confiabilidade. Eles são igualmente importantes, pois ajudam a garantir que as funcionalidades implementadas operem com qualidade e dentro dos padrões esperados, permitindo inclusive a mensuração da eficiência do sistema em alguns aspectos.

| **Identificador** | **Requisito Funcional Associado** | **Descrição** | **Métrica** | **Critério de Aceitação** | **Caso de Teste** |
|-------------------|-----------------------------------|---------------|-------------|----------------------------|-------------------|
| RNF01 | RF01 | O sistema deve identificar fissuras com acurácia mínima de 80%. | Acurácia ≥ 80% | O modelo de IA deve acertar pelo menos 8 em cada 10 fissuras classificadas corretamente. | Submeter 100 imagens com classificação conhecida e validar se o modelo acerta no mínimo 80. |
| RNF02 | RF03 | O sistema deve identificar e classificar as fissuras em até 10 segundos por imagem. | Tempo de processamento ≤ 10s | Nenhuma imagem deve ultrapassar 10 segundos no processamento. | Enviar 50 imagens sequenciais e medir o tempo individual de processamento de cada uma. |
| RNF03 | RF04 | O sistema deve armazenar o histórico de expedições por pelo menos 1 ano. | Armazenamento ≥ 1 ano | Registros de 1 ano devem estar acessíveis e íntegros. | Simular expedições com datas futuras e verificar recuperação e consistência dos dados. |
| RNF04 | RF03 | O tempo de delay entre a imagem real e a exibida no sistema deve ser inferior a 5 segundos. | Delay ≤ 5s | O atraso entre imagem capturada e exibida deve ser < 5s. | Fazer movimento físico com drone e cronometrar a diferença entre ação e exibição. |
| RNF05 | RF02 | O processo completo de upload deve ser concluído com no máximo 3 cliques. | Cliques ≤ 3 | A partir da tela inicial, o usuário deve concluir o upload com até 3 interações. | Contabilizar cliques desde a tela inicial até a confirmação de envio da imagem de teste. |

---

&emsp;Podemos nos guiar através de ambos os requisitos, sejam eles funcionais ou não funcionais. Mas os testes com usuários devem ir ainda além disso. Esses testes são importantes, pois nos ajudarão a identificar erros no sistema, UX ou erros de integração. Por estarmos trabalhando todos os dias no projeto, temos uma tendência maior a entender o que se passa no sistema, o que não necessariamente acontece com os usuários. <br/>
&emsp;Durante a sprint review da terceira sprint, tivemos uma breve experiência de teste com um dos representantes do IPT. Logo de cara, notamos que algumas nomenclaturas não estavam suficientemente claras para ele. Mesmo sem termos uma rotina de testes estabelecida, recebemos uma dica importante sobre nossa UX, sem que ele sequer percebesse. Nosso intuito é aprofundar ainda mais esse tipo de avaliação e aproveitar a sprint 5 para refinar eventuais problemas que os usuários encontrem em nossa interface.

---

## O que deve ser analisado?

&emsp;Agora que já definimos nossos requisitos e temos uma experiência prévia com usuários, conseguimos identificar com mais clareza os pontos que merecem atenção. Cada vez que o usuário realiza uma inserção no sistema, ele preenche um novo formulário e um dos nossos principais desafios foi justamente tornar esse processo simples e intuitivo. Sabemos, portanto, que devemos observar atentamente a usabilidade desses formulários.<br/>
&emsp;Outro aspecto importante é o fluxo de navegação. O sistema possui uma lógica sequencial, quase como uma cadeia, onde cada processo depende do anterior. Por isso, o caminho que o usuário percorre precisa ser muito bem definido e de fácil compreensão. Também temos uma variedade de ícones na interface, cujos significados partem do pressuposto de que são amplamente reconhecidos. Durante os testes, queremos observar como os usuários interpretam esses ícones e se suas ações condizem com o que esperávamos. <br/>
&emsp;Há, ainda, um componente fundamental do nosso sistema que vai além da interface web: o computador de bordo. Essa ferramenta será utilizada diretamente em campo pelos pesquisadores, e precisa ser clara, confiável e resistente a falhas. Qualquer gargalo nesse sistema pode comprometer uma expedição inteira e gerar prejuízos ao IPT. Imagine, por exemplo, se fosse necessário refazer uma expedição apenas por causa de um erro de interface ou operação.
&emsp;Por isso, além de observar se o computador de bordo é intuitivo, queremos acompanhar de perto o fluxo de uso desse sistema específico, entendendo como os usuários interagem com ele e identificando oportunidades de torná-lo ainda mais robusto e fácil de usar.

---

## Roteiro de Testes
&emsp;Os cenários de teste foram elaborados com base nos requisitos funcionais e não funcionais definidos anteriormente, buscando garantir que cada aspecto essencial do sistema seja devidamente validado durante a Sprint 5.

### RachadoresWeb - Front(Site)

#### Cenário 1 - Cadastro de Usuário

**Objetivo:** Avaliar se o usuário consegue realizar o cadastro com facilidade, compreendendo os campos e o fluxo da tela.

- **Preenchimento do Formulário:** Verificar se o usuário entende o que deve ser preenchido em cada campo (nome, email, senha, cargo) e consegue concluir o cadastro com sucesso.

- **Compreensão do Campo “Cargo”:** Observar se o usuário entende o propósito do campo e consegue selecionar uma opção sem confusão.

- **Feedback Visual de Sucesso:** Avaliar se o modal de sucesso é compreensível e se o botão "Ir para login" direciona corretamente o usuário.


#### Cenário 2 - Login 

**Objetivo:** Permitir que o usuário entre na sua conta usando email e senha, ou navegue para a página de cadastro caso ainda não tenha conta.

- **Navegar para Cadastro:** Testar se o usuário identifica o link “Não tem uma conta? Faça cadastro aqui.” e se o clique leva para a tela de cadastro corretamente.

- **Preenchimento dos Campos Email e Senha:** Verificar se o usuário entende o que deve ser preenchido nos campos de email e senha, e se consegue inserir os dados corretamente.

- **Realizar Login com Credenciais Válidas:** Testar se o usuário consegue clicar no botão “Fazer login” e ser redirecionado para a página principal sem problemas.

#### Cenário 3 - Tela Home (Expedições e Criar Expedições)

**Objetivo:** Avaliar a experiência do usuário ao visualizar, filtrar e criar expedições na tela principal, garantindo clareza, fluidez no fluxo e feedback adequados tanto no listagem quanto no modal de criação.

- **Filtrar expedições por nome e data:** Observar se os campos de busca são percebidos como filtros, se o usuário consegue digitar nos campos, e se a lista é atualizada conforme preenchimento.

- **Criar nova expedição (abrir modal):** Verificar se o usuário identifica e clica no botão "+", e se o modal para cadastrar expedição é exibido.

- **Interagir com o modal – preencher formulário:** Testar se o usuário entende os campos (nome, descrição, data, localização e upload de foto), consegue inserir dados e selecionar imagem.

- **Submeter nova expedição no modal:** Checar se o botão "Criar expedição" só ativa quando os campos obrigatórios estiverem preenchidos e se, ao clicar, o modal fecha e a expedição aparece na lista.

- **Acessar detalhes da expedição criada:** Observar se, ao clicar no card da expedição, o usuário é redirecionado para a página de detalhes sem dificuldades.


#### Cenário 4 - Tela de Prédios (Criar Novo Prédio e Acessar um Prédio já Existente)

**Objetivo:** Garantir que a interface da tela de prédios e o modal de cadastro sejam funcionais, intuitivos e acessíveis, proporcionando uma experiência fluida e sem erros para o usuário.

- **Visualização da tela de prédios:** Verificar se a tela de prédios carrega corretamente com todos os elementos visuais.

- **Interação com botão de adicionar prédio:** Verificar se o modal de cadastro abre corretamente e se o preenchimento dos dados é claro para o usuário. Além disso, também verificar se o usuário compreende onde deve fazer o upload de imagens.

- **Entrada em um dos prédios criados pelo usuário:** Verificar se após criar o prédio, o usuário consegue acessar o prédio criado por ele sem maiores dificuldades. 

#### Cenário 5 - Análise de Fissuras

**Objetivo:** Garantir que a página de análise de fissuras carregue corretamente os dados, exiba as métricas, imagens e gráficos, e permita navegação e interações sem erros.

- **Visualização e carregamento das imagens de fissuras:** Verificar se as imagens relacionadas ao prédio são carregadas e exibidas no grid.

- **Teste de upload e seleção de direção:** Validar se o upload das imagens funciona e se a seleção de direção está correta.

- **Teste de drag & drop para alterar categoria da fissura:** Verificar a funcionalidade de arrastar uma fissura de uma categoria para outra.

---

### Computador de Bordo 

#### Cenário 1 - Login 

**Objetivo:** Avaliar se o usuário consegue acessar o sistema inserindo seu ID, entender o campo, e navegar corretamente para a próxima etapa após o login.

- **Realizar login com ID válido:** Testar se, após inserir um ID válido, o usuário consegue clicar no botão “Entrar” e ser levado para a próxima página da aplicação.

#### Cenário 2 - Tela Inicial (Criar e Listar Expedições)

**Objetivo:** Avaliar se o usuário consegue criar uma nova expedição, visualizar expedições existentes e executar o upload e publicação das imagens com sucesso.

- **Criar nova expedição:** Testar se o usuário entende e preenche corretamente os campos “Nome da Expedição”, “Localização”, “Descrição” e opcionalmente envia uma foto de capa.

- **Abrir expedição:** Testar se ao clicar no botão “Abrir [nome da expedição]” o usuário é redirecionado para a página da expedição correta.

- **Realizar upload e publicação:** Validar se o botão “📤 Subir imagens” aparece na tela inicial quando nenhuma expedição está aberta, e se ao clicar nele as imagens são enviadas para S3, autenticando no serviço, publicando via API, e exibindo mensagens de erro ou sucesso conforme necessário.

#### Cenário 3 - Tela de Inspeção (Expedição)

**Objetivo:** Avaliar se o usuário consegue visualizar e entender as informações da expedição, acessar prédios existentes, e adicionar novos prédios com sucesso.

- **Listar prédios existentes:** Avaliar se a lista de prédios dentro da expedição aparece ordenada e se o botão “Abrir [nome do prédio]” leva para a página correta.

- **Adicionar novo prédio:** Testar se o usuário consegue preencher os campos Nome do Prédio, Complemento, Descrição, e enviar uma foto de fachada opcional.

#### Cenário 4 -  Tela do Prédio

**Objetivo:** Garantir que o usuário consiga navegar pelas informações do prédio, visualizar vídeo do drone, capturar fotos, gerenciar sentido e andar, e rodar o modelo de detecção de fissuras de forma intuitiva e sem erros.

- **Adicionar um novo prédio:** Testar se o usuário sente dificuldades em criar um novo prédio. 

- **Captura de foto:** Confirmar que ao clicar, a foto é salva com nome contendo sentido, andar e timestamp. Uma mensagem de sucesso deve ser exibida logo após.

- **Execução do modelo de detecção:** Testar se o botão “Rodar Modelo” inicia o processamento, exibindo um spinner, e que ao final a tela atualiza mostrando que o modelo rodou, ou um erro aparece caso o arquivo do modelo não exista.

#### Cenário 5 - Tela de Resultados do Modelo 

**Objetivo:** Verificar se o usuário consegue visualizar os resultados da detecção de rachaduras, navegar entre prédios e entender a quantidade e imagens das rachaduras detectadas.

- **Compreensão pelo usuário:** O usuário deve compreender que o modelo foi executado e que as informações visíveis são o resultado do processo. 

---

## Execução dos testes
&emsp;Os testes serão executados durante a sprint 5. Os usuários deverão executar as tarefas, sem o auxílio de qualquer um dos aplicadores. Qualquer dificuldade deve ser vista como um ponto de melhora! Os testes serão conduzidos por dois dos nossos integrantes, um dando atenção plena à condução dos testes e outro anotando, de acordo com o que foi estabelecido na planilha. 

### Acesso às planilhas
- **Acesso a planilha de testes do Site:** [Link do Google Sheets](https://docs.google.com/spreadsheets/d/1htjLyD29iclL98XBn5KmsniMZo_bzDrgna1Gwxme31U/edit?usp=sharing)

- **Acesso a planilha de testes do Computador de Bordo:** [Link do Google Sheets](https://docs.google.com/spreadsheets/d/1NRKYfJO7C9gr6uq25u9kAVgcUwgoy1Zi5RVf5Xp149o/edit?usp=sharing)


## Considerações Finais
&emsp;Acreditamos que com esses testes, conseguiremos entender como os usuários estão lidando com o nosso sistema e poderemos refiná-lo. Esse documento tem como objetivo assegurar que os testes serão conduzidos de forma estruturada e sem imprevistos, permitindo uma análise fiel do comportamento dos usuários em situações reais de uso.<br/>
&emsp;Assim, o roteiro de testes prepara o terreno para que a próxima sprint possa avançar com foco nas melhorias que serão apontadas, promovendo a entrega de um produto funcional e compreensível.