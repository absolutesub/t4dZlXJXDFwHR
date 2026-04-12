document.addEventListener("DOMContentLoaded", () => {
    const postId = new URLSearchParams(window.location.search).get("id");
    if (!postId) return;

    const post = posts.find(p => p.id === parseInt(postId));
    if (!post || !post.animeId) return;

    const anime = animes.find(a => a.id === post.animeId);
    if (!anime) return;

    const episodiosValidos = anime.episodios
        ? anime.episodios.filter(ep => /^\d+$/.test(ep.numero))
        : [];
    const episodiosAtuais = episodiosValidos.length;
    const progressoPorcentagem = anime.episodiosTotal > 0 ? (episodiosAtuais / anime.episodiosTotal) * 100 : 0;

    const container = document.getElementById("related-project-card");

    container.innerHTML = `
        <div class="anime-card2">
            <div class="anime-cover">
                <img src="${anime.imagem}" alt="${anime.titulo}" style="width: 250px; border: 5px solid #4b768b;">
            </div>
            <div class="anime-info">
                <h2 style="margin: 0 !important; font-size: 20px; font-weight: bold; padding: 0px 0px 5px 0px; border-bottom: 3px solid #4b768b;">${anime.titulo}</h2>
                <p style="margin: 12px 0px;"><strong>Episódios:</strong> ${anime.episodiosTotal}</p>
                <p style="margin: 12px 0px;"><strong>Status:</strong> ${anime.status}</p>
                <p style="margin: 12px 0px;"><strong>Gênero:</strong> ${anime.genero}</p>
                <p style="margin: 12px 0px;"><strong>Lançamento:</strong> ${anime.lancamento}</p>
                <p style="margin: 12px 0px;"><strong>Estúdio:</strong> ${anime.estudio}</p>

                <div class="anime-extra-info">
                    <div style="width: 100%;"><strong>Vídeo</strong><br>${anime.video}</div>
                    <div style="width: 100%;"><strong>Áudio</strong><br>${anime.audio}</div>
                    <div style="width: 100%;"><strong>Legenda</strong><br>Softsub</div>
                    <div style="width: 100%;"><strong>Resolução</strong><br>${anime.resolucao}</div>
                </div>

                <!-- Barra de progresso estilizada -->
                <div class="progress-bar-container" style="margin-top: 16px; background-color: #08202c;">
                    <div class="progress-bar" style="width: ${progressoPorcentagem.toFixed(2)}%; background-color: #4b768b; white-space: nowrap; overflow: hidden;">
                        ${episodiosAtuais}/${anime.episodiosTotal} Eps
                    </div>
                </div>

                <a href="/anime.html?id=${anime.id}" class="btn-acessar">Acessar página do projeto</a>
            </div>
        </div>
    `;
});
