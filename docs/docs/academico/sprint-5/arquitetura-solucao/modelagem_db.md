---
sidebar_position: 2
custom_edit_url: null
title: "Modelagem do Banco de Dados"
---

# Modelagem do Banco de Dados

## Introdução

&emsp; A modelagem de dados do projeto foi concebida para organizar de forma estruturada as informações obtidas nas expedições e gerar suporte robusto ao processo de classificação de fissuras por modelos de visão computacional. A arquitetura segue o modelo relacional, garantindo integridade referencial por meio de chaves primárias e estrangeiras e permitindo escalabilidade e clareza nos relacionamentos entre os elementos principais do sistema.

## Diagrama da Modelagem

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama da Modelagem do Banco de Dados</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("@site/static/img/modelagem_banco.png").default} style={{width: 800}} alt="Modelagem do Banco de Dados" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Tabelas

### User

| Campo         | Descrição                                                                 | Tipo          |
|---------------|---------------------------------------------------------------------------|---------------|
| id            | Identificador único de cada usuário                                       | Chave primária |
| email         | Endereço de e-mail usado para autenticação (único)                       | String(200)   |
| nome_completo | Nome completo do usuário para exibição e identificação                    | String(200)   |
| senha         | Senha de acesso (armazenada de forma segura/criptografada)                | String        |
| cargo         | Função ou perfil de acesso do usuário dentro da aplicação                 | String        |

Relacionamentos:  
- Pode ser responsável por uma ou mais expedições (`Expedition`)
- Pode atuar como auditor (`Audit`)
- Gera logs de interação com o sistema (`Log`)


### Expedition

| Campo         | Descrição                                                                 | Tipo            |
|---------------|---------------------------------------------------------------------------|-----------------|
| id            | Identificador único de cada expedição                                     | Chave primária  |
| nome          | Nome atribuído à expedição                                                | String(200)     |
| localizacao   | Localidade onde a expedição foi realizada                                 | String          |
| data_criacao  | Data em que o registro da expedição foi criado                            | Date            |
| ultima_att    | Data da última atualização feita no registro da expedição                 | Date (nullable) |
| id_responsavel| Identificador do usuário responsável; referência a `user.id`              | Chave estrangeira |
| descricao     | Texto descritivo detalhando o propósito e atividades da expedição         | String          |
| foto_capa     | URL da imagem utilizada como foto de capa                                 | String          |

Relacionamento:  
- Uma expedição pode agrupar vários edifícios (`Building`).


### Building

| Campo         | Descrição                                                                 | Tipo             |
|---------------|---------------------------------------------------------------------------|------------------|
| id            | Identificador único de cada edifício                                      | Chave primária   |
| id_expedicao  | Identificador da expedição; referência a `expedition.id`                  | Chave estrangeira|
| nome          | Nome do edifício                                                          | String(200)      |
| complemento   | Informação adicional do endereço ou referência                            | String           |
| descricao     | Descrição detalhada do edifício                                           | String           |
| foto_fachada  | URL da imagem da fachada do edifício                                      | String           |

Relacionamento:  
- Cada edifício pode ter várias imagens associadas (`Image`).


### Image

| Campo        | Descrição                                                                  | Tipo              |
|--------------|----------------------------------------------------------------------------|-------------------|
| id           | Identificador único da imagem                                              | Chave primária    |
| url          | URL onde a imagem original está armazenada                                 | String            |
| nome         | Nome do arquivo da imagem                                                  | String(200)       |
| hora_coleta  | Data e hora da captura                                                     | DateTime          |
| orientacao   | Direção cardeal da fachada no momento da imagem                            | String            |
| id_predio    | Referência ao prédio relacionado; `building.id`                            | Chave estrangeira |
| id_modelo    | Referência ao modelo usado na análise (opcional); `model.id`               | Chave estrangeira (nullable) |

Relacionamento:  
- Cada imagem pode conter múltiplas fissuras (`Fissure`).


### Fissure

| Campo          | Descrição                                                                  | Tipo              |
|----------------|----------------------------------------------------------------------------|-------------------|
| id             | Identificador único da fissura                                             | Chave primária    |
| confiabilidade | Grau de confiança na classificação                                         | Integer           |
| categoria      | Classificação original da fissura                                          | String(200)       |
| id_image       | Imagem associada; referência a `image.id`                                  | Chave estrangeira |
| url_fissura    | URL da imagem recortada contendo apenas a fissura                          | String            |
| categoria_atual| Nova classificação após auditoria (se houver)                              | String(200)       |

Relacionamentos:  
- Pode ser auditada via `Audit`.


### Audit

| Campo         | Descrição                                                                  | Tipo              |
|---------------|----------------------------------------------------------------------------|-------------------|
| id            | Identificador único da auditoria                                           | Chave primária    |
| data_auditoria| Data em que a auditoria foi realizada                                      | Date              |
| id_fissura    | Fissura auditada; referência a `fissure.id`                                | Chave estrangeira |
| id_auditor    | Usuário responsável pela auditoria; referência a `user.id`                 | Chave estrangeira |
| status        | Estado da auditoria (validado, rejeitado, pendente)                        | Integer           |
| modified      | Indicador se a anotação foi modificada (0 = não, 1 = sim)                  | Integer (booleano)|


### Model

| Campo     | Descrição                                                                  | Tipo           |
|-----------|-----------------------------------------------------------------------------|----------------|
| id        | Identificador único do modelo                                              | Chave primária |
| url       | Caminho do arquivo do modelo                                               | String         |
| nome      | Nome de identificação do modelo                                            | String(200)    |
| tipo      | Tipo de arquitetura usada (ex: CNN, ResNet, etc.)                          | String         |
| loss      | Valor final da função de perda após treinamento                            | Integer        |
| loss_tipo | Tipo de função de perda utilizada (ex: "cross_entropy", "MSE")             | String         |

Relacionamento:  
- Cada modelo pode estar associado a várias imagens (`Image`).


### Log

| Campo         | Descrição                                                                  | Tipo              |
|---------------|----------------------------------------------------------------------------|-------------------|
| id            | Identificador único do log                                                 | Chave primária    |
| id_responsavel| Usuário que gerou o log; referência a `user.id`                            | Chave estrangeira |
| data          | Data e hora da ação                                                        | DateTime          |
| status        | Código de status do evento                                                 | Integer           |
| descricao     | Texto descritivo sobre o evento registrado                                 | String(500)       |


## Relacionamentos Gerais

- **1:N** entre `User` e `Expedition`, `Audit`, `Log`
- **1:N** entre `Expedition` e `Building`
- **1:N** entre `Building` e `Image`
- **1:N** entre `Image` e `Fissure`
- **1:N** entre `Fissure` e `Audit`
- **1:N** entre `Model` e `Image` (opcional)


## Conclusão

&emsp; A modelagem relacional adotada fornece a estrutura necessária para gerenciar dados de forma robusta, mantendo a integridade e escalabilidade do sistema. A separação clara entre as entidades permite rastrear todo o ciclo de vida das imagens — desde a coleta até a auditoria das fissuras detectadas — oferecendo transparência, controle de qualidade e auditabilidade ao processo.


> _Fonte: Os autores (2025)_
