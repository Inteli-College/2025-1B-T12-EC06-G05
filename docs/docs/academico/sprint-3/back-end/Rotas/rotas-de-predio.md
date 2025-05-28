---
sidebar_position: 4
custom_edit_url: null
---

# Rotas de Prédio

## Conceito 
&emsp;Estas rotas estão responsável por toda manipulação de prédios dentro do nosso sistema, como o cadastro de prédios, visualização de prédios e atualização de dados de prédios.


## Registro de prédio
&emsp;Rota protegida, somente acessada por usuários logados.

```
/building/register
```

* **Método**: POST
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Corpo da Requisição**:
```
  {
    "id_expedicao": 1,
    "nome": "",
    "complemento": "",
    "descricao": "",
    "foto_fachada": ""
  }
```
 - **Resposta Esperada**:
    - status code : 201
    - *response*:
```
{
  "message": "Prédio registrado com sucesso!"
}
```

## Deletar prédio
&emsp;Rota protegida, somente acessada por usuários logados.

```
/building/delete/<int:id_building>
```

* **Método**: DELETE
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Prédio deletado com sucesso!"
}
```

---

## Buscar prédio por ID
&emsp;Rota protegida, somente acessada por usuários logados.

```
/building/<int:id_building>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Prédio encontrado com sucesso",
  "building": {
    "id": ...,
    "complemento": "...",
    "descricao": "...",
    "foto_fachada": "...",
    "id_expedicao": ...,
    "nome": "..."
  }  
}
```

---

## Buscar todas os prédios
&emsp;Rota protegida, somente acessada por usuários logados.

```
/building/all
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Prédios encontradas com sucesso"
  "buildings": [
    {
    "id": 1,
    "complemento": "...",
    "descricao": "...",
    "foto_fachada": "...",
    "id_expedicao": ...,
    "nome": "..."
    },
    ...
  ]
}
```

---


## Atualizar dados de prédio
&emsp;Rota protegida, somente acessada por usuários logados.

```
/building/update
```

* **Método**: PATCH
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Prédio atualizada com sucesso!"
  "building": {
    "id": ...,
    "complemento": "...",
    "descricao": "...",
    "foto_fachada": "...",
    "id_expedicao": ...,
    "nome": "..."
  }  
}
```