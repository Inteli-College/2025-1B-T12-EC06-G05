---
title: "Atualizações da Tela de Fissuras"
sidebar_label: "Tela de Fissuras"
sidebar_position: 1
---

# Atualizações da Tela de Fissuras

## Contextualização do foco da sprint

&emsp;Nesta sprint, houve uma evolução significativa na interface de gerenciamento de fissuras, aprimorando tanto a usabilidade quanto a integração de funcionalidades com o backend. A tela de fissuras é uma das áreas mais utilizadas pelos usuários do sistema, sendo responsável por concentrar a visualização, organização e análise das imagens inspecionadas em campo. 

&emsp;Dentre as melhorias implementadas, destacam-se: **a possibilidade de arrastar fissuras entre colunas**, **a adição da função de upload de fotos** e **a geração de relatórios baseados nas fissuras registradas**. Além disso, **os gráficos passaram a refletir os dados reais do backend**, representando a distribuição precisa de fissuras por tipo e direção.

## Arrastar fissuras entre colunas {#gif1}

&emsp;A tabela de fissuras agora conta com suporte a interações de arrastar e soltar ("*drag and drop*") entre colunas da interface. Essa funcionalidade foi idealizada para facilitar a auditoria de imagens conforme o fluxo de análise ou revisão técnica. 

&emsp;Por exemplo, o usuário pode arrastar uma imagem inicialmente classificada como "retração" para a coluna de fissuras "térmicas" durante a auditoria. A ação é intuitiva e visual, eliminando a necessidade de múltiplos cliques.

&emsp;Sempre que uma fissura é arrastada de um lado para o outro, sua classificação é atualizada no banco de dados, mantendo a identificação correta. Além disso, é criado um registro de auditoria indicando que houve uma alteração nas informações daquela fissura.

<p style={{textAlign: 'center'}}>Gif 1 - Arrastar fissuras</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/gifsAplicacao/drag_fissura.gif").default} style={{width: 800}} alt="Gif demonstrando o ato de arrastar as imagens" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Autores</p>

&emsp;O gif acima apresenta o processo de arrastar uma fissura de uma classificação para outra.

## Upload de novas fotos {#gif2}

&emsp;Agora é possível enviar novas imagens de fissuras diretamente pela tela de gerenciamento. Ao clicar no botão de **“Upload”**, o usuário pode selecionar arquivos do seu dispositivo, vinculá-los ao prédio atual e indicar de qual direção foi tirada aquela foto.

&emsp;A imagem passa pelo processo de classificação automática do modelo e, em seguida, é enviada para o banco de dados. Basta recarregar a página para vê-la. Essa funcionalidade foi pensada para facilitar o processo de alimentação do sistema com novos dados de campo, permitindo que mesmo após uma expedição seja possível adicionar novas imagens ao prédio correspondente.

<p style={{textAlign: 'center'}}>Gif 2 - Upload de novas fotos</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/gifsAplicacao/upload_fissura.gif").default} style={{width: 800}} alt="Gif demonstrando o upload de imagens" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Autores</p>

&emsp;O gif acima apresenta o processo de realizar o upload de uma nova imagem a partir do computador, além de demonstrar o resultado após a classificação feita pelo modelo.

## Geração de relatórios

&emsp;Outra implementação importante é a função de geração de relatórios em PDF, que consolida automaticamente as informações de fissuras registradas por prédio, tipo e direção geográfica.

&emsp;O relatório gerado contém um resumo executivo com informações da expedição predial (como data, local e responsável técnico), seguido por uma tabela com a distribuição das fissuras por orientação geográfica, discriminando entre tipos térmicos e de retração. Também são apresentados os detalhamentos individuais das fissuras, incluindo tipo, confiabilidade do modelo e orientação correspondente.

&emsp;Essa funcionalidade é especialmente útil para inspeções formais pois permite a geração instantânea de relatórios visuais e estruturados, eliminando a necessidade de compilar informações manualmente.

<p style={{textAlign: 'center'}}>Gif 3 - Gerar relatórios</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/gifsAplicacao/criar_relatorio.gif").default} style={{width: 800}} alt="Gif demonstrando o relatório" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Autores</p>

&emsp;O gif acima apresenta o processo de geração do relatório e demonstra como as informações estão organizadas em seu interior.

## Gráficos integrados com o backend

&emsp;Os gráficos da tela de fissuras foram atualizados e agora se conectam dinamicamente ao backend. Eles apresentam, em tempo real, a contagem total de cada tipo de fissura (térmica ou de retração) e também a distribuição geográfica por direção (Norte, Sul, Leste, Oeste), com base nos dados reais registrados no banco de dados para o prédio selecionado. 

&emsp;Além disso, a quantidade total de fissuras atribuídas ao prédio é exibida diretamente no cabeçalho da tela, permitindo uma visão geral imediata do status da inspeção.

&emsp;Essa atualização proporciona maior confiabilidade analítica e facilita o monitoramento de padrões estruturais. Por exemplo, se há concentração de fissuras do tipo térmica em fachadas voltadas ao oeste, isso pode indicar problemas com dilatação térmica excessiva nessa direção, gerando assim uma análise valiosa para os usuários.

&emsp;É possível visualizar essas atualizações ocorrendo nos [gifs 1](#gif1) e [2](#gif2) apresentados nesta documentação.

## Conclusão

&emsp;As melhorias desta sprint consolidam a tela de fissuras como um centro de controle mais robusto e interativo para o gerenciamento de dados estruturais. Com as novas funcionalidades, o sistema avança significativamente em direção a um fluxo de inspeção técnica mais fluido, confiável e automatizado.
