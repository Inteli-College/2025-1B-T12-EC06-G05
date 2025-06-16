---
sidebar_position: 1
custom_edit_url: null
---

## Principais Modificações
&emsp;Nesta sprint, realizamos melhorias importantes no fluxo de login e no processamento das imagens, tornando a aplicação de campo mais segura, flexível e eficiente.

## Processamento local do modelo e upload para S3
&emsp;O modelo de detecção de fissuras agora roda localmente nas imagens baixadas do S3, tanto na aplicação de campo quanto na plataforma web. Depois do processamento, as imagens são enviadas novamente para o bucket S3 da AWS. Caso uma imagem contenha múltiplas fissuras, o sistema recorta cada fissura separadamente e registra cada uma delas na tabela de fissuras, enquanto mantém apenas uma entrada para a imagem original na tabela de imagens. Isso garante um controle mais detalhado das fissuras e uma melhor organização dos dados.

## Novo fluxo de login na aplicação de campo
&emsp;O login deixou de depender do arquivo .env para ser configurado. Agora o usuário faz login diretamente na página inicial da aplicação utilizando email e senha. A aplicação permite o uso offline, ou seja, o usuário pode acessar a interface localmente mesmo que as credenciais estejam incorretas. A autenticação real acontece apenas quando há conexão com a internet, no momento do envio das imagens para a nuvem. Se as credenciais estiverem incorretas nesse momento, o usuário é solicitado a fazer o login novamente. Caso o login esteja correto, o processo segue normalmente e o usuário não é mais redirecionado para a página de login. Essa mudança trouxe maior flexibilidade para o uso em campo, especialmente em locais com conexão instável.

## Simplificação do fluxo de salvamento das fissuras
&emsp;Antes, o modelo rodava no Streamlit e gerava arquivos locais com os dados das fissuras, que depois eram usados por uma rota separada para salvar as fissuras no backend. Agora, o modelo continua rodando localmente apenas para visualização, e quando o usuário envia as imagens, uma rota da API executa o modelo no backend, processa as fissuras e salva os dados diretamente no banco. Essa alteração simplifica o fluxo, evita o uso de arquivos intermediários e garante maior confiabilidade no salvamento dos dados.


## Conclusão
&emsp;As melhorias feitas nesta sprint trouxeram mais estabilidade, segurança e praticidade para o uso da aplicação de campo. Agora o fluxo de login está mais alinhado com as condições reais de uso em campo, permitindo trabalhar offline e garantindo que a validação aconteça apenas no momento certo. Além disso, a forma como o modelo processa e salva as fissuras ficou mais eficiente e organizada, evitando problemas com arquivos temporários e tornando o cadastro das fissuras mais preciso. Essas mudanças preparam a aplicação para um uso mais robusto e seguro nas próximas etapas do projeto.
