---
sidebar_position: 2
custom_edit_url: null
---

# Telas da Aplicação Web

&emsp;Nesta seção, documentamos todas as telas que compõem a aplicação web desenvolvida para o projeto. Cada tela foi projetada com foco na usabilidade, clareza e integração com o restante do sistema.

&emsp;Com base no protótipo de alta fidelidade desenvolvido na sprint 2, implementamos interfaces que respeitam o fluxo ideal de uso para os funcionários do IPT. Este documento foca em descrever cada tela, suas funcionalidades principais e como elas se integram com a lógica do sistema.

---
> ℹ️ Todas as rotas protegidas utilizam autenticação via token JWT. Esse token é armazenado no `localStorage` após o login e adicionado automaticamente aos headers das requisições com `axios`.
---

## Tela de Login (login.tsx)

&emsp;A porta de entrada da aplicação. Permite autenticação segura de usuários e direciona para a tela principal. Foi desenvolvida com foco em responsividade e acessibilidade, com feedbacks visuais para erros de login.

<p style={{textAlign: 'center'}}>Tela de login</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/login.png").default} style={{width: 800}} alt="Wireframe Aplicação de Campo" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades principais:**
- Campos para e-mail e senha
- Feedback de erro quando as credenciais estão incorretas
- Redirecionamento para tela de cadastro
- Armazenamento de token JWT no `localStorage`

**Integração com o back-end:**
- `POST /user/login` para autenticar
- Armazena o `access_token` retornado localmente

**Outros destaques:**
- Responsiva: oculta o fundo ilustrado em telas pequenas
- Animação sutil no SVG do prédio
- Layout flexível com Styled Components


| Importado de                        | O que está sendo importado       | Para que serve                                                                            |
| ----------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `react`                             | `useState`                       | Controla os valores de email, senha e mensagens de erro no formulário                     |
| `react-router-dom`                  | `useNavigate`                    | Permite redirecionar o usuário após login ou ao clicar em “cadastro”                      |
| `styled-components`                 | `styled`                         | Define estilos personalizados com CSS-in-JS para tornar a interface responsiva e elegante |
| `../constants/style`                | `COLORS`, `FONTS`, `BREAKPOINTS` | Padroniza cores, fontes e tamanhos de tela conforme definido no projeto                   |
| `../constants/assets/predio.svg`    | `predio`                         | Imagem vetorial usada como ilustração flutuante na seção da esquerda                      |
| `../constants/assets/login_bkg.svg` | `bg`                             | Define a imagem de fundo da seção ilustrada                                               |
| `axios`                             | `axios`                          | Realiza a requisição POST para login na API `/user/login`                                 |


---

## Tela de Cadastro (Cadastro.tsx)

&emsp;Caso o usuário não tenha uma conta na plataforma, ele é direcionado para a tela de cadastro. Nessa tela, é possível preencher os dados básicos de autenticação e criar uma nova conta. Após o envio do formulário, um **modal de sucesso** confirma o cadastro, redirecionando o usuário para a tela de login.

<p style={{textAlign: 'center'}}>Tela de cadastro</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/telaCadastro.png").default} style={{width: 800}} alt="Tela de Cadastro" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades principais:**
- Campos de entrada para:
  - Nome completo
  - E-mail institucional
  - Senha
  - Cargo (com opções dinâmicas ou padrão)
- Validação de campos obrigatórios
- Exibição de modal animado confirmando sucesso do cadastro
- Redirecionamento automático para a tela de login após cadastro bem-sucedido   

**Integração com o back-end:**
- `POST /user/cadastro` para autenticar
- Armazena o `access_token` retornado localmente

**Outros destaques:**
- Responsiva: oculta o fundo ilustrado em telas pequenas
- Animação sutil no SVG da lupa
- Layout flexível com Styled Components

| Importado de                         | O que está sendo importado                | Para que serve                                                                                          |
| ---------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `react`                                  | `useState`                       | Gerenciar estados internos como inputs, erros e modal                                               |
| `react-router-dom`                       | `useNavigate`                    | Redirecionar o usuário após cadastro                                                                |
| `styled-components`                      | `styled`, `keyframes`            | Estilizar componentes com CSS-in-JS e criar animações                                               |
| `../constants/style`                     | `COLORS`, `FONTS`, `BREAKPOINTS` | Utilizar padrões globais de cor, fonte e responsividade                                             |
| `../constants/assets/lupa.svg`           | `lupa`                           | Imagem vetorial usada como ilustração flutuante na seção da esquerda                                                                           |
| `../constants/assets/cadastro_bkg.svg`   | `cadastroBG`                     | Imagem de fundo na seção lateral                                                                    |
| `axios`                                  | `axios`                          | Enviar requisição `POST` para registrar o usuário                                                   |
| `lottie-react`                           | `Lottie`                         | Exibir animação JSON do modal de sucesso                                                            |
| `../constants/assets/animations/certo.json` | `correto`                    | Animação de check (certo) exibida no modal após cadastro bem-sucedido                              |


---

## Tela de Predios

&emsp;Essa tela é responsável por exibir e cadastrar prédios pertencentes a uma determinada expedição. Ela é acessada a partir da tela de expedição do sistema, e fornece um painel visual com todos os prédios registrados, além de um botão para adicionar novos prédios por meio de um formulário em popup.


<p style={{textAlign: 'center'}}>Tela de Prédios</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/analise-de-fissuras.png").default} style={{width: 800}} alt="WTela de Prédios" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


**Funcionalidades principais:**

