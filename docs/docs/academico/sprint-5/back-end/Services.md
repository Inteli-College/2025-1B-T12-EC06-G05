---
sidebar_position: 4
custom_edit_url: null
---

# Services

A pasta `services/` é responsável por implementar a lógica de negócio da aplicação. Essa camada funciona como intermediária entre as rotas (`routes/`) e os modelos (`models/`), encapsulando regras, validações e interações com o banco de dados.

Ao centralizar a lógica de negócio, a aplicação mantém um padrão limpo e modular, facilitando testes, manutenção e reutilização de código.

## Arquivos e suas responsabilidades

- `__init__.py`: Inicializa o módulo de serviços e pode ser usado para registrar serviços ou utilidades globais.

- `audit_services.py`: Contém funções para registrar e consultar auditorias de ações realizadas por usuários ou processos automáticos.

- `building_services.py`: Implementa a lógica para cadastro, atualização, busca e remoção de prédios monitorados pela aplicação.

- `expedition_services.py`: Responsável pelo gerenciamento de expedições/inspeções, incluindo criação, listagem, edição e associação com outros dados.

- `fissure_service.py`: Trata das operações relacionadas a fissuras estruturais, incluindo detecção, classificação e vínculo com imagens e prédios.

- `image_services.py`: Lida com a manipulação de imagens.

- `log_services.py`: Gerencia a criação e leitura de logs de execução da aplicação, tanto para fins técnicos quanto de rastreabilidade.

- `modelo_services.py`: Contém a lógica associada a modelos analíticos ou de machine learning usados no sistema, como execução de inferência e análise de resultados.

- `report_services.py`: Gera relatórios automatizados a partir dos dados salvos no banco.

- `user_services.py`: Define as regras para cadastro, login, autenticação, atualização e gerenciamento de usuários do sistema.

- `util_services.py`: Armazena funções auxiliares que são utilizadas por diversos outros serviços, como formatação de dados, validações genéricas ou integrações comuns.

---

## Considerações

A separação da lógica de negócio nessa camada garante que as rotas permaneçam simples e focadas apenas no fluxo de entrada/saída, enquanto os serviços tratam das regras, persistência e integridade dos dados.
