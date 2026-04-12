/**
 * Gerencia a renderizacao e filtragem de cards de animes
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const animeList = document.getElementById('anime-list');
        const buttons = document.querySelectorAll('.letter-filter button');

        if (!animeList || buttons.length === 0) {
            console.warn('Anime list or filter buttons not found');
            return;
        }

        /**
         * Converte string de data "13 de abril de 2023" para objeto Date
         */
        function convertToDate(dateString) {
            const meses = {
                janeiro: 0, fevereiro: 1, marco: 2, abril: 3, maio: 4, junho: 5,
                julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
            };

            try {
                const partes = dateString.split(' de ');
                if (partes.length !== 3) {
                    return new Date(0);
                }

                const dia = parseInt(partes[0], 10);
                const mes = meses[partes[1].toLowerCase()];
                const ano = parseInt(partes[2], 10);

                if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
                    return new Date(0);
                }

                return new Date(ano, mes, dia);
            } catch (error) {
                console.error('Error converting date:', error);
                return new Date(0);
            }
        }

        /**
         * Renderiza lista de animes como cards
         * Utiliza DocumentFragment para melhor performance
         */
        function renderAnimes(lista) {
            try {
                animeList.innerHTML = '';

                if (lista.length === 0) {
                    animeList.innerHTML = '<p style="padding: 20px;">Nenhum anime encontrado.</p>';
                    return;
                }

                // Usar DocumentFragment para melhor performance
                const fragment = document.createDocumentFragment();

                lista.forEach(anime => {
                    const card = document.createElement('div');
                    card.className = 'anime-card';
                    card.innerHTML = `
                        <a href="anime.html?id=${anime.id}" class="anime-link">
                            <div class="anime-img-wrapper">
                                <img src="${anime.imagem}" alt="${anime.titulo}" loading="lazy">
                                <div class="anime-title-overlay">
                                    <h3 style="padding: 0px 10px;">${anime.titulo}</h3>
                                </div>
                                <div class="anime-tags">
                                    <span class="tag status ${anime.status.toLowerCase().replace(/\s/g, '-')}">${anime.status.toUpperCase()}</span>
                                    <span class="tag resolucao">${anime.resolucao}</span>
                                </div>
                            </div>
                        </a>
                    `;
                    fragment.appendChild(card);
                });

                animeList.appendChild(fragment);
            } catch (error) {
                console.error('Error rendering animes:', error);
            }
        }

        /**
         * Ordena animes por data de adicao (mais recente primeiro)
         */
        function ordenarAnimesPorData(lista) {
            return [...lista].sort((a, b) => {
                const dateA = convertToDate(a.adicionadoEm);
                const dateB = convertToDate(b.adicionadoEm);
                return dateB - dateA;
            });
        }

        /**
         * Filtra animes por letra inicial do titulo
         */
        function filtrarPorLetra(letra) {
            try {
                buttons.forEach(btn => btn.classList.remove('active'));
                const btnAtivo = document.querySelector(`.letter-filter button[data-letter="${letra}"]`);
                if (btnAtivo) {
                    btnAtivo.classList.add('active');
                }

                let listaFiltrada = [];

                if (letra === 'all') {
                    listaFiltrada = animes;
                } else if (letra === '#') {
                    listaFiltrada = animes.filter(a => !/^[A-Za-z]/.test(a.titulo));
                } else {
                    listaFiltrada = animes.filter(a => a.titulo.trim().toUpperCase().startsWith(letra));
                }

                renderAnimes(ordenarAnimesPorData(listaFiltrada));
            } catch (error) {
                console.error('Error filtering by letter:', error);
            }
        }

        // Adiciona evento aos botoes de filtro
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                try {
                    const letra = btn.getAttribute('data-letter');
                    if (letra) {
                        filtrarPorLetra(letra);
                    }
                } catch (error) {
                    console.error('Error on filter button click:', error);
                }
            });
        });

        // Renderiza todos os animes ao carregar
        renderAnimes(ordenarAnimesPorData(animes));
    } catch (error) {
        console.error('Error initializing anime cards:', error);
    }
});
