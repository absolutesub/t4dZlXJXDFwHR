/**
 * ABSOLUTE FANSUB - SISTEMA DE TEMA (CLARO/ESCURO)
 * Toggle entre modo claro e escuro
 */

(function() {
    'use strict';

    /**
     * Adiciona botão de toggle de tema no header
     */
    function addThemeToggle() {
        const searchBar = document.querySelector('.search-bar-nav');
        if (!searchBar || document.getElementById('theme-toggle-btn')) return;

        const button = document.createElement('button');
        button.id = 'theme-toggle-btn';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Alternar tema');
        button.title = 'Alternar entre modo claro e escuro';

        updateThemeButton(button);

        button.addEventListener('click', function() {
            const newTheme = window.AbsoluteUtils.toggleTheme();
            updateThemeButton(button);
            
            // Notificação
            const themeName = newTheme === 'light' ? 'Claro' : 'Escuro';
            window.AbsoluteUtils.showNotification(`Tema ${themeName} ativado`, 'success');
        });

        // Insere antes do botão de busca
        searchBar.insertBefore(button, searchBar.firstChild);
    }

    /**
     * Atualiza ícone do botão de tema
     */
    function updateThemeButton(button) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isLight = currentTheme === 'light';

        button.innerHTML = isLight ? `
            <svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
            <span class="sr-only">Modo Escuro</span>
        ` : `
            <svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
            <span class="sr-only">Modo Claro</span>
        `;

        button.title = isLight ? 'Ativar modo escuro' : 'Ativar modo claro';
    }

    /**
     * Detecta preferência do sistema
     */
    function detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }

    /**
     * Observa mudanças na preferência do sistema
     */
    function watchSystemTheme() {
        if (!window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Só muda automaticamente se usuário não tiver definido preferência
            const savedTheme = window.AbsoluteUtils.getFromLocalStorage('theme');
            if (!savedTheme) {
                const newTheme = e.matches ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                
                const button = document.getElementById('theme-toggle-btn');
                if (button) updateThemeButton(button);
            }
        });
    }

    /**
     * Adiciona transição suave ao mudar tema
     */
    function addThemeTransition() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
            
            img, video, iframe {
                transition: none !important;
            }
        `;
        style.id = 'theme-transition-style';
        document.head.appendChild(style);

        // Remove após transição para não afetar outras animações
        setTimeout(() => {
            const transitionStyle = document.getElementById('theme-transition-style');
            if (transitionStyle) transitionStyle.remove();
        }, 300);
    }

    // ==================== INICIALIZAÇÃO ====================

    document.addEventListener('DOMContentLoaded', function() {
        // Inicializa tema
        const savedTheme = window.AbsoluteUtils.getFromLocalStorage('theme');
        if (!savedTheme) {
            // Detecta preferência do sistema na primeira vez
            const systemTheme = detectSystemTheme();
            window.AbsoluteUtils.saveToLocalStorage('theme', systemTheme);
            document.documentElement.setAttribute('data-theme', systemTheme);
        }

        // Adiciona botão de toggle
        setTimeout(addThemeToggle, 500);

        // Observa mudanças no sistema
        watchSystemTheme();

        // Adiciona transição ao mudar tema
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    addThemeTransition();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    });

    // Adiciona atalho de teclado
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + D para toggle de tema
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            const button = document.getElementById('theme-toggle-btn');
            if (button) button.click();
        }
    });

})();
