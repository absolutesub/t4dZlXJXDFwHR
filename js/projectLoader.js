/**
 * Carrega e renderiza projetos em andamento
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const projectsContainer = document.getElementById('projects-in-progress');

        if (!projectsContainer) {
            console.warn('Projects container not found');
            return;
        }

        if (typeof animes === 'undefined' || !Array.isArray(animes)) {
            projectsContainer.innerHTML = '<p>Erro ao carregar dados de animes.</p>';
            console.error('Anime data not available');
            return;
        }

        const projetosEmAndamento = animes.filter(anime => anime.status === 'Em andamento');

        if (projetosEmAndamento.length > 0) {
            const fragment = document.createDocumentFragment();

            projetosEmAndamento.forEach(anime => {
                try {
                    const episodiosValidos = anime.episodios
                        ? anime.episodios.filter(ep => /^\d+$/.test(ep.numero))
                        : [];
                    const episodiosAtuais = episodiosValidos.length;
                    const progressoPorcentagem = (anime.episodiosTotal > 0)
                        ? (episodiosAtuais / anime.episodiosTotal) * 100
                        : 0;

                    const projectDiv = document.createElement('div');
                    projectDiv.className = 'project-item';
                    projectDiv.innerHTML = `
                        <img src="${anime.imagem}" alt="Capa de ${anime.titulo}" class="project-cover-image" loading="lazy">
                        <div class="project-title-container" style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                            <p>${anime.titulo}</p>
                            <div class="progress-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" aria-hidden="true">
                                    <path d="M480-334.23 625.77-480 480-625.77 438.23-584l74 74H330v60h182.23l-74 74L480-334.23Zm.07 234.23q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                </svg>
                            </div>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${progressoPorcentagem.toFixed(2)}%;">
                                ${episodiosAtuais}/${anime.episodiosTotal}
                            </div>
                        </div>
                        <a href="anime.html?id=${anime.id}" class="project-link">Acessar página do projeto</a>
                    `;

                    fragment.appendChild(projectDiv);
                } catch (error) {
                    console.error('Error processing project:', anime.titulo, error);
                }
            });

            projectsContainer.appendChild(fragment);
        } else {
            projectsContainer.innerHTML = '<p>Nenhum projeto em andamento no momento.</p>';
        }
    } catch (error) {
        console.error('Error initializing project loader:', error);
    }
});
