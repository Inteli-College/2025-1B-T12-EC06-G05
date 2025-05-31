---
sidebar_position: 3
custom_edit_url: null
---

# Services

&emsp;Esta seção documenta de forma resumida os arquivos presentes na pasta `services`, que reúnem funcionalidades reutilizáveis da aplicação de campo.

### api_auth.py

&emsp;Esse serviço é responsável por autenticar a aplicação com a API da plataforma. Ele carrega as credenciais salvas no arquivo `.env` (e-mail e senha) e faz uma requisição de login para obter um token de acesso. Esse token é necessário para realizar ações autenticadas na API, como publicação de dados. Se as credenciais estiverem ausentes ou incorretas, uma exceção é lançada.

### api_client.py

&emsp;Esse serviço define a classe `APIClient`, que facilita a comunicação com a API autenticada. Ao ser instanciado com a URL base e o token de acesso, a classe permite fazer requisições `POST` com os headers apropriados. Isso centraliza e simplifica o envio de dados para a API.

### publish_service.py

&emsp;Esse serviço cuida de toda a lógica de publicação dos dados da aplicação para a API, incluindo expedições, prédios, imagens e fissuras detectadas.

&emsp;- **publish_expedition**: envia os dados da expedição, convertendo o caminho da imagem de capa para a URL no S3.  
&emsp;- **publish_building**: envia os dados de um prédio, também ajustando a URL da foto da fachada.  
&emsp;- **publish_image**: publica uma imagem associada a um prédio e, caso detecte fissuras, chama a função de publicação dessas anotações.  
&emsp;- **publish_fissures**: publica os detalhes das rachaduras detectadas em uma imagem.  
&emsp;- **publish_full_inspection**: executa todo o fluxo de publicação para todas as expedições e prédios locais. Após o sucesso, remove os dados locais da pasta `imagens/inspecoes`.

&emsp;Esse serviço automatiza o processo de integração entre a aplicação de campo e o backend da aplicação web.

### s3_uploader.py

&emsp;Esse serviço é responsável por fazer o upload de todas as imagens da aplicação para o bucket S3. Ele percorre recursivamente a pasta `imagens/inspecoes`, identifica arquivos de imagem (.jpg, .png, .jpeg), e envia cada uma para o bucket definido, renomeando os caminhos usando `_` para evitar conflitos com o formato do S3.

### model.py

&emsp;Esse serviço é responsável por carregar e executar o modelo de detecção de rachaduras usando a biblioteca `ultralytics` (YOLO). Ele processa todas as imagens do prédio, gera versões com as fissuras detectadas e salva os resultados na pasta `resultados`.

&emsp;Além disso, o serviço contabiliza as fissuras detectadas por categoria e armazena os dados em arquivos JSON (`crack_info.json` e `fissures_per_image.json`). Também oferece uma função para recuperar a lista de imagens onde rachaduras foram identificadas.

### image_utils.py

&emsp;Esse serviço oferece funções auxiliares para lidar com imagens capturadas. Ele permite salvar frames no disco (`save_image`) e listar imagens por direção, tanto originais quanto as processadas pelo modelo de detecção. As imagens são organizadas por prefixo, como `Norte_`, `Sudeste_`, etc., facilitando sua exibição agrupada por sentido na aplicação.

### file_manager.py

&emsp;Esse serviço gerencia a estrutura de diretórios onde ficam armazenadas as inspeções e os prédios. Ele permite criar novas pastas para expedições e prédios, recuperar a lista de expedições existentes e listar os prédios de uma expedição específica. Toda a estrutura é organizada dentro da pasta `imagens/inspecoes`.

### drone.py

&emsp;Esse serviço lida com a comunicação com o drone utilizado na captura de imagens. Ele envia comandos via UDP para iniciar e parar o stream de vídeo (`streamon`/`streamoff`) e usa OpenCV para capturar os frames da transmissão ao vivo. O `start_video_capture` retorna um objeto `VideoCapture` pronto para leitura de frames, enquanto `stop_video_capture` encerra o stream.