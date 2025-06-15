---
sidebar_position: 2
custom_edit_url: null
---

# Rotas de Expedição

## Buscar expedição pelo responsável

&emsp; A rota GET `/expedition/user/<id_user>` recebe o identificador do responsável e retorna todas as expedições associadas a ele. 

&emsp; Ao ser chamada, o serviço executa uma consulta filtrando pelo campo id_responsavel; se não houver resultados, interrompe o fluxo e retorna erro com a mensagem “Nenhuma expedição encontrada para esse usuário!” e status 500. 

&emsp; Caso existam expedições, converte cada registro em dicionário via as_dict(), agrega em uma lista e devolve status 200 com o JSON padrão, contendo "message": "Expedições encontradas com sucesso" e o array "expeditions". 

&emsp; Em qualquer outra falha, captura a exceção e responde com status 500 indicando o detalhe do erro.
