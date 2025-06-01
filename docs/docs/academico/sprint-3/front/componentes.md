---
sidebar_position: 3
custom_edit_url: null
---

# Componentes Reutilizáveis

&emsp;Nesta seção, documentamos os principais componentes reutilizáveis desenvolvidos. Esses componentes foram criados com o objetivo de padronizar a interface, reduzir redundâncias e facilitar a manutenção do sistema ao longo do tempo.

&emsp;Cada componente foi pensado para ser modular, coeso e independente, de forma que possa ser utilizado em múltiplas telas sem necessidade de duplicação de código.

---

## Header

Componente de topo presente em diversas telas. Centraliza a identidade visual da aplicação e oferece navegação básica.

<p style={{textAlign: 'center'}}>Header</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img 
          src={require("../../../../static/img/Header.png").default} 
          style={{
            width: 800, 
            border: "2px solid #ccc", 
            borderRadius: "8px"
          }} 
          alt="Wireframe Aplicação de Campo" 
        />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


**Importação:**
```tsx
import Header from "../components/Header";
```

**Utilização**:
```tsx
<Header />
```

---

## SelectWithTitle

Exibe informações sobre uma expedição selecionada, como nome, data de criação e nome do responsável.

<p style={{textAlign: 'center'}}>Modal de expedições</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img 
          src={require("../../../../static/img/info-modal.png").default} 
          style={{
            width: 800, 
            border: "2px solid #ccc", 
            borderRadius: "8px"
          }} 
          alt="Wireframe Aplicação de Campo" 
        />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Importação:**
```tsx
import SelectWithTitle from "../components/SelectWithTitle";
```

**Utilização:**
```tsx
<SelectWithTitle
  nome="Expedição Leste"
  nome_responsavel="Eng. João Silva"
/>
```
---

## FissurePanel

Componente que apresenta a lista de fissuras classificadas por tipo (ex: retração, térmica). Também lida com filtros internos.

<p style={{textAlign: 'center'}}>Painel de Fissuras</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/fissurePanel.png").default} style={{width: 800}} alt="Wireframe Aplicação de Campo" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Importação:**

```tsx
import FissurePanel from "../components/FissurePanel";
```

**Utilização:**

```tsx
<FissurePanel />
```

**Observações:**

- Internamente busca dados da API relacionados ao prédio selecionado.
- Usa imagens classificadas por tipo.

---

## FissureCharts

Responsável por exibir gráficos estatísticos com base nas fissuras identificadas no prédio.

<p style={{textAlign: 'center'}}>Header</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/Charts.png").default} style={{width: 200}} alt="Wireframe Aplicação de Campo" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Importação:**

```tsx
import FissureCharts from "../components/FissureCharts";
```

**Utilização:**

```tsx
<FissureCharts />
```

Observações:
- Agrupamento por tipo de fissura, distribuição temporal etc.
- Usa uma biblioteca conhecida como recharts 

---

## MetricsBar

O `MetricsBar` é um componente visual que exibe um conjunto compacto de métricas relacionadas ao processamento de imagens. Ele foi projetado para oferecer uma visão rápida e clara de indicadores-chave de desempenho, sendo ideal para dashboards ou telas de status.

<p style={{textAlign: 'center'}}>MetricsBar</p>
<div style={{margin: 25}}>
  <div style={{textAlign: 'center'}}>
    <img src={require("../../../../static/img/Metrics.png").default} style={{width: 800, border: '1px solid #ccc'}} alt="MetricsBar" />
  </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


**Funcionalidades:**

- Exibe 4 indicadores fixos:
  - **Imagens Processadas**
  - **Taxa de Imagens com Erro**
  - **Taxa de Revisão Manual**
  - **Taxa de Detecção Automática**
- Layout compacto e responsivo
- Estilo consistente com a identidade visual do sistema

---

**Importação:**

```tsx
import MetricsBar from "../components/MetricsBar";
```
**Utilização:**

```tsx
<MetricsBar />
```

## ExpeditionsModal

O ExpeditionModal é um componente modal responsável pela criação de novas expedições. Apresenta um formulário completo com validação de campos obrigatórios e interface intuitiva para entrada de dados da expedição.

<p style={{textAlign: 'center'}}>Modal de criação de expedição</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/expedition-modal.png").default} style={{width: 600, border: '1px solid #ccc'}} alt="Modal de Expedição" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

# Funcionalidades:

Formulário com campos para nome, descrição, data e endereço
Upload de foto da expedição
Validação de campos obrigatórios (todos os campos são requeridos)
Botões de ação (Cancelar e Criar Expedição)
Fechamento automático após criação bem-sucedida
Overlay com blur para foco no conteúdo do modal
Conversão automática de data para formato brasileiro (DD/MM/YYYY)

## FissureModal

O `FissureModal` é um componente modal reutilizável que exibe detalhes de uma fissura selecionada. Ele é usado para fornecer uma visualização ampliada de uma imagem com suas informações associadas de maneira clara e acessível.


<p style={{textAlign: 'center'}}>FissureModal</p>
<div style={{margin: 25}}>
  <div style={{textAlign: 'center'}}>
    <img src={require("../../../../static/img/FissureModal.png").default} style={{width: 800, border: '1px solid #ccc'}} alt="FissureModal" />
  </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


**Funcionalidades:**

- Exibe imagem da fissura com detalhes:
  - Prédio
  - Fachada
  - Classificação da fissura
  - Causa provável
  - Data de upload
- Modal fecha ao clicar fora do conteúdo
- Design elegante e focado na clareza

---

**Importação:**

```tsx
import FissureModal from "../components/FissureModal";
```

**Utilização:**

```tsx
<FissureModal fissure={fissuraSelecionada} onClose={fecharModal} />
```

**Observação:**

- O modal utiliza styled-components para encapsular os estilos.

- A função e.stopPropagation() impede que o clique dentro do conteúdo feche o modal acidentalmente.

- A prop fissure deve conter todos os campos definidos, ou o modal não será exibido.

---

## Style.ts
Todos os componentes e páginas compartilham estilos padronizados:

```ts
export const COLORS = { ... }
export const FONTS = { ... }
export const BREAKPOINTS = { ... }
```

---

