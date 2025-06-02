---
title: "Geração de Imagens"
sidebar_label: "Geração de Imagens"
sidebar_position: 1
---

# Geração de Imagens

## Contextualização do foco da sprint

&emsp;Durante a Sprint atual, a equipe expandiu a cobertura dos dados utilizados no processo de treino e avaliação do modelo de detecção de fissuras. O objetivo dessa ampliação é aumentar a robustez e a capacidade de generalização do sistema diante de situações mais complexas e realistas encontradas em campo. No entanto, devido à limitação de imagens reais com anotações em determinados cenários críticos, optamos por complementar a base com imagens sintéticas geradas por inteligência artificial. 

&emsp;Após análise de ferramentas disponíveis, escolhemos utilizar o modelo de geração Sora, da OpenAI, por sua capacidade de produzir imagens fotorrealistas com alto nível de detalhamento, preservando texturas e condições de iluminação verossímeis.

&emsp;A escolha do Sora foi baseada em três principais critérios que se resumem em: (1) fidelidade visual, já que a rede neural requer sinais visuais claros para distinguir fissuras reais de ruído; (2) capacidade de representar variações específicas solicitadas por prompt, como direção, tipo de material, presença de manchas ou ângulos da cena; e (3) facilidade de iteração, permitindo ajustar rapidamente a formulação até que o resultado gerado atendesse às expectativas visuais de um inspetor técnico. 

&emsp;Os prompts foram construídos seguindo uma lógica de engenharia reversa do cenário real: primeiro se define o tipo de fissura (térmica, retração, etc.), depois o tipo de superfície (cor, textura, estado de conservação), em seguida as condições de iluminação e por fim elementos de contexto visual (ex: perspectiva, objetos adicionais, etc.).

## Primeiro caso: Imagens capturadas em perspectiva

&emsp;O primeiro novo caso de teste consiste em imagens capturadas em perspectiva, ou seja, em ângulos inclinados em relação à superfície inspecionada. Essa escolha se baseia no fato de que, em contextos reais de voo com drones, é comum que as capturas não sejam feitas de forma ortogonal à parede, principalmente devido a obstáculos ou limitações de manobra. A intenção é treinar o modelo para reconhecer fissuras mesmo quando a perspectiva distorce visualmente suas características. 

&emsp;Abaixo é possível visualizar um exemplo prompt construído e imagens geradas a partir dele:

**Fissura térmica:** *Prompt: Gere uma imagem realista de uma parede externa de concreto com reboco claro, exibindo uma fissura térmica horizontal com bifurcações suaves. A imagem deve estar em perspectiva oblíqua, como se fosse capturada por um drone em voo lateral, simulando inspeção predial. O plano inclinado da parede deve manter a visibilidade das rachaduras mesmo com ângulo de visão levemente diagonal. Iluminação natural, sem sombras duras.*

**Fissura de retração:** *Prompt: Gere uma imagem realista de uma fachada externa de concreto, com acabamento claro ou levemente desgastado, apresentando fissuras de retração iniciando nas quinas superiores e descendo em traçado vertical ou oblíquo. As fissuras devem seguir o padrão típico da retração: curtas, paralelas ou levemente ramificadas. Inclua manchas sutis de sujeira e descolamento do reboco em pequenas áreas próximas às quinas. A iluminação deve evidenciar o relevo da fissura sem gerar sombra intensa.*

<p style={{textAlign: 'center'}}>Figura 1 - Figura térmica em perspectiva</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/termica-1.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

<p style={{textAlign: 'center'}}>Figura 2 - Figura de retração em perspectiva</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/retracao-1.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Segundo caso: Imagens com objetos adicionais

&emsp;O segundo caso contempla imagens contendo objetos adicionais além das fissuras, como fios, canos, folhas, sombras projetadas e marcas superficiais irrelevantes. Esses elementos são frequentes no ambiente urbano e podem induzir o modelo ao erro, especialmente se ainda não houver exemplos suficientes para aprendizado. Com isso, buscamos tornar o sistema mais robusto diante de ruídos visuais e interferências externas. 

&emsp;Abaixo é possível visualizar o prompt construído e uma imagem de exemplo:

**Fissuras térmicas:** *Prompt: Gere uma imagem realista de uma fachada de concreto claro com textura de reboco liso, apresentando uma fissura térmica horizontal com ramificações secundárias finas. A parede deve conter também interferências visuais comuns a ambientes urbanos, como canos externos, ar-condicionado, fios elétricos ou vegetação parcial. A fissura deve continuar claramente visível mesmo com esses elementos no entorno. Iluminação natural em dia parcialmente nublado.*

<p style={{textAlign: 'center'}}>Figura 3 - Figura térmica com objetos adicionais</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/termica-2.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Fissuras de retração:** *Prompt: Gere uma imagem realista de uma parede externa de concreto liso com acabamento em reboco de concreto claro, sem juntas aparentes, exibindo manchas sutis de sujeira e alguns pontos com leve descolamento do revestimento. A superfície da parede apresenta fissuras de retração visíveis, com traçado predominantemente vertical e oblíquo, de curta extensão e espessura fina porém discernível a olho nu — evitando que sejam hiperfinas ou quase invisíveis no concreto. As fissuras surgem em áreas amplas e espaçadas, com distribuição aleatória, e seguem padrões típicos da retração do material, como linhas paralelas ou com leves ramificações. A parede deve ser acompanhada de objetos comuns como fios expostos, canos ou caixas de elétrica que estão próximos ou atravessam as fissuras, destacando a interação entre as fissuras e os objetos ao redor. A iluminação natural suave deve destacar o relevo superficial das fissuras, as imperfeições no reboco, e a presença dos objetos, sem gerar sombras duras, permitindo que a fissura e o ambiente ao redor sejam bem visíveis.*

