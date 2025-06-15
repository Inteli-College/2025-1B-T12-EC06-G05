---
sidebar_position: 2
custom_edit_url: null
---

# Arquitetura do Banco de Dados 

## Tabelas Adicionadas e Atualizações

### Audit

| Linhas         | Descrição                                                                 | Tipo            |
|----------------|---------------------------------------------------------------------------|-----------------|
| id             | Identificador único de cada auditoria                                     | Chave primária  |
| data_auditoria | Data em que a auditoria foi realizada                                     | Date            |
| id_fissura     | Identificador da fissura auditada; referência a `fissure.id`              | Chave estrangeira |
| id_auditor     | Identificador do auditor responsável; referência a `user.id`              | Chave estrangeira |
| status         | Estado atual da auditoria (ex: validado, rejeitado, pendente)             | Integer         |
| modified       | Indica se a anotação original foi modificada após a auditoria             | Integer (booleano: 0 ou 1) |

Esta tabela registra o processo de auditoria das fissuras detectadas. Cada registro está vinculado a um auditor e a uma fissura específica, permitindo controle de qualidade sobre as classificações feitas automaticamente.

---

### Building (atualizada)

| Linhas       | Descrição                                                                        | Tipo            |
|--------------|----------------------------------------------------------------------------------|-----------------|
| id           | Identificador único de cada edifício                                             | Chave primária  |
| id_expedicao | Identificador da expedição à qual o edifício pertence; referência a `expedition.id` | Chave estrangeira |
| nome         | Nome do edifício                                                                 | String(200)     |
| complemento  | Informação adicional do endereço ou referência complementar                      | String          |
| descricao    | Descrição detalhada do edifício, como características e finalidade               | String          |
| foto_fachada | URL da imagem da fachada do edifício                                             | String          |

Esta tabela possui um relacionamento de um-para-muitos com a tabela `Image`, permitindo que múltiplas imagens estejam associadas a um mesmo edifício.

---

### Expedition (atualizada)

| Linhas         | Descrição                                                                 | Tipo            |
|----------------|---------------------------------------------------------------------------|-----------------|
| id             | Identificador único de cada expedição                                     | Chave primária  |
| nome           | Nome atribuído à expedição                                                | String(200)     |
| localizacao    | Localidade onde a expedição foi realizada                                 | String          |
| data_criacao   | Data em que o registro da expedição foi criado                            | Date            |
| ultima_att     | Data da última atualização feita no registro da expedição                 | Date (nullable) |
| id_responsavel | Identificador do usuário responsável; referência a `user.id`              | Chave estrangeira |
| descricao      | Texto descritivo detalhando o propósito e atividades da expedição         | String          |
| foto_capa      | URL da imagem utilizada como foto de capa                                 | String          |

Esta tabela se relaciona com `Building`, permitindo que uma expedição agrupe diversos edifícios. O campo `id_responsavel` representa o vínculo com a tabela `User`, identificando quem criou a expedição.

---

### Fissure (atualizada)

| Linhas           | Descrição                                                                 | Tipo              |
|------------------|---------------------------------------------------------------------------|-------------------|
| id               | Identificador único de cada fissura                                       | Chave primária    |
| confiabilidade   | Grau de confiança na detecção ou classificação da fissura                | Integer           |
| categoria        | Classificação da fissura conforme seu tipo                               | String(200)       |
| id_image         | Identificador da imagem à qual a fissura pertence; referência a `image.id` | Chave estrangeira |
| url_fissura      | URL da imagem recortada destacando apenas a fissura                      | String            |
| categoria_atual  | Nova classificação (caso revisada por auditoria ou outro processo)        | String(200)       |

A tabela `Fissure` está conectada à tabela `Image` através do campo `id_image`, e também se relaciona com a tabela `Audit`, permitindo o registro de auditorias para cada fissura. O campo `categoria_atual` permite armazenar uma reclassificação opcional após validações.

### Image (atualizada)

