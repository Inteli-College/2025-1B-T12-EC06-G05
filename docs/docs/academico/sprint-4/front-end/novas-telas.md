---
title: "Novas telas"
sidebar_label: "Novas telas"
sidebar_position: 3
---

# Novas telas

&emsp;Nesta Sprint, atendendo à novas necessidades percebidas do nosso parceiro, foram implementadas duas telas importantes: a Tela de Perfil e a Tela de Logs. Ambas foram desenvolvidas com o intuito de melhorar a experiência dos usuários da plataforma, permitindo a edição dos dados de cadastro, aliada à visualização das expedições lideradas, e o acesso às movimentações realizadas dentro da plataforma.

## Tela de Perfil 

&emsp;A Tela de Perfil foi criada para permitir que os usuários editem suas informações de cadastro. Nessa tela, é possível visualizar e modificar dados como nome completo, e-mail e cargo. O design foi pensado para ser simples, com campos claros e com validação de erros para garantir a integridade das informações.

<p style={{textAlign: 'center'}}>Tela de Perfil</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/tela-perfil.png").default} style={{width: 800}} alt="Tela de Perfil" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

Funcionalidades principais:
- Exibição dos dados cadastrados (nome, e-mail, cargo)
- Campos editáveis para nome, e-mail e cargo
- Botão para salvar as alterações

&emsp;As funcionalidades foram devidamente integradas ao back-end para evitar, assim como proposto e descrito na tela do perfil, deixar qualquer parte da solução desconexa.


## Tela de Logs 

&emsp;A Tela de Logs foi implementada para fornecer aos usuários que possuem uma visão detalhada das movimentações realizadas dentro da plataforma. A tela exibe registros de ações feitas, como modificações nos dados do perfil, criação de novos registros e outras interações relevantes. Esse controle de logs foi um novo ponto levantado, ao se perceber a maior transparência sobre as atividades realizadas na plataforma.

&emsp;Além disso, agora existe a distinção entre perfis de administração e perfis padrão. Apenas usuários com perfil administrativo têm acesso completo à Tela de Logs. Usuários com perfil padrão não visualizam as ações registradas, oferecendo uma camada de segurança adicional para dados sensíveis.

<p style={{textAlign: 'center'}}>Tela de Logs</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/tela-logs.png").default} style={{width: 800}} alt="Tela de Logs" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

Funcionalidades principais:
- Exibição de registros de movimentações realizadas na plataforma
- Exibição de dados da ação (quem realizou, o que foi feito, data e hora)

&emsp;As funcionalidades foram devidamente integradas ao back-end para evitar deixar qualquer parte da solução desconexa.

Outros pontos de destaque em relação à tela de logs desenvolvidas podem ser observados abaixo:
- Cabeçalho dinâmico que se adequa em relação à função do usuário (administrador ou padrão) com base no perfil
- Log de atividades para administração inclui informações completas sobre a ação realizada
- Acesso restrito à administração para visualizar todos os logs (perfis padrão não podem acessar)
.v

## Distinção entre Perfil de Administração e Perfil Padrão

&emsp;Complementando um ponto discutido anteriormente, a Tela de Logs agora conta com uma distinção clara entre o perfil de administração e o perfil padrão. Usuários com perfil administrativo têm acesso total à tela de logs, podendo visualizar e filtrar todas as movimentações realizadas na plataforma. Já usuários com perfil padrão não têm acesso aos logs, garantindo que apenas administradores possam monitorar as atividades realizadas pelos usuários na plataforma.

&emsp;Esse controle de acesso foi implementado para melhorar a segurança e a privacidade dos dados, alinhando-se às necessidades do parceiro e garantindo que as funcionalidades administrativas sejam restritas apenas a usuários autorizados.

## Conclusão

&emsp;As Telas de Perfil e Tela de Logs foram desenvolvidas em resposta a novas necessidades identificadas durante a Sprint 4, com foco em aumentar a transparência e o controle das movimentações dentro da plataforma. A Tela de Perfil permite que os usuários editem suas informações de maneira simples e eficiente, enquanto a Tela de Logs oferece um histórico completo das ações realizadas, com acessibilidade restrita a usuários administrativos. 

&emsp;Essas novas funcionalidades melhoram a usabilidade e o controle dentro da plataforma, atendendo aos requisitos do parceiro e aprimorando a experiência dos usuários com a aplicação. Além disso, essa distinção entre perfis começada abre margem para que na sprint de refinamento, novas iniciativas sejam pensadas para essas duas camadas de acesso à plataforma FissurAI.

