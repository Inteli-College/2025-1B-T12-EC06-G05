---
sidebar_position: 1
custom_edit_url: null
---

# Rotas de Usuário

## Buscar usuário por ID
&emsp;A rota GET `/user/<int:id_user>` continua protegida e acessível somente a usuários autenticados, mas agora também recebe o e-mail de quem faz a requisição para validar permissões antes de retornar qualquer dado.

&emsp;Ao chegar uma chamada, o sistema primeiro busca o usuário logado pelo e-mail informado (email_user) e só então recupera o registro do usuário alvo pelo id_user. Dessa forma, garante-se que sempre há conhecimento de quem está solicitando as informações.

&emsp;Se não existir nenhum usuário com o ID fornecido, o método interrompe o fluxo e lança a exceção “Usuário não encontrado!”, resultando em um erro 500. Caso o solicitante tente acessar dados de outro ID e não tenha o cargo de administrador, a lógica agora identifica essa tentativa e retorna o erro “Você não possui permissão para acessar outros usuários”.

&emsp;Quando todas as validações passam, a função prossegue normalmente e devolve um status 200 com o JSON padrão, contendo a chave "message": "Usuário encontrado com sucesso" e o objeto do usuário obtido por user.as_dict().

## Atualizar o usuário
&emsp;A função de atualização de usuário agora importa o `bcrypt` para lidar com alterações de senha e aprimora a verificação de permissões antes de processar qualquer alteração.

&emsp;No novo fluxo, o sistema primeiro identifica o solicitante pelo e-mail (`email_user`) e então busca o registro a ser atualizado pelo ID informado em `data["id"]`. Caso o registro não exista, lança imediatamente a exceção “Usuário não encontrado!”. Em seguida, valida se o solicitante é o próprio usuário ou um administrador; qualquer outra tentativa resulta em erro de permissão.

&emsp;As atualizações de e-mail, nome completo e cargo mantêm a lógica anterior, usando os valores de `data` somente quando fornecidos. A grande novidade é o tratamento de troca de senha: se o campo `senha_nova` estiver presente, a função exige `senha_antiga` e verifica sua validade com `bcrypt.check_password_hash`. Apenas quando a senha antiga confere é gerada a nova hash e atribuída ao usuário; caso contrário, dispara “Senha anterior incorreta.” ou “Senha antiga é obrigatória para alterar a senha.”

&emsp;Por fim, todas as alterações são confirmadas com `db.session.commit()`. Em caso de qualquer falha, o banco é revertido (`rollback`) e retorna JSON de erro com detalhes da exceção, mantendo o status 500. No sucesso, responde com status 200 e o JSON padrão contendo `"message": "Usuário atualizado com sucesso!"` e o objeto atualizado via `user_update.as_dict()`.
