---
sidebar_position: 3
title: "Treinamento de Modelo"
sidebar_label: "Treinamento de Modelo"
---

## Atualizações

&emsp; Entre a sprint passada e a atual, realizamos pesquisas no site oficial da [Ultralytics](https://docs.ultralytics.com/pt/quickstart/) para compreender melhor seus modelos e identificar aquele que apresentasse o melhor desempenho para nosso projeto. Durante essa investigação, descobrimos que, em 20 de fevereiro de 2025, foi lançada a versão YOLOv12, marcando uma evolução significativa em relação às versões anteriores.

&emsp; O YOLOv12 introduz uma arquitetura centrada em mecanismos de atenção, afastando-se das abordagens tradicionais baseadas em redes neurais convolucionais (CNNs). Essa mudança permite que o modelo foque de maneira mais eficaz nas áreas mais relevantes de uma imagem, melhorando a precisão na detecção de objetos. Além disso, o YOLOv12 incorpora inovações como o módulo de atenção por área (*Area Attention*), que processa grandes regiões da imagem de forma eficiente. Essas melhorias resultam em um desempenho superior em tarefas de visão computacional, mantendo a velocidade necessária para aplicações em tempo real.

&emsp; A utilização do YOLOv12 em nosso projeto é altamente relevante, pois aborda desafios específicos deste tipo de aplicação. As imagens capturadas pelos drones frequentemente apresentam fissuras pequenas, com baixo contraste e inseridas em fundos complexos, o que dificulta sua detecção precisa. O YOLOv12, com sua arquitetura centrada em mecanismos de atenção, melhora significativamente a capacidade do modelo de focar nas regiões mais relevantes da imagem, mesmo em cenários com ruído visual e variações de iluminação.

<p style={{textAlign: 'center'}}>Figura 1 - Comparação YOLOv12</p>
<div style={{margin: 25}}>  
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/YOLOv12.jpg").default} style={{width: 800}} alt="Resultados de um dos nossos primeiros treinamentos" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Ultralytics (2025)</p>

&emsp; A imagem acima ilustra bem a diferença entre os últimos modelos lançados pela empresa.

## Treinamento e Performance

&emsp; Durante esta sprint, tivemos à disposição um supercomputador equipado com a GPU NVIDIA RTX A6000 — uma placa de vídeo de alto desempenho projetada para cargas de trabalho exigentes em inteligência artificial, renderização e computação científica — o que otimizou o treinamento do modelo.

&emsp; Como mencionado anteriormente, estamos utilizando a versão 12 do YOLO e, após diversos testes, chegamos à configuração mais eficaz do modelo, conforme demonstrado abaixo:

```python
# Importando a biblioteca da Ultralytics para usar o YOLO
from ultralytics import YOLO

# Definindo a versão do YOLO que será usada no treinamento
model = YOLO("yolov12n.pt")

model.train(
    data='data.yaml',  # Caminho para o arquivo de configuração do dataset
    epochs=160,        # Número de épocas
    imgsz=512,         # Tamanho das imagens
    device=0,          # Define a GPU como local de processamento do treinamento
    lr0=0.03           # Taxa de aprendizado do modelo 
)
```

&emsp; Abaixo, é apresentado um vídeo demonstrando a eficiência do modelo:

<p style={{textAlign: 'center'}}>Vídeo 1 - Teste ao vivo do YOLOv12</p>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/409bYx61VSg?si=VGeo_IwmygPlB47D" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

  Como é possível observar, a quinta imagem apresentada no vídeo foi classificada de forma incorreta pelo modelo, o que evidencia a necessidade de incluir novos exemplos no conjunto de treinamento.

  Para testar os limites do nosso modelo, o submetemos a situações para as quais ele ainda não havia sido treinado — como detectar fissuras em imagens com sombras ou com janelas próximas às fissuras. A seguir, mostramos vídeos com o desempenho do modelo nessas condições.

<p style={{textAlign: 'center'}}>Vídeo 2 - Teste do modelo com sombras</p>
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/_d0wmA5K_5w?si=eKkNTBfhgP1Uqjkn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

<p style={{textAlign: 'center'}}>Vídeo 3 - Teste do modelo com janelas</p>
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/0unF__QeUHY?si=nGuoIiAUChqJ_aVJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

  Ao observar atentamente os vídeos, é possível notar que ainda existem diversas dificuldades na identificação de fissuras nos cenários apresentados. Por isso, optamos por ampliar nosso dataset com novas imagens.

## Conclusão

  Com base nas análises e testes apresentados, concluímos que a adoção do YOLOv12 representa um avanço significativo para o projeto. Sua arquitetura baseada em mecanismos de atenção mostrou-se mais eficaz na detecção de fissuras em ambientes complexos, superando limitações de versões anteriores.

  No entanto, os testes também evidenciaram que o modelo ainda apresenta dificuldades em situações específicas, como imagens com sombras intensas ou elementos visuais próximos às fissuras. Isso reforça a importância da curadoria contínua do conjunto de dados, bem como da realização de testes em cenários variados.

## Referências

ULTRALYTICS. [YOLOv12 — Overview](https://docs.ultralytics.com/pt/models/yolo12/). Disponível em: https://docs.ultralytics.com/pt/models/yolo12/. Acesso em: 30 de maio de 2025.