- Exibição dos prédios cadastrados de uma expedição em formato de galeria
- Cadastro de novos prédios através de um modal com formulário
- Redirecionamento para análise de fissuras do prédio selecionado
- Carregamento dinâmico dos dados da expedição vinculada

**Campos no cadastro do prédio**

- Nome do prédio
- Complemento (opcional)
- Descrição (opcional)
- Data da coleta
- Hora de início e hora de fim da coleta
- Foto principal (fachada do prédio)
- Upload de imagens de fissuras por zona:
  - Norte
  - Sul
  - Leste
  - Oeste
  - Sudeste
  - Sudoeste
  - Nordeste
  - Noroeste

**Integrações com o back-end:**
- `GET /building/expedition/:id` — para obter todos os prédios vinculados à expedição
- `GET /expedition/:id` — para obter os dados da expedição
- `POST /building` — para cadastrar um novo prédio com imagens associadas

**Outros destaques:**
- Usa componentes reutilizáveis como `Header`, `ExpeditionInfo`, `QuadroPredios` e `ModalAddPredio`
- Trabalha com `useParams` para extrair o `id` da expedição diretamente da URL
- Utiliza `URL.createObjectURL` para pré-visualizar imagens locais antes do upload


| Importado de                    | O que está sendo importado     | Para que serve                                                                                      |
| ------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `react`                         | `useEffect`, `useState`        | Lida com o carregamento e atualização dinâmica da lista de prédios e do modal                       |
| `react-router-dom`              | `useParams`, `useNavigate`     | Captura o parâmetro `id` da URL e realiza redirecionamentos após seleção de prédio                  |
| `axios`                         | `axios`                        | Realiza requisições autenticadas à API para buscar e cadastrar dados                               |
| `../components/Header`          | `Header`                       | Cabeçalho com título da página e navegação                                                          |
| `../components/ExpeditionInfo`  | `ExpeditionInfo`               | Exibe as informações básicas da expedição                                                           |
| `../components/QuadroPredios`   | `QuadroPredios`                | Componente que exibe os prédios cadastrados e inclui o botão para adicionar novo prédio            |
| `../components/ModalAddPredio`  | `ModalAddPredio`               | Modal com formulário para preenchimento dos dados do prédio                                        |


---


## Tela de Visão Geral do Prédio (`AnaliseFissuras.tsx`)

&emsp;Essa é a principal tela de análise após o login. Nela, o usuário pode visualizar fissuras detectadas, consultar imagens da fachada por orientação e acessar os dados da expedição vinculada ao prédio selecionado.

<p style={{textAlign: 'center'}}>Tela de análise de fissuras</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/analise-de-fissuras.png").default} style={{width: 800}} alt="Wireframe Aplicação de Campo" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades principais:**
- Exibição de informações da expedição (nome, responsável, data)
- Visualização de fissuras por tipo (retração e térmica)
- Gráficos analíticos da expedição
- Galeria de imagens por zona

**Integrações com o back-end:**
- `GET /building/:id` — para obter o ID da expedição associada ao prédio
- `GET /expedition/:id` — para obter os dados da expedição
- `GET /image/by_predio/:id` — para carregar imagens da fachada
- `GET /fissure/predio/:id` — para listar fissuras

**Outros destaques:**
- Usa componentes reutilizáveis como `Header`, `FissurePanel`, `FissureCharts` e `SelectWithTitle`
- Trabalha com `useParams` para extrair o `numeroPredio` da rota
- Exibe feedback visual em caso de erro 


| Importado de                    | O que está sendo importado | Para que serve                                                                                      |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `react`                         | `useEffect`, `useState`    | Lida com carregamento inicial de dados e atualizações dinâmicas da interface                        |
| `react-router-dom`              | `useParams`                | Captura o parâmetro `numeroPredio` da URL para buscar dados do prédio correspondente                |
| `styled-components`             | `styled`                   | Define os layouts principais da página, como grid de imagens e área lateral com gráficos            |
| `../constants/style`            | `COLORS`                   | Define cores padronizadas para bordas, textos e planos de fundo dos elementos                       |
| `../components/Header`          | `Header`                   | Componente reutilizável que aparece em várias páginas com navegação e título                        |
| `../components/FissurePanel`    | `FissurePanel`             | Painel que lista fissuras detectadas, organizadas por tipo                                          |
| `../components/FissureCharts`   | `FissureCharts`            | Gráficos explicativos sobre tipos de fissura, data e distribuição                                   |
| `../components/SelectWithTitle` | `SelectWithTitle`          | Mostra informações da expedição (responsável, nome e data) de forma destacada                       |
| `axios`                         | `axios`                    | Responsável por buscar dados do prédio, da expedição e imagens da API, usando token de autenticação |


---

## Como acessar cada tela?

- **Login:** `/` — Tela inicial da aplicação.
- **Visão Geral:** `/analise-de-fissuras/:numeroPredio` — Carrega a análise de um prédio específico. Exige um número de prédio válido.
- **Tela de Prédios:**   `/predio/:expeditionId` — Acessa a tela de prédios. Precisa de um número de expedição válido.
- **home** `/home` — Tela carregada após o login. Centraliza as informações de expedições já criadas e permite a criação de novas. 
- **cadastro** `/cadastro` — Tela que permite a criação de novos usuários. Necessária para que o usuário funcione no login. 

---

> ➡️ Para detalhes sobre os componentes utilizados nestas telas, consulte a seção [Componentes Reutilizáveis](./componentes.md).

---