---
sidebar_position: 7
custom_edit_url: null
---

# Rotas de Log

## Registrar log

Rota protegida, acessível apenas a usuários autenticados.

```
POST /log/register
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Corpo da requisição**:

  ```json
  {
    "id_responsavel": 10,
    "status": "OK",
    "descricao": "Descrição do evento"
  }
  ```

  - `id_responsavel` (obrigatório): ID do usuário responsável pelo log
  - `status` (obrigatório): código ou descrição de status
  - `descricao` (obrigatório): descrição detalhada do log

- **Resposta de sucesso** (`201`):

  ```json
  {
    "message": "Log registrado com sucesso!",
    "logInformation": { … },
    "id": 789
  }
  ```

- **Erros**:

  - `400 Bad Request`: campo obrigatório ausente ou formato inválido
  - `404 Not Found`: usuário responsável não encontrado
  - `500 Internal Server Error`: falha ao persistir log

---

## Deletar log

Rota protegida, acessível apenas a usuários autenticados.

```
DELETE /log/delete/<int:id_log>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Log deletado com sucesso!"
  }
  ```

- **Erros**:

  - `404 Not Found`: log não encontrado
  - `500 Internal Server Error`: falha ao deletar log

---

## Atualizar log

Rota protegida, acessível apenas a usuários autenticados.

```
PATCH /log/update
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Corpo da requisição**:

  ```json
  {
    "id": 789,
    "status": "PENDENTE",
    "descricao": "Nova descrição"
  }
  ```

  - `id` (obrigatório): identificador do log
  - `status`, `descricao` (opcionais): campos a serem atualizados

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Log atualizado com sucesso!",
    "log": { … }
  }
  ```

- **Erros**:

  - `400 Bad Request`: ausência de `id` ou campo inválido
  - `404 Not Found`: log não encontrado
  - `500 Internal Server Error`: falha ao atualizar log

---

## Buscar log por ID

Rota protegida, acessível apenas a usuários autenticados.

```
GET /log/<int:id_log>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Log encontrado com sucesso",
    "log": { … }
  }
  ```

- **Erros**:

  - `404 Not Found`: log não encontrado
  - `500 Internal Server Error`: falha ao buscar log por ID

---

## Buscar logs por status

Rota protegida, acessível apenas a usuários autenticados.

```
GET /log/status/<string:status_code>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Logs encontrados com sucesso para status <status_code>",
    "logs": [ … ]
  }
  ```

- **Erros**:

  - `404 Not Found`: nenhum log com o status informado
  - `500 Internal Server Error`: falha ao buscar logs por status

---

## Buscar logs por usuário

Rota protegida, acessível apenas a administradores ou ao próprio usuário.

```
GET /log/user/<int:id_user>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Logs encontrados com sucesso para o usuário ID: <id_user>",
    "logs": [ … ]
  }
  ```

- **Erros**:

  - `403 Forbidden`: acesso negado para não administradores ou terceiros
  - `404 Not Found`: usuário ou logs não encontrados
  - `500 Internal Server Error`: falha ao buscar logs por usuário

---


## Listar todos os logs

Rota protegida, acessível apenas a administradores.

```
GET /log/all
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Todos os logs encontrados com sucesso",
    "logs": [ … ]
  }
  ```

- **Erros**:

  - `403 Forbidden`: acesso negado para não administradores
  - `404 Not Found`: nenhum log registrado
  - `500 Internal Server Error`: falha ao buscar todos os logs

