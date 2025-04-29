---
sidebar_position: 2
custom_edit_url: /arquitetura-de-informacao
---

# Arquitetura de Informação

&emsp;A Arquitetura de Informação tem como objetivo estruturar, organizar e representar de forma lógica e funcional a navegação e os fluxos de um sistema. Ela é importante pois ajuda a garantir que os usuários encontrem facilmente o que precisam, que o sistema seja coerente em seu funcionamento e que o desenvolvimento seja orientado por uma visão clara e bem definida do projeto.   
&emsp;No contexto do nosso projeto, a plataforma tem como objetivo mostrar para o usuário através de uma interface a identificação e classificação de fissuras em edificações por meio de imagens. Para isso, foi desenvolvida uma arquitetura de informação, com base nas necessidades das personas.    
&emsp;Para isso, foram utilizados dois tipos principais de arquitetura, representados por diagramas UML: o Diagrama de Sequência e o Diagrama de Relacionamento.



<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Sequência </p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/arquitetura_de_informacao.png").default} style={{width: 800}} alt="Diagrama de Sequência" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

&emsp;O Diagrama de Sequência elaborado representa o fluxo de navegação do usuário dentro da plataforma, desde o momento do login até a realização das principais ações disponíveis na interface. A modelagem foi pensada com base na persona Alberto, um pesquisador que utiliza diretamente o sistema para visualizar e registrar informações sobre fissuras detectadas em edificações.

**1 - Login (Inserção de login/senha)** 

&emsp;O fluxo se inicia com Alberto acessando a Tela de Login, onde ele insere suas credenciais para autenticação no sistema. Caso ele já tenha uma conta, ele prossegue para a próxima etapa.

**2 - Cadastro (Inserção de dados de cadastro)**  

&emsp;Caso o usuário não possua uma conta na plataforma, ele será redirecionado à Tela de Cadastro. Nessa etapa, ele preenche seus dados para criar um novo perfil na plataforma. Após a conclusão do cadastro, o sistema redireciona o usuário de volta à Tela de Login, onde ele poderá realizar o login com os dados recém-criados.

**3 - Tela Principal – Acesso ao Histórico de Imagens** 

&emsp;Após realizar o login com sucesso, Alberto é redirecionado à Tela Principal, onde encontra as funcionalidades centrais da plataforma. A partir dessa tela, ele pode selecionar a opção de visualizar o Histórico de Imagens.

**3.1 - Acessar Pastas com Imagens do Drone**   

&emsp;Ao acessar o histórico, a plataforma exibe as imagens capturadas pelo drone, organizadas em pastas específicas por localidade, em alguns casos, subpastas de prédio/bloco, e por fim, as imagens separadas por tipo de fissuras. Isso permite a Alberto uma navegação organizada e eficiente para acessar os registros conforme necessário.

**4 - Upload de Imagem**    

&emsp;Caso queira registrar uma nova fissura, Alberto pode usar a opção de Upload de Imagem, acessível pela Tela Principal. A imagem será analisada e registrada na plataforma.

**4.1** - Enviar Imagem e Preencher Informações**

&emsp;&emsp;Durante o envio, o sistema solicita que Alberto informe dados adicionais, como localidade e data da inspeção. Após o preenchimento, a imagem é armazenada no histórico e a plataforma exibe um feedback de confirmação, indicando que o processo de upload e análise foi concluído com sucesso.


