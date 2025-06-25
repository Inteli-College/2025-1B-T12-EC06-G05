---
sidebar_position: 2
custom_edit_url: null
---

# Models

A pasta `models/` define as entidades principais do sistema, geralmente refletindo tabelas do banco de dados. Cada arquivo representa um modelo com seus atributos e relacionamentos. Todos os modelos são implementados utilizando o ORM SQLAlchemy, o que permite mapear as classes Python para tabelas no banco de dados relacional de forma eficiente e segura.

## Arquivos e suas responsabilidades

- `__init__.py`: Torna o diretório um módulo Python. Pode ser utilizado para importar os modelos de forma centralizada.

- `audit.py`: Define o modelo de auditoria, responsável por registrar ações realizadas no sistema, como alterações de dados, acessos ou operações críticas.

- `building.py`: Representa um prédio ou unidade monitorada pelo sistema. Pode conter atributos como nome, localização, código identificador, entre outros dados estruturais.

- `expedition.py`: Modelo relacionado a expedições ou inspeções realizadas em campo. Geralmente armazena dados como data, responsáveis e status da visita.

- `fissure.py`: Representa uma fissura ou anomalia detectada em uma estrutura. Pode conter dados como localização no prédio, tipo da fissura, gravidade e imagens associadas.

- `image.py`: Modelo para armazenamento e referência de imagens capturadas. Pode se relacionar com inspeções, fissuras ou modelos de análise visual.

- `log.py`: Armazena logs de eventos do sistema, como atividades internas, erros, notificações ou execuções automatizadas.

- `model.py`: Modelo relacionado a algum algoritmo ou modelo preditivo utilizado na aplicação, como classificadores de anomalias ou predições de risco estrutural.

- `user.py`: Define o modelo de usuário do sistema, contendo dados como nome, e-mail, senha (criptografada), tipo de acesso e permissões.

---

## Considerações

Todos os modelos utilizam o SQLAlchemy como camada de abstração para o banco de dados, garantindo integração limpa entre as entidades Python e as tabelas relacionais. Além disso, essa abordagem facilita operações de leitura, escrita, relacionamentos entre entidades, e suporte a migrações via Alembic.
