/**
 * Gerencia o menu hamburguer responsivo
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileNav = document.getElementById('mobile-nav');
        const closeBtn = document.getElementById('close-btn');

        // Validar se todos os elementos existem
        if (!hamburgerBtn || !mobileNav || !closeBtn) {
            console.warn('Hamburger menu elements not found');
            return;
        }

        /**
         * Abre o menu mobile
         */
        const openMenu = () => {
            try {
                mobileNav.classList.add('show');
                document.body.style.overflow = 'hidden'; // Previne scroll quando menu esta aberto
            } catch (error) {
                console.error('Error opening menu:', error);
            }
        };

        /**
         * Fecha o menu mobile
         */
        const closeMenu = () => {
            try {
                mobileNav.classList.remove('show');
                document.body.style.overflow = 'auto'; // Restaura scroll
            } catch (error) {
                console.error('Error closing menu:', error);
            }
        };

        // Evento de clique no botao hamburger
        hamburgerBtn.addEventListener('click', openMenu);

        // Evento de clique no botao de fechar
        closeBtn.addEventListener('click', closeMenu);

        // Fechar menu ao clicar em um link
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileNav.classList.contains('show')) {
                closeMenu();
            }
        });
    } catch (error) {
        console.error('Error initializing hamburger menu:', error);
    }
});
