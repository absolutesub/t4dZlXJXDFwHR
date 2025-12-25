/**
 * ABSOLUTE FANSUB - MELHORIAS DE UX E PERFORMANCE
 * Botão scroll to top, lazy loading, etc.
 */

(function() {
    'use strict';

    // ==================== SCROLL TO TOP ====================

    /**
     * Adiciona botão de scroll to top
     */
    function addScrollToTop() {
        if (document.getElementById('scroll-to-top-btn')) return;

        const button = document.createElement('button');
        button.id = 'scroll-to-top-btn';
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Voltar ao topo');
        button.title = 'Voltar ao topo';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `;

        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(button);

        // Mostra/esconde baseado no scroll
        const toggleButton = window.AbsoluteUtils.throttle(() => {
            if (window.pageYOffset > 300) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', toggleButton);
    }

    // ==================== LAZY LOADING AVANÇADO ====================

    /**
     * Converte imagens para lazy loading
     */
    function convertToLazyLoad() {
        const images = document.querySelectorAll('img:not([data-src])');
        
        images.forEach(img => {
            // Pula imagens já carregadas ou muito importantes
            if (img.complete || img.classList.contains('no-lazy')) return;

            const src = img.src;
            if (src && !img.hasAttribute('data-src')) {
                img.setAttribute('data-src', src);
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
        });

        // Reinicializa lazy loading
        if (window.AbsoluteUtils && window.AbsoluteUtils.initLazyLoading) {
            window.AbsoluteUtils.initLazyLoading();
        }
    }

    // ==================== PRELOAD DE LINKS ====================

    /**
     * Preload de páginas ao passar mouse
     */
    function addLinkPreload() {
        const links = document.querySelectorAll('a[href^="anime.html"], a[href^="contentpost.html"]');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const href = this.href;
                
                // Verifica se já foi feito preload
                if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

                const prefetch = document.createElement('link');
                prefetch.rel = 'prefetch';
                prefetch.href = href;
                document.head.appendChild(prefetch);
            }, { once: true });
        });
    }

    // ==================== OFFLINE DETECTION ====================

    /**
     * Detecta quando usuário fica offline
     */
    function setupOfflineDetection() {
        // Remove indicador existente
        let indicator = document.getElementById('offline-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'offline-indicator';
            indicator.className = 'offline-indicator';
            indicator.textContent = '⚠️ Você está offline. Algumas funcionalidades podem não funcionar.';
            document.body.appendChild(indicator);
        }

        window.addEventListener('offline', () => {
            indicator.classList.add('show');
        });

        window.addEventListener('online', () => {
            indicator.classList.remove('show');
            window.AbsoluteUtils.showNotification('Conexão restaurada!', 'success');
        });

        // Verifica status inicial
        if (!navigator.onLine) {
            indicator.classList.add('show');
        }
    }

    // ==================== PWA INSTALL PROMPT ====================

    let deferredPrompt;

    /**
     * Captura evento de instalação PWA
     */
    function setupPWAInstall() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Previne mini-infobar automática
            e.preventDefault();
            deferredPrompt = e;

            // Mostra prompt customizado
            showPWAInstallPrompt();
        });

        // Detecta quando app é instalado
        window.addEventListener('appinstalled', () => {
            window.AbsoluteUtils.showNotification('App instalado com sucesso!', 'success');
            deferredPrompt = null;
            hidePWAInstallPrompt();
        });
    }

    /**
     * Mostra prompt de instalação PWA
     */
    function showPWAInstallPrompt() {
        // Verifica se já foi dispensado antes
        if (window.AbsoluteUtils.getFromLocalStorage('pwa-dismissed', false)) return;

        let prompt = document.getElementById('pwa-install-prompt');
        if (!prompt) {
            prompt = document.createElement('div');
            prompt.id = 'pwa-install-prompt';
            prompt.className = 'pwa-install-prompt';
            prompt.innerHTML = `
                <div class="pwa-install-content">
                    <div class="pwa-install-title">📱 Instalar Absolute Fansub</div>
                    <div class="pwa-install-text">Instale nosso app para acesso rápido e experiência offline</div>
                </div>
                <div class="pwa-install-actions">
                    <button class="pwa-install-button" id="pwa-install-btn">Instalar</button>
                    <button class="pwa-install-dismiss" id="pwa-dismiss-btn">Agora não</button>
                </div>
            `;
            document.body.appendChild(prompt);

            // Botão instalar
            document.getElementById('pwa-install-btn').addEventListener('click', async () => {
                if (!deferredPrompt) return;

                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    console.log('PWA instalado');
                } else {
                    console.log('PWA não instalado');
                }

                deferredPrompt = null;
                hidePWAInstallPrompt();
            });

            // Botão dismiss
            document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
                window.AbsoluteUtils.saveToLocalStorage('pwa-dismissed', true);
                hidePWAInstallPrompt();
            });
        }

        setTimeout(() => {
            prompt.classList.add('show');
        }, 3000); // Mostra após 3 segundos
    }

    /**
     * Esconde prompt de instalação PWA
     */
    function hidePWAInstallPrompt() {
        const prompt = document.getElementById('pwa-install-prompt');
        if (prompt) {
            prompt.classList.remove('show');
        }
    }

    // ==================== PERFORMANCE MONITORING ====================

    /**
     * Monitor básico de performance
     */
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // LCP - Largest Contentful Paint
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Navegador não suporta
            }

            // FID - First Input Delay
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // Navegador não suporta
            }
        }

        // Log de tempo de carregamento
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Tempo de carregamento:', pageLoadTime + 'ms');
            }, 0);
        });
    }

    // ==================== CACHE DE IMAGENS ====================

    /**
     * Pre-cache de imagens importantes
     */
    function precacheImages() {
        const importantImages = [
            '/img/assets/loadinglogo.png',
            '/img/assets/favicon.ico',
            '/img/assets/bg.jpg'
        ];

        importantImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // ==================== MELHORIAS DE NAVEGAÇÃO ====================

    /**
     * Adiciona indicador de página atual no menu
     */
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.main-nav a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPage || href.includes(currentPage))) {
                link.style.backgroundColor = '#214556';
                link.style.borderLeft = '3px solid #1997d3';
            }
        });
    }

    /**
     * Breadcrumbs automático
     */
    function addBreadcrumbs() {
        // Apenas em páginas de detalhes
        if (!window.location.search.includes('id=')) return;

        const container = document.querySelector('.anime-details-header');
        if (!container || document.querySelector('.breadcrumbs')) return;

        const breadcrumbs = document.createElement('div');
        breadcrumbs.className = 'breadcrumbs';
        breadcrumbs.style.cssText = `
            padding: 10px 0;
            font-size: 14px;
            color: #9b9b9b;
            position: relative;
            z-index: 3;
        `;
        
        breadcrumbs.innerHTML = `
            <a href="index.html" style="color: #1997d3; text-decoration: none;">Início</a>
            <span style="margin: 0 8px;">/</span>
            <span>Detalhes do Anime</span>
        `;

        container.insertBefore(breadcrumbs, container.firstChild);
    }

    // ==================== INICIALIZAÇÃO ====================

    document.addEventListener('DOMContentLoaded', function() {
        // Scroll to top button
        addScrollToTop();

        // Lazy loading
        setTimeout(convertToLazyLoad, 1000);

        // Link preload
        setTimeout(addLinkPreload, 2000);

        // Offline detection
        setupOfflineDetection();

        // PWA install
        setupPWAInstall();

        // Performance monitoring (apenas em desenvolvimento)
        if (window.location.hostname === 'localhost') {
            monitorPerformance();
        }

        // Pre-cache
        precacheImages();

        // Navegação
        highlightCurrentPage();
        setTimeout(addBreadcrumbs, 500);
    });

    // ==================== KEYBOARD SHORTCUTS ====================

    document.addEventListener('keydown', function(e) {
        // Esc para fechar modais
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.share-popup, #favorites-modal');
            modals.forEach(modal => modal.remove());
        }

        // Alt + S para focar busca
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            const searchInput = document.getElementById('search-nav');
            if (searchInput) searchInput.focus();
        }

        // Alt + F para abrir favoritos
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            const favLink = document.getElementById('favorites-link');
            if (favLink) favLink.click();
        }
    });

    // Help modal para atalhos
    window.showKeyboardShortcuts = function() {
        alert(`🎮 Atalhos de Teclado:

Ctrl/Cmd + Shift + D - Alternar tema
Alt + S - Buscar
Alt + F - Favoritos
Esc - Fechar modais`);
    };

})();
