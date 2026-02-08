// ================= CONFIGURAÇÃO =================
const POSTS_PER_PAGE = 5;

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    const postContainer = document.getElementById("post-container");
    const postTemplate = document.getElementById("post-template").content;
    const paginationContainer = document.getElementById("pagination");

    // ================= 1. PÁGINA ATUAL (QUERY STRING) =================
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get('page')) || 1;

    // ================= 2. CALCULAR POSTS DA PÁGINA =================
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToDisplay = posts.slice(startIndex, endIndex);

    // ================= 3. RENDERIZAR POSTS =================
    postContainer.innerHTML = "";

    if (postsToDisplay.length === 0) {
        postContainer.innerHTML = `
            <p style="text-align:center;color:#ccc;margin-top:50px;">
                Nenhum post encontrado nesta página.
            </p>
        `;
        return;
    }

    postsToDisplay.forEach(post => {
        const clone = document.importNode(postTemplate, true);

        clone.querySelector("article").setAttribute("data-id", post.id);
        clone.querySelector(".post-image").src = post.thumbnail;
        clone.querySelector(".post-title").textContent = post.title;
        clone.querySelector(".post-title").href = post.link;
        clone.querySelector(".post-summary").textContent = post.summary;

        // Autor
        clone.querySelector(".post-author").innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#a3a3a3">
                <path d="M480-492.31q-57.75 0-98.87-41.12Q340-574.56 340-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q620-690.06 620-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12Z"/>
            </svg> ${post.author}
        `;

        // Data
        clone.querySelector(".post-date").innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#a3a3a3">
                <path d="M200-607.69h560v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Z"/>
            </svg> ${new Date(post.date).toLocaleDateString("pt-BR")}
        `;
        clone.querySelector(".post-date").setAttribute("datetime", post.date);

        // Botão
        clone.querySelector(".download-button").href = post.link;

        // Qualidade
        const qualityBadge = clone.querySelector(".quality-badge");
        if (qualityBadge && post.quality) {
            qualityBadge.textContent = post.quality.toUpperCase();
        } else if (qualityBadge) {
            qualityBadge.remove();
        }

        postContainer.appendChild(clone);
    });

    // ================= 4. PAGINAÇÃO =================
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    // Botão Anterior
    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.textContent = "Anterior";
        prev.className = "pagination-btn";
        prev.href = `?page=${currentPage - 1}`;
        paginationContainer.appendChild(prev);
    }

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement("a");
        link.textContent = i;
        link.className = "pagination-btn";
        if (i === currentPage) link.classList.add("active");
        link.href = `?page=${i}`;
        paginationContainer.appendChild(link);
    }

    // Botão Próximo
    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.textContent = "Próximo";
        next.className = "pagination-btn";
        next.href = `?page=${currentPage + 1}`;
        paginationContainer.appendChild(next);
    }
});

