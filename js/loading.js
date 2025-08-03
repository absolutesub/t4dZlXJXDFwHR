document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Função para esconder a tela de carregamento
    const hideLoadingScreen = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden'); // Adiciona a classe hidden para ativar a transição
            // Remove a div completamente após a transição para liberar recursos e garantir que não haja cliques acidentais
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.remove();
            }, { once: true }); // Executa o evento apenas uma vez
        }
    };

    // Opção 1: Esconder a tela de carregamento quando o DOM estiver completamente carregado
    // Isso é bom para conteúdo estático. Para JS dinâmico, continue lendo.
    // hideLoadingScreen(); // Você pode descomentar esta linha se o seu JS carregar muito rápido ou não tiver um impacto visual inicial significativo.

    // Opção 2: Esconder a tela de carregamento após um tempo mínimo (ex: para GIFs curtos)
    // Se o seu GIF de carregamento for muito rápido, a tela pode piscar.
    // Você pode usar um setTimeout para garantir que ela apareça por um tempo mínimo.
    // setTimeout(() => {
    //     hideLoadingScreen();
    // }, 1000); // Esconde após 1 segundo, ajuste conforme necessário.

    // Opção 3: Esconder a tela de carregamento quando todo o conteúdo, incluindo recursos (imagens, scripts, etc.)
    // estiver carregado. Esta é geralmente a melhor opção para sites com muito JS.
    window.addEventListener('load', () => {
        hideLoadingScreen();
    });

    // Se o seu site carrega conteúdo JavaScript de forma assíncrona,
    // você pode precisar chamar `hideLoadingScreen()` manualmente
    // após o último pedaço de conteúdo JavaScript ser renderizado.
    // Exemplo: Se você tem uma função `renderContent()` que carrega tudo:
    // function renderContent() {
    //     // ... seu código para carregar e renderizar o conteúdo JS ...
    //     hideLoadingScreen(); // Chame aqui no final
    // }
    // renderContent();
});