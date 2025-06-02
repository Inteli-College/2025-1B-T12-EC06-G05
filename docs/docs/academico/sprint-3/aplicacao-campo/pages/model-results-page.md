---
sidebar_position: 5
custom_edit_url: null
---

# Model Results Page

&emsp;Essa página exibe os resultados da execução do modelo de detecção de fissuras em um prédio específico.

&emsp;Na parte superior, o usuário pode visualizar o nome do prédio correspondente e voltar a ele. Se não houver resultados disponíveis, um aviso é exibido.

&emsp;Quando os resultados existem, são mostradas as quantidades detectadas por tipo de rachadura em formato de lista. Abaixo disso, são exibidas as imagens detectadas com fissuras, organizadas por sentido (Norte, Sul, etc).

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/model_results_page1.png").default} alt="Imagem Detectada - Norte" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 1 - Detecção de fissura no sentido Norte</p>
    </div>  
</div>  

&emsp;As imagens exibidas são as versões processadas (com marcações do modelo), e são agrupadas de forma visual para facilitar a análise dos locais afetados.

<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>  
        <img src={require("../../../../../static/img/aplicacaoCampo/model_results_page2.png").default} alt="Imagens Detectadas - Nordeste" />  
        <br/>  
        <p style={{textAlign: 'center'}}>Figura 2 - Detecção de fissuras no sentido Nordeste</p>
    </div>  
</div>  

&emsp;Essa tela é útil para revisar e entender rapidamente onde e quantas rachaduras foram identificadas pelo modelo na inspeção feita.