<p style={{textAlign: 'center'}}>Figura 4 - Figura de retração com objetos adicionais</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/retracao-2.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Terceiro caso: Fissuras em superfícies diferentes do concreto simples

&emsp;No terceiro cenário, foram incluídas fissuras presentes em superfícies de materiais diferentes do concreto simples, como paredes com pintura colorida, reboco com textura ou acabamentos cerâmicos. O modelo anterior havia sido treinado quase exclusivamente com concreto cru, o que limita sua performance em construções mais comuns, especialmente residenciais. 

&emsp;Ao incorporar essa variedade de texturas e cores, o sistema passa a ser mais versátil para diferentes contextos de inspeção. 

&emsp;Abaixo é possível visualizar o prompt construído e uma imagem de exemplo:

**Fissuras térmicas:** *Prompt: Gere uma imagem realista da fachada de um prédio externo pintado em cor pastel (como bege, azul claro ou verde-claro), com leve desgaste de tinta em algumas regiões. A parede apresenta uma fissura térmica horizontal contínua e ramificações suaves, com abertura de até 0,5 mm. As rachaduras devem ser visíveis sobre a superfície pintada e o contraste deve ser suficiente para a observação. A iluminação natural deve ressaltar o relevo da fissura, sem tornar a imagem artificial. A fissura não deve ocupar o centro absoluto da imagem, mas estar claramente legível.*

<p style={{textAlign: 'center'}}>Figura 5 - Figura térmica em superfícies diferentes do concreto simples</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/termica-3.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Fissuras de retração:** *Prompt: Gere uma imagem realista da parede externa de um prédio residencial com pintura colorida (amarelo-claro, azul claro, salmão ou verde pálido). A superfície deve apresentar fissuras de retração curtas, visíveis a olho nu, com traçado vertical ou oblíquo. As fissuras devem ser discretamente destacadas sobre a tinta, com áreas desgastadas ou descascadas ao redor de algumas rachaduras, revelando o reboco abaixo. Iluminação suave e natural, que ajude a mostrar o contraste entre fissura e fundo pintado.*

<p style={{textAlign: 'center'}}>Figura 6 - Figura de retração em superfícies diferentes do concreto simples</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/retracao-3.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Quarto caso: Interferência de umidade e sombras intensas

&emsp;O quarto caso de teste, introduzido como sugestão nesta sprint, envolve imagens com interferência de umidade ou sombras intensas. Fissuras podem ser confundidas com manchas escuras ou linhas formadas por infiltrações e mofo. Da mesma forma, sombras duras em ambientes externos podem esconder ou simular rachaduras. Incluir esse tipo de cenário visa reduzir falsos positivos e negativos em ambientes de baixa previsibilidade luminosa. 

&emsp;Abaixo é possível visualizar o prompt construído e uma imagem de exemplo:

**Fissura térmica:** *Prompt: Gere uma imagem realista de uma parede externa de concreto com acabamento em reboco claro, apresentando uma fissura térmica horizontal longa e levemente ondulada, com ramificações finas. A superfície deve apresentar sinais visíveis de umidade, como manchas escuras irregulares, especialmente nas regiões inferiores da parede, e áreas com escorrimento. A iluminação deve ser intensa, com sombras marcadas projetadas por elementos próximos como grades, árvores ou marquises, parcialmente encobrindo a fissura. Ainda assim, a fissura principal e suas ramificações devem permanecer visíveis. A textura da parede deve ter leve desgaste e pontos de descolamento do reboco.*

<p style={{textAlign: 'center'}}>Figura 7 - Figura térmica com interferência de umidade e sombras intensas</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/termica-4.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Fissura de retração:** *Prompt: Gere uma imagem realista de uma parede externa de concreto com reboco claro, exibindo fissuras de retração visíveis, curtas, predominantemente verticais ou oblíquas, distribuídas de forma aleatória. A superfície deve apresentar manchas de umidade em diferentes níveis da parede, com áreas escurecidas por infiltração ou escorrimento de água. Elementos arquitetônicos ou vegetação próxima devem projetar sombras intensas que cruzam parte das fissuras. A iluminação solar direta deve gerar contraste forte entre luz e sombra, dificultando parcialmente a leitura da superfície. Apesar disso, as fissuras devem permanecer discerníveis para análise visual.*

<p style={{textAlign: 'center'}}>Figura 8 - Figura de retração com interferência de umidade e sombras intensas</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/retracao-4.png").default}style={{width: 400}} alt="US06 Pesquisador" />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Conclusão

&emsp;A introdução desses novos casos de teste amplia significativamente o espectro de cenários cobertos pelo modelo de detecção, tornando-o mais preparado para lidar com condições reais e menos suscetível a erro em ambientes complexos. A incorporação estratégica de imagens geradas por IA garante diversidade visual, acelera o ciclo de desenvolvimento e reforça a confiabilidade do sistema FissurAI em aplicações práticas de inspeção predial.
