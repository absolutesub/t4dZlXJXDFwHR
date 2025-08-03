// Garante que o DOM esteja carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Elementos principais da interface
    // ============================================

    const animeListSection = document.getElementById('anime-list');           // Container onde os cards de animes serão renderizados
    const filterStatusSelect = document.getElementById('filter-status');      // Filtro de status (em andamento, finalizado, etc.)
    const filterGeneroSelect = document.getElementById('filter-genero');      // Filtro de gênero (ação, comédia, etc.)

    // ============================================
    // Função para renderizar os animes na interface
    // ============================================

    function renderAnimes(animesToRender) {
        animeListSection.innerHTML = ''; // Limpa a lista atual

        // Caso não haja animes com os filtros aplicados, mostra mensagem
        if (animesToRender.length === 0) {
            animeListSection.innerHTML = '<p style="text-align: center; color: #ccc;">Nenhum anime encontrado com os filtros aplicados.</p>';
            return;
        }

        // Para cada anime da lista filtrada
        animesToRender.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card');

            // Tags auxiliares para mostrar status e resolução (com fallback)
            const statusTag = anime.status?.toUpperCase() || 'DESCONHECIDO';
            const resolucaoTag = anime.resolucao?.toUpperCase() || 'SD';

            // Define o conteúdo HTML do card de anime
            animeCard.innerHTML = `
                <a href="anime.html?id=${anime.id}" class="anime-link">
                    <div class="anime-img-wrapper">
                        <img src="${anime.imagem}" alt="${anime.titulo}">
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

            // Adiciona o card à lista
            animeListSection.appendChild(animeCard);
        });
    }

    // ============================================
    // Função para preencher a lista de gêneros disponíveis no filtro
    // ============================================

    function populateGenres() {
        const allTags = new Set(); // Armazena gêneros únicos

        // Percorre todos os animes para coletar os gêneros/tags
        animes.forEach(anime => {
            if (anime.tags && Array.isArray(anime.tags)) {
                anime.tags.forEach(tag => allTags.add(tag.toLowerCase()));
            } else if (anime.genero) { // Suporte a versões antigas que usam "genero" como string
                anime.genero.split(',').forEach(g => allTags.add(g.trim().toLowerCase()));
            }
        });

        // Adiciona a opção padrão ao select
        filterGeneroSelect.innerHTML = '<option value="">Todos os gêneros</option>';

        // Adiciona as opções únicas ordenadas alfabeticamente
        Array.from(allTags).sort().forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1); // Capitaliza
            filterGeneroSelect.appendChild(option);
        });
    }

    // ============================================
    // Função que aplica todos os filtros (status, gênero, busca, tags)
    // ============================================

    function applyFilters() {
        let filteredAnimes = [...animes]; // Cópia dos dados para preservar o original

        // Captura os valores dos filtros
        const statusFilter = filterStatusSelect.value;
        const generoFilter = filterGeneroSelect.value;

        // Captura parâmetros da URL, se existirem (ex: ?search=ação&tag=completos)
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearchTerm = urlParams.get('search');
        const urlTag = urlParams.get('tag');

        // === Filtro por STATUS (select dropdown)
        if (statusFilter) {
            filteredAnimes = filteredAnimes.filter(anime =>
                anime.status && anime.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        // === Filtro por GÊNERO (select dropdown)
        if (generoFilter) {
            filteredAnimes = filteredAnimes.filter(anime =>
                // Verifica se está presente na nova estrutura (tags) ou na antiga (genero string)
                (anime.tags && anime.tags.some(tag => tag.toLowerCase() === generoFilter.toLowerCase())) ||
                (anime.genero && anime.genero.toLowerCase().includes(generoFilter.toLowerCase()))
            );
        }

        // === Filtro por TERMO DE BUSCA da URL (vindo da barra de pesquisa do header)
        if (urlSearchTerm) {
            const searchTermLower = urlSearchTerm.toLowerCase();
            filteredAnimes = filteredAnimes.filter(anime =>
                anime.titulo.toLowerCase().includes(searchTermLower) ||
                (anime.sinopse && anime.sinopse.toLowerCase().includes(searchTermLower)) ||
                (anime.tags && anime.tags.some(tag => tag.toLowerCase().includes(searchTermLower))) ||
                (anime.genero && anime.genero.toLowerCase().includes(searchTermLower))
            );
        }

        // === Filtro por TAG específica da URL (vindo de links do menu "Multimídia")
        if (urlTag) {
            const tagLower = urlTag.toLowerCase();

            // Se for um tipo de status (interpreta como categoria especial)
            if (tagLower === 'completos') {
                filteredAnimes = filteredAnimes.filter(a =>
                    a.status && a.status.toLowerCase() === 'finalizado'
                );
            } else if (tagLower === 'em-andamento') {
                filteredAnimes = filteredAnimes.filter(a =>
                    a.status && a.status.toLowerCase() === 'em andamento'
                );
            } else {
                // Caso contrário, trata como tag ou gênero comum
                filteredAnimes = filteredAnimes.filter(a =>
                    (a.tags && a.tags.some(t => t.toLowerCase() === tagLower)) ||
                    (a.genero && a.genero.toLowerCase().includes(tagLower))
                );
            }
        }

        // Ao final, renderiza a lista filtrada
        renderAnimes(filteredAnimes);
    }

    // ============================================
    // Eventos dos filtros (quando o usuário muda o select)
    // ============================================

    filterStatusSelect.addEventListener('change', applyFilters);
    filterGeneroSelect.addEventListener('change', applyFilters);

    // ============================================
    // Inicialização
    // ============================================

    populateGenres(); // Preenche a lista de gêneros disponíveis
    applyFilters();   // Aplica os filtros iniciais e mostra os animes na tela
});
