/**
 * Gerencia filtragem e renderizacao de animes
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const animeListSection = document.getElementById('anime-list');
        const filterStatusSelect = document.getElementById('filter-status');
        const filterGeneroSelect = document.getElementById('filter-genero');

        if (!animeListSection || !filterStatusSelect || !filterGeneroSelect) {
            console.warn('Filter elements not found');
            return;
        }

        /**
         * Renderiza animes como cards usando DocumentFragment para melhor performance
         */
        function renderAnimes(animesToRender) {
            try {
                animeListSection.innerHTML = '';

                if (animesToRender.length === 0) {
                    animeListSection.innerHTML = '<p style="text-align: center; color: #ccc;">Nenhum anime encontrado com os filtros aplicados.</p>';
                    return;
                }

                const fragment = document.createDocumentFragment();

                animesToRender.forEach(anime => {
                    const animeCard = document.createElement('div');
                    animeCard.classList.add('anime-card');

                    const statusTag = anime.status?.toUpperCase() || 'DESCONHECIDO';
                    const resolucaoTag = anime.resolucao?.toUpperCase() || 'SD';

                    animeCard.innerHTML = `
                        <a href="anime.html?id=${anime.id}" class="anime-link">
                            <div class="anime-img-wrapper">
                                <img src="${anime.imagem}" alt="${anime.titulo}" loading="lazy">
                                <div class="anime-title-overlay">
                                    <h3>${anime.titulo}</h3>
                                </div>
                                <div class="anime-tags">
                                    <span class="tag status ${statusTag.replace(/\s/g, '-').toLowerCase()}">${statusTag}</span>
                                    <span class="tag resolucao">${resolucaoTag}</span>
                                </div>
                            </div>
                        </a>
                    `;

                    fragment.appendChild(animeCard);
                });

                animeListSection.appendChild(fragment);
            } catch (error) {
                console.error('Error rendering animes:', error);
            }
        }

        /**
         * Popula lista de generos disponiveis no filtro
         */
        function populateGenres() {
            try {
                const allTags = new Set();

                animes.forEach(anime => {
                    if (anime.tags && Array.isArray(anime.tags)) {
                        anime.tags.forEach(tag => allTags.add(tag.toLowerCase()));
                    } else if (anime.genero) {
                        anime.genero.split(',').forEach(g => allTags.add(g.trim().toLowerCase()));
                    }
                });

                filterGeneroSelect.innerHTML = '<option value="">Todos os generos</option>';

                Array.from(allTags).sort().forEach(tag => {
                    const option = document.createElement('option');
                    option.value = tag;
                    option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
                    filterGeneroSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error populating genres:', error);
            }
        }

        /**
         * Aplica todos os filtros (status, genero, busca, tags)
         */
        function applyFilters() {
            try {
                let filteredAnimes = [...animes];

                const statusFilter = filterStatusSelect.value;
                const generoFilter = filterGeneroSelect.value;

                const urlParams = new URLSearchParams(window.location.search);
                const urlSearchTerm = urlParams.get('search');
                const urlTag = urlParams.get('tag');

                // Filtro por STATUS
                if (statusFilter) {
                    filteredAnimes = filteredAnimes.filter(anime =>
                        anime.status && anime.status.toLowerCase() === statusFilter.toLowerCase()
                    );
                }

                // Filtro por GENERO
                if (generoFilter) {
                    filteredAnimes = filteredAnimes.filter(anime =>
                        (anime.tags && anime.tags.some(tag => tag.toLowerCase() === generoFilter.toLowerCase())) ||
                        (anime.genero && anime.genero.toLowerCase().includes(generoFilter.toLowerCase()))
                    );
                }

                // Filtro por TERMO DE BUSCA
                if (urlSearchTerm) {
                    const searchTermLower = urlSearchTerm.toLowerCase();
                    filteredAnimes = filteredAnimes.filter(anime =>
                        anime.titulo.toLowerCase().includes(searchTermLower) ||
                        (anime.sinopse && anime.sinopse.toLowerCase().includes(searchTermLower)) ||
                        (anime.tags && anime.tags.some(tag => tag.toLowerCase().includes(searchTermLower))) ||
                        (anime.genero && anime.genero.toLowerCase().includes(searchTermLower))
                    );
                }

                // Filtro por TAG especifica
                if (urlTag) {
                    const tagLower = urlTag.toLowerCase();

                    if (tagLower === 'completos') {
                        filteredAnimes = filteredAnimes.filter(a =>
                            a.status && a.status.toLowerCase() === 'finalizado'
                        );
                    } else if (tagLower === 'em-andamento') {
                        filteredAnimes = filteredAnimes.filter(a =>
                            a.status && a.status.toLowerCase() === 'em andamento'
                        );
                    } else {
                        filteredAnimes = filteredAnimes.filter(a =>
                            (a.tags && a.tags.some(t => t.toLowerCase() === tagLower)) ||
                            (a.genero && a.genero.toLowerCase().includes(tagLower))
                        );
                    }
                }

                renderAnimes(filteredAnimes);
            } catch (error) {
                console.error('Error applying filters:', error);
            }
        }

        // Eventos dos filtros
        filterStatusSelect.addEventListener('change', applyFilters);
        filterGeneroSelect.addEventListener('change', applyFilters);

        // Inicializacao
        populateGenres();
        applyFilters();
    } catch (error) {
        console.error('Error initializing filter system:', error);
    }
});
