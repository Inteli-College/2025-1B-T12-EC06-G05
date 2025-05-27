---
sidebar_position: 2
custom_edit_url: null
---

# Rotas de Fissura

## Conceito
Essas rotas permitem o gerenciamento de registros de fissuras detectadas, incluindo criação, leitura, atualização e remoção.

## Cadastro de Fissura

```
/fissure/add
```

* **Método**: POST
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Corpo da Requisição**:

```
{
  "confiabilidade": "",
  "categoria": "",
  "id_image": ""
}
```
* **Resposta Esperada**:

  * status code: 201
  * *response*:

```
{
  "message": "Fissura registrada com sucesso!"
}
```

---

## Buscar Todos os Fissuras

```
/fissure/all
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Fissuras encontradas com sucesso",
  "fissures": [
    {
      "id": 0,
      "confiabilidade": "",
      "categoria": "",
      "id_image": ""
    }
  ]
}
```

---

## Buscar Fissura por ID

```
/fissure/<id_fissure>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Fissura encontrada com sucesso",
  "fissure": {
      "id": 0,
      "confiabilidade": "",
      "categoria": "",
      "id_image": ""
  }
}
```

---

## Deletar Fissura

```
/fissure/delete/<id_fissure>
```

* **Método**: DELETE
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Fissura deletada com sucesso!"
}
```

---

## Atualizar Fissura

```
/fissure/update
```

* **Método**: PATCH
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Corpo da Requisição**:

```
{
    "id": 0,
    "confiabilidade": "",
    "categoria": "",
    "id_image": ""
}
```

* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Fissura atualizada com sucesso!",
  "fissure": 
  {
      "id": 0,
      "confiabilidade": "",
      "categoria": "",
      "id_image": ""
  }
}
```

---

## Buscar Fissura por ID Prédio

```
/fissure/predio/<id_predio>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:
```
{
  "message": "Fissuras encontradas com sucesso",
  "fissure": 
      "termicas":[
        {
          "id": 0,
          "confiabilidade": "",
          "categoria": "",
          "id_image": ""
        }
      ],
      "retracao":[
        {
          "id": 0,
          "confiabilidade": "",
          "categoria": "",
          "id_image": ""
        }
      ]
  "sem-classificacao": [
        {
          "id": 0,
          "confiabilidade": "",
          "categoria": "",
          "id_image": ""
        }
      ],
}
```