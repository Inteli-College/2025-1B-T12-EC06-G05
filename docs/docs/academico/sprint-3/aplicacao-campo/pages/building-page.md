---
sidebar_position: 4
custom_edit_url: null
---

# Building Page

&emsp;Essa página é responsável pelo gerenciamento das imagens e informações de um prédio específico dentro de uma expedição.

&emsp;Na parte superior, o usuário pode visualizar as informações do prédio, como nome, complemento, descrição e, se houver, a foto da fachada.

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/building_page1.png").default} alt="Topo da Página do Prédio" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 1 - Informações do prédio, sentido e visualização do drone</p>
    </div>  
</div>  

&emsp;O usuário pode selecionar o sentido da imagem (ex: Norte, Sudeste) e indicar o andar atual, caso deseje registrar essa informação. Em seguida, é possível visualizar o feed de vídeo vindo do drone e capturar imagens diretamente da transmissão ao vivo. As imagens são salvas com base no sentido e andar definidos.

&emsp;Abaixo, todas as imagens já capturadas são organizadas por sentido e exibidas com visualização em miniatura. Isso ajuda na navegação e na análise das imagens captadas.

&emsp;Há ainda um botão para executar o modelo de detecção de fissuras nas imagens salvas.

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/building_page2.png").default} alt="Imagens Capturadas" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 2 - Imagens do sentido Nordeste e botão para rodar modelo</p>
    </div>  
</div>  

&emsp;Essa página concentra todo o fluxo de captura e análise de imagens de um prédio durante a inspeção.