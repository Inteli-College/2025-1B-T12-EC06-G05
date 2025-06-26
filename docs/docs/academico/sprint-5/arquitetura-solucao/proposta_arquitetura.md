---
sidebar_position: 1
custom_edit_url: null
title: "Proposta de arquitetura"
---

# Proposta de arquitetura

&emsp; A proposta de arquitetura é um rascunho que define a estrutura geral de um sistema, indicando seus principais componentes, como eles se comunicam entre si e quais tecnologias serão utilizadas. Ela serve como um guia para alinhar a visão do projeto e facilitar as validações antes do desenvolvimento detalhado. Embora ainda não contenha todos os detalhes técnicos, a proposta é fundamental para orientar as próximas etapas do projeto e garantir que todos tenham uma compreensão clara da direção que será seguida.

### Visão geral

&emsp; A estrutura do sistema está organizada em três componentes principais: **drone**, **computador de bordo local** e **infraestrutura em nuvem**. A proposta descreve como esses elementos interagem para possibilitar a coleta, o processamento e o acesso aos dados de forma eficiente.

<p style={{textAlign: 'center'}}>Figura 1 - Proposta da arquitetura do sistema</p>  
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../static/img/arquitetura-atualizada.png").default} style={{width: 800}} alt="Arquitetura Proposta" />  
        <br/>  
    </div>  
</div>  
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>  

### Componentes principais

#### Computador de bordo (local)

* Responsável pelo recebimento das imagens transmitidas pelo drone via protocolo UDP.
* Realiza o primeiro nível de processamento local das imagens capturadas.
* Executa tanto o back-end quanto o front-end para permitir a visualização imediata dos dados e imagens no local.
* Permite que os agentes de campo acompanhem as imagens em tempo real e interajam com o sistema diretamente.

#### Infraestrutura em nuvem

* Prevista para armazenar e centralizar os dados coletados em campo.
* Possui um front-end e back-end para visualização remota das informações processadas localmente.
* Receberá os dados sincronizados do computador de bordo para posterior análise e gerenciamento remoto.
* Será utilizada por usuários que não estão presentes em campo, permitindo acompanhamento remoto das expedições.

#### Drone

* Operado localmente por agentes de campo.
* Envia imagens por protocolo UDP ao computador de bordo, sem realizar processamento a bordo.

#### Interface local (computador de bordo)

* Apresenta em tempo real o vídeo do drone com sobreposição de possíveis fissuras detectadas.
* Facilita a tomada de decisões rápidas durante as operações em campo.

### Fluxo de comunicação proposto

1. O **drone** envia imagens ao **computador de bordo** por meio de protocolo UDP.
2. O **computador de bordo** processa essas imagens localmente e exibe os resultados em uma interface acessível aos agentes de campo.
3. Os dados processados serão posteriormente enviados ao **bucket** e salvos no **banco de dados**, onde ficarão armazenados e disponíveis para visualização remota.
4. Usuários remotos poderão acessar o sistema pela interface web hospedada na nuvem para consulta, análise e gerenciamento das informações.

## Considerações finais

&emsp; Esta proposta de arquitetura estabelece as diretrizes iniciais para o desenvolvimento do sistema, com foco na integração entre captura local, processamento inicial e armazenamento remoto. A divisão clara entre os papéis do drone, do computador de bordo e da nuvem busca garantir flexibilidade, escalabilidade e eficiência no monitoramento e análise de dados em campo.

## Bibliografia

FOWLER, Martin. *Software Architecture Guide*. 2019. Disponível em: [https://martinfowler.com/architecture/](https://martinfowler.com/architecture/). Acesso em: 16 mai. 2025.
