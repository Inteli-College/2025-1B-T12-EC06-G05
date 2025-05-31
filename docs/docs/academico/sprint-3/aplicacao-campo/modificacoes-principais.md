---
sidebar_position: 1
custom_edit_url: null
---

# modificações principais

Nessa sprint foram feitas algumas mudanças no código da aplicação de campo, que deixam o projeto mais organizado e prático de usar.

## Modularização do Código

Agora o código foi totalmente modularizado. As páginas da aplicação foram separadas em arquivos diferentes, os serviços estão organizados de acordo com sua função dentro da pasta `services`, as imagens usadas foram movidas para a pasta `static`, e os modelos foram centralizados na pasta `modelo`.

A estrutura ficou assim:

```
aplicacaoCampo/
├── modelo/         # Modelos usados na aplicação
├── pages/          # Arquivos das páginas
├── services/       # Funções e serviços reutilizáveis
├── static/         # Imagens e arquivos estáticos
└── app.py          # Arquivo principal da aplicação
```

## Novos Campos para Expedições e Prédios

Foram adicionados novos campos nos formulários de criação de expedições e prédios. Agora é possível informar a localização, uma imagem de capa e outras informações adicionais. Isso ajuda a deixar o cadastro mais completo e útil para quem for utilizar os dados depois.

## Orientações para Imagens com Drone

Incluímos novas orientações para capturar imagens com drone, como por exemplo a direção da foto (noroeste, sudeste, etc). Também é possível informar o andar em que a foto foi tirada, caso seja relevante. Se essa informação não for necessária, o campo pode ser deixado em branco. Isso facilita a organização das imagens e pode ajudar a identificar se as fissuras estão concentradas em andares específicos.

## Upload de Imagens na Página Principal

Na página principal foi adicionado um botão para subir imagens. As imagens são enviadas diretamente para o bucket S3 e, em seguida, nossa API realiza automaticamente a criação de todas as entidades necessárias: expedições, prédios, imagens e fissuras. Com isso, os dados já aparecem prontos na aplicação web, sem a necessidade de cadastramento manual. Após a criação de todas essas entidades, as expedições temporárias são removidas do armazenamento local para evitar duplicidade ou acúmulo de dados.