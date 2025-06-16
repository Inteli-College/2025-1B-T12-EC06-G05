---
title: "Relatório Automático"
sidebar_label: "Relatório Automático"
sidebar_position: 2
---

## Relatório Automático de Expedição Predial

O relatório automático é um documento gerado pelo sistema a partir dos dados coletados em uma expedição predial. Ele apresenta informações organizadas sobre as fissuras detectadas em um edifício, incluindo:

- Quantidade e tipo de fissuras (ex: térmica, retração)
- Confiabilidade da detecção
- Localização geográfica (orientação da fachada)
- Status da auditoria (se houve alteração ou não)

Dentro de uma expedição cadastrada no sistema, é possível acionar o controle de geração de relatório, que organiza automaticamente os dados registrados durante a inspeção e permite a criação de um arquivo PDF detalhado. Esse relatório consolida todas as fissuras identificadas no edifício, com suas respectivas características, de forma estruturada e visualmente clara.

<p style={{textAlign: 'center'}}>Figura 1 - Relatório 1</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/relatorio1.png").default} style={{width: 800}} alt="Armazenamento de Arquivos" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

<p style={{textAlign: 'center'}}>Figura 2 - Relatório 2</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/relatorio2.png").default} style={{width: 800}} alt="Armazenamento de Arquivos" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### O que o relatório faz

- Consolida os resultados da análise de imagens processadas pelo algoritmo de visão computacional.
- Estrutura os dados em um formato padronizado e compreensível para engenheiros e equipes de manutenção.
- Gera um documento pronto para consulta, validação técnica ou tomada de decisão.

### Benefícios da implementação

- **Eficiência**: elimina a necessidade de registro manual de fissuras, acelerando a geração de laudos.
- **Padronização**: garante consistência entre os relatórios gerados, independentemente do responsável pela coleta.
- **Rastreabilidade**: mantém o histórico técnico das inspeções, essencial para auditorias e manutenção preventiva.
- **Decisão orientada a dados**: facilita a priorização de ações corretivas com base em dados estruturados e confiáveis.
- **Aderência ao objetivo do projeto**: contribui diretamente com a missão do IPT de melhorar a segurança e durabilidade das edificações por meio de tecnologia.
