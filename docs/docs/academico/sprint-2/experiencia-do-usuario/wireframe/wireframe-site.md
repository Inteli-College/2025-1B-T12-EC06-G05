---
sidebar_position: 1
custom_edit_url: null
---

# Wireframe da Sistema Geral 

## Conceito
&emsp;Um wireframe é um diagrama visual que representa a estrutura de uma página web ou de uma tela de aplicativo. Ele é um esboço, um protótipo de baixa fidelidade, que demonstra como os elementos se relacionam entre si e como são estruturados. 

&emsp;O wireframe do sistema geral mostra como funciona a interface usada para acompanhar e organizar as expedições. Diferente do sistema de bordo, que é feito para uso em campo, o sistema geral foca na visualização de dados, como imagens, relatórios e estatísticas, e também é possível fazer *upload* de imagens de fissuras capturas por celular, permitindo, assim, uma gestão completa e centralizada das operações.

## User Flow Geral

&emsp;Abaixo está o fluxo geral do sistema geral, representando a navegação entre login, cadastro de expedições e prédios, visualização de imagens e análise de dados.

<p style={{textAlign: 'center'}}>Figura 1 - User Flow Aplicação de Geral</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/wireframe_geral.png").default} style={{width: 800}} alt="Wireframe Aplicação de Geral" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Login:** Tela inicial onde o usuário acessa sua conta com e-mail e senha.
- **Home:** Exibe uma lista de expedições cadastradas. A partir daqui, é possível criar novas expedições ou acessar uma já existente.
- **Card de Criar Expedição:** Formulário para registrar uma nova expedição, com campos como nome, data, endereço e descrição.
- **Expedição X:** Tela que apresenta os prédios vinculados à expedição selecionada. Permite acessar prédios ou criar novos.
- **Card de Criar Prédio:** Formulário para cadastrar um prédio, incluindo nome, localização, data e imagens da fachada.
- **Prédio X:** Visualização geral dos dados do prédio, como quantidade de rachaduras, gráficos de distribuição e andamento da coleta.
- **Card de Visualização da Imagem da Rachadura:** Exibe uma imagem específica coletada em campo, com dados como autor e data.

## Conclusão
&emsp;O wireframe do sistema geral organiza as principais funções de gestão das expedições. Ele permite o acompanhamento de dados e imagens, desde o login até a visualização das rachaduras. O fluxo apresentado mostra uma navegação simples e direta entre as etapas da plataforma. Dessa forma, com o wireframe em mãos partimos para a criação do protótipo de alta fidelidade.

## Referências
1. BECKER, Lauro. Wireframes, o que são e por que os utilizamos? 20 abr. 2022. Disponível em: https://www.organicadigital.com/blog/o-que-sao-wireframes-e-por-que-os-utilizamos/. Acesso em: 15 maio 2025.