| Linhas       | Descrição                                                                 | Tipo              |
|--------------|---------------------------------------------------------------------------|-------------------|
| id           | Identificador único de cada registro de imagem                           | Chave primária    |
| url          | URL onde a imagem original está armazenada                               | String            |
| nome         | Nome do arquivo de imagem                                                 | String(200)       |
| hora_coleta  | Data e hora em que a imagem foi coletada                                  | DateTime          |
| orientacao   | Orientação cardeal da fachada do edifício no momento da captura           | String            |
| id_predio    | Identificador do prédio ao qual a imagem pertence; referência a `building.id` | Chave estrangeira |
| id_modelo    | Identificador do modelo utilizado na análise; referência a `model.id`     | Chave estrangeira (nullable) |

A tabela `Image` se relaciona com a tabela `Fissure`, representando todas as fissuras detectadas na imagem. O campo `id_modelo` é opcional, permitindo armazenar o modelo que analisou a imagem, se aplicável.

### Log

| Linhas         | Descrição                                                                 | Tipo              |
|----------------|---------------------------------------------------------------------------|-------------------|
| id             | Identificador único de cada log                                           | Chave primária    |
| id_responsavel | Identificador do usuário responsável pela ação; referência a `user.id`    | Chave estrangeira |
| data           | Data e hora em que o evento foi registrado                                | DateTime          |
| status         | Código de status ou tipo do evento registrado                             | Integer           |
| descricao      | Descrição textual da ação realizada ou evento ocorrido                    | String(500)       |

A tabela `Log` registra eventos e ações realizadas por usuários no sistema, permitindo rastreamento e auditoria de interações. Cada log está vinculado a um usuário através do campo `id_responsavel`.

### Model (atualizada)

| Linhas     | Descrição                                                               | Tipo          |
|------------|-------------------------------------------------------------------------|---------------|
| id         | Identificador único de cada modelo                                      | Chave primária |
| url        | Referência à localização do arquivo do modelo em storage               | String        |
| nome       | Nome de identificação do modelo                                         | String(200)   |
| tipo       | Categoria do modelo (por exemplo: CNN, ResNet, etc.)                   | String        |
| loss       | Valor da função de perda (loss) obtido ao final do treinamento         | Integer       |
| loss_tipo  | Nome da função de perda utilizada (ex: “cross_entropy”, “MSE”)         | String        |

O modelo se relaciona com a tabela `Image`, permitindo rastrear quais imagens foram analisadas com base em cada modelo treinado.

### User (atualizada)

| Linhas         | Descrição                                                                 | Tipo          |
|----------------|---------------------------------------------------------------------------|---------------|
| id             | Identificador único de cada usuário                                       | Chave primária |
| email          | Endereço de e-mail usado para autenticação (único)                       | String(200)   |
| nome_completo  | Nome completo do usuário para exibição e identificação                    | String(200)   |
| senha          | Senha de acesso (armazenada de forma segura/criptografada)                | String        |
| cargo          | Função ou perfil de acesso do usuário dentro da aplicação                 | String        |

O usuário pode ser responsável por expedições (`Expedition`), realizar auditorias de fissuras (`Audit`) e gerar registros de log (`Log`). O campo `email` deve ser único no sistema para garantir a autenticação segura.

## Alterações no Banco de Dados

### ✅ Tabela Adicionada

- **`audit`**: nova tabela para controle de auditorias sobre fissuras. Relaciona-se com `user` (auditor) e `fissure`.
- **`log`**: nova tabela para registrar eventos e interações de usuários no sistema.

### ♻️ Tabelas Atualizadas

- **`building`**
  - Confirmação de que os campos `complemento`, `descricao` e `foto_fachada` são do tipo `String` sem limite explícito.
  - Adição do relacionamento com `Image` via `db.relationship`.

- **`expedition`**
  - Inclusão de relacionamento com `Building` via `predios`.
  - Uso de `back_populates` para relacionamento bidirecional com `User`.

- **`fissure`**
  - Adição dos campos `url_fissura` e `categoria_atual`.
  - Inclusão de relacionamento com `Audit`.

- **`image`**
  - Remoção dos campos obsoletos `img_resultado` e `anotacao`.
  - Adição do relacionamento com `Fissure` e confirmação de `id_modelo` como nullable.

- **`model`**
  - Adição do relacionamento com `Image`.

- **`user`**
  - Campo `email` definido como único (`unique=True`).
  - Inclusão dos relacionamentos com `Expedition`, `Audit` e `Log` via `back_populates`.

---

> _Fonte: Os autores (2025)_