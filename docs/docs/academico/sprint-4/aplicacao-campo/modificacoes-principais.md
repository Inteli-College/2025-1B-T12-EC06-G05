---
sidebar_position: 1
custom_edit_url: null
---

## Principais Modificações
&emsp;Nesta sprint, realizamos melhorias importantes no fluxo de login e no processamento das imagens, tornando a aplicação de campo mais segura, flexível e eficiente.

## Processamento local do modelo e upload para S3
&emsp;Nesta sprint, alteramos a forma como o modelo de detecção de fissuras é utilizado. Agora, tanto na aplicação de campo quanto na plataforma web, o modelo é baixado do S3 para o computador local apenas no momento da execução. Assim que o usuário solicita o processamento, a aplicação faz o download temporário da versão mais recente do modelo, roda as imagens capturadas localmente e depois sobe os resultados (incluindo as fissuras identificadas) para o S3.      
&emsp;Após o envio, o modelo é automaticamente excluído do computador do usuário, garantindo que não haja armazenamento desnecessário e que sempre seja utilizada a versão mais atualizada. Todo esse processo é feito utilizando arquivos temporários, trazendo mais segurança e controle sobre os dados e os recursos utilizados.     
&emsp;Além disso, caso uma imagem tenha múltiplas fissuras, o sistema realiza o recorte individual de cada uma, salvando cada fissura separadamente na tabela de fissuras. Já na tabela de imagens, a foto original permanece como uma única entrada.

## Novo fluxo de login na aplicação de campo
&emsp;O login deixou de depender do arquivo .env para ser configurado. Agora o usuário faz login diretamente na página inicial da aplicação utilizando email e senha. A aplicação permite o uso offline, ou seja, o usuário pode acessar a interface localmente mesmo que as credenciais estejam incorretas ou sem conexão com a internet.      
&emsp;A autenticação real acontece apenas quando há conexão com a internet, no momento do envio das imagens para a nuvem. Se as credenciais estiverem incorretas nesse momento, o usuário é solicitado a fazer o login novamente. Caso o login esteja correto, o processo segue normalmente e o usuário não é mais redirecionado para a página de login. Essa mudança trouxe maior flexibilidade para o uso em campo, especialmente em locais com conexão instável.


## Conclusão
&emsp;As melhorias feitas nesta sprint trouxeram mais estabilidade, segurança e praticidade para o uso da aplicação de campo. Agora o fluxo de login está mais alinhado com as condições reais de uso em campo, permitindo trabalhar offline e garantindo que a validação aconteça apenas no momento certo. Além disso, a forma como o modelo processa e salva as fissuras ficou mais eficiente e organizada, evitando problemas com arquivos temporários e tornando o cadastro das fissuras mais preciso. Essas mudanças preparam a aplicação para um uso mais robusto e seguro nas próximas etapas do projeto.
