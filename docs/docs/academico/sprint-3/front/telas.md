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


## Tela de Home (`Home.tsx`)

A tela de Home serve como painel central após o login, onde os usuários podem visualizar, pesquisar e gerenciar expedições. É o ponto de partida para acessar análises específicas de prédios e criar novas expedições através de um modal interativo.
<p style={{textAlign: 'center'}}>Tela de Home com listagem de expedições</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/home.png").default} style={{width: 800}} alt="Tela de Home" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

# Funcionalidades principais:

Listagem de expedições com informações básicas (nome, data, ícone)
Sistema de busca por nome da expedição
Filtro por data (formato DD/MM/AAAA)
Botão flutuante para adicionar novas expedições
Estados visuais para lista vazia e resultados não encontrados
Navegação para análise específica ao clicar em uma expedição

# Integrações com o back-end:

Futuramente integrará com endpoints para listar expedições existentes
Suporte para criação de novas expedições via modal

# Outros destaques:

Design responsivo com breakpoints para mobile e tablet
Animações sutis nos itens da lista (hover effects)
Acessibilidade com suporte a navegação por teclado
Estados visuais diferenciados (vazio, sem resultados, carregado)
Layout em grid adaptativo para os campos de busca

## Tela de Visão Geral do Prédio (`AnaliseFissuras.tsx`)

Essa é a principal tela de análise após o login. Nela, o usuário pode visualizar fissuras detectadas, consultar imagens da fachada por orientação e acessar os dados da expedição vinculada ao prédio selecionado.

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