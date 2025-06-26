---
sidebar_position: 3
custom_edit_url: null
---

# Rotas

A pasta `routes/` define os endpoints públicos da aplicação, organizados por entidade. Cada arquivo contém as definições de rotas responsáveis por tratar requisições HTTP (GET, POST, PUT, DELETE etc.).

Essas rotas são a camada responsável por receber chamadas externas, acionar os serviços correspondentes e retornar as respostas apropriadas (geralmente em formato JSON).

Todas as rotas seguem uma arquitetura RESTful e estão organizadas conforme as entidades do sistema.

## Arquivos e suas responsabilidades

- `__init__.py`: Inicializa o módulo e pode ser utilizado para registrar todas as rotas no servidor principal (`main.py`).

- `audits.py`: Define rotas relacionadas a registros de auditoria, como listagem de ações realizadas por usuários ou serviços no sistema.

- `building.py`: Contém as rotas para operações com prédios, como cadastro, atualização, listagem e exclusão de unidades monitoradas.

- `expeditions.py`: Define endpoints para criação e gerenciamento de expedições ou inspeções em campo, incluindo visualização e edição.

- `fissures.py`: Implementa rotas para registrar, atualizar e consultar fissuras/anomalias detectadas nas estruturas.

- `images.py`: Responsável por endpoints de upload, download, visualização ou associação de imagens às entidades do sistema.

- `logs.py`: Fornece rotas para consulta de logs de eventos do sistema, como erros ou ações automatizadas.

- `models.py`: Rotas para lidar com os modelos analíticos/preditivos utilizados no sistema, como execução, listagem ou resultados.

- `reports.py`: Define rotas para geração e download de relatórios baseados nos dados registrados ou processados pela aplicação.

- `users.py`: Contém as rotas de autenticação, cadastro, gerenciamento de permissões e atualização de informações de usuários.

---

## Considerações

Cada rota geralmente segue um padrão comum:

1. Recebe requisições HTTP.
2. Valida dados (quando necessário).
3. Chama funções da camada `services/`.
4. Retorna respostas estruturadas (geralmente em JSON).

Essa separação entre rotas e lógica de negócio contribui para a manutenibilidade e escalabilidade do sistema.
