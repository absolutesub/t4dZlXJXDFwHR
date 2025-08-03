document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // Barra de Pesquisa no Header
    // ===============================================

    // Seleciona o campo de input da barra de pesquisa (deve ter id="search-nav")
    const searchNavInput = document.getElementById('search-nav');

    // Seleciona o botão de busca (deve ter id="search-button-nav")
    const searchNavButton = document.getElementById('search-button-nav');

    // Verifica se ambos os elementos existem na página antes de continuar
    if (searchNavInput && searchNavButton) {

        // Evento de clique no botão de busca
        searchNavButton.addEventListener('click', () => {
            // Obtém o valor digitado no campo de pesquisa e remove espaços em branco
            const searchTerm = searchNavInput.value.trim();

            // Se o campo não estiver vazio, redireciona o usuário para a página index.html
            // com o termo de busca incluído na URL como parâmetro (ex: ?search=naruto)
            if (searchTerm) {
                window.location.href = `projetos.html?search=${encodeURIComponent(searchTerm)}`;
                // encodeURIComponent garante que espaços e caracteres especiais sejam seguros na URL
            }
        });

        // Evento de pressionar uma tecla enquanto digita no campo de busca
        searchNavInput.addEventListener('keypress', (event) => {
            // Se a tecla pressionada for Enter
            if (event.key === 'Enter') {
                // Simula o clique no botão de busca, disparando o mesmo comportamento acima
                searchNavButton.click();
            }
        });
    }
});
