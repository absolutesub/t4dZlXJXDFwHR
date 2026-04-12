/**
 * Renderiza o footer em todas as paginas
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const footerHTML = `
        <footer class="site-footer f-mob">
          <div class="footer-content">
            <img src="img/assets/absolute-logo-small.png" alt="Logo Absolute Fansub" class="logo-footer" loading="lazy">
            <p>© 2026 · <strong>Absolute Fansub</strong></p>
            <p>Todo conteúdo encontrado neste site são propriedade de seus editores e autores. As traduções são fanservice com a intenção de divulgação da obra para o português brasileiro.</p>
            <p>Caso você goste de alguma das obras aqui lançadas, recomenda-se que adquira o produto oficial, seja ele de origem japonesa ou se licenciado no Brasil.</p>
            <p>Site sem fins lucrativos ou uso comercial – <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="license-link">Compartilhamento pela licença (BY-NC-SA)</a>.</p>
            <div class="license-icons">
              <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" loading="lazy" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" loading="lazy" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" loading="lazy" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" loading="lazy" />
            </div>
          </div>
        </footer>
      `;

        const footerPlaceholder = document.getElementById('footer');
        const footerMobile = document.getElementById('footer-mob');

        if (!footerPlaceholder && !footerMobile) {
            console.warn('Footer containers not found');
            return;
        }

        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHTML;
        }

        if (footerMobile) {
            footerMobile.innerHTML = footerHTML;
        }
    } catch (error) {
        console.error('Error rendering footer:', error);
    }
});

