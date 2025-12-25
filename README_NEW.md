# 🎬 Absolute Fansub - Site Oficial

<div align="center">

![Absolute Fansub](img/assets/loadinglogo.png)

**Fansub dedicada a animes legendados em português brasileiro**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success)](https://web.dev/pwa/)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue)]()
[![Offline Support](https://img.shields.io/badge/Offline-Support-orange)]()

[🌐 Site](https://absolutesub.com.br) | [📱 Instalar App](#instalação-pwa) | [💬 Discord](#)

</div>

---

## 📋 Índice

- [Sobre](#sobre)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Novas Melhorias](#-novas-melhorias-implementadas)
- [🛠️ Tecnologias](#️-tecnologias)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎯 Como Usar](#-como-usar)
- [📱 Instalação PWA](#-instalação-pwa)
- [⚙️ Configuração](#️-configuração)
- [🤝 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)

---

## 🎯 Sobre

O **Absolute Fansub** é um site dedicado à distribuição de animes legendados em português brasileiro com alta qualidade. Oferecemos uma plataforma moderna, rápida e fácil de usar para os fãs de anime.

### Características Principais

- ✅ **32+ Animes Disponíveis** - Catálogo crescente de títulos
- ✅ **Múltiplos Servidores** - Pixeldrain, Terabox, Nyaa, Krakenfiles e mais
- ✅ **Qualidade HD** - 720p e 1080p disponíveis
- ✅ **100% Gratuito** - Sem anúncios intrusivos
- ✅ **Sistema de Comentários** - Interaja com a comunidade
- ✅ **Downloads Diretos** - Sem espera ou limites

---

## ✨ Funcionalidades

### 🎬 Gerenciamento de Animes

- **Listagem Completa** - Visualize todos os animes disponíveis
- **Filtros Avançados** - Por gênero, status, qualidade e letra
- **Busca Inteligente** - Encontre rapidamente o que procura
- **Detalhes Completos** - Sinopse, trailer, screenshots e mais
- **Sistema de Episódios** - Organização clara com múltiplos servidores

### 💬 Interação

- **Comentários** - Deixe sua opinião sobre os animes
- **Respostas** - Sistema de threads para discussões
- **Compartilhamento** - Compartilhe facilmente com amigos
- **Sistema de Favoritos** ⭐ - Salve seus animes preferidos

### 🎨 Interface

- **Design Moderno** - Interface limpa e intuitiva
- **Responsivo** - Funciona perfeitamente em desktop e mobile
- **Modo Escuro/Claro** 🌓 - Alterne entre temas
- **Banners Rotativos** - Destaques animados
- **Loading Suave** - Experiência fluida

---

## 🚀 Novas Melhorias Implementadas

### ⚡ Performance & Otimização

- ✅ **Lazy Loading** - Carregamento sob demanda de imagens
- ✅ **Service Worker** - Cache inteligente de assets
- ✅ **Pre-caching** - Assets importantes pré-carregados
- ✅ **Debounce/Throttle** - Otimização de eventos
- ✅ **Preload de Links** - Carregamento antecipado de páginas

### 🔐 Segurança & Validação

- ✅ **Sanitização de HTML** - Proteção contra XSS
- ✅ **Validação de URLs** - Verificação de links
- ✅ **Tratamento de Erros** - Sistema robusto de error handling
- ✅ **Try/Catch** - Proteção em funções críticas

### 🎯 Experiência do Usuário

- ✅ **Sistema de Notificações** - Feedback visual elegante
- ✅ **Scroll to Top** - Botão flutuante para voltar ao topo
- ✅ **Breadcrumbs** - Navegação contextual
- ✅ **Indicador de Página Atual** - Destaque no menu
- ✅ **Modo Offline** - Funcionalidade mesmo sem internet

### ⭐ Novas Funcionalidades

- ✅ **Sistema de Favoritos** - Salve e organize seus animes
- ✅ **Toggle de Tema** - Modo escuro/claro com persistência
- ✅ **PWA (Progressive Web App)** - Instalável no dispositivo
- ✅ **Offline Support** - Acesso a conteúdo em cache
- ✅ **Detecção Online/Offline** - Indicador de conexão
- ✅ **Atalhos de Teclado** - Navegação rápida

### 🔧 Melhorias Técnicas

- ✅ **Código Modularizado** - Funções utilitárias separadas
- ✅ **LocalStorage Manager** - Gerenciamento seguro de dados
- ✅ **Web Share API** - Compartilhamento nativo
- ✅ **Intersection Observer** - Lazy loading eficiente
- ✅ **Performance Monitoring** - Métricas de desempenho

---

## 🛠️ Tecnologias

### Core

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com Flexbox e Grid
- **JavaScript (ES6+)** - Lógica e interatividade

### Bibliotecas & Frameworks

- **Google Fonts (Poppins)** - Tipografia moderna
- **Google Analytics** - Análise de tráfego
- **Google Forms/Sheets** - Sistema de comentários

### APIs & Recursos

- **Service Worker API** - Cache e offline support
- **Cache API** - Armazenamento de assets
- **Intersection Observer API** - Lazy loading
- **Web Share API** - Compartilhamento nativo
- **LocalStorage API** - Persistência de dados
- **Notification API** - Notificações push (preparado)

### PWA Features

- **Manifest.json** - Metadados da aplicação
- **Service Worker** - Funcionalidade offline
- **App Icons** - Ícones para instalação
- **Splash Screen** - Tela de carregamento

---

## 📦 Estrutura do Projeto

```
absolute-fansub/
│
├── 📁 img/                    # Imagens e assets
│   ├── assets/                # Logos, ícones, backgrounds
│   ├── PostsIMG/              # Imagens de posts
│   ├── banners/               # Banners rotativos
│   └── id1-32/                # Capas e screenshots dos animes
│
├── 📁 js/                     # Scripts JavaScript
│   ├── utils.js               # 🆕 Funções utilitárias
│   ├── favorites.js           # 🆕 Sistema de favoritos
│   ├── theme-toggle.js        # 🆕 Toggle de tema
│   ├── ux-improvements.js     # 🆕 Melhorias de UX
│   ├── pwa-manager.js         # 🆕 Gerenciador PWA
│   ├── loading.js             # Loading screen
│   ├── header.js              # Header dinâmico
│   ├── footer.js              # Footer dinâmico
│   ├── search.js              # Sistema de busca
│   ├── animePag.js            # Página de detalhes
│   ├── banner.js              # Banners rotativos
│   ├── commentLogic.js        # Sistema de comentários
│   ├── filterAn.js            # Filtros de anime
│   ├── paginationPost.js      # Paginação de posts
│   └── ...outros
│
├── 📁 css/                    # Estilos adicionais
│   └── improvements.css       # 🆕 Novos estilos
│
├── 📄 index.html              # Página principal
├── 📄 anime.html              # Página de detalhes
├── 📄 contentpost.html        # Página de posts
├── 📄 projetos.html           # Projetos em andamento
├── 📄 equipe.html             # Página da equipe
├── 📄 recrutamento.html       # Recrutamento
├── 📄 offline.html            # 🆕 Página offline
│
├── 📄 data.js                 # Base de dados dos animes
├── 📄 postDate1.js            # Dados dos posts
│
├── 📄 style.css               # Estilos principais
├── 📄 styledn.css             # Estilos de doação
│
├── 📄 sw.js                   # 🆕 Service Worker
├── 📄 manifest.json           # 🆕 Manifest PWA
├── 📄 robots.txt              # SEO - Robots
├── 📄 sitemap.xml             # SEO - Sitemap
│
└── 📄 README.md               # Este arquivo
```

---

## 🎯 Como Usar

### Para Visitantes

1. **Navegue pelo Catálogo**
   - Acesse [absolutesub.com.br](https://absolutesub.com.br)
   - Use os filtros para encontrar animes

2. **Adicione aos Favoritos** ⭐
   - Clique no ícone de coração nas páginas de anime
   - Acesse "Favoritos" no menu

3. **Baixe os Episódios**
   - Entre na página do anime
   - Escolha o servidor de download
   - Clique para baixar

4. **Comente e Interaja** 💬
   - Deixe sua opinião nos comentários
   - Responda outros usuários

### Para Desenvolvedores

```bash
# Clone o repositório
git clone https://github.com/absolutesub/absolute-fansub.git

# Entre no diretório
cd absolute-fansub

# Abra com um servidor local
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js
npx http-server

# Opção 3: VS Code
# Use a extensão "Live Server"

# Acesse no navegador
http://localhost:8000
```

---

## 📱 Instalação PWA

### Android

1. Acesse o site no Chrome
2. Toque no menu (⋮)
3. Selecione "Instalar aplicativo"
4. Confirme a instalação
5. O ícone aparecerá na tela inicial

### iOS

1. Acesse o site no Safari
2. Toque no botão "Compartilhar" (□↑)
3. Role e toque em "Adicionar à Tela Inicial"
4. Nomeie e confirme
5. O ícone aparecerá na tela inicial

### Desktop

1. Acesse o site no Chrome/Edge
2. Clique no ícone de instalação na barra de endereço
3. Ou vá em Menu > Instalar Absolute Fansub
4. Confirme a instalação
5. O app abrirá em janela separada

---

## ⚙️ Configuração

### Variáveis de Ambiente

Não há variáveis de ambiente necessárias, pois é um site estático.

### Google Forms (Comentários)

Os comentários são gerenciados via Google Forms/Sheets:

- Cada anime tem seu próprio formulário
- IDs estão configurados em `data.js`
- Para adicionar novo anime, crie um formulário e adicione os IDs

### Analytics

Google Analytics está configurado com ID: `G-W76CR2MD5S`

---

## 🎮 Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + Shift + D` | Alternar tema (escuro/claro) |
| `Alt + S` | Focar na busca |
| `Alt + F` | Abrir favoritos |
| `Esc` | Fechar modais |
| `R` | Recarregar (na página offline) |

---

## 🔧 Funções Úteis (Console)

```javascript
// Mostra informações sobre PWA
showPWAInfo()

// Limpa todo o cache
clearAppCache()

// Ativa notificações push
requestPushNotifications()

// Mostra atalhos de teclado
showKeyboardShortcuts()

// Gerencia favoritos
AbsoluteUtils.toggleFavorite(animeId)
AbsoluteUtils.getFavorites()

// Alterna tema
AbsoluteUtils.toggleTheme()

// Mostra notificação
AbsoluteUtils.showNotification('Mensagem', 'success')
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

### Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch** (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit suas mudanças** (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push para a branch** (`git push origin feature/NovaFuncionalidade`)
5. **Abra um Pull Request**

### Diretrizes

- Mantenha o código limpo e comentado
- Teste em múltiplos navegadores
- Verifique responsividade
- Siga o padrão de código existente
- Documente novas funcionalidades

---

## 📊 Status do Projeto

### ✅ Implementado

- [x] Sistema de listagem de animes
- [x] Filtros e busca
- [x] Página de detalhes
- [x] Sistema de episódios
- [x] Comentários integrados
- [x] Design responsivo
- [x] Sistema de favoritos
- [x] Modo escuro/claro
- [x] PWA com offline support
- [x] Service Worker
- [x] Lazy loading
- [x] Notificações visuais

### 🔄 Em Desenvolvimento

- [ ] Sistema de usuários
- [ ] Lista personalizada
- [ ] Histórico de visualização
- [ ] Notificações push
- [ ] API REST
- [ ] Admin panel

### 💡 Planejado

- [ ] Sistema de avaliações
- [ ] Fórum da comunidade
- [ ] Newsletter
- [ ] Sistema de badges
- [ ] Ranking de usuários
- [ ] Integração com MAL/AniList

---

## 📄 Licença

Este projeto está sob a licença **Creative Commons BY-NC-SA 4.0**.

Você pode:
- ✅ Compartilhar e adaptar o material
- ✅ Usar para fins não comerciais
- ✅ Dar os devidos créditos

Você não pode:
- ❌ Usar para fins comerciais sem autorização
- ❌ Aplicar restrições adicionais

Para mais informações, consulte [creativecommons.org](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

## 🌟 Créditos

### Equipe

- **Desenvolvimento**: Absolute Team
- **Design**: Absolute Team
- **Tradução**: Equipe de Fansub

### Agradecimentos

- Comunidade de anime brasileira
- Contribuidores do projeto
- Usuários e apoiadores

---

## 📞 Contato

- **Site**: [absolutesub.com.br](https://absolutesub.com.br)
- **Discord**: [Link do Discord](#)
- **Email**: contato@absolutesub.com.br

---

## 📝 Changelog

### v2.0.0 (2025-01-24) - 🆕 Grande Atualização

#### Novas Funcionalidades
- ✨ Sistema de favoritos com persistência local
- ✨ Toggle de tema (modo claro/escuro)
- ✨ PWA com instalação e offline support
- ✨ Service Worker para cache inteligente
- ✨ Lazy loading de imagens
- ✨ Notificações visuais elegantes
- ✨ Botão scroll to top
- ✨ Breadcrumbs automáticos
- ✨ Atalhos de teclado

#### Melhorias
- ⚡ Performance otimizada com debounce/throttle
- ⚡ Pre-caching de assets importantes
- ⚡ Preload de links ao hover
- 🔐 Sanitização de HTML contra XSS
- 🔐 Validação robusta de dados
- 🛠️ Código modularizado em utils
- 🎨 Novos estilos e animações
- 📱 Melhor experiência mobile

#### Correções
- 🐛 Episódios faltantes do anime ID 10 completados
- 🐛 Tratamento de erros melhorado
- 🐛 Links externos com validação

### v1.0.0 (2023-04-13) - 🎉 Lançamento Inicial

- 🎬 Sistema básico de animes
- 🔍 Busca e filtros
- 💬 Sistema de comentários
- 📱 Design responsivo
- 🎨 Interface moderna

---

<div align="center">

**Feito com ❤️ pela equipe Absolute Fansub**

[⬆ Voltar ao topo](#-absolute-fansub---site-oficial)

</div>
