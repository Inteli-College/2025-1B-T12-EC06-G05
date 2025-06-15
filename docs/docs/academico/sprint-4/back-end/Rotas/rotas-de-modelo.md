# Rotas de Modelo

## Executar detecção direta
A rota POST `/model/run` exige autenticação e recebe no corpo JSON um array imagens, cada item com id e url. O serviço carrega o modelo YOLO (best_new.pt), faz download das imagens em diretório temporário e executa inferência em cada uma. Detectadas caixas, recorta a região, faz upload dos recortes para o bucket S3 e registra as fissuras usando create_fissure.

- Se imagens não for fornecido ou estiver vazio, retorna 400 com `{"error": "Nenhuma imagem fornecida."}`.

- Se nenhuma fissura for detectada, retorna 200 com `{"message": "Nenhuma fissura detectada."}`.

- Se ao menos uma fissura for registrada, retorna 201 com `{"message": "Detecção e registro de fissuras concluídos!", "total": <número>}`.

Qualquer exceção inesperada gera 500 com o detalhe do erro.

## Executar detecção por prédio
A rota POST `/model/run/building/int:id_predio` exige autenticação e recebe o id_predio na URL. O serviço consulta todas as imagens associadas ao prédio, converte-as em {id, url} e delega ao fluxo de detecção direta descrito acima.

- Se não houver imagens cadastradas para o prédio, retorna 404 com `{"error": "Nenhuma imagem encontrada para este prédio."}`.

- Em caso de sucesso, segue as mesmas regras de sucesso e códigos de status da rota direta.

- Exceções inesperadas também resultam em 500 com o erro.