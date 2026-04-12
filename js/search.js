/**
 * Gerencia a funcionalidade de pesquisa no header
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const searchNavInput = document.getElementById('search-nav');
        const searchNavButton = document.getElementById('search-button-nav');

        if (!searchNavInput || !searchNavButton) {
            console.warn('Search elements not found in DOM');
            return;
        }

        /**
         * Executa a busca com validacao
         */
        const performSearch = () => {
            const searchTerm = searchNavInput.value.trim();

            if (!searchTerm) {
                console.warn('Search term is empty');
                return;
            }

            if (searchTerm.length < 2) {
                console.warn('Search term too short');
                return;
            }

            try {
                window.location.href = `projetos.html?search=${encodeURIComponent(searchTerm)}`;
            } catch (error) {
                console.error('Error during search redirect:', error);
            }
        };

        // Evento de clique no botao de busca
        searchNavButton.addEventListener('click', performSearch);

        // Evento de pressionar Enter no campo de pesquisa
        searchNavInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    } catch (error) {
        console.error('Error initializing search functionality:', error);
    }
});
