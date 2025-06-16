---
sidebar_position: 1
custom_edit_url: null
---

# Aplicação Web

&emsp;Neste documento iremos demonstrar como você pode inicializar a aplicação web:

&emsp;Vamos aprender a inicializar a interface do usuário, o primeiro passo, claro, é clonar este repositório.

Vamos lá:
```bash
git clone https://github.com/Inteli-College/2025-1B-T12-EC06-G05
```

#### Após clonar é possível ver que os arquivos do repositório agora estão na sua pasta atual!

Agora que temos os arquivos necessários para iniciar vamos entrar nesta pasta e instalar nossas depedências:

```bash
cd 2025-1A-T12-EC05-G03/src/RachadoresWeb
```

``` bash
npm install
```

### Agora é só iniciar o nosso front!

``` bash
npm run dev
```

E pronto, agora temos o front da aplicação web rodando corretamente, como estamos rodando tudo localmente, vamos iniciar o back-end local:

### Agora inicializar o back-end

Vamos abrir outro terminal, entrar na pasta do back-end e iniciar outra venv e ativá-la:

``` bash
cd 2025-1A-T12-EC05-G03/src/back-end
python -m venv venv
source venv/bin/activate
```
instalar as dependencias:
``` bash
pip install -r "requirements.txt"
```

### E finalmente iniciar o back-end

``` bash
cd .
python -m back-end.main
```

## Conclusão

&emsp;Seguindo os passos acima, você terá toda a aplicação web funcionando. Em caso de dúvidas, verifique se todos os passos foram seguidos corretamente e se as dependências estão instaladas nas versões indicadas.