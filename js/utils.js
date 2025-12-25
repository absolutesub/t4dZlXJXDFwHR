/**
 * ABSOLUTE FANSUB - UTILITY FUNCTIONS
 * Funções utilitárias para o site
 */

// ==================== VALIDAÇÃO E SANITIZAÇÃO ====================

/**
 * Sanitiza HTML para prevenir XSS
 * @param {string} str - String a ser sanitizada
 * @returns {string} - String sanitizada
 */
function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Valida se uma URL é válida
 * @param {string} url - URL a ser validada
 * @returns {boolean}
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Valida email
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== LAZY LOADING DE IMAGENS ====================

/**
 * Implementa lazy loading para imagens
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== TRATAMENTO DE ERROS ====================

/**
 * Mostra mensagem de erro amigável ao usuário
 * @param {string} message - Mensagem de erro
 * @param {string} type - Tipo: 'error', 'warning', 'info', 'success'
 */
function showNotification(message, type = 'info') {
    // Remove notificação existente se houver
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${sanitizeHTML(message)}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Wrapper para tratamento de erros em funções async
 * @param {Function} fn - Função async
 */
async function tryCatch(fn, errorMessage = 'Ocorreu um erro. Tente novamente.') {
    try {
        return await fn();
    } catch (error) {
        console.error('Error:', error);
        showNotification(errorMessage, 'error');
        return null;
    }
}

// ==================== LOCAL STORAGE ====================

/**
 * Salva dados no localStorage com tratamento de erro
 * @param {string} key
 * @param {*} value
 */
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

/**
 * Recupera dados do localStorage
 * @param {string} key
 * @param {*} defaultValue - Valor padrão se não encontrar
 */
function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return defaultValue;
    }
}

// ==================== SISTEMA DE FAVORITOS ====================

/**
 * Adiciona/remove anime dos favoritos
 * @param {number} animeId
 * @returns {boolean} - true se adicionado, false se removido
 */
function toggleFavorite(animeId) {
    const favorites = getFromLocalStorage('favorites', []);
    const index = favorites.indexOf(animeId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removido dos favoritos!', 'info');
        return false;
    } else {
        favorites.push(animeId);
        showNotification('Adicionado aos favoritos!', 'success');
        return true;
    }
    
    saveToLocalStorage('favorites', favorites);
}

/**
 * Verifica se anime está nos favoritos
 * @param {number} animeId
 */
function isFavorite(animeId) {
    const favorites = getFromLocalStorage('favorites', []);
    return favorites.includes(animeId);
}

/**
 * Retorna lista de animes favoritos
 */
function getFavorites() {
    return getFromLocalStorage('favorites', []);
}

// ==================== MODO ESCURO/CLARO ====================

/**
 * Alterna entre modo escuro e claro
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    saveToLocalStorage('theme', newTheme);
    
    return newTheme;
}

/**
 * Inicializa tema salvo
 */
function initTheme() {
    const savedTheme = getFromLocalStorage('theme', 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// ==================== PERFORMANCE ====================

/**
 * Debounce function para otimizar eventos
 * @param {Function} func
 * @param {number} wait
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para otimizar eventos
 * @param {Function} func
 * @param {number} limit
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== FORMATAÇÃO ====================

/**
 * Formata data para padrão BR
 * @param {string} dateStr - Data no formato MM-DD-YYYY ou DD-MM-YYYY
 */
function formatDate(dateStr) {
    if (!dateStr) return 'Data não disponível';
    
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[1]}/${parts[0]}/${parts[2]}`;
        }
        return dateStr;
    } catch (e) {
        return dateStr;
    }
}

/**
 * Trunca texto com ellipsis
 * @param {string} text
 * @param {number} maxLength
 */
function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// ==================== SCROLL SUAVE ====================

/**
 * Scroll suave para elemento
 * @param {string} selector - Seletor CSS do elemento
 */
function smoothScrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== CARREGAMENTO ====================

/**
 * Mostra loading spinner
 */
function showLoading() {
    const loading = document.getElementById('loading-screen');
    if (loading) {
        loading.classList.remove('hidden');
        document.body.classList.add('loading-active');
    }
}

/**
 * Esconde loading spinner
 */
function hideLoading() {
    const loading = document.getElementById('loading-screen');
    if (loading) {
        loading.classList.add('hidden');
        document.body.classList.remove('loading-active');
    }
}

// ==================== SHARE API ====================

/**
 * Compartilha usando Web Share API (se disponível)
 * @param {string} title
 * @param {string} text
 * @param {string} url
 */
async function shareContent(title, text, url) {
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            return true;
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
            return false;
        }
    } else {
        // Fallback: copiar para clipboard
        try {
            await navigator.clipboard.writeText(url);
            showNotification('Link copiado para a área de transferência!', 'success');
            return true;
        } catch (err) {
            console.error('Error copying:', err);
            return false;
        }
    }
}

// ==================== INICIALIZAÇÃO ====================

/**
 * Inicializa utilitários quando DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLazyLoading();
    
    // Remove loading screen após página carregar
    window.addEventListener('load', () => {
        setTimeout(hideLoading, 500);
    });
});

// Exportar funções para uso global
window.AbsoluteUtils = {
    sanitizeHTML,
    isValidURL,
    isValidEmail,
    showNotification,
    tryCatch,
    saveToLocalStorage,
    getFromLocalStorage,
    toggleFavorite,
    isFavorite,
    getFavorites,
    toggleTheme,
    debounce,
    throttle,
    formatDate,
    truncateText,
    smoothScrollTo,
    showLoading,
    hideLoading,
    shareContent
};
