---
sidebar_position: 2
custom_edit_url: null
---

# Wireframe do Sistema de Campo

## Conceito
&emsp;Um wireframe é um diagrama visual que representa a estrutura de uma página web ou de uma tela de aplicativo. Ele é um esboço, um protótipo de baixa fidelidade, que demonstra como os elementos se relacionam entre si e como são estruturados. 

&emsp;O wireframe do sistema de campo mostra a estrutura visual da interface usada em computadores de bordo pelo pilotos de drone. Diferente do sistema geral, o sistema de campo prioriza a operação prática em ambientes dinâmicos. O foco desse wireframe está na simplicidade, acesso rápido às funções essenciais, interação com poucos toques e integração com o drone para captura de imagens.


## User Flow Geral

&emsp;Abaixo está o fluxo geral de uso do sistema de bordo para captura de fissuras, representado pelo wireframe. Ele mostra o caminho percorrido pelo usuário, desde o login até a visualização e gerenciamento das fissuras registradas por drone.

<p style={{textAlign: 'center'}}>Figura 1 - User Flow Aplicação de Campo</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/wireframe_campo.png").default} style={{width: 800}} alt="Wireframe Aplicação de Campo" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


### Descrição do Fluxo:

**Login**: O usuário insere seu ID para iniciar a operação do sistema.

**Home**:Após o login, pode-se criar uma nova expedição informando nome e prédio, ou selecionar uma expedição existente para continuar o trabalho.

**Captura de Drone**:O sistema permite selecionar a face do prédio e iniciar a captura de imagens via drone. As fotos são exibidas em miniaturas e podem ser salvas.

**Expedição**:Exibe todas as fissuras capturadas e organizadas por tipo ou localização. O usuário pode revisar, classificar ou capturar mais fissuras.

## Conclusão
&emsp; O wireframe do sistema de campo apresenta a estrutura necessária para a operação com drones em ambientes práticos. Ele orienta o uso do sistema desde o login até a organização das fissuras registradas. Dessa forma, o fluxo proposto serve como base para o desenvolvimento do protótipo de alta fidelidade.

## Referências
1. BECKER, Lauro. Wireframes, o que são e por que os utilizamos? 20 abr. 2022. Disponível em: https://www.organicadigital.com/blog/o-que-sao-wireframes-e-por-que-os-utilizamos/. Acesso em: 15 maio 2025.
