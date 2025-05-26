---
sidebar_position: 1
custom_edit_url: null
---

# Rotas de Usuário

## Conceito 
&emsp;Estas rotas estão responsável por toda manipulação de usuários dentro do nosso sistema, como o cadastro e login de usuários, utilizando autenticação JWT para geração de tokens de acesso.


## Rota para cadastro do usuário

```
/user/register
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "email": "",
    "senha": "",
    "nome_completo": "",
    "cargo": "",
}
```

 - **Resposta Esperada**:
    - status code : 201
    - *response*:
```
{
  "message": "Usuário registrado com sucesso!"
}
```

---

## Rota para login do usuário

```
/user/login
```

* **Método**: POST
* **Corpo da Requisição**:

```
{
    "email": "",
    "senha": ""
}
```

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "access_token": "..."
}
```

---

## Rota para deletar um usuário
&emsp;Rota protegida, somente acessada por usuários logados e com perfil de administradores.

```
/user/delete/<int:id_user>
```

* **Método**: DELETE
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`

* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Usuário deletado com sucesso!"
}
```

---

## Rota para buscar usuário por ID
&emsp;Rota protegida, somente acessada por usuários logados.

```
/user/<int:id_user>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Usuário encontrado com sucesso",
  "user": {
    "id": 1,
    "email": "...",
    "nome_completo": "...",
    "cargo": "..."
  }
}
```

---

## Rota para buscar usuários por cargo
&emsp;Rota protegida, somente acessada por usuários logados.

```
/user/cargo/<string:cargo>
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Usuários encontrados com sucesso",
  "users": [
    {
      "id": 1,
      "email": "...",
      "nome_completo": "...",
      "cargo": "..."
    },
    ...
  ]
}
```

---

## Rota para buscar todos os usuários
&emsp;Rota protegida, somente acessada por usuários logados.

```
/user/all
```

* **Método**: GET
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Usuários encontrados com sucesso",
  "users": [
    {
      "id": 1,
      "email": "...",
      "nome_completo": "...",
      "cargo": "..."
    },
    ...
  ]
}
```

---

## Rota para atualziar o usuário
&emsp;Rota protegida, somente acessada por usuários logados.

```
/user/update
```

* **Método**: PATCH
* **Cabeçalho da Requisição**:

  * Authorization: Bearer `<access_token>`
* **Corpo da Requisição**:

```
{
    "id": 0,
    "email": "",
    "nome_completo": "",
    "cargo": "",
}
```
* **Resposta Esperada**:

  * status code: 200
  * *response*:

```
{
  "message": "Usuário atualizado com sucesso",
  "user": [
    {
      "id": 1,
      "email": "...",
      "nome_completo": "...",
      "cargo": "..."
    },
    ...
  ]
}
```

