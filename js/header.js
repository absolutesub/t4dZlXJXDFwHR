// Aguarda o carregamento completo do DOM (estrutura HTML da página)
document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // DROPDOWNS (Menus suspensos interativos)
    // ===================================

    // Seleciona todos os elementos com a classe .dropdown
    // Cada .dropdown representa um menu com botão e conteúdo oculto
    const dropdowns = document.querySelectorAll('.dropdown');

    // Para cada dropdown encontrado na página
    dropdowns.forEach(dropdown => {
        // Seleciona o botão que, ao ser clicado, abre o menu
        const dropbtn = dropdown.querySelector('.dropbtn');

        // Seleciona o conteúdo do dropdown (que será exibido ou ocultado)
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Garante que tanto o botão quanto o conteúdo existem antes de configurar o comportamento
        if (dropbtn && dropdownContent) {
            // Adiciona o evento de clique no botão do dropdown
            dropbtn.addEventListener('click', (event) => {
                event.preventDefault(); // Evita o comportamento padrão do botão (como seguir um link)

                // Fecha todos os outros dropdowns que estiverem abertos
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    // Se o conteúdo for diferente do atual e estiver visível, será escondido
                    if (content !== dropdownContent && content.style.display === 'block') {
                        content.style.display = 'none';
                    }
                });

                // Alterna a visibilidade do dropdown clicado:
                // Se estiver visível, oculta; se estiver oculto, exibe
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // ===================================
    // Fechar dropdowns ao clicar fora deles
    // ===================================

    // Adiciona um evento global ao clicar em qualquer parte da janela
    window.addEventListener('click', (event) => {
        // Verifica se o clique foi fora de qualquer botão de dropdown e fora do conteúdo também
        if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
            // Se o clique foi fora, fecha todos os dropdowns abertos
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
        }
    });


    // ===================================
    // Criar o header em todas a páginas
    // ===================================
    const headerHTML = `
        <header class="main-header">
            <div class="header-hero">
                <div class="background-layer"></div> <img class="logo-overlay" src="img/assets/absolute-banner.png" alt="banner">
            </div>
            <img class="img-header-mob" src="img/assets/absolute-banner.jpg"
                class="w-100 img-responsive d-none d-sm-block" alt="/" style="width: 100%; height: auto;">
            <div class="navbar-container">
                            <button class="hamburger" id="hamburger-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#FFFFFF" style="transform:">
                        <path
                            d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z">
                        </path>
                    </svg>
                </button>
                <nav class="main-nav" id="mobile-nav">
                    <button class="close-menu" id="close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" style="scale: 2;">
            <path d="M274-274.46 432.46-433 274-591.54 318.46-636 477-477.54 635.54-636 680-591.54 521.54-433 680-274.46 635.54-230 477-388.46 318.46-230 274-274.46Z"/>
        </svg>
    </button>
                    <ul>
                        <li>
                            <a href="index.html">
                                <span class="svg-icon-header"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                        <path
                                            d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z" />
                                    </svg></span>
                                INÍCIO
                            </a>
                        </li>
                        <li class="dropdown">
                            <a href="projetos.html" class="dropbtn">
                                <span class="svg-icon-header"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                        <path
                                            d="M460-398.46 711.54-560 460-721.54v323.08ZM322.31-260Q292-260 271-281q-21-21-21-51.31v-455.38Q250-818 271-839q21-21 51.31-21h455.38Q808-860 829-839q21 21 21 51.31v455.38Q850-302 829-281q-21 21-51.31 21H322.31Zm0-60h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H322.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q152-120 131-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h515.38v60H182.31ZM310-800v480-480Z" />
                                    </svg></span>PROJETOS
                            </a>
                            <div class="dropdown-content">
                                <a href="index.html?tag=legendados">Animes Legendados</a>
                                <a href="index.html?tag=ovas">OVA's/Especiais</a>
                                <a href="index.html?tag=filmes">Filmes</a>
                            </div>
                        </li>
                        <li>
                            <a href="equipe.html">
                                <span class="svg-icon-header"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                        <path
                                            d="M71.93-187.69v-88.93q0-30.92 15.96-55.19 15.96-24.27 42.63-37.76 57.02-27.89 114.67-43.01 57.66-15.11 126.73-15.11 69.08 0 126.73 15.11 57.66 15.12 114.68 43.01 26.67 13.49 42.63 37.76 15.96 24.27 15.96 55.19v88.93H71.93Zm679.99 0v-93.85q0-39.38-19.28-75.07-19.29-35.68-54.72-61.23 40.23 6 76.39 18.57 36.15 12.58 69 29.73 31 16.54 47.88 38.99 16.88 22.44 16.88 49.01v93.85H751.92Zm-380-304.62q-57.75 0-98.87-41.12-41.12-41.13-41.12-98.88 0-57.75 41.12-98.87 41.12-41.13 98.87-41.13 57.75 0 98.88 41.13 41.12 41.12 41.12 98.87 0 57.75-41.12 98.88-41.13 41.12-98.88 41.12Zm345.38-140q0 57.75-41.12 98.88-41.12 41.12-98.87 41.12-6.77 0-17.23-1.54-10.47-1.54-17.23-3.38 23.66-28.45 36.37-63.12 12.7-34.67 12.7-72 0-37.34-12.96-71.73-12.96-34.38-36.11-63.3 8.61-3.08 17.23-4 8.61-.93 17.23-.93 57.75 0 98.87 41.13 41.12 41.12 41.12 98.87ZM131.92-247.69h480v-28.93q0-12.53-6.27-22.3-6.26-9.77-19.88-17.08-49.38-25.46-101.69-38.58-52.31-13.11-112.16-13.11-59.84 0-112.15 13.11-52.31 13.12-101.69 38.58-13.62 7.31-19.89 17.08-6.27 9.77-6.27 22.3v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0 304.62Zm0-384.62Z" />
                                    </svg></span>
                                EQUIPE
                            </a>
                        </li>
                        <li>
                            <a href="recrutamento.html">
                                <span class="svg-icon-header"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                        <path d="M450-140v-310H140v-60h310v-310h60v310h310v60H510v310h-60Z" />
                                    </svg></span>
                                RECRUTAMENTO
                            </a>
                        </li>
                    </ul>
                </nav>


                <div class="search-bar-nav">
                    <input type="text" id="search-nav" placeholder="Digite sua pesquisa">
                    <button id="search-button-nav"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                            viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path
                                d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
                        </svg></button>
                </div>
            </div>
        </header>
    `;

    // Encontra o elemento onde o cabeçalho será inserido
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
});
