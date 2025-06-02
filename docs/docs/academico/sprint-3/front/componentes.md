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

**Observações:**
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

---

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

## ExpeditionInfo

Componente que exibe informações gerais da expedição na tela de Predios, como o nome da expedição, a data e o responsável. Ele é utilizado como um cabeçalho informativo na tela de prédios garantindo a exibição das informações principais.

<p style={{textAlign: 'center'}}>ExpeditionInfo</p>
<div style={{margin: 25}}>
  <div style={{textAlign: 'center'}}>
    <img src={require("../../../../static/img/ExpeditionInfo.jpeg").default} style={{width: 800, border: '1px solid #ccc'}} alt="ExpeditionInfo" />
  </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


**Importação:**

```tsx
import ExpeditionInfo from "../components/ExpeditionInfo";
```

**Utilização:**

```tsx
<ExpeditionInfo
  nome="Expedição Inteli"
  data_criacao="12/05/2025"
  nome_responsavel="Pedro Silva"
/>
```

**Observações:**

- Exibe o nome da expedição.
- Exibe a data de criação da expedição.
- Exibe o nome do responsável pela expedição.
- Layout compacto e claro.

---


## ModalAddPredio

é um modal interativo utilizado para adicionar novos prédios a uma expedição existente. Ele oferece campos para preenchimento de informações básicas como nome, complemento, data e horário da coleta, descrição, foto da fachada e upload de imagens por zona (Norte, Sul, Leste, Oeste, Sudeste, Sudoeste, Nordeste, Noroeste). Exibe um modal de sucesso com animação após o cadastro.

<p style={{textAlign: 'center'}}>ModalAddPredio</p>
<div style={{margin: 25}}>
  <div style={{textAlign: 'center'}}>
    <img src={require("../../../../static/img/ModalAddPredio.png").default} style={{width: 800, border: '1px solid #ccc'}} alt="ModalAddPredio" />
  </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**

- Cadastro de Informações do Prédio: Permite inserir nome, complemento, descrição, data e hora de início e fim da coleta.
- Uploads de fotos:
  - Foto Principal (Fachada): Um campo específico para upload da imagem principal do prédio.
  - Fotos por Zona: Campos dedicados para upload de imagens de diferentes orientações (Norte, Sul, Leste, Oeste, Nordeste, Noroeste, Sudeste, Sudoeste).
- Validação e Persistência: Envia os dados e imagens para a API de backend, persistindo as informações no sistema.
- Feedback Visual: Exibe um modal de sucesso após o cadastro bem-sucedido.
- Fechamento do Modal: Pode ser fechado clicando fora da área do conteúdo ou no botão "✕".

**Importação:**

```tsx
import ModalAddPredio from "../components/ModalAddPredio";
```

**Utilização:**

```tsx
 <ModalAddPredio
  isOpen={isPopupOpen}
  onClose={handleClosePopup}
  onSave={handleSavePredio} 
  idExpedicaoAtual={Number(expeditionId)}
 />
```

---

## QuadroPredios

O componente QuadroPredios serve como um contêiner visual para exibir uma lista de prédios registrados. Ele apresenta um cabeçalho, uma área de conteúdo onde os cards dos prédios são renderizados, e um botão flutuante de adição que permite iniciar o processo de cadastro de um novo prédio.

<p style={{textAlign: 'center'}}>QuadroPredios</p>
<div style={{margin: 25}}>
  <div style={{textAlign: 'center'}}>
    <img src={require("../../../../static/img/QuadroPredios.jpeg").default} style={{width: 800, border: '1px solid #ccc'}} alt="QuadroPredios" />
  </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**

- Contêiner para Prédios: Proporciona uma estrutura visual organizada para apresentar múltiplos cards de prédios.
- Cabeçalho Fixo: Exibe o título "Prédios" na parte superior do quadro.
- Botão de Adição Flutuante: Inclui um botão "+" posicionado no canto inferior direito, que aciona a funcionalidade de adicionar um novo prédio.
- Responsividade de Conteúdo: A área de conteúdo (children) possui overflowY: 'auto' para permitir a rolagem se houver muitos prédios.
- Efeitos Visuais: O botão de adição possui efeitos de hover para uma melhor experiência do usuário.


**Importação:**

```tsx
import QuadroPredios from "../components/QuadroPredios";
```

**Utilização:**

```tsx
<QuadroPredios onAddClick={handleAddPredio}>
  <div
    style={{
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      padding: "40px",
      paddingBottom: "100px",
    }}
  >
    {predios.map((predio) => (
      <PredioCard
        key={predio.id}
        numero={predio.numero}
        nome={predio.nome}
        imagem={predio.imagem}
        alt={predio.alt}
        onClick={() => handlePredioClick(predio.id)}
      />
    ))}
  </div>
</QuadroPredios>

```

---

## Style.ts
Todos os componentes e páginas compartilham estilos padronizados:

```ts
export const COLORS = { ... }
export const FONTS = { ... }
export const BREAKPOINTS = { ... }
```

---

