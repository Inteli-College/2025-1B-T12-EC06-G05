---
sidebar_position: 1
custom_edit_url: null
---

# Estrutura de Diretórios

A seguir, a descrição dos diretórios e arquivos principais do backend da aplicação:

### `app/`
Contém a lógica central da aplicação, organizada nos seguintes submódulos:

- `models/`: Define os modelos de dados utilizados na aplicação, geralmente mapeando entidades do banco de dados via ORM.
- `routes/`: Armazena os arquivos responsáveis por definir as rotas/endpoints da API. Cada rota define como a aplicação responde a uma solicitação HTTP.
- `services/`: Implementa a lógica de negócio da aplicação, servindo como intermediário entre as rotas e os modelos.

### `config/`
Contém configurações da aplicação, como variáveis de ambiente, conexão com banco de dados e parâmetros globais.

### `data/`
Armazena dados estáticos, arquivos de entrada/saída ou datasets utilizados pela aplicação.

### `modelo/`
Módulo que pode conter implementações específicas do projeto, como algoritmos, regras de negócio ou modelos analíticos.

### `alembic/`
Responsável pelas migrações de banco de dados, utilizando a ferramenta Alembic. Permite versionar e aplicar alterações no schema de forma controlada.

### `venv/`
Ambiente virtual Python utilizado para isolar as dependências do projeto. Esse diretório não deve ser versionado (inserido no `.gitignore`).

### Arquivos na raiz:

- `.env`: Arquivo de variáveis de ambiente, usado para armazenar configurações sensíveis.
- `alembic.ini`: Arquivo de configuração da ferramenta Alembic.
- `main.py`: Ponto de entrada da aplicação. Geralmente inicia o servidor e registra as rotas.
- `datetime.py`: Arquivo utilitário para manipulação de datas e horários.
- `requirements.txt`: Lista de dependências Python utilizadas no projeto.
