document.addEventListener('DOMContentLoaded', () => {
    const animeList = document.getElementById('anime-list');
    const buttons = document.querySelectorAll('.letter-filter button');

    // Função para converter a data "13 de abril de 2023" para um objeto Date
    function convertToDate(dateString) {
        const meses = {
            janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
            julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
        };

        const partes = dateString.split(' de ');
        if (partes.length !== 3) {
            console.error('Formato de data inválido:', dateString);
            return new Date(0); // Retorna uma data inválida se o formato não for correto
        }

        const dia = parseInt(partes[0]);
        const mes = meses[partes[1].toLowerCase()];
        const ano = parseInt(partes[2]);

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
            console.error('Erro ao converter data:', dateString);
            return new Date(0); // Retorna uma data inválida em caso de erro
        }

        return new Date(ano, mes, dia);
    }

    // Função para criar os cards
    function renderAnimes(lista) {
        animeList.innerHTML = '';

        if (lista.length === 0) {
            animeList.innerHTML = '<p style="padding: 20px;">Nenhum anime encontrado.</p>';
            return;
        }

        lista.forEach(anime => {
            animeList.innerHTML += `
                <div class="anime-card">
                    <a href="anime.html?id=${anime.id}" class="anime-link">
                        <div class="anime-img-wrapper">
                            <img src="${anime.imagem}" alt="${anime.titulo}">
                            <div class="anime-title-overlay">
                                <h3 style="padding: 0px 10px;">${anime.titulo}</h3>
                            </div>
                            <div class="anime-tags">
                                <span class="tag status ${anime.status.toLowerCase().replace(/\s/g, '-')}">${anime.status.toUpperCase()}</span>
                                <span class="tag resolucao">${anime.resolucao}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });
    }

    // Função para ordenar os animes por data de adição
    function ordenarAnimesPorData(lista) {
        console.log('Ordenando animes por data...');
        return lista.sort((a, b) => {
            const dateA = convertToDate(a.adicionadoEm);
            const dateB = convertToDate(b.adicionadoEm);

            // Log de depuração para verificar as datas
            console.log(`Comparando ${a.titulo} (${dateA}) com ${b.titulo} (${dateB})`);

            return dateB - dateA; // Ordem decrescente (mais recente primeiro)
        });
    }

    // Função para filtrar por letra
    function filtrarPorLetra(letra) {
        buttons.forEach(btn => btn.classList.remove('active'));
        const btnAtivo = document.querySelector(`.letter-filter button[data-letter="${letra}"]`);
        if (btnAtivo) btnAtivo.classList.add('active');

        let listaFiltrada = [];

        if (letra === 'all') {
            listaFiltrada = animes; // Mostra todos
        } else if (letra === '#') {
            listaFiltrada = animes.filter(a => !/^[A-Za-z]/.test(a.titulo)); // Para caracteres especiais
        } else {
            listaFiltrada = animes.filter(a => a.titulo.trim().toUpperCase().startsWith(letra)); // Filtro por letra
        }

        // Ordena a lista filtrada antes de renderizar
        renderAnimes(ordenarAnimesPorData(listaFiltrada));
    }

    // Adiciona o evento aos botões
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const letra = btn.getAttribute('data-letter');
            filtrarPorLetra(letra);
        });
    });

    // Mostra todos os animes ao carregar, ordenados por data
    renderAnimes(ordenarAnimesPorData(animes));
});
