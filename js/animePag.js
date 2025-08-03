document.addEventListener('DOMContentLoaded', () => {
    // Esta é a função principal que encapsula todo o código.
    // Ela garante que o script só seja executado depois que todo o HTML da página for completamente carregado e analisado.
    // Isso é crucial para que o script possa acessar e manipular os elementos da página sem que eles ainda não existam.

    // Pega o parâmetro id da URL
    const params = new URLSearchParams(window.location.search);
    const animeId = parseInt(params.get('id'));
    const anime = animes.find(a => a.id === animeId);

    /*
     * Lógica de Carregamento e Exibição do Anime:
     * Este bloco verifica se um anime foi encontrado com o ID especificado.
     * Se não for encontrado, exibe uma mensagem de erro na página.
     * Caso contrário, preenche todos os detalhes do anime nos elementos HTML correspondentes.
     */
    if (!anime) {
        // Melhorar a mensagem de "Anime não encontrado" para não remover tudo
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = '<p style="text-align: center; padding: 50px; font-size: 1.5em;">Anime não encontrado.</p><p style="text-align: center;"><a href="index.html">Voltar para a Página Inicial</a></p>';
        } else {
            document.body.innerHTML = '<h1>Anime não encontrado</h1>'; // Fallback
        }
    } else {
        // Preenche dados básicos do anime
        document.getElementById('anime-titulo').textContent = anime.titulo;
        document.getElementById('anime-imagem').src = anime.imagem;
        document.getElementById('anime-imagem').alt = anime.titulo;
        document.getElementById('anime-lancamento').textContent = anime.lancamento || 'N/A';
        document.getElementById('anime-genero').textContent = anime.genero || 'N/A';
        document.getElementById('anime-episodios-total').textContent = anime.episodiosTotal || 'N/A';
        document.getElementById('anime-status-detail').textContent = anime.status || 'N/A';
        document.getElementById('anime-sinopse').textContent = anime.sinopse || 'Sinopse não disponível.';
        document.getElementById('anime-adicionado-em').textContent = 'Adicionado em: ' + (anime.adicionadoEm || 'N/A');
        document.getElementById('anime-estudio').textContent = anime.estudio || 'N/A';
        document.getElementById('anime-site-oficial').href = anime.siteOficial || '#';
        document.getElementById('anime-video').textContent = anime.video || 'N/A';
        document.getElementById('anime-audio').textContent = anime.audio || 'N/A';
        document.getElementById('anime-resolucao').textContent = anime.resolucao || 'N/A';
        document.getElementById('anime-script-original').textContent = anime.scriptOriginal || 'N/A';
        document.getElementById('anime-legenda').textContent = anime.legendas || 'N/A';


        // Nome no topo navagador
        document.title = `${anime.titulo} - Absolute Fansub`;

        /*
         * Funcionalidade de Screenshots:
         * Esta seção gerencia a exibição de screenshots do anime.
         * A função 'showNextScreenshot' troca a imagem atual com um efeito de fade-out e fade-in.
         * 'setInterval' é usado para automatizar a troca das imagens a cada 9 segundos, criando um carrossel.
         */
        const screenshots = anime.screenshots; // do JSON
        let currentScreenshot = 0;
        const screenshotImg = document.getElementById('screenshot-image');

        function showNextScreenshot() {
            if (screenshots.length === 0) return;

            // Apaga a imagem atual (fade-out)
            screenshotImg.style.opacity = 0;

            // Espera o fade-out terminar antes de trocar a imagem e fazer o fade-in
            setTimeout(() => {
                screenshotImg.src = screenshots[currentScreenshot];
                currentScreenshot = (currentScreenshot + 1) % screenshots.length;

                // Aplica o fade-in
                screenshotImg.style.opacity = 1;
            }, 600); // espera 200ms antes de trocar (ajustável)
        }

        showNextScreenshot(); // inicializa
        setInterval(showNextScreenshot, 9000); // troca a cada 4s

        /*
         * Embed do Trailer:
         * Este bloco de código é responsável por incorporar o trailer do anime.
         * Ele verifica se uma URL de trailer está disponível e, se sim, cria um iframe dinamicamente
         * para exibir o vídeo. Caso contrário, mostra uma mensagem informando que o trailer não está disponível.
         */
        const trailerContainer = document.getElementById('trailer-container');
        if (anime.trailerUrl) {
            const iframe = document.createElement('iframe');
            iframe.width = "560"; // Valores padrão, ajuste com CSS
            iframe.height = "315"; // Valores padrão, ajuste com CSS
            iframe.src = anime.trailerUrl;
            iframe.title = `Trailer de ${anime.titulo}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            iframe.loading = "lazy";
            trailerContainer.appendChild(iframe);
        } else {
            trailerContainer.innerHTML = '<p style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;font-size: 20px;margiN: 0;color: #236283;background-color: #08202c;">Trailer não disponível.</p>';
        }

        /*
         * Listagem de Episódios para Download:
         * Esta seção itera sobre os episódios do anime e as plataformas de download configuradas.
         * Para cada episódio e plataforma disponível, ele gera um bloco HTML com o título do episódio
         * e botões/links para download, incluindo ícones e nomes das plataformas.
         */
        const episodiosLista = document.getElementById('episodios-lista');
        episodiosLista.innerHTML = ''; // Limpa a lista antes

        // Adicione novas chaves exemplo mefiafire não esqueça do icone svg
        const plataformas = [
            {
                chave: 'pixeldrain',
                nome: 'Pixeldrain',
                icone: '<svg style="height: 1.6em; width: 1.6em;" enable-background="new 0 0 283.46 283.46" version="1.1" viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg" class="svelte-1x1207"><path d="m142 2.23c-77 0-139 62.5-139 140 0 77 62.5 139 139 139 77 0 139-62.5 139-139 1e-3 -77-62.5-140-139-140zm0 258c-65.7 0-119-53.2-119-119s53.2-119 119-119c65.7 0 119 53.2 119 119 0 65.7-53.2 119-119 119zm0-219c-55.1 0-99.8 44.7-99.8 99.8 0 55.1 44.7 99.8 99.8 99.8s99.8-44.7 99.8-99.8c0-55.1-44.7-99.8-99.8-99.8zm49.3 36c8.69 0 15.7 7.04 15.7 15.7 0 8.69-7.04 15.7-15.7 15.7s-15.7-7.04-15.7-15.7c0-8.69 7.04-15.7 15.7-15.7zm-49.3-20c8.69 0 15.7 7.04 15.7 15.7 0 8.69-7.04 15.7-15.7 15.7s-15.7-7.04-15.7-15.7c0-8.69 7.04-15.7 15.7-15.7zm-48.7 20c8.69 0 15.7 7.04 15.7 15.7 0 8.69-7.04 15.7-15.7 15.7s-15.7-7.04-15.7-15.7c-1e-3 -8.69 7.04-15.7 15.7-15.7zm-35 63.8c0-8.69 7.04-15.7 15.7-15.7s15.7 7.04 15.7 15.7c0 8.69-7.04 15.7-15.7 15.7-8.69 0-15.7-7.04-15.7-15.7zm35 65.6c-8.69 0-15.7-7.04-15.7-15.7s7.04-15.7 15.7-15.7 15.7 7.04 15.7 15.7-7.04 15.7-15.7 15.7zm48.7 20.7c-8.69 0-15.7-7.04-15.7-15.7 0-8.69 7.04-15.7 15.7-15.7 8.69 0 15.7 7.04 15.7 15.7 1e-3 8.68-7.04 15.7-15.7 15.7zm2e-3 -47c-21.2 0-38.5-17.2-38.5-38.5 0-21.2 17.2-38.5 38.5-38.5 21.2 0 38.5 17.2 38.5 38.5 0 21.2-17.2 38.5-38.5 38.5zm49.3 26.3c-8.69 0-15.7-7.04-15.7-15.7s7.04-15.7 15.7-15.7 15.7 7.04 15.7 15.7-7.04 15.7-15.7 15.7zm18.6-49.9c-8.69 0-15.7-7.04-15.7-15.7 0-8.69 7.04-15.7 15.7-15.7s15.7 7.04 15.7 15.7c0 8.69-7.04 15.7-15.7 15.7z"></path></svg>'
            },
            {
                chave: 'terabox',
                nome: 'TeraBox',
                icone:
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.59 140.69" ' +
                    'style="height: 1.1em; width: 1.1em;" xml:space="preserve">' +
                    '<path d="M123.35 140.86h-90.9c.11-.74-.67-.65-1.14-.83-1.16-.45-2.34-.84-3.45-1.38-4.34-2.23-7.78-5.95-9.99-10.27-.62-1.21-1.17-2.48-1.33-3.86-.85-2.7-1.39-5.49-2.06-8.24-1.72-6.05-2.97-12.21-4.67-18.27-2.07-8.89-4.43-17.73-6.64-26.59C2.07 67.24.52 61.01 0 57.43c.09-2.42.18-4.85.28-7.27.62-5.03 3.24-8.56 4.9-12.91 1.44-2.86 2.54-5.88 3.74-8.85.87-1.51 1.43-3.17 2.12-4.77 1.1-2.28 2.04-4.63 3.03-6.95.8-1.46 1.36-3.02 1.97-4.55 2.56-4.62 6.34-8.7 11.3-10.75.87-.32 1.76-.61 2.65-.89.35-.11.54-.29.49-.67h94.64c-.19.99 1.9.7 2.49 1.14 1.99 1.15 4.18 2.01 5.87 3.61 1.78 1.69 3.65 3.28 4.9 5.46.79 1.27 1.53 2.53 1.94 3.98 2.58 5.52 5.02 11.11 7.45 16.71 1.8 4.21 3.55 8.44 5.4 12.63.45.84.85 1.74 1.15 2.64.83 1.25.67 1.52.9 2.47.7 3.36.16 6.63.27 10.02-.23 2.09-.26 2.3-.26 2.3-.74 3.52-1.87 7.3-2.65 10.88-2.97 12.04-5.99 24.08-9.03 36.1-1.66 6.23-3.06 12.53-4.76 18.74-2.24 5.39-6.22 10.22-11.68 12.53-1.35.51-3.09.29-3.76 1.83zM77.28 10.04c-12.77 0-25.55 0-38.32.01-1.02 0-2.07 0-3.05.24-1.98.48-3.83 1.27-5.35 2.71-1.17 1.11-1.93 2.46-2.49 3.94-.44 1.16-.84 2.33-1.26 3.49-.02.05-.04.09-.07.14-.78 1.09-.93 2.44-1.46 3.63-.6 1.34-1.03 2.75-1.53 4.13-.02.05-.05.09-.07.14-.21.54-.44 1.09-.64 1.63-.43 1.16-.85 2.32-1.28 3.49-.02.05-.05.09-.07.14-.48 1.16-.98 2.32-1.43 3.49-.52 1.35-1 2.72-1.5 4.09-.01.03-.04.06-.05.09-.24.61-.47 1.22-.7 1.83-.42 1.13-.84 2.26-1.26 3.38-.31.84-.68 1.66-.93 2.52-.5 1.71 1.05 3.43 2.67 3.41 1.7-.02 3.4-.04 5.09-.04 2.32 0 4.64.03 6.96.03 2.32 0 4.64-.03 6.96-.03 3.81 0 7.62.02 11.43.03.62 0 1.25.01 1.87.04 1.59.09 2.96 1.85 3.05 3.11.08 1.28.12 2.56.21 3.84.17 2.68.37 5.35.55 8.03.14 2.04.28 4.08.43 6.11.19 2.61.38 5.21.56 7.82.15 2.12.31 4.25.45 6.37.1 1.61.16 3.22.28 4.82.21 2.69.46 5.38.67 8.07.21 2.68.31 5.36.63 8.03.15 1.27.3 2.6 1.29 3.65.99 1.04 1.92 2.1 3.4 2.43.2.04.38.18.57.24.43.13.85.3 1.29.35.64.07 1.28.06 1.92.06h23.61c.47 0 .94.07 1.4.01 2.01-.26 3.83-.99 5.2-2.52.57-.64 1.23-1.43 1.35-2.22.45-3.05.76-6.12 1.01-9.19.21-2.57.25-5.16.43-7.73.15-2.21.42-4.41.57-6.62.16-2.28.22-4.57.38-6.85.17-2.35.45-4.69.62-7.04.24-3.28.42-6.57.63-9.85.17-2.63.36-5.25.49-7.88.06-1.13.64-2.04 1.41-2.68.76-.63 1.77-1 2.84-1 5.48.01 10.95 0 16.43.01 4.75.01 9.5.04 14.24.05.44 0 .9-.08 1.33-.18 1.06-.25 1.76-1.14 1.75-2.23 0-.41.02-.86-.11-1.24-.42-1.22-.89-2.41-1.36-3.61-.15-.4-.36-.78-.51-1.18-.18-.47-.31-.95-.49-1.42-.56-1.47-1.13-2.93-1.71-4.4-.18-.45-.37-.89-.55-1.35-.4-1.02-.59-2.14-1.24-3.06-.01-.01-.01-.03-.01-.05-.46-1.3-.91-2.6-1.37-3.89-.06-.18-.17-.34-.23-.52-.53-1.44-1.06-2.88-1.6-4.32-.11-.29-.23-.58-.35-.86-.49-1.17-1-2.34-1.47-3.52-.13-.33-.14-.72-.28-1.05-.53-1.23-1.11-2.44-1.65-3.67-.92-2.09-2.65-3.34-4.59-4.31-1.74-.87-3.65-1.13-5.6-1.13-13.11.05-26.25.04-39.39.04z"/></svg>'
            },
            {
                chave: 'pcloud',
                nome: 'pCloud',
                icone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 67"><g data-name="Group 1035"><path fill-rule="evenodd" stroke-miterlimit="10" stroke="transparent" fill="#ffff" d="M102.5 49.996a15.912 15.912 0 00-5.919-12.642 13.827 13.827 0 01-7.306 6.437 13.815 13.815 0 00-6.262-26.072 8.737 8.737 0 00-1.386.072 31.374 31.374 0 012.6 11.684h-.207a32.724 32.724 0 00-65.018 0h-.215a30.068 30.068 0 012.4-11.555C9.224 19.434.5 29.605.5 42.062A24.349 24.349 0 0024.759 66.5h61.7v-.024a16.435 16.435 0 0016.041-16.48z" data-name="Path 97"/><path xmlns="http://www.w3.org/2000/svg" data-name="Union 945" d="M40.5 44.7V22.5a4 4 0 014-4h11a10.93 10.93 0 017.779 3.222A10.926 10.926 0 0166.5 29.5a10.925 10.925 0 01-3.221 7.778A10.926 10.926 0 0155.5 40.5h-7v4.2a4 4 0 01-4 4 4 4 0 01-4-4zm15-12.2a3 3 0 003-3 3 3 0 00-3-3h-7v6z" fill="#1997d3" style="&#10;"/><g data-name="Ellipse 1350" transform="translate(24.5 6.5)" stroke="#1997d3" stroke-width="3" fill="none"><circle cx="27" cy="27" r="27" stroke="none"/><circle cx="27" cy="27" r="25.5"/></g></g></svg>'
            },
            {
                chave: 'mediafire',
                nome: 'MediaFire',
                icone: '<svg xmlns="http://www.w3.org/2000/svg" height="1421" viewBox="-6.8887712 -3.69853465 81.96659882 46.80035628" width="2500"><path d="m20.7 8.3a51.47 51.47 0 0 1 9.34 1c2.9.55 5.85 1.56 8.83 1.55 2.28 0 4.12-1.6 4.1-3.53s-1.85-3.57-4.17-3.56a13.35 13.35 0 0 0 -3.9.65c.33-.23.66-.47 1-.68a26.14 26.14 0 0 1 15.1-3.68c5.6.26 11.46 2 15.8 5.72a19.9 19.9 0 0 1 6.62 17.82 19.75 19.75 0 0 1 -12.17 15.07 24 24 0 0 1 -14.45.52c-6.2-1.58-11.64-5-17.48-7.54a46.86 46.86 0 0 0 -10.57-2.68h.05a9 9 0 0 0 4.1-.7c1.74-.83 1.73-2.83.83-4.3-1.07-1.73-3.23-2.44-5.1-3a24.36 24.36 0 0 0 -10-.48 15.06 15.06 0 0 0 -6.83 2.52 5.67 5.67 0 0 0 -1.8 2.2c3.08-8.53 9.2-7.57 13-9.9a2.16 2.16 0 0 0 -1.57-3.94 7.24 7.24 0 0 0 -2.92 1.46l-.85.65s3.04-5.17 13.04-5.17z" fill="#fff"/><path d="m23.64 23.78.06.06zm32.46-10.73c-4.08 0-5.76 2.57-10.18 5-7.65 4.18-12.2 2.4-12.2 2.62s3.1 1.53 10.7 5.22a27 27 0 0 0 11.73 3.15 8 8 0 1 0 0-16z" fill="#1997d3" style="&#10;"/></svg>'
            },
            {
                chave: 'nyaa',
                nome: 'Nyaa',
                icone: '<img src="img/assets/nyaa.png" alt="Nyaa" style="height: 1.1em; width: 1.1em;" />'
            },
            {
                chave: 'krakenfiles',
                nome: 'KrakenFiles',
                icone: '<img src="img/assets/krakenfiles.png" alt="KrakenFiles" style="height: 0.9em;" />'
            },
        ];


        anime.episodios.forEach(ep => {
            const bloco = document.createElement('div');
            bloco.className = 'bloco-episodio';

            const cabecalho = document.createElement('div');
            cabecalho.className = 'cabecalho';

            const titulo = document.createElement('span');
            titulo.className = 'titulo-episodio';
            titulo.textContent = `${anime.titulo} - Episódio ${ep.numero}`;

            const iconeDownload = document.createElement('span');
            iconeDownload.className = 'icone-download';
            iconeDownload.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-328.46 309.23-499.23l42.16-43.38L450-444v-336h60v336l98.61-98.61 42.16 43.38L480-328.46ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-108.46h60v108.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-108.46h60v108.46Q780-222 759-201q-21 21-51.31 21H252.31Z"/></svg>';

            cabecalho.appendChild(titulo);
            cabecalho.appendChild(iconeDownload);

            const linhaDownloads = document.createElement('div');
            linhaDownloads.className = 'linha-downloads';

            const label = document.createElement('span');
            label.className = 'label-servidor';
            label.textContent = 'Servidor:';

            const botoes = document.createElement('div');
            botoes.className = 'botoes';

            plataformas.forEach(plataforma => {
                const link = ep.downloads[plataforma.chave];
                if (link) {
                    const a = document.createElement('a');
                    a.href = link;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.innerHTML = `
                        ${plataforma.icone}
                        <span>${plataforma.nome}</span>
                    `;
                    botoes.appendChild(a);
                }
            });

            linhaDownloads.appendChild(label);
            linhaDownloads.appendChild(botoes);
            bloco.appendChild(cabecalho);
            bloco.appendChild(linhaDownloads);
            episodiosLista.appendChild(bloco);
        });

        /*
         * Funcionalidade de Compartilhamento:
         * A função 'setupShareButton' cria o HTML do componente de compartilhamento (botão e popup).
         * Ela gerencia a abertura e fechamento do popup, atualiza o link de compartilhamento com
         * o título do anime e a URL da página, e permite copiar o link para a área de transferência.
         * Garante que o setup ocorra após o DOM estar pronto.
         */
        function setupShareButton() {
            console.log('Iniciando setup do botão de compartilhamento...'); // Debug

            // Cria todo o HTML do componente
            const shareHTML = `
                <div class="share-container">
                    <button id="share-button" class="share-button">
                        <span>Compartilhar</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" style="
            width: 18px;
        "><path d="M290-370v-227.69q0-29.92 21.19-51.12Q332.39-670 362.31-670h342.15l-113-113 42.77-42.77L820-640 634.23-453.85 591.46-496l113-114H362.31q-5.39 0-8.85 3.46t-3.46 8.85V-370h-60Zm-77.69 230q-29.92 0-51.12-21.19Q140-182.39 140-212.31v-575.38h60v575.38q0 5.39 3.46 8.85t8.85 3.46h455.38q5.39 0 8.85-3.46t3.46-8.85V-370h60v157.69q0 29.92-21.19 51.12Q697.61-140 667.69-140H212.31Z"></path></svg>
                    </button>
                    <div id="share-popup" class="share-popup">
                        <div class="share-popup-content">
                            <span class="close-popup">&times;</span>
                            <strong>Compartilhe o projeto</strong>
                            <p>Anime: <span id="share-anime-title"></span></p>
                            <div class="share-link-container">
                                <input type="text" id="share-link" readonly>
                                <button id="copy-link">Copiar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Insere na div específica
            const shareContainer = document.querySelector('.share-button-container');

            if (!shareContainer) {
                console.error('ERRO: Div .share-button-container não encontrada!');
                return;
            }

            console.log('Div container encontrada, inserindo HTML...'); // Debug
            shareContainer.innerHTML = shareHTML;

            // Elementos após inserção
            const shareButton = document.getElementById('share-button');
            if (!shareButton) {
                console.error('ERRO: Botão share-button não foi criado!');
                return;
            }

            console.log('Botão criado com sucesso!'); // Debug

            // Restante do código de eventos (igual ao anterior)
            const sharePopup = document.getElementById('share-popup');
            const closePopup = document.querySelector('.close-popup');
            const copyButton = document.getElementById('copy-link');
            const shareLink = document.getElementById('share-link');
            const shareTitle = document.getElementById('share-anime-title');

            function updateShareData() {
                const animeTitle = document.getElementById('anime-titulo')?.textContent || 'este anime';
                const currentUrl = window.location.href;

                shareTitle.textContent = animeTitle;
                shareLink.value = `🔴 Baixe e assista todos os episódios de ${animeTitle}: 🔗${currentUrl}`;
            }

            shareButton.addEventListener('click', () => {
                updateShareData();
                sharePopup.style.display = 'block';
            });

            closePopup.addEventListener('click', () => {
                sharePopup.style.display = 'none';
            });

            copyButton.addEventListener('click', () => {
                shareLink.select();
                document.execCommand('copy');
                copyButton.textContent = 'Copiado!';
                setTimeout(() => {
                    copyButton.textContent = 'Copiar';
                }, 2000);
            });

            window.addEventListener('click', (event) => {
                if (event.target === sharePopup) {
                    sharePopup.style.display = 'none';
                }
            });
        }

        // Verifica se já está no DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupShareButton);
        } else {
            // DOM já carregado
            setupShareButton();
        }

    }

    /*
     * Funcionalidade de Expandir/Ocultar Sinopse:
     * Este bloco gerencia a exibição da sinopse do anime.
     * O botão 'sinopse-toggle' alterna a classe 'expandido' no container da sinopse,
     * o que permite controlá-la via CSS (ex: altura máxima).
     * O texto do botão também muda entre "mais." e "ocultar" conforme o estado.
     */
    const sinopseContainer = document.querySelector('.sinopse-container');
    const sinopseEl = document.getElementById('anime-sinopse');
    const toggleBtn = document.getElementById('sinopse-toggle');

    let sinopseExpandida = false;

    toggleBtn.addEventListener('click', () => {
        sinopseExpandida = !sinopseExpandida;

        if (sinopseExpandida) {
            sinopseContainer.classList.add('expandido');
            toggleBtn.textContent = 'Ocultar';
            toggleBtn.setAttribute('data-state', 'ocultar');
        } else {
            sinopseContainer.classList.remove('expandido');
            toggleBtn.textContent = 'Mais.';
            toggleBtn.setAttribute('data-state', 'mais');
        }
    });

    window.commentConfig = {
        FORM_URL: anime.form_url,
        ENTRY_NOME: anime.entry_nome,
        ENTRY_COMENTARIO: anime.entry_comentario,
        ENTRY_PARENT_ID: anime.entry_parent_id,
        CSV_URL: anime.csv_url
    };

    // Chama a função global do 'comentarios.js' para carregar os comentários.
    // Garante que a função existe antes de chamar.
    if (typeof carregarComentarios === 'function') {
        carregarComentarios();
    } else {
        console.error("A função 'carregarComentarios' não está disponível. Verifique a ordem dos scripts.");
        // Opcional: Mostre uma mensagem de erro na UI se os comentários não puderem ser carregados.
        const commentsSection = document.getElementById('commentsSection');
        if (commentsSection) {
            commentsSection.innerHTML = '<p style="text-align: center; color: red;">Não foi possível carregar os comentários. Verifique a configuração.</p>';
        }
    }

});