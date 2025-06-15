---
sidebar_position: 4
custom_edit_url: null
---

# Rotas de Imagem

## Registrar imagem
A rota POST `/image/add` recebe os campos url, nome, hora_coleta, orientacao, id_predio e opcionalmente id_modelo. Ao processar a requisição, o serviço instancia um novo objeto Image com esses atributos, persiste-o no banco e retorna status 201 com:

```
{ 
  "message": "Imagem registrada com sucesso!",
  "id": 123
}
```

Em caso de falha, responde com status 500 e a mensagem de erro.

## Atualizar imagem
A rota PATCH `/image/update` exige o campo id para localizar o registro; se não encontrado, lança “Imagem não encontrada!” e retorna 500. Em seguida, atualiza os campos fornecidos entre url, nome, hora_coleta, orientacao, id_predio e id_modelo, mantendo os valores anteriores quando não informados. Após confirmar a transação, retorna status 200 com:

```
{
  "message": "Imagem atualizada com sucesso!",
  "image": { … }
}
```

Em caso de qualquer exceção, faz rollback e devolve status 500 com o detalhe do erro.