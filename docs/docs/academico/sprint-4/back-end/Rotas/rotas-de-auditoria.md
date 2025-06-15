---
sidebar_position: 6
custom_edit_url: null
---

# Rotas de Auditoria

## Registrar auditoria

Rota protegida, acessível apenas a usuários autenticados.

```
POST /audit/register
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Corpo da requisição**:

  ```json
  {
    "id_fissura": 123,
    "modified": "2025-06-14T12:34:56Z"
  }
  ```

  - `id_fissura` (obrigatório): identificador da fissura a ser auditada
  - `modified` (opcional): data/hora de modificação

- **Resposta de sucesso** (`201`):

  ```json
  {
    "message": "Auditoria registrada com sucesso!",
    "auditInformation": { … },
    "id": 456
  }
  ```

- **Erros**:

  - `400 Bad Request`: falta de campo obrigatório
  - `404 Not Found`: usuário auditor não encontrado
  - `500 Internal Server Error`: falha ao persistir auditoria

---

## Deletar auditoria

Rota protegida, acessível apenas a usuários autenticados.

```
DELETE /audit/delete/<int:id_audit>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Auditoria deletada com sucesso!"
  }
  ```

- **Erros**:

  - `404 Not Found`: auditoria não encontrada
  - `500 Internal Server Error`: falha ao deletar auditoria

---

## Atualizar auditoria

Rota protegida, acessível apenas a usuários autenticados.

```
PATCH /audit/update
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Corpo da requisição**:

  ```json
  {
    "id": 456,
    "id_fissura": 123,
    "id_auditor": 10,
    "status": 2
  }
  ```

  - `id` (obrigatório): identificador da auditoria
  - `id_fissura`, `id_auditor`, `status` (opcionais): campos a serem atualizados

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Auditoria atualizada com sucesso!",
    "audit": { … }
  }
  ```

- **Erros**:

  - `400 Bad Request`: ausência de `id` ou campo inválido
  - `404 Not Found`: auditoria não encontrada
  - `500 Internal Server Error`: falha ao atualizar auditoria

---

## Buscar auditoria por ID

Rota protegida, acessível apenas a usuários autenticados.

```
GET /audit/<int:id_audit>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Auditoria encontrada com sucesso",
    "audit": { … }
  }
  ```

- **Erros**:

  - `404 Not Found`: auditoria não encontrada
  - `500 Internal Server Error`: falha ao buscar auditoria

---

## Buscar auditorias por fissura

Rota protegida, acessível apenas a usuários autenticados.

```
GET /audit/fissure/<int:id_fissura>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Auditorias encontradas com sucesso",
    "audits": [ … ]
  }
  ```

- **Erros**:

  - `404 Not Found`: nenhuma auditoria para a fissura
  - `500 Internal Server Error`: falha ao buscar auditorias

---

## Buscar auditorias por usuário

Rota protegida, acessível apenas a usuários autenticados; apenas administradores ou o próprio auditor podem acessar.

```
GET /audit/user/<int:id_auditor>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Auditorias encontradas com sucesso",
    "audits": [ … ]
  }
  ```

- **Erros**:

  - `404 Not Found`: auditor ou auditorias não encontrados
  - `500 Internal Server Error`: falha ao buscar auditorias

---

## Listar todas as auditorias

Rota protegida, acessível apenas a administradores.

```
GET /audit/all
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Resposta de sucesso** (`200`):

  ```json
  {
    "message": "Todas as auditorias encontradas com sucesso",
    "audits": [ … ]
  }
  ```

- **Erros**:

  - `403 Forbidden`: acesso negado para não administradores
  - `404 Not Found`: nenhuma auditoria registrada
  - `500 Internal Server Error`: falha ao buscar auditorias

