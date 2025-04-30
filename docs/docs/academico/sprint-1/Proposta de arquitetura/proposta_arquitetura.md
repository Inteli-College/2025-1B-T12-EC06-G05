---
sidebar_position: 1
custom_edit_url: null
title: "Proposta inicial de arquitetura"
---

# Proposta inicial de arquitetura
&emsp; A proposta de arquitetura é um rascunho inicial que define a estrutura geral de um sistema, indicando seus principais componentes, como eles se comunicam entre si e quais tecnologias serão utilizadas. Ela serve como um guia inicial para alinhar a visão do projeto e facilitar as validações antes do desenvolvimento detalhado. Embora ainda não contenha todos os detalhes técnicos, a proposta inicial é fundamental para orientar as próximas etapas do projeto e garantir que todos tenham uma compreensão clara da direção que será seguida.

### Visão geral

<p style={{textAlign: 'center'}}>Figura 1 - Proposta de arquitetura</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/arquitetura.png").default} style={{width: 800}} alt="Matriz de Riscos" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

&emsp; Acima é apresentada a estrutura do sistema e as interações entre os diferentes módulos;

### Estrutura e componentes

#### Computador (Servidor)

    - Back-end:
        - Recebe comandos dos usuários;
        - Se comunica com o drone via protocolo UDP para coleta de imagens da camera;
        - Por meio do protocolo HTTP envia e recebe informações do front-end e banco de dados
    
    - Front-end:
        - Agrupa de forma visual as imagens coletadas pelo drone;
        - Permite o usuário ver informações e fotos de diferentes localidades;
        - Possibilita identificar os diferentes tipos de fissuras presentes em cada imagem;
    
    - Banco de dados:
        - Armazena informações dos usuários;
        - Armazena dados das espedições e suas localizações;
        - Armazena as imagens das fissuras de cada expedição;
    
#### Drone
        - É controlado por um agente de campo;
        - Sua comunicação é feita por softwares proprietários da desenvolvedora;
        - Envia por meio do protocolo UDP imagens para nosso back-end;

#### Visão do drone
    - Tela que permitirá ver as imagens da camera do drone;
    - Mostrará as fissuras identificadas pela sistema de visão computacional;

### Fluxo de comunicação

&emsp; Para interpretar corretamente a arquitetura do projeto deve-se ter em mente que:

- As imagens serão coletadas por meio da câmera do drone e enviadas para um computador que estará juntamente dos agentes de campo;
- Em seguida as imagens passarão por um sistema de visão computacional em nosso back-end que fará todo o tratamento e categorização das fissuras encontradas;
- Após isso, quando houver a identificação correta de uma fissura, a imagem dela será enviada para nosso banco de dados;
- Assim que o banco de dados receber o arquivo será possível visualizar a imagem em nosso front-end, onde todas as imagens serão separadas por suas respectivas localidades;

## Conclusão

&emsp; Com a proposta apresentada conseguimos garantir um tratamento eficiente das imagens coletadas pelo drone, facilitando a identificação dos agentes de campo e apresentando elas de forma intuitiva e otimizada em nosso front-end.