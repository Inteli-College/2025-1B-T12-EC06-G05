---
sidebar_position: 2
custom_edit_url: /arquitetura-de-informacao
---

# Arquitetura de Informação

## Introdução

&emsp;A arquitetura da informação é a arte e a ciência de organizar e rotular websites, aplicativos digitais e conteúdo online para apoiar a usabilidade e a navegabilidade. Ela envolve a criação de uma estrutura lógica que facilita o encontro de informações pelos usuários. Esse processo requer um entendimento profundo sobre como as pessoas pensam e como elas buscam e utilizam as informações. Ao estruturar os dados de maneira clara e acessível, a arquitetura da informação melhora tanto a experiência do usuário quanto a eficiência dos sistemas complexos.

## Contexto do Projeto

&emsp;Este projeto foca no desenvolvimento de um software para a detecção e classificação de fissuras em edificações. Utilizando imagens capturadas por drones ou câmeras, o sistema tem como objetivo automatizar a identificação e a análise do tipo de cada fissura encontrada. Atualmente, a inspeção manual é o método predominante, um processo que consome tempo e está sujeito a imprecisões. O software proposto busca transformar essa realidade, oferecendo aos profissionais uma ferramenta para realizar análises de forma mais rápida, prática, segura e precisa.     
&emsp;A organização do sistema e suas interfaces foram concebidas levando em conta as necessidades específicas de cada tipo de usuário (persona), garantindo uma navegação intuitiva e o acesso facilitado às ferramentas relevantes para suas respectivas funções.
 

## Personas e Suas Necessidades  

**Alberto (Pesquisador)**

&emsp;Atualmente, o processo de inspeção para identificação de fissuras é lento, podendo levar meses para ser concluído. Essa demora impacta diretamente na capacidade de resposta e no planejamento de ações corretivas.   
&emsp;Além do tempo, existe também a dificuldade em garantir precisão na identificação e no registro das fissuras, o que pode gerar retrabalho e aumentar os custos. 

**Airton (Piloto de Drone)**

&emsp;Atualmente, Airton enfrenta a dificuldade de garantir, durante a operação, que as imagens capturadas estejam com a qualidade necessária para a análise de fissuras.   
&emsp;A possibilidade de acompanhar as imagens em tempo real por meio de uma interface paralela facilita seu trabalho, permitindo ajustes imediatos de ângulo, distância e foco, sem a necessidade de etapas adicionais de verificação pós-voo.

## Diagrama - Pesquisador 


<p style={{textAlign: 'center'}}>Figura 1 - Arquitetura de Informação - Pesquisador</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/Arquitetura_Informacao_Alberto.png").default} style={{width: 800}} alt="Arquitetura de Informação - Pesquisador" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


**Descrição das interações**

&emsp;Assim que o pesquisador faz o login, ele é levado diretamente à página de Histórico, onde ficam registradas todas as expedições já realizadas, com as respectivas datas para facilitar a gestão. Ao selecionar uma dessas expedições, ele visualiza os prédios inspecionados naquela ocasião, organizados como subpastas — isso ajuda na separação por prédio, garantindo que os dados fiquem bem organizados.    
&emsp;Dentro de cada prédio, é possível visualizar todas as imagens analisadas, que ficará separadas automaticamente entre dois tipos principais (ex: Tipo A e Tipo B, com base na classificação da fissura). Além disso, há um painel com estatísticas, que mostra de forma clara a distribuição percentual das classificações — ideal para entender rapidamente a gravidade geral da situação.

Ainda nessa tela, o pesquisador pode:

- Gerar um relatório completo para enviar ao cliente que solicitou a inspeção;

- Fazer o upload de novas imagens, caso alguma tenha sido esquecida ou capturada por outro dispositivo, como um celular. Essas imagens passam imediatamente pelo processo de análise automática, integrando-se às demais.

&emsp;Por fim, na tela de histórico o usuário também pode clicar em "Nova Expedição" para iniciar um novo processo de inspeção. Isso cria uma nova pasta no histórico, iniciando um novo ciclo de organização de dados.

## Diagrama - Piloto de Drone


<p style={{textAlign: 'center'}}>Figura 2 - Arquitetura de Informação - Piloto de Drone</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/Arquitetura_Informacao_Alberto.png").default} style={{width: 800}} alt="Arquitetura de Informação - Piloto de Drone" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Descrição das interações**

&emsp;Embora o piloto de drone não utilize diretamente a plataforma principal, ele interage com o sistema por meio de uma interface paralela, desenvolvida para funcionar em tempo real durante os voos. Nessa tela, ele consegue visualizar as imagens capturadas instantaneamente e acompanhar a análise automática feita pelo sistema.

 Para cada imagem exibida, o sistema mostra:

- A porcentagem de confiança de que há uma fissura presente na imagem;

- A porcentagem de acerto sobre o tipo de fissura (por exemplo, térmica ou retração).

&emsp;Essa visualização em tempo real, ajuda o piloto a ajustar o enquadramento, a distância e o ângulo da câmera ainda durante o voo, garantindo imagens mais claras e relevantes — o que reduz a chance de erros e retrabalhos posteriores. 

&emsp;Caso o sistema indique uma confiança baixa, mas o piloto perceba que há sim uma fissura, ele pode clicar no botão “Confirmar Fissura”. Com isso, ele é redirecionado para a plataforma principal, usada pelo pesquisador, onde essa imagem será integrada ao fluxo normal de análise e registro.

## Conclusão

&emsp;Através da arquitetura de informação, é possível mapear de forma clara como a plataforma deve funcionar para atender melhor às necessidades das personas. Ela orienta a estrutura do sistema, ajudando a organizar as funcionalidades de forma lógica e garantindo uma experiência mais intuitiva e eficiente para cada perfil de usuário.

## Bibliografia
PESSOA, Mariana. Arquitetura da informação: o que é, como fazer e exemplos práticos. Conversion, 29 nov. 2022. Disponível em: https://www.conversion.com.br/blog/arquitetura-da-informacao/. Acesso em: 29 abr. 2025.