---
sidebar_position: 1
custom_edit_url: null
---

# Pré-processamento

## Conceito
&emsp; O pré-processamento de imagens consiste nas operações iniciais realizadas em dados de imagem brutos para torná-los adequados à análise e ao treinamento de modelos de visão computacional (MAAHIP, 2023). Seu principal objetivo é melhorar a qualidade do dado visual, reduzindo ruídos indesejados e realçando características relevantes para a tarefa em questão, como classificação ou detecção de objetos (Analytics Vidhya, 2023)

&emsp; Entre as operações mais comuns estão o redimensionamento (resize), a normalização de valores de pixel e a equalização de histograma, além de filtragens para remoção de ruído e detecção de bordas. Normalmente, utilizamos bibliotecas como OpenCV e frameworks de Deep Learning  que oferecem funções otimizadas para realiar essas etapas, permitindo pipelines de pré-processamento eficientes e reproducíveis em Python.

### Aplicação no projeto
&emsp; Para nosso algoritmo de detecção de fissuras em revestimentos de argamassa, testamos uma série de filtros que:

- **Suavizam manchas e texturas de fundo**  
- **Realçam bordas e contornos de fissuras**  
- **Equalizam contraste quando necessário**

&emsp; No pré-processamento, seguimos um fluxo sequencial de filtros para uniformizar os dados de entrada e ressaltar as fissuras contra o fundo de argamassa:

1. **Redimensionamento**  
   Primeiro, redimensionamos todas as imagens para 512×512 pixels, garantindo consistência de escala e reduzindo a carga computacional do modelo.

2. **Conversão para escala de cinza**  
   Em seguida, convertemos BGR para um único canal de intensidade, simplificando o processamento e focando na informação de luminância.

3. **Black-hat Morphology**  
   Aplicamos a operação black-hat morfológica para “achatar” o fundo claro e destacar defeitos escuros, isolando fissuras finas do revestimento .

4. **Flat-field Correction**  
   Normalizamos o resultado do black-hat e subtraímos do canal cinza original para corrigir variações de iluminação e uniformizar o brilho de fundo.

5. **Gaussian Blur Reforçado**  
   Usamos um desfoque Gaussiano com kernel maior para atenuar manchas amplas e irregularidades superficiais sem borrar significativamente as bordas.

6. **Median Blur**  
   Aplicamos um filtro mediano para remover “speckles” e ruído pontual (sal e pimenta), preservando contornos mais finos.

7. **Bilateral Filter**  
   Em seguida, suavizamos regiões homogêneas enquanto mantemos arestas nítidas, reforçando ainda mais as linhas de fissura.

8. **Unsharp Mask**  
   Para realçar micro-contornos, combinamos a imagem suavizada com sua versão borrada através de adição ponderada, amplificando o contraste de bordas.

9. **CLAHE (Equalização Adaptativa de Histograma)**  
   No script de batch, introduzimos CLAHE para equalizar localmente o contraste em áreas muito claras ou escuras, melhorando a visibilidade das fissuras em diferentes condições de iluminação.

&emsp; Esse encadeamento produz imagens com ruído minimizado e bordas de fissura acentuadas, facilitando a segmentação e a classificação precisa pelas etapas subsequentes do modelo.

&emsp; A seguir, está uma imagem que mostra o comportamento de cada filtro na imagem.

<p style={{textAlign: 'center'}}>Figura 1 - Fissuras com filtro</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/filtros_fissuras.png").default} style={{width: 800}} alt="Fissuras com filtro" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Labeling

&emsp; Nesta seção, detalhamos o processo de anotação (labeling) aplicado às imagens pré-processadas, classificando fissuras térmicas e de retração para treinamento do modelo.

#### Ferramenta Utilizada  
- **MakeSense.ai**: ferramenta gráfica open-source otimizada para tarefas de anotação de visão computacional, com suporte a COCO, Pascal VOC e YOLO.  
  Link: https://www.makesense.ai/

<p style={{textAlign: 'center'}}>Figura 2 - Fissuras com filtro</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT1.png").default} style={{width: 800}} alt="Fissuras com filtro" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Upload de imagens**: interface para subir as imagens que serão anotadas.

