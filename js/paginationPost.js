// Define o número de posts que serão exibidos por página
const POSTS_PER_PAGE = 5;

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Pega o elemento do DOM que vai conter os posts
    const postContainer = document.getElementById("post-container");

    // Pega o conteúdo do template HTML que será usado para clonar e preencher cada post
    const postTemplate = document.getElementById("post-template").content;

    // Pega o container onde serão inseridos os links de paginação
    const paginationContainer = document.getElementById("pagination");

    // ---------- 1. Determinar a página atual com base na URL ----------
    let currentPage = 1; // Define a página atual como 1 por padrão (usado em 'index.html')

    // Pega o caminho do arquivo da URL (ex: '/index.html', '/post2.html', etc.)
    const path = window.location.pathname;

    // Se o caminho contiver "post", significa que é uma subpágina paginada
    if (path.includes('post')) {
        // Extrai o número da página com regex (ex: '2' de 'post2.html')
        const match = path.match(/post(\d+)\.html/);
        if (match && match[1]) {
            currentPage = parseInt(match[1]); // Atualiza a página atual com o número extraído
        }
    }

    // ---------- 2. Calcular os posts que devem ser exibidos na página atual ----------
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE; // Índice inicial do array de posts
    const endIndex = startIndex + POSTS_PER_PAGE;           // Índice final (não-inclusivo)
    const postsToDisplay = posts.slice(startIndex, endIndex); // Fatia o array 'posts' (importado de data.js)

    // ---------- 3. Renderizar os posts no container ----------
    postContainer.innerHTML = ""; // Limpa o container antes de adicionar os posts

    // Caso não existam posts na página atual
    if (postsToDisplay.length === 0) {
        postContainer.innerHTML = '<p style="text-align: center; color: #ccc; margin-top: 50px;">Nenhum post encontrado nesta página.</p>';
    } else {
        // Para cada post, clona o template e preenche com os dados do post
        postsToDisplay.forEach(post => {
            const clone = document.importNode(postTemplate, true); // Clona o conteúdo do template

            // Preenche os dados do post no clone
            clone.querySelector("article").setAttribute("data-id", post.id);
            clone.querySelector(".post-image").src = post.thumbnail;
            clone.querySelector(".post-title").textContent = post.title;
            clone.querySelector(".post-title").href = post.link;
            clone.querySelector(".post-summary").textContent = post.summary;

            // Adiciona o autor com ícone SVG
            clone.querySelector(".post-author").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a3a3a3"><path d="M480-492.31q-57.75 0-98.87-41.12Q340-574.56 340-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q620-690.06 620-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12ZM180-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q780-306 780-276.62v88.93H180Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q534.7-367.69 480-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.62Z"/></svg> ${post.author}`;

            // Adiciona a data do post com ícone e formata para o padrão brasileiro
            clone.querySelector(".post-date").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a3a3a3"><path d="M200-607.69h560v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Zm0 0V-720v112.31ZM212.31-100Q182-100 161-121q-21-21-21-51.31v-535.38Q140-738 161-759q21-21 51.31-21h55.38v-84.61h61.54V-780h303.08v-84.61h60V-780h55.38Q778-780 799-759q21 21 21 51.31v218.54q-14.39-6.31-29.39-10.2-15-3.88-30.61-6.11v-42.23H200v375.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h260.08q5.07 16.61 12.27 31.42Q491.85-113.77 501-100H212.31Zm515.38 40q-74.92 0-127.46-52.54-52.54-52.54-52.54-127.46 0-74.92 52.54-127.46Q652.77-420 727.69-420q74.93 0 127.46 52.54 52.54 52.54 52.54 127.46 0 74.92-52.54 127.46Q802.62-60 727.69-60Zm66.62-88.46 24.92-24.92-73.84-73.85v-110.46H710v124.92l84.31 84.31Z"/></svg> ${new Date(post.date).toLocaleDateString("pt-BR")}`;
            clone.querySelector(".post-date").setAttribute("datetime", post.date);

            // Botão de download ou leitura
            clone.querySelector(".download-button").href = post.link;

            // Verifica se o post tem qualidade (ex: 1080p) e exibe o badge
            const qualityBadge = clone.querySelector(".quality-badge");
            if (qualityBadge && post.quality) {
                qualityBadge.textContent = post.quality.toUpperCase(); // Exibe em maiúsculas
            } else if (qualityBadge) {
                qualityBadge.remove(); // Remove o badge se não existir qualidade definida
            }

            // Adiciona o post preenchido ao container
            postContainer.appendChild(clone);
        });
    }

    // ---------- 4. Gerar os links de paginação ----------
    paginationContainer.innerHTML = ""; // Limpa qualquer paginação antiga

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE); // Calcula o número total de páginas

    // Adiciona botão "Anterior", se não estiver na primeira página
    if (currentPage > 1) {
        const prevLink = document.createElement("a");
        prevLink.textContent = "Anterior";
        prevLink.className = "pagination-btn";

        // Se for para a página 1, o link será "index.html", senão "postN.html"
        prevLink.href = (currentPage - 1 === 1) ? 'index.html' : `post${currentPage - 1}.html`;

        paginationContainer.appendChild(prevLink);
    }

    // Gera os botões de número das páginas (1, 2, 3, ...)
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.textContent = i;
        pageLink.className = "pagination-btn";

        // Adiciona uma classe "active" para a página atual
        if (i === currentPage) pageLink.classList.add("active");

        // Primeira página é sempre "index.html"
        pageLink.href = (i === 1) ? 'index.html' : `post${i}.html`;

        paginationContainer.appendChild(pageLink);
    }

    // Adiciona botão "Próximo", se não estiver na última página
    if (currentPage < totalPages) {
        const nextLink = document.createElement("a");
        nextLink.textContent = "Próximo";
        nextLink.className = "pagination-btn";
        nextLink.href = `post${currentPage + 1}.html`; // Próxima página

        paginationContainer.appendChild(nextLink);
    }
});
