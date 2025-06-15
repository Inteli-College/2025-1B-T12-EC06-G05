---
sidebar_position: 1
custom_edit_url: null
---

# Front-end

&emsp;No mundo atual, uma boa interface não é apenas um diferencial, mas sim o que torna qualquer solução eficaz. No nosso projeto, o front-end foi pensado para ir além da estética, afinal, sabemos que a solução terá impacto direto no dia a dia dos profissionais do IPT. Cada tela, botão e interação foi pensada com foco na funcionalidade, para que a tecnologia realmente facilite o trabalho de quem está em campo ou no laboratório. Nossa missão é criar aplicações que não só funcionem bem, mas que tornem as rotinas mais intuitivas, ágeis e confiáveis.

&emsp;Neste projeto, entregamos duas interfaces principais: o computador de bordo, já detalhado em outra [seção](../../sprint-2/aplicacao_de_campo.md), e a aplicação web que será explicada neste documento.

&emsp;Partindo do [protótipo de alta fidelidade](../../sprint-2/experiencia-do-usuario/prototipo-de-alta-fidelidade/prototipo-de-alta-fidelidade-aplicacao.md) elaborado na sprint anterior, nossa equipe definiu uma arquitetura técnica capaz de dar vida a esse design sem perder a fidelidade, desempenho ou clareza.

## Escolhas Tecnológicas

### React + Vite + TypeScript: Nossa Stack Principal

&emsp;Para transformar o protótipo de alta fidelidade em uma aplicação funcional e fiel ao design original, escolhemos uma stack moderna que equilibra agilidade no desenvolvimento, organização do código e facilidade de manutenção.

&emsp;**React** é uma escolha muito comum para construir interfaces de usuário em aplicações web. Muitos integrantes do grupo já possuíam familiaridade com a biblioteca, e aqueles que não possuíam tinham interesse em aprendê-la. Além disso, o React se destaca por sua capacidade de criar componentes reutilizáveis, que nos ajudou a manter a consistência visual e facilitou a manutenção do sistema, composto por diversas telas e funcionalidades.

&emsp;**Vite** é uma ferramenta de build moderna que aumentou bastante nossa produtividade. Com hot reload instantâneo e builds mais rápidos que o usual, ela reduziu o tempo de espera durante o desenvolvimento. Na prática, isso significou menos interrupções e mais foco em escrever código.

&emsp;**TypeScript** foi uma escolha incomum, mas que sem dúvidas ajudou muito durante o desenvolvimento. TypeScript é uma linguagem de programação que estende o JavaScript, adicionando recursos como interfaces, enums e decorators. Optamos por usá-la porque ela nos permite identificar erros ainda durante o desenvolvimento, antes mesmo da aplicação rodar. Isso se mostrou útil para o nosso trabalho em equipe, onde diferentes pessoas mexem no mesmo código, já que o TypeScript deixa claro o que está errado e onde exatamente está o problema.

## Gerenciamento de Bibliotecas

&emsp;Algumas funcionalidades da aplicação demandam bibliotecas específicas, que apresentaremos detalhadamente conforme aparecem nas diferentes telas. O React facilita essa integração, tornando o processo intuitivo e eficiente.

&emsp;Para garantir que todas as dependências estejam disponíveis durante a execução, execute `npm i` na pasta src dentro de RachadoresWeb.

## Padronização Visual

&emsp;Trabalhar em equipe exige consistência, ainda mais quando as telas da aplicação se conectam entre si. Para evitar divergências visuais entre diferentes telas, criamos um sistema de padronização através do arquivo [style.ts](../../../../../src/RachadoresWeb/src/constants/style.ts).

Este arquivo centraliza:
- **BREAKPOINTS**: Pontos de quebra para responsividade
- **FONTS**: Tipografias do sistema  
- **COLORS**: Paleta de cores oficial

&emsp;Assim, mantemos uniformidade visual em todas as telas, independentemente de quem as desenvolve.

## Arquitetura de Pastas

&emsp;Organizamos o projeto seguindo boas práticas de estruturação, facilitando navegação e manutenção:

```
src/
├── components/     # Componentes reutilizáveis (aqueles que nos fizeram escolher o React)
├── constants/      # Valores fixos e configurações utilizadas pelo sistema
│   └── assets/     # Recursos estáticos como imagens, animações e música
│       ├── animations/  # Arquivos .json para animações
│       └── sounds/      # Arquivos de áudio (.mp3)
└── pages/          # Páginas da aplicação (.tsx)
```


## Como Executar o Projeto

### Pré-requisitos
&emsp;Certifique-se de ter instalado: Node.js, React e todas as bibliotecas necessárias.

### Passos para execução

1. **Navegue até o diretório da aplicação:**

```bash
cd \2025-1B-T12-EC06-G05\src\RachadoresWeb
```

2. **Instale as dependências:**

```bash
npm i
```

3. **Execute o projeto:**

```bash
npm run dev
```

&emsp;Se tudo estiver configurado corretamente, a aplicação será iniciada localmente e estará pronta para desenvolvimento e testes. Ao rodar o comando, você verá uma mensagem como esta no terminal:

<p style={{textAlign: 'center'}}>Terminal com URL da aplicação</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../static/img/terminal_url.png").default} style={{width: 800}} alt="Wireframe Aplicação de Campo" />
        <br/>
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

&emsp;Basta clicar no link exibido ou colá-lo na barra de pesquisa do navegador. A aplicação estará pronta para uso local, permitindo navegação, testes e ajustes em tempo real.


## Integração com o Back-end

&emsp;Para conectar nossa aplicação React com o back-end em Flask, utilizamos a biblioteca [`axios`](https://axios-http.com/), uma ferramenta muito popular, leve e poderosa para fazer requisições HTTP. Com ela, conseguimos buscar dados, enviar formulários, registrar imagens e muito mais, sempre de forma assíncrona e controlada.

&emsp;Por exemplo, ao cadastrar um prédio, realizamos três requisições consecutivas:
1. Upload da imagem da fachada para `/image/upload` - rota documentada [aqui](../back-end/Rotas/rotas-de-imagens.md)
2. Cadastro do prédio com os dados fornecidos em `/building/register`  - rota documentada [aqui](../back-end/Rotas/rotas-de-predio.md)
3. Upload das imagens por zona em `/image/add`  - rota documentada [aqui](../back-end/Rotas/rotas-de-imagens.md)

&emsp;Para garantir a segurança e a integridade das comunicações, todas as rotas protegidas incluem o token JWT salvo no `localStorage`, como no exemplo abaixo:

```tsx
const token = localStorage.getItem("token");
const response = await axios.get(`http://localhost:5000/building/${numeroPredio}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

&emsp;Ao longo da aplicação, usamos axios não apenas para fetch de dados, mas também para facilitar o controle de erros (com try/catch) e exibir mensagens visuais ao usuário quando algo não sai como o esperado. Às vezes, alguns erros inesperados ocorrem e pode ser difícil de identificá-los sem auxílio de uma biblioteca como o axios. 

&emsp;Essa integração é o que permite que o front-end e o back-end se comuniquem, mantendo os dados sempre sincronizados e atualizados para o usuário.

## Tratamento de Erros e Feedback

&emsp;Para garantir uma boa experiência de uso, implementamos:
- Toasts para avisar sobre erros de upload ou preenchimento
- Animações de carregamento e sucesso
- Placeholder informativo quando não há dados a exibir
- Validações básicas no front-end (como formatos de imagem)

&emsp;Esses cuidados fazem com que o sistema não apenas funcione bem, mas realmente acompanhe e amplifique o trabalho da equipe técnica do IPT.