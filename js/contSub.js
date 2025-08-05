document.addEventListener('DOMContentLoaded', () => {
    const headerHTML = `
                        <div class="container-sub">
                    <section class="container-sub-section">
                    <div class="blocks dn" style="width: 100%;">
                         <div class="donation-section2">
                                <h3 class="title-parceiros">Faça uma doação</h3>

                                <div class="donation-buttons">
                                    <!-- PicPay -->
                                    <button class="donation-btn donation-toggle-section" onclick="window.open('https://picpay.me/erick.vrio', '_blank')" style="display: flex; padding: 10px 30px;">
                                        <img src="img/assets/picpay.webp" alt="PicPay">
                                    </button>

                                    <!-- PayPal -->
                                    <button class="donation-btn donation-toggle-section" onclick="window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=5ZX8V4R7LCGWJ', '_blank')" style="display: flex; padding: 10px 30px;">
                                        <img src="https://sakuraanimes.com/img/paypal.png" alt="PayPal">
                                    </button>
                                </div>

                                <!-- PIX button -->
                                <button class="pix-button" onclick="togglePix()">
                                    <img src="img/assets/pix.webp" alt="Pix">
                                </button>

                                <div id="pixSection" style="display: none;" class="pix-section">
                                    <img src="img/assets/qr.webp" alt="QR Code Pix" class="pix-qrcode" style="max-width: 100%;">
                                    <a href="https://picpay.me/erick.vrio" target="_blank" class="pix-link">Link se
                                        preferir</a>
                                </div>

                                <div class="donation-group donation-toggle-section" style="display: flex;">
                                    <button class="toggle-button" onclick="toggleLinks()">
                                        <img src="img/assets/mercado-pago.webp" alt="Mercado Pago" class="mercado-img">
                                    </button>

                                    <div class="mercado-options" id="mercadoOptions" style="display: none; grid-template-columns: repeat(2, 1fr);">
                                        <a href="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=56355945-b7581cc9-6077-4e1b-a584-fa13ae6ec134" target="_blank">Doação R$10</a>
                                        <a href="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=56355945-a98da381-ec6b-442d-a5d8-22570ae80da7" target="_blank">Doação R$25</a>
                                        <a href="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=56355945-25bd283b-283e-4b06-9866-888baa1ad5bf" target="_blank">Doação R$50</a>
                                        <a href="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=56355945-32dc34ca-b7cc-49d5-8f86-921e7a8934fe" target="_blank">Doação R$100</a>
                                    </div>
                                </div>
                                <div class="image-donate donation-toggle-section hide-on-mercado" style="display: flex !important;"></div>
                            </div>
                        </div>
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