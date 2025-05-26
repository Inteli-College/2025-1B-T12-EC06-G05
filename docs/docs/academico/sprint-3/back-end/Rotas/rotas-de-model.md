---
sidebar_position: 2
custom_edit_url: null
---

# Rotas de Modelo

## Conceito
Essas rotas permitem o gerenciamento de modelos de machine learning armazenados no sistema, incluindo criação, leitura, atualização e remoção.

## Cadastro de Modelo

```
/model/add
```

* **Método**: POST
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Corpo da Requisição**:

```
{
  "url": "",
  "nome_modelo": "",
  "tipo": "",
  "loss": 0,
  "loss_tipo": ""
}
```
* **Resposta Esperada**:

  * status code: 201
  * *response*:

```
{
  "message": "Modelo registrado com sucesso!"
}
```

---

## Buscar Todos os Modelos

```
/model/all
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Modelos encontrados com sucesso",
  "models": [
    {
      "id": 1,
      "url": "...",
      "nome": "...",
      "tipo": "...",
      "loss": 0.0,
      "loss_tipo": "..."
    }
  ]
}
```

---

## Buscar Modelo por ID

```
/model/<id_model>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Modelo encontrado com sucesso",
  "model": {
    "id": 1,
    "url": "...",
    "nome": "...",
    "tipo": "...",
    "loss": 0.0,
    "loss_tipo": "..."
  }
}
```

---

## Deletar Modelo

```
/model/delete/<id_model>
```

* **Método**: DELETE
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Modelo deletado com sucesso!"
}
```

---

## Atualizar Modelo

```
/model/update
```

* **Método**: PATCH
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Corpo da Requisição**:

```
{
  "id": 1,
  "url": "...",
  "nome": "...",
  "tipo": "...",
  "loss": 0.0,
  "loss_tipo": "..."
}
```

* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Modelo atualizado com sucesso!",
  "model": {
    "id": 1,
    "url": "...",
    "nome": "...",
    "tipo": "...",
    "loss": 0.0,
    "loss_tipo": "..."
  }
}
```
