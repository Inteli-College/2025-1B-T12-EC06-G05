---
sidebar_position: 1
custom_edit_url: null
---

# Rotas de Expedição

## Conceito 
&emsp;Estas rotas estão responsável por toda manipulação de expedições dentro do nosso sistema, como o cadastro de expedições, visualização de expedições e pesquisa por nome ou data de criação


## Rota para registro de expedição

```
/expedition/register
```

* **Método**: POST
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Corpo da Requisição**:
```
{
  "nome": "",
  "localizacao": "",            
  "data_criacao": "",
  "id_responsavel": "",
  "descricao": "",
  "foto_capa": ""
}
```
 - **Resposta Esperada**:
    - status code : 201
    - *response*:
```
{
  "message": "Expedição registrado com sucesso!"
}
```

## Rota para deletar expedição

```
/expedition/delete/<int:id_expedition>
```

* **Método**: DELETE
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Expedição deletado com sucesso!"
}
```

---

## Rota para buscar expedição por ID
&emsp;Rota protegida, somente acessada por usuários logados.

```
/expedition/<int:id_expedition>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Expedição encontrado com sucesso",
  "expedition": {
    "id": 1,
    "nome": "...",
    "localizacao": "...",            
    "data_criacao": "...",
    "ultima_att": "...",
    "id_responsavel": "...",
    "descricao": "...",
    "foto_capa": "..."
  }
}
```

---

## Rota para buscar todas as expedições
&emsp;Rota protegida, somente acessada por usuários logados.

```
/expedition/all
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Expedições encontradas com sucesso",
  "expeditions": [
    {
      id": 1,
      "nome": "...",
      "localizacao": "...",            
      "data_criacao": "...",
      "ultima_att": "...",
      "id_responsavel": "...",
      "descricao": "...",
      "foto_capa": "..."
    },
    ...
  ]
}
```

---

## Rota para buscar expedição por nome
&emsp;Rota protegida, somente acessada por usuários logados.

```
/expedition/search/nome
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Expedições encontradas", 
  "results": [
    {
    "id": 1,
    "nome": "...",
    "localizacao": "...",            
    "data_criacao": "...",
    "ultima_att": "...",
    "id_responsavel": "...",
    "descricao": "...",
    "foto_capa": "..."
    },
  ...
  ]
}
```

---

## Rota para buscar expedição por data_criacao
&emsp;Rota protegida, somente acessada por usuários logados.

```
/expedition/search/data_criacao
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Expedições encontradas", 
  "results": [
    {
    "id": 1,
    "nome": "...",
    "localizacao": "...",            
    "data_criacao": "...",
    "ultima_att": "...",
    "id_responsavel": "...",
    "descricao": "...",
    "foto_capa": "..."
    },
  ...
  ]
}
```

---

## Rota para atualizar dados de expedição
&emsp;Rota protegida, somente acessada por usuários logados.

```
/expedition/search/data_criacao
```

* **Método**: PATCH
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Expedition atualizada com sucesso!",
  "expedition": {
    "id": 1,
    "nome": "...",
    "localizacao": "...",            
    "data_criacao": "...",
    "ultima_att": "...",
    "id_responsavel": "...",
    "descricao": "...",
    "foto_capa": "..."
  }
}
```