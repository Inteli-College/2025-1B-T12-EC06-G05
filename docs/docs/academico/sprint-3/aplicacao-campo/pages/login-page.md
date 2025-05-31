---
sidebar_position: 1
custom_edit_url: null
---

# Login Page

&emsp;Essa é a página de login da aplicação de campo. Atualmente, ela serve para identificar o usuário por meio de um ID simples inserido manualmente. A tela exibe o logo da aplicação, um título e um campo para digitar o ID do usuário, que é armazenado na sessão.

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/login_page.png").default} alt="Login Page" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 1 - Página de login</p>
    </div>  
</div>  

&emsp;No futuro, essa tela será adaptada para um login completo com e-mail e senha, que permitirá autenticação e publicação segura na API. Por enquanto, as credenciais utilizadas para autenticação estão sendo armazenadas em um arquivo `.env`.