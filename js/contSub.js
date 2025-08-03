document.addEventListener('DOMContentLoaded', () => {
    const headerHTML = `
                        <div class="container-sub">
                    <section class="container-sub-section">
                        <div class="blocks" style="width: 100%;">
                         <h3 class="title-parceiros">Projetos em Andamento</h3>
                          <div id="projects-in-progress">
                           Carregando projetos...
                          </div>
                        </div>
                        <div class="blocks" style="width: 100%;">
                            <h3 class="title-parceiros">Nosso servidor</h3>
                            <iframe src="https://discord.com/widget?id=572858265625690112&amp;theme=dark" width="100%"
                                height="500" allowtransparency="true" frameborder="0"
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                                loading="lazy">
                            </iframe>
                        </div>
                        <div class="blocks" style="width: 100%;">
                            <h3 class="title-parceiros">Parceiros</h3>
                            <div class="icon-parceiros">
                                <a href="https://ottofansub.blogspot.com" target="_blank">
                                    <img loading="lazy" src="img/assets/ottofansub.png" width="88" height="31"
                                        style="object-fit: cover;">
                                </a>
                                <a href="https://www.animu.com.br/" target="_blank" title="Nosso Button">
                                    <img loading="lazy"
                                        src="https://www.animu.com.br/wp-content/uploads/2019/06/Button-animu-88x31-maior.gif"
                                        width="88" height="31" title="Rádio Animu FM - A Rádio Mais Moe do Brasil"
                                        style="object-fit: cover;">
                                </a>
                            </div>
                        </div>
                        <div class="blocks" style="width: 100%;">
                            <h3 class="title-parceiros">Rádio</h3>

                            <iframe width="100%" height="80" frameborder="0" src="https://playerparceiros.animu.com.br/"
                                loading="lazy"></iframe>
                        </div>
                    </section>
                </div>
    `;

    // Encontra o elemento onde o cabeçalho será inserido
    const headerPlaceholder = document.getElementById('container-sub');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
});