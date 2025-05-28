---
sidebar_position: 1
custom_edit_url: null
---

# Banco de Dados

## Introdução

&emsp; O contexto do nosso projeto envolve inicialmente a manipulação de dados para treinar modelos capazes de classificar rachaduras em imagens de superfícies e, uma vez alcançado um resultado satisfatório, aplicar essa classificação automática em produção. Além disso, desenvolvemos uma interface web acessível apenas a usuários cadastrados, onde serão exibidas todas as informações coletadas durante as expedições realizadas pela equipe do IPT. Por isso, é fundamental contar com uma estrutura de armazenamento eficiente para registrar e consultar esses dados. Para atender a essa necessidade, optamos por um banco de dados relacional. Um sistema de gestão que organiza informações em tabelas compostas por linhas, que representam registros, e colunas, que definem atributos desses registros. As tabelas podem se relacionar por meio de chaves primárias e estrangeiras, o que facilita a recuperação de dados relacionados e garante a integridade referencial e a consistência das informações.

## Arquitetura

&emsp; A seguir, apresentamos o diagrama do nosso banco de dados e uma explicação detalhada de cada tabela e seus relacionamentos.

<p style={{textAlign: 'center'}}>Figura 1 - Banco de Dados</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../static/img/database.png").default} style={{width: 800}} alt="Banco de Dados" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Introdução

&emsp;A estrutura do nosso banco de dados baseia-se em chaves primárias e chaves estrangeiras. A chave primária é um campo (ou conjunto de campos) que identifica de forma única cada registro em uma tabela, impedindo duplicatas; aqui, todas as nossas tabelas possuem um atributo chamado “id” como chave primária. Já a chave estrangeira é um campo que referencia a chave primária de outra tabela, criando vínculos entre os dados e garantindo a integridade referencial; no nosso projeto, elas seguem o padrão “id_(nome_da_tabela_referenciada)".

### User

| Linhas  | Descrição | Tipo | 
|------|-----------|------------------| 
| id | Identificador único de cada usuário | Chave primaria | 
| email | Endereço de e-mail usado para autenticação | String
| nome_completo | Nome completo do usuário para exibição e identificação | String | 
| senha | Senha de acesso (armazenada de forma segura/criptografada) | String | 
| cargo | Função ou perfil de acesso do usuário dentro da aplicação | String | 

### Expedition

| Linhas  | Descrição | Tipo | 
|------|-----------|------------------| 
| id | Identificador único de cada expedição | Chave primaria | 
| nome | Nome atribuído à expedição | String
| localização | Localidade onde a expedição foi realizada | String | 
| data_criacao | Data em que o registro da expedição foi criado | String | 
| ultima_att | Data da última atualização feita no registro da expedição | String | 
| id_responsavel | Identificador do usuário responsável pela expedição; referência a `user.id` | Chave estrangeira | 
| descricao | Texto descritivo detalhando o propósito e atividades da expedição | String | 
| foto_capa | URL ou caminho do arquivo de imagem utilizado como foto de capa | String | 

### Building

| Linhas  | Descrição | Tipo | 
|------|-----------|------------------| 
| id | Identificador único de cada edifício | Chave primaria | 
| id_expedicao | Identificador da expedição à qual o edifício pertence; referência a `expedition.id` | Chave estrangeira |
| nome | Nome do edifício | String | 
| complemento | Informação adicional do endereço ou referência complementar | String | 
| descricao | Descrição detalhada do edifício, como características e finalidade | String | 
| foto_fachada | URL ou caminho da foto da fachada do edifício | String | 

### Image

| Linhas  | Descrição | Tipo | 
|------|-----------|------------------| 
| id | Identificador único de cada edifício | Chave primaria | 
| url | Identificador da expedição à qual o edifício pertence; referência a `expedition.id` | Chave estrangeira |
| nome | Nome do edifício | String | 
| hora_coleta | Informação adicional do endereço ou referência complementar | String | 
| orientacao | Descrição detalhada do edifício, como características e finalidade | String | 
| id_predio | URL ou caminho da foto da fachada do edifício | String | 
| img_resultado |  | String |
| anotacao |  | String |
| confiabilidade |  | String |
| id_modelo |  | String |

### Fissure

| Linhas  | Descrição | Tipo | 
|------|-----------|------------------| 
| id | Identificador único de cada edifício | Chave primaria | 
| id_expedicao | Identificador da expedição à qual o edifício pertence; referência a `expedition.id` | Chave estrangeira |
| nome | Nome do edifício | String | 
| complemento | Informação adicional do endereço ou referência complementar | String | 
| descricao | Descrição detalhada do edifício, como características e finalidade | String | 
| foto_fachada | URL ou caminho da foto da fachada do edifício | String | 

### Model

### Audit

### Result






