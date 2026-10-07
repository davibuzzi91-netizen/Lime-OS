# Lime OS 0.1 — PWA (Beta de teste)

Primeira versão experimental do Lime OS, como **Progressive Web App**, pensada para ser hospedada no **GitHub Pages** e instalada na tela inicial do celular como se fosse um app/sistema próprio.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `lime-os`).
2. Faça upload de **todos os arquivos desta pasta**, mantendo a estrutura de subpastas (`css/`, `js/`, `icons/`).
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", selecione a branch (ex: `main`) e a pasta `/root`.
5. Salve. Em alguns minutos o GitHub te dá um link tipo `https://seu-usuario.github.io/lime-os/`.
6. Abra esse link no navegador do celular → menu → **"Adicionar à tela inicial"**.
7. Pronto: o Lime OS abre em tela cheia, como um app instalado.

## Estrutura de arquivos

```
lime-os-pwa/
├── index.html              → Estrutura de todas as telas (boot, loading, lock, home, apps)
├── manifest.json            → Configuração do PWA (nome, ícone, modo tela cheia)
├── sw.js                    → Service Worker: cacheia os arquivos para funcionar offline
├── icons/
│   ├── icon-192.png         → Ícone do app (tamanho pequeno)
│   └── icon-512.png         → Ícone do app (tamanho grande)
├── css/
│   ├── base.css              → Reset, cores da identidade Lime OS, sistema de telas
│   ├── boot.css               → Estilo da tela de boot ("Davi OS" + robô Android)
│   ├── loading.css            → Estilo da tela de loading (limão + logo Lime OS)
│   ├── lock.css                → Estilo da tela de bloqueio (relógio + PIN)
│   ├── home.css                → Estilo da tela inicial (grade de apps)
│   └── app-window.css          → Estilo da animação de abrir/fechar apps
└── js/
    ├── boot.js                 → Lógica da tela de boot (duração: 3s)
    ├── loading.js               → Lógica da animação do limão + logo (duração: 4s)
    ├── lock.js                   → Lógica do relógio e do teclado de PIN (0000)
    ├── home.js                    → Lógica de toque nos ícones da home
    ├── app-window.js               → Lógica de abrir/fechar as janelas dos apps
    └── main.js                      → Orquestra a sequência das telas (boot → loading → lock → home)
```

## O que cada tela faz (conforme especificado)

- **Boot** (3s): "Davi OS" centralizado, "Powered by Android" embaixo, robô Android (desenhado em CSS, sem imagem externa).
- **Loading** (4s): limão no centro gira ~720° (2 voltas), desloca para o lado, depois aparece o logo "LimeOS" — "Lime" em amarelo, "OS" em verde.
- **Bloqueio**: relógio simples (HH:MM, atualizado a cada segundo) + teclado numérico. PIN fixo: `0000`. Sem barra de status, sem personalização.
- **Home**: 3 ícones — Configurações, Tester, Sobre. Sem barra de status.
- **Apps**: ao tocar em um ícone, a janela expande do centro até ocupar a tela inteira (bordas quadradas). Tocar na janela aberta fecha ela com a animação inversa.
  - **Configurações** → "Em breve!"
  - **Tester** → "Em breve, será um testador para o administrador."
  - **Sobre** → "Lime OS 0.1" / "Versão beta de teste"

## Decisões técnicas tomadas (dentro do que não foi especificado)

- Robô Android e limão foram desenhados em **CSS puro**, sem depender de imagens externas — mais simples de manter e sem dependência de arquivos extras.
- PIN incorreto: os pontinhos piscam em vermelho por um instante e o campo reseta — é o padrão mínimo de feedback, não uma funcionalidade extra.

## Pendências (decisões que ficam para você definir depois)

- **"Davi OS" vs "Lime OS" no boot**: mantive exatamente como você escreveu na especificação ("Davi OS" na primeira tela, "Lime OS" só aparece depois na tela de loading). Se foi erro de digitação, é só avisar.
- **Gesto para fechar um app**: como você não especificou um botão de "voltar", por ora qualquer toque dentro da janela aberta a fecha. Pode ser substituído depois por um botão específico, gesto de deslizar, etc.
- **Ícones dos 3 apps na home**: usei emojis simples (⚙️ 🧪 ℹ️) como placeholder visual, já que você não especificou o visual dos ícones.

## Próximos passos possíveis (não implementados ainda, por decisão sua)

Tudo isso está deliberadamente fora desta versão: barra de status, notificações, loja de apps, contas/usuários, personalização da tela de bloqueio, configurações reais. A estrutura (pastas separadas por tela, um arquivo JS por responsabilidade) foi pensada para que cada uma dessas coisas possa ser adicionada depois sem precisar reescrever o que já existe.
