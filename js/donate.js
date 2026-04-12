function togglePix() {
    const pixSection = document.getElementById('pixSection');
    const allSections = document.querySelectorAll('.donation-toggle-section');
    const mercadoBox = document.getElementById('mercadoOptions'); // Mercado Pago box

    if (pixSection.style.display === 'block') {
        // Está aberto → fecha o PIX e mostra os outros
        pixSection.style.display = 'none';
        allSections.forEach(section => {
            if (section !== pixSection) {
                section.style.display = 'flex'; // ou 'block', conforme seu layout
            }
        });
    } else {
        // Está fechado → abre o PIX e esconde os outros
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        pixSection.style.display = 'block';

        // Fecha o Mercado Pago se estiver aberto
        if (mercadoBox.style.display === 'grid') {
            mercadoBox.style.display = 'none';
        }
    }
}

function toggleLinks() {
    const box = document.getElementById('mercadoOptions');
    const hideElements = document.querySelectorAll('.hide-on-mercado');

    if (box.style.display === 'grid') {
        // Está aberto → fecha Mercado Pago e mostra os escondidos
        box.style.display = 'none';
        hideElements.forEach(el => {
            el.style.display = 'flex'; // ou 'block' conforme seu layout
        });
    } else {
        // Está fechado → abre Mercado Pago e esconde os com a classe
        hideElements.forEach(el => {
            el.style.display = 'none';
        });
        box.style.display = 'grid';
        box.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
}