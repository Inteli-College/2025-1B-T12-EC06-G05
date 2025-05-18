---
sidebar_position: 1
custom_edit_url: null
title: "Proposta atualizada da arquitetura"
---

# Proposta atualizada de arquitetura

 A arquitetura do sistema foi ampliada para incorporar uma interface em nuvem que complementa a visão já existente no computador de bordo local do drone. Essa expansão permite que as informações capturadas e processadas em campo sejam enviadas para a nuvem, onde poderão ser acessadas e monitoradas remotamente por usuários, ampliando o alcance e a gestão dos dados coletados.

### Visão geral

<p style={{textAlign: 'center'}}>Figura 1 - Arquitetura atualizada do sistema</p>  
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../static/img/arquitetura_atualizada.jpg").default} style={{width: 800}} alt="Arquitetura Atualizada" />  
        <br/>  
    </div>  
</div>  
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>  

  A figura acima ilustra a nova estrutura do sistema, dividida entre o computador de bordo local e a infraestrutura em nuvem.

### Estrutura e componentes

#### Computador de bordo (local)

* Realiza o processamento inicial das imagens capturadas pelo drone.
* Executa o back-end e front-end localmente para uma visão imediata das fissuras.
* Comunica-se diretamente com o drone via protocolo UDP para recebimento das imagens.
* Permite aos agentes de campo visualizar os dados e imagens em tempo real, com interação local e rápida.

#### Nuvem

* Armazena o banco de dados principal com todas as informações e imagens coletadas em campo.
* Executa back-end e front-end para visualização remota e gestão dos dados coletados.
* Recebe as informações processadas e armazenadas no computador de bordo, sincronizando os dados para acesso remoto.
* Permite aos usuários remotos consultar, analisar, adicionar e gerenciar as imagens e informações das expedições.

#### Drone

* Controlado por agente de campo localmente.
* Envia imagens via protocolo UDP para o computador de bordo para processamento imediato.

#### Visão do drone no computador de bordo

* Tela local, no frontend, que exibe o video do drone, contando com imagens e fissuras detectadas em tempo real durante a operação no campo.

### Fluxo de comunicação

* O drone envia imagens para o computador de bordo via UDP.
* O computador de bordo processa as imagens localmente, identifica fissuras e apresenta as informações ao agente de campo por meio de sua interface local.
* Posteriormente, os dados processados são enviados para a nuvem, onde ficam armazenados e disponíveis para visualização remota.
* O front-end na nuvem permite que usuários externos acessem e monitorem os dados capturados durante as expedições, facilitando a análise e gestão do sistema.

## Conclusão

A ampliação da arquitetura para incorporar uma interface na nuvem possibilita a centralização dos dados e o monitoramento remoto, complementando a análise em tempo real feita no computador de bordo local. Isso amplia a eficiência do sistema, facilitando o acesso às informações tanto em campo quanto remotamente.

## Bibliografia

FOWLER, Martin. Software Architecture Guide. 2019. Disponível em: [https://martinfowler.com/architecture/](https://martinfowler.com/architecture/​). Acesso em: 16 mai. 2025.