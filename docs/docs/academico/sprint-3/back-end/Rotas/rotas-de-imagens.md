---
sidebar_position: 3
custom_edit_url: null
---

# Rotas de Imagem

## Conceito
Essas rotas permitem o gerenciamento de imagens coletadas e processadas pelo sistema, incluindo criação, leitura, atualização, remoção e busca por prédio.

## Cadastro de Imagem

```
/image/add
```

* **Método**: POST
* **Cabeçalho da Requisição**:
  * Authorization: Bearer `<access_token>`
* **Corpo da Requisição**:
```
{
  "url": "",
  "nome": "",
  "hora_coleta": "",
  "orientacao": "",
  "id_predio": "",
  "img_resultado": "",
  "anotacao": "",
  "id_modelo": ""
}
```
* **Resposta Esperada**:
  * status code: 201
  * *response*:
```
{
  "message": "Imagem registrada com sucesso!"
}
```

---

## Buscar Todas as Imagens

```
/image/all
```

* **Método**: GET  
* **Cabeçalho da Requisição**:
  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:
  * status code: 200
  * *response*:
```
{
  "message": "Imagens encontradas com sucesso",
  "images": [
    {
      "id": 1,
      "url": "...",
      "nome": "...",
      "hora_coleta": "...",
      "orientacao": "...",
      "id_predio": "...",
      "img_resultado": "...",
      "anotacao": "...",
      "confiabilidade": ...,
      "id_modelo": "..."
    }
  ]
}
```

---

## Buscar Imagem por ID

```
/image/<id_image>
```

* **Método**: GET  
* **Cabeçalho da Requisição**:
  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:
  * status code: 200
  * *response*:
```
{
  "message": "Imagem encontrada com sucesso",
  "image": {
    "id": 1,
    "url": "...",
    "nome": "...",
    "hora_coleta": "...",
    "orientacao": "...",
    "id_predio": "...",
    "img_resultado": "...",
    "anotacao": "...",
    "confiabilidade": ...,
    "id_modelo": "..."
  }
}
```

---

## Deletar Imagem

```
/image/delete/<id_image>
```

* **Método**: DELETE  
* **Cabeçalho da Requisição**:
  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:
  * status code: 200
  * *response*:
```
{
  "message": "Imagem deletada com sucesso!"
}
```

---

## Atualizar Imagem

```
/image/update
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
  "hora_coleta": "...",
  "orientacao": "...",
  "id_predio": "...",
  "img_resultado": "...",
  "anotacao": "...",
  "confiabilidade": ...,
  "id_modelo": "..."
}
```
* **Resposta Esperada**:
  * status code: 200
  * *response*:
```
{
  "message": "Imagem atualizada com sucesso!",
  "image": {
    "id": 1,
    "url": "...",
    "nome": "...",
    "hora_coleta": "...",
    "orientacao": "...",
    "id_predio": "...",
    "img_resultado": "...",
    "anotacao": "...",
    "confiabilidade": ...,
    "id_modelo": "..."
  }
}
```

---

## Buscar Imagens por Prédio

```
/image/by_predio/<id_predio>
```

* **Método**: GET  
* **Cabeçalho da Requisição**:
  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:
  * status code: 200
  * *response*:
```
{
  "message": "Imagens encontradas com sucesso",
  "images": [
    {
      "id": 1,
      "url": "...",
      "nome": "...",
      "hora_coleta": "...",
      "orientacao": "...",
      "id_predio": "...",
      "img_resultado": "...",
      "anotacao": "...",
      "confiabilidade": ...,
      "id_modelo": "..."
    }
  ]
}
```