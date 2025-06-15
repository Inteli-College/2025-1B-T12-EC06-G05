---
sidebar_position: 8
custom_edit_url: null
---

# Rota de Relatório

## Gerar relatório de expedição

Rota protegida, acessível apenas a usuários autenticados.

```
GET /report/<int:id_predio>
```

- **Cabeçalho**: `Authorization: Bearer <access_token>`

- **Descrição**: invoca o serviço `download_relatorio`, que reúne dados de prédio, expedição e fissuras (total, métricas de distribuição e agrupamento por orientação), gera o conteúdo do relatório e retorna um buffer PDF.

- **Resposta de sucesso** (`200`):

  - Envia o arquivo PDF como anexo com `send_file`, contendo:
    - Cabeçalho e título com nome da expedição e do prédio
    - Resumo executivo com totais de fissuras térmicas e de retração
    - Tabela de distribuição geográfica
    - Páginas de detalhamento com recortes de imagem e descrições formatadas

- **Erros**:

  - `500 Internal Server Error`: falha ao gerar ou montar o relatório

---

## Função de geração de PDF

A função `generate_report(dados_json)` recebe um JSON ou string com informações do relatório e utiliza FPDF para:

1. Adicionar página e cabeçalho principal
2. Incluir resumo executivo com dados-chave
3. Construir tabela de distribuição por orientação geográfica
4. Adicionar página de detalhamento, recuperando imagens por URL, convertendo e inserindo no PDF
5. Formatar descrições de cada fissura (tipo, confiabilidade e texto explicativo)

Em caso de erro no processamento das imagens ou na montagem do PDF, a função insere mensagem de falha no corpo do relatório ou propaga exceção para retorno ao cliente.

