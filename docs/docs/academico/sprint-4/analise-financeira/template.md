# Viabilidade do Projeto

## Composição do Preço

| Item | Descrição | Valor (R$) |
|------|-----------|------------|
| **CUSTOS DIRETOS** | | |
| Mão de Obra Técnica | 6 profissionais especializados (8 meses) | 204.400 |
| - Engenheiros de Software (2) | R$ 100/h cada | |
| - Cientista de Dados (1) | R$ 120/h | |
| - Engenheiro de ML (1) | R$ 130/h | |
| - UX/UI Designer (1) | R$ 90/h | |
| - Gerente de Projeto (1) | R$ 110/h | |
| Infraestrutura | Servidores cloud, licenças, banco de dados | 13.680 |
| **Subtotal Custos Diretos** | | **243.080** |
| **CUSTOS INDIRETOS** | | |
| Despesas Gerais | Administrativo, deslocamentos, contingência | 74.580 |
| Manutenção (1 ano) | Suporte técnico e atualizações | 36.000 |
| **Subtotal Custos Indiretos** | | **110.580** |
| **CUSTO TOTAL** | | **353.660** |
| **COMPOSIÇÃO FINAL** | | |
| Margem de Lucro (20%) | | 70.732 |
| Subtotal com Lucro | | 424.392 |
| Impostos (18%) | ISS, IRPJ, CSLL, PIS/Cofins | 76.390,56 |
| **PREÇO FINAL** | | **R$ 500.782,56** |

**Estimativa de prazo de entrega:** 8 meses

&emsp; A previsão de 8 meses para a entrega do sistema considera experiências consolidadas e boas práticas em projetos de machine learning, especialmente em escala. Segundo publicação da Data Science Central, a maioria dos projetos de ML demanda entre 6 e 8 meses para atingir produção, abrangendo as etapas de planejamento, desenvolvimento, integração, testes e implantação. Para soluções mais complexas envolvendo visão computacional com captura de imagens por drones, são necessárias fases adicionais, como coleta aérea estruturada, anotação de dados, treinamento de modelos e integração com APIs, o que reforça a necessidade de cronograma robusto. 

&emsp; Organizações geralmente dedicam de 3 a 6 meses apenas à preparação de dados, como limpeza, rotulagem e construção de variáveis, antes mesmo de iniciar o desenvolvimento efetivo dos modelos. Já frameworks de MLOps aplicados especificamente a projetos de visão computacional com drones recomendam ciclos estruturados e integrados para garantir escalabilidade e confiabilidade.

&emsp; Assim, considerando uma equipe especializada, opções de paralelismo entre tarefas como o treinamento de modelos, desenvolvimento do front-end e integração, além de infraestrutura adequada e espaço para testes de qualidade, o prazo de 8 meses é realista e consistente com o nível de maturidade necessário para uma implantação em larga escala.

## Justificativas dos Valores

### Mão de Obra Técnica - R$ 204.400 (8 meses)

**2 Engenheiros de Software (R$ 100/h):** A média salarial de engenheiro de software sênior no Brasil é de R$ 16.800/mês, o que corresponde a aproximadamente R$ 100 por hora, considerando 168h mensais. Em São Paulo, o piso para esse cargo gira em torno de R$ 15.284 mensais. Portanto, a taxa de R$ 100/h é competitiva e justa para profissionais seniores.

**1 Cientista de Dados (R$ 120/h):** Segundo Glassdoor, a média salarial para Cientista de Dados é de R$ 11.417/mês. Esses valores equivalem a R$ 70–75/h. A tarifa de R$ 120/h reflete a especialização em visão computacional e consultoria freelance de alto valor agregado.

**1 Engenheiro de Machine Learning (R$ 130/h):** Dados da indústria mostram que engenheiros de ML seniores ganham salários superiores a R$ 13.000/mês, com frequentes faixas entre R$ 14.000 e R$ 20.000. A cobrança de R$ 130/h é condizente com o nível de habilidades exigidas para projetar e treinar redes profundas em um projeto crítico como este.

**1 UX/UI Designer (R$ 90/h):** Em São Paulo, profissionais de UI/UX recebem em média R$ 5.150–6.317/mês. Para garantir entrega de dashboards e interfaces especializadas em engenharia, o valor de R$ 90/h é proporcional à senioridade requerida.

**1 Gerente de Projeto (R$ 110/h):** A média salarial para gerente de TI/projetos no Brasil varia entre R$ 13.083/mês (Glassdoor). A taxa de R$ 110/h reflete adequadamente o escopo de liderança técnica e coordenação de IA.

