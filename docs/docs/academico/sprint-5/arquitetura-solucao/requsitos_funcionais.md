---
sidebar_position: 4
custom_edit_url: null
title: "Requisitos Funcionais"
---

# Requisitos Funcionais

## Introdução

&emsp;Os requisitos funcionais representam o **conjunto de funcionalidades que o sistema deve obrigatoriamente cumprir** para atender às necessidades dos usuários e alcançar os objetivos do projeto. Eles foram definidos durante a fase inicial e serviram como base para o planejamento, o desenvolvimento e a validação das entregas ao longo das sprints. Abaixo, apresentamos a lista desses requisitos, acompanhada do status de atendimento com base nos testes realizados durante a Sprint 5.

## Tabela de Requisitos

| Código | Descrição                                                                                 | Classificação | Status na Sprint 5       | Observações                                                                 |
|--------|---------------------------------------------------------------------------------------------|---------------|---------------------------|------------------------------------------------------------------------------|
| RF01   | O sistema deve identificar e classificar as fissuras.                                      | Essencial     | Parcialmente Atendido     | A classificação funciona, mas com variações na acurácia.                    |
| RF02   | O sistema deve permitir o upload de arquivos para identificação e classificação.           | Essencial     | Atendido                  | Upload funcionando; melhorar visibilidade dos formatos aceitos.             |
| RF03   | O sistema deve fazer análise das imagens de forma síncrona.                                | Desejável     | Parcialmente Atendido     | Processamento rápido na maioria dos casos, mas lento com muitos arquivos.   |
| RF04   | O sistema deve guardar o histórico de todas as expedições.                                 | Essencial     | Atendido                  | Histórico armazenado corretamente.                                          |
| RF05   | O sistema deve mostrar estatísticas sobre as expedições.                                   | Importante    | Parcialmente Atendido              | A funcionalidade funciona de forma simplista.                                      |
| RF06   | O sistema deve relacionar as fissuras detectadas com suas possíveis causas.                | Desejável     | Não Atendido              | Depende de dados externos ainda não integrados.                             |
| RF07   | O sistema deve identificar a espessura da fissura.                                         | Desejável     | Não Atendido              | Não há cálculo de espessura implementado.                                   |
| RF08   | O sistema deve ter um mecanismo de login.                                                  | Importante    | Atendido                  | Login funcional e seguro nas duas interfaces.                               |

## Análise

&emsp;Os resultados obtidos durante os testes indicam que as **funcionalidades essenciais foram, em sua maioria, atendidas**, o que garante que o sistema já pode ser utilizado com segurança nas atividades principais. O login, upload de imagens e visualização do histórico funcionaram corretamente tanto no computador de bordo quanto na aplicação web.

&emsp;Requisitos mais avançados ou analíticos — causas das fissuras e cálculo de espessura — ainda não foram implementados, o que é compreensível para esta fase do projeto. Já a análise síncrona e a acurácia do modelo funcionam, mas requerem **ajustes para atender completamente aos critérios definidos**.
