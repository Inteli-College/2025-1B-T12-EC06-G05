---
sidebar_position: 3
custom_edit_url: null
---

# Inspection Page

&emsp;Essa página permite visualizar os detalhes de uma expedição específica e adicionar prédios a ela.

&emsp;Logo no início são exibidas as informações básicas da expedição, como nome, localização, descrição, data de criação e, se disponível, a imagem de capa.

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/inspection_page1.png").default} alt="Informações da Expedição" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 1 - Informações da expedição com imagem de capa e início do formulário</p>
    </div>  
</div>  

&emsp;Na seção de prédios existentes, são listados os prédios já adicionados à expedição. Cada prédio pode ser aberto com um botão correspondente.

&emsp;Na parte inferior, é possível cadastrar um novo prédio, informando nome, complemento, descrição e, opcionalmente, uma foto da fachada. Os dados são salvos localmente em um arquivo `building_info.json` e a estrutura do prédio é criada dentro da pasta da expedição.

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/inspection_page2.png").default} alt="Formulário de Novo Prédio" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 2 - Formulário para adicionar um novo prédio</p>
    </div>  
</div>  

&emsp;Essa página é essencial para organizar os dados de campo por expedição e manter os registros dos prédios bem estruturados.