### Infraestrutura Cloud – R$ 13.680 (8 meses)

#### Instâncias GPU AWS – R$ 1.200/mês  
Para treinar modelos, utilizam-se instâncias GPU da AWS:  
- **p3.2xlarge**: US$ 3,06/h (aproximadamente R$ 17/h)
- **G4dn.xlarge**: faixa similar disponível por provedor (estimado R$ 3/h) 

Estimando 8 h/dia de uso ativo, o custo mensal varia entre **R$ 800 e R$ 1.500**, em média **R$ 1.200/mês**.

#### Licenças de Software – R$ 110/mês  
- **GitHub Enterprise**: US$ 21/usuário/mês (aproximadamente R$ 110 para 6 usuários)

#### Banco de Dados e Armazenamento – R$ 400/mês  
- **Amazon S3 Standard**: US$ 0,023/GB/mês (aproximadamente R$ 0,12/GB), para 50–200 GB gera entre R$ 75 e R$ 240/mês   
- **Plano Supabase Pro**: US$ 25/mês (aproximadamente R$ 135) inclui:
  - Banco PostgreSQL com até 8 GB de disco
  - Armazenamento de arquivos até 100 GB
  - 250 GB de banda
  - Backups diários e retenção de logs por 7 dias

Considerando armazenamento com backup automático, o custo mensal estimado é de **R$ 400/mês**.

### Custos Indiretos

#### Despesas Gerais – R$ 74.580 (equivalente a aproximadamente 25% dos custos diretos)  
&nbsp;O percentual aplicado está em conformidade com diretrizes de gestão de projetos de P&D no Brasil. Organizações como a ABDI (Agência Brasileira de Desenvolvimento Industrial) recomendam percentuais entre 25% e 35% dos custos diretos para cobrir despesas administrativas, jurídicas, deslocamentos, reuniões e contingência. Esse montante garante suporte adequado às atividades de campo e à gestão do projeto, sem comprometer o orçamento principal.

#### Manutenção (1 ano) – R$ 36.000  
&nbsp;Sistemas de IA e visão computacional exigem manutenção contínua, incluindo suporte técnico, atualizações de segurança, retreinamento de modelos e monitoramento de performance. Dados do setor revelam que instalações industriais destinam entre 5% e 15% do orçamento anual à manutenção. Adotando uma taxa conservadora de aproximadamente 10% sobre o investimento total em desenvolvimento e infraestrutura, e considerando a criticidade do sistema com SLA rigoroso e necessidade de retreinamento regular, a estimativa de R$ 36.000/ano é adequada para garantir operação contínua e confiável.

## Conclusão

&nbsp;A proposta de R$ 500.782,56 inclui todos os custos, como mão de obra, infraestrutura, equipamentos, manutenção e despesas indiretas, com prazo de entrega de 8 meses. Esse prazo é considerado adequado para um projeto de visão computacional e machine learning em larga escala. Os valores são respaldados por referências de mercado atualizadas. Estamos preparados para avançar com cronograma, definição de entregas e possíveis ajustes conforme sua necessidade.

---

## Referências

https://www.datasciencecentral.com/seven-rules-for-delivering-machine-learning-projects-on-time, 2021.

https://www.labellerr.com/blog/end-to-end-ml-pipeline, 2024.

https://www.techradar.com/pro/breaking-silos-unifying-devops-and-mlops-into-a-unified-software-supply-chain, 2025.

https://www.glassdoor.com.br/Sal%C3%A1rios/engenheiro-de-software-senior-sal%C3%A1rio-SRCH_KO0%2C29.htm, 2025.

https://www.salario.com.br/profissao/engenheiro-de-software-computacional-basico-cbo-212215/sao-paulo-sp/, 2025.

https://www.glassdoor.com.br/Salaries/sao-paulo-brazil-ui-ux-designer-salary-SRCH_IL.0%2C16_IM1009_KO17%2C31.htm, 2025.

https://www.glassdoor.com.br/Sal%C3%A1rios/data-scientist-sal%C3%A1rio-SRCH_KO0%2C14.htm, 2025.

https://www.salario.com.br/profissao/gerente-de-projetos-de-tecnologia-da-informacao-cbo-142520/sao-paulo-sp/, 2025.

https://costcalc.cloudoptimo.com/aws-pricing-calculator/ec2/g4dn.xlarge, 2025.

https://supabase.com/pricing, 2025.

https://blog.infraspeak.com/pt-br/manutencao-estatisticas-desafios-tendencias/, 2024