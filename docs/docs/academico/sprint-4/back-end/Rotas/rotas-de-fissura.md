---
sidebar_position: 3
custom_edit_url: null
---

# Rotas de Fissura

## Criar fissura
A rota POST `/fissure/add` aceita os campos confiabilidade, categoria, id_image, url_fissura e categoria_atual. Ao receber os dados, o serviço instancia um novo objeto de fissura com esses atributos, persiste-o no banco de dados e retorna status 201 com"Fissura registrada com sucesso!". Em caso de falha, responde com status 500 e o detalhe da exceção.

## Atualizar fissura
A rota PATCH `/fissure/update` busca o registro existente pelo campo id e valida sua existência, lançando “Fissura não encontrada!” se não existir. Em seguida, permite a atualização dos campos confiabilidade, categoria, id_image, url_fissura e categoria_atual, usando os valores fornecidos ou mantendo os anteriores. Após aplicar as alterações, confirma a transação e retorna status 200 com 
```
{
  "message": "Fissura atualizada com sucesso!",
  "fissure": { … }
}. 
```
Se qualquer erro ocorrer, efetua rollback e responde com status 500 e o erro.

## Listar fissuras por prédio
A rota GET `/fissures/predio/<id_predio>` filtra as fissuras associadas ao prédio via relacionamento com Image.id_predio. Se não houver registros, lança “Não há fissuras nesse prédio” e retorna status 500. Caso existam fissuras, agrupa-as por categoria_atual nas chaves "termica" e "retracao", reúne as demais em "sem-classificacao" e calcula métricas — incluindo total geral, quantidade por categoria e distribuição por orientação. Retorna status 200 com

```
{
  "message": "Fissuras encontradas com sucesso",
  "fissures": { "termica": […], "retracao": […] },
  "sem-classificacao": […],
  "metricas": { … }
}
```