<p style={{textAlign: 'center'}}>Figura 3 - Upload de imagens</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT2.png").default} style={{width: 800}} alt="Upload de imagens" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Estrutura de Labels**: selecione “Object Detection” e crie as classes para anotação:
  - `termica`
  - `retracao`

<p style={{textAlign: 'center'}}>Figura 4 - Estrutura de Labels</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT3.png").default} style={{width: 800}} alt="Estrutura de Labels" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Desenho de Bounding Boxes**: marque retângulos ao redor de cada fissura, atribuindo o label correto.

<p style={{textAlign: 'center'}}>Figura 5 - Desenho de Bounding Boxes</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT4.png").default} style={{width: 800}} alt="Desenho de Bounding Boxes" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>



- **Revisão e Controle de Qualidade**: Verificar duplicidades e posições incorretas, garantindo cobertura completa das fissuras visíveis.

- **Exportação e Organização**: Por fim, exportamos as labels das imagens clicando em _Actions_, selecionando _Export Annotation_

<p style={{textAlign: 'center'}}>Figura 6 - Exportação e Organização</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT5.png").default} style={{width: 800}} alt="Exportação e Organização" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Formato de Anotação**: Optamos pelo exportar em formato **YOLO** para integração direta com o pipeline de treinamento. Cada anotação segue:  

    `<label_id> <x_center> <y_center> <width> <height>`

    onde `x_center`, `y_center`, `width` e `height` são normalizados pela largura e altura da imagem.

<p style={{textAlign: 'center'}}>Figura 7 - Formato de Anotação</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT6.png").default} style={{width: 800}} alt="Formato de Anotação" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Estruturação do dataset**

    - Utilizando um script de divisão randômica, separamos o dataset em 60 % das imagens para treino e 40 % para validação.  
    - Empregamos um script em Python que distribui automaticamente as imagens e seus arquivos `.txt` de labels nas pastas correspondentes.  

    Estrutura de pastas:
    - Aplicamos uma divisão de pastas para 60% de iamgens para treino e 40% para validação
    - Estruturar o dataset:
        ```
        dataset/
        └─ images/
            ├─ train/
            └─ val/
        ```
<p style={{textAlign: 'center'}}>Figura 8 - Exemplo de estruturação do dataset</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/CT7.png").default} style={{width: 800}} alt="Estruturação do dataset" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Conclusão

&emsp; O pipeline descrito padroniza e limpa as imagens, realça fissuras e organiza anotações no formato YOLO, resultando em um dataset consistente para treino (60 %/40 %) e validação. Esses procedimentos garantem qualidade e precisão na detecção automática de fissuras em revestimentos, sendo facilmente adaptáveis a outras aplicações de visão computacional.  

### Observação

&emsp; Testamos dois pipelines de pré-processamento — um com CLAHE ao final e outro com Unsharp Mask — e avaliamos seu impacto nas métricas de desempenho e na classificação de imagens fora do conjunto de treino. Como ambos os pipelines não trouxeram ganhos significativos de acurácia nem robustez, optamos por utilizar as imagens originais, sem aplicação de filtros adicionais.  


#### Referências:

MAAHIP, M. *The Complete Guide to Image Preprocessing Techniques in Python*. Medium, 04 jun. 2023. Disponível em: https://medium.com/@maahip1304/the-complete-guide-to-image-preprocessing-techniques-in-python-dca30804550c. Acesso em: 16 maio 2025.  
Great Learning. *Introduction to Image Pre-Processing*. Great Learning, 2020. Disponível em: https://www.mygreatlearning.com/blog/introduction-to-image-pre-processing/. Acesso em: 16 maio 2025.  
ANALYTICS VIDHYA. *Image Processing: Preprocessing Techniques with OpenCV*. Analytics Vidhya, 06 mar. 2023. Disponível em: https://www.analyticsvidhya.com/blog/2023/03/getting-started-with-image-processing-using-opencv/. Acesso em: 16 maio 2025.  
GEEKSFORGEEKS. *Image Processing Algorithms in Computer Vision*. GeeksforGeeks, 2024. Disponível em: https://www.geeksforgeeks.org/image-processing-algorithms-in-computer-vision/. Acesso em: 16 maio 2025.