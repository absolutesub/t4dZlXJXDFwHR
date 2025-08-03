document.addEventListener('DOMContentLoaded', () => {
    const footerHTML = `
        <footer class="site-footer f-mob">
          <div class="footer-content">
            <img src="img/assets/absolute-logo-small.png" alt="logo-small" class="logo-footer" loading="lazy">
            <p>© 2025 · <strong>Absolute Fansub</strong></p>
            <p>Todo conteúdo encontrado neste site são propriedade de seus editores e autores. As traduções são fanservice com a intenção de divulgação da obra para o português brasileiro.</p>
            <p>Caso você goste de alguma das obras aqui lançadas, recomenda-se que adquira o produto oficial, seja ele de origem japonesa ou se licenciado no Brasil.</p>
            <p>Site sem fins lucrativos ou uso comercial – <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="license-link">Compartilhamento pela licença (BY-NC-SA)</a>.</p>
            <div class="license-icons">
              <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" />
            </div>
          </div>
        </footer>
      `;

    const footerPlaceholder = document.getElementById('footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
        console.log('Footer inserido com sucesso!');
    }

    const footerMobile = document.getElementById('footer-mob');
    if (footerMobile) {
        footerMobile.innerHTML = footerHTML;
        console.log('Footer mobile inserido');
    }

    if (!footerDesktop && !footerMobile) {
        console.warn('Nenhum dos containers de footer encontrados!');
    }
});