/**
 * ABSOLUTE FANSUB - SISTEMA DE FAVORITOS
 * Gerenciamento de animes favoritos
 */

(function() {
    'use strict';

    // ==================== FUNÇÕES PRINCIPAIS ====================

    /**
     * Adiciona botão de favorito na página de detalhes do anime
     */
    function addFavoriteButton() {
        const shareButtons = document.querySelector('.share-comments-buttons');
        if (!shareButtons) return;

        // Verifica se já existe
        if (document.querySelector('.favorite-btn')) return;

        // Pega ID do anime da URL
        const urlParams = new URLSearchParams(window.location.search);
        const animeId = parseInt(urlParams.get('id'));
        
        if (!animeId) return;

        const isFav = window.AbsoluteUtils.isFavorite(animeId);

        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = `favorite-btn ${isFav ? 'active' : ''}`;
        favoriteBtn.innerHTML = `
            <svg class="favorite-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>${isFav ? 'Favoritado' : 'Favoritar'}</span>
        `;

        favoriteBtn.addEventListener('click', function() {
            const nowFav = window.AbsoluteUtils.toggleFavorite(animeId);
            this.classList.toggle('active', nowFav);
            this.querySelector('span').textContent = nowFav ? 'Favoritado' : 'Favoritar';
        });

        // Insere o botão
        shareButtons.insertBefore(favoriteBtn, shareButtons.firstChild);
    }

    /**
     * Adiciona indicador de favorito nos cards da lista
     */
    function addFavoriteIndicators() {
        const cards = document.querySelectorAll('.anime-card[data-id]');
        
        cards.forEach(card => {
            const animeId = parseInt(card.getAttribute('data-id'));
            if (window.AbsoluteUtils.isFavorite(animeId)) {
                // Remove indicador existente
                const existing = card.querySelector('.favorite-indicator');
                if (existing) existing.remove();

                // Adiciona novo indicador
                const indicator = document.createElement('div');
                indicator.className = 'favorite-indicator';
                indicator.innerHTML = `
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                `;
                
                const tags = card.querySelector('.anime-tags');
                if (tags) {
                    tags.appendChild(indicator);
                }
            }
        });
    }

    /**
     * Adiciona filtro de favoritos na página principal
     */
    function addFavoritesFilter() {
        const filters = document.getElementById('filters');
        if (!filters || document.getElementById('show-favorites-only')) return;

        const filterContainer = document.createElement('div');
        filterContainer.style.cssText = 'display: flex; align-items: center; gap: 8px;';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'show-favorites-only';
        checkbox.style.cssText = 'width: 18px; height: 18px; cursor: pointer;';
        
        const label = document.createElement('label');
        label.htmlFor = 'show-favorites-only';
        label.textContent = 'Somente Favoritos';
        label.style.cssText = 'cursor: pointer; user-select: none; color: white; font-size: 14px;';
        
        filterContainer.appendChild(checkbox);
        filterContainer.appendChild(label);
        filters.appendChild(filterContainer);

        // Event listener para filtrar
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                filterFavoritesOnly();
            } else {
                // Recarrega todos os animes (chama função existente se houver)
                if (typeof renderAnimes === 'function') {
                    renderAnimes(window.animes || []);
                }
            }
        });
    }

    /**
     * Filtra apenas animes favoritos
     */
    function filterFavoritesOnly() {
        const favorites = window.AbsoluteUtils.getFavorites();
        
        if (favorites.length === 0) {
            window.AbsoluteUtils.showNotification('Você ainda não tem favoritos!', 'info');
            document.getElementById('show-favorites-only').checked = false;
            return;
        }

        const filteredAnimes = (window.animes || []).filter(anime => 
            favorites.includes(anime.id)
        );

        if (typeof renderAnimes === 'function') {
            renderAnimes(filteredAnimes);
        }
    }

    /**
     * Cria página de favoritos
     */
    function createFavoritesPage() {
        // Adiciona link no menu se ainda não existe
        const nav = document.querySelector('.main-nav ul');
        if (!nav) return;

        // Verifica se já existe
        if (document.querySelector('a[href="favoritos.html"]')) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" id="favorites-link">
                <div class="svg-icon-header">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#FFFFFF">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </div>
                Favoritos
            </a>
        `;
        
        // Insere após o item "Início"
        const firstItem = nav.querySelector('li');
        if (firstItem && firstItem.nextSibling) {
            nav.insertBefore(li, firstItem.nextSibling);
        } else {
            nav.appendChild(li);
        }

        // Event listener
        document.getElementById('favorites-link').addEventListener('click', function(e) {
            e.preventDefault();
            showFavoritesModal();
        });
    }

    /**
     * Mostra modal com favoritos
     */
    function showFavoritesModal() {
        const favorites = window.AbsoluteUtils.getFavorites();
        
        if (favorites.length === 0) {
            window.AbsoluteUtils.showNotification('Você ainda não tem favoritos!', 'info');
            return;
        }

        // Remove modal existente
        const existingModal = document.getElementById('favorites-modal');
        if (existingModal) existingModal.remove();

        // Cria modal
        const modal = document.createElement('div');
        modal.id = 'favorites-modal';
        modal.className = 'share-popup';
        modal.style.display = 'block';
        
        const favAnimes = (window.animes || []).filter(anime => favorites.includes(anime.id));
        
        let content = `
            <div class="share-popup-content" style="max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <span class="close-popup" onclick="document.getElementById('favorites-modal').remove()">&times;</span>
                <h2 style="margin-top: 0; color: white;">Meus Favoritos (${favAnimes.length})</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-top: 20px;">
        `;

        favAnimes.forEach(anime => {
            content += `
                <div style="position: relative;">
                    <a href="anime.html?id=${anime.id}" style="display: block;">
                        <img src="${anime.imagem}" alt="${window.AbsoluteUtils.sanitizeHTML(anime.titulo)}" 
                             style="width: 100%; aspect-ratio: 3/4; object-fit: cover; border: 2px solid #214556;">
                        <div style="margin-top: 8px; font-size: 13px; text-align: center; color: white;">
                            ${window.AbsoluteUtils.sanitizeHTML(anime.titulo)}
                        </div>
                    </a>
                    <button onclick="removeFavoriteFromModal(${anime.id})" 
                            style="position: absolute; top: 5px; right: 5px; background: rgba(220,53,69,0.9); 
                                   border: none; color: white; padding: 5px 8px; cursor: pointer; border-radius: 3px;">
                        ✕
                    </button>
                </div>
            `;
        });

        content += `
                </div>
            </div>
        `;

        modal.innerHTML = content;
        document.body.appendChild(modal);

        // Fecha ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Função global para remover favorito do modal
    window.removeFavoriteFromModal = function(animeId) {
        window.AbsoluteUtils.toggleFavorite(animeId);
        showFavoritesModal(); // Recarrega o modal
    };

    // ==================== INICIALIZAÇÃO ====================

    document.addEventListener('DOMContentLoaded', function() {
        // Adiciona botão de favorito na página de detalhes
        if (window.location.pathname.includes('anime.html')) {
            setTimeout(addFavoriteButton, 500);
        }

        // Adiciona indicadores e filtros na página principal
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            setTimeout(() => {
                addFavoriteIndicators();
                addFavoritesFilter();
            }, 1000);
        }

        // Adiciona link de favoritos no menu
        setTimeout(createFavoritesPage, 500);
    });

    // Adiciona estilos necessários
    const styles = document.createElement('style');
    styles.textContent = `
        .favorite-indicator {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(220, 53, 69, 0.9);
            padding: 4px;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .favorite-indicator svg {
            width: 18px;
            height: 18px;
            fill: white;
        }

        .favorite-btn-wrapper {
            display: inline-block;
        }
    `;
    document.head.appendChild(styles);

})();
