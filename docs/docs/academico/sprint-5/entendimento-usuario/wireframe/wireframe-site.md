---
sidebar_position: 2
custom_edit_url: null
---

# Wireframe do Sistema Geral 

## Outra aplicação

&emsp;Segundo o conceito já apresentado sobre os *wireframes*, a ferramenta desenvolvida para apresentação do sistema geral mostra como funciona a interface usada para analisar e organizar as expedições. 

&emsp;Diferente do sistema de bordo, que é feito para uso em campo, o sistema geral foca na visualização de dados, como imagens, relatórios e estatísticas, e também é possível fazer *upload* de imagens de fissuras capturas por outros mecanismos além dos drones, permitindo, assim, uma gestão completa e centralizada das operações. Esse wireframe foi desenvolvido pensando no fluxo da [persona pesquisador](../personas/persona-pesquisador.md).

## User Flow Geral

&emsp;Abaixo está o fluxo geral do sistema geral, representando a navegação entre login, cadastro de expedições e prédios, visualização de imagens e análise de dados. É possível encontrá-lo com maior detalhes a partir desse [link](https://www.figma.com/design/DYeAiDMVbmD6n9HxwKL1L6/Plataforma-Web?node-id=0-1&t=UxIhSnCt139lOM1b-1) no figma, se dirigindo até a seção de "Wireframe - Site".

<p style={{textAlign: 'center'}}>Figura 1 - User Flow Aplicação de Geral</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/wireframe_geral.png").default} style={{width: 800}} alt="Wireframe Aplicação de Geral" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

&emsp;As telas que estão presentes nessa versão do *wireframe* da solução são as descritas abaixo: 

- ***Login*:** Tela inicial onde o usuário acessa sua conta com e-mail e senha.

<p style={{textAlign: 'center'}}>Figura 2 - Login</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/wireframeLogin.png").default} style={{width: 800}} alt="tela de login" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

- ***Home*:** Exibe uma lista de expedições cadastradas. A partir daqui, é possível criar novas expedições ou acessar uma já existente.

<p style={{textAlign: 'center'}}>Figura 3 - Home</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/Home.png").default} style={{width: 800}} alt="tela home" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

- **Card de Criar Expedição:** Formulário para registrar uma nova expedição, com campos como nome, data, endereço e descrição.

<p style={{textAlign: 'center'}}>Figura 4 - Card de Criar Expedição</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/card-criar-expedicao.png").default} style={{width: 800}} alt="Card de Criar Expedição" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

- **Expedição X:** Tela que apresenta os prédios vinculados à expedição selecionada. Permite acessar prédios ou criar novos.

<p style={{textAlign: 'center'}}>Figura 5 - Expedição x </p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/predios-expedicao.png").default} style={{width: 800}} alt="Expedição x" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---


- **Card de Criar Prédio:** Formulário para cadastrar um prédio, incluindo nome, localização, data e imagens da fachada.

<p style={{textAlign: 'center'}}>Figura 6 - Card de Criar Prédio</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/card-criar-predio.png").default} style={{width: 800}} alt="Card de Criar Prédio" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---


- **Prédio X:** Visualização geral dos dados do prédio, como quantidade de rachaduras, gráficos de distribuição e andamento da coleta.

<p style={{textAlign: 'center'}}>Figura 7 - Predio X</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/analise-fissuras.png").default} style={{width: 800}} alt="Prédio x" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

- **Card de Visualização da Imagem da Rachadura:** Exibe uma imagem específica coletada em campo, com dados como autor e data.

<p style={{textAlign: 'center'}}>Figura 8 - Card de Visualização da Imagem da Rachadura</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/card-visualizacao-fissuras.png").default} style={{width: 800}} alt="Card de Visualização da Imagem da Rachadura" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

---

## Conclusão
&emsp;O *wireframe* do sistema geral organiza as principais funções de gestão das expedições. Ele permite o acompanhamento de dados e imagens, desde o *login* até a visualização das rachaduras. O fluxo apresentado mostra uma navegação simples e direta entre as etapas da plataforma. Dessa forma, com o *wireframe* em mãos partimos para a criação do protótipo de alta fidelidade.
