---
sidebar_position: 1
custom_edit_url: null
---

# Armazenamento de Arquivos na Núvem

&emsp;Antes de falar sobre o banco de dados em si, é importante destacar como lidamos com outro tipo de informação essencial para o nosso projeto: os arquivos. Estamos falando principalmente das **imagens coletadas durante as expedições** e dos **modelos treinados de machine learning**.

&emsp; Esses arquivos são volumosos e não se encaixam bem na estrutura de um banco de dados relacional tradicional. Por isso, adotamos o uso do Amazon S3, um serviço de armazenamento em nuvem voltado para esse tipo de dado.

&emsp; Com o S3, conseguimos armazenar imagens com alta qualidade, sem compressões indesejadas, e manter nossos modelos versionados e organizados, prontos para serem utilizados em produção. Além disso, os arquivos ficam acessíveis via links diretos, o que facilita a integração com a nossa interface web e com o próprio banco de dados, onde salvamos apenas as referências.

&emsp; Essa escolha permite que a gente separe o que é estruturado do que é não estruturado, mantendo a performance, escalabilidade e organização do sistema como um todo.

## Esquema

&emsp; A seguir, apresentamos um diagrama visual do armazenamento de imagens.

<p style={{textAlign: 'center'}}>Figura 1 - Armazenamento de Arquivos</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../../static/img/bucket.png").default} style={{width: 800}} alt="Armazenamento de Arquivos" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>