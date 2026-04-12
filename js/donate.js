/**
 * Alterna a visibilidade da seção de PIX
 */
function togglePix() {
    try {
        const pixSection = document.getElementById('pixSection');
        const allSections = document.querySelectorAll('.donation-toggle-section');
        const mercadoBox = document.getElementById('mercadoOptions');

        if (!pixSection) {
            console.error('PIX section not found');
            return;
        }

        const isVisible = pixSection.style.display === 'block';

        if (isVisible) {
            pixSection.style.display = 'none';
            allSections.forEach(section => {
                if (section !== pixSection) {
                    section.style.display = 'flex';
                }
            });
        } else {
            allSections.forEach(section => {
                section.style.display = 'none';
            });
            pixSection.style.display = 'block';

            if (mercadoBox && mercadoBox.style.display === 'grid') {
                mercadoBox.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error toggling PIX section:', error);
    }
}

/**
 * Alterna a visibilidade das opções de Mercado Pago
 */
function toggleLinks() {
    try {
        const box = document.getElementById('mercadoOptions');
        const hideElements = document.querySelectorAll('.hide-on-mercado');

        if (!box) {
            console.error('Mercado Pago box not found');
            return;
        }

        const isVisible = box.style.display === 'grid';

        if (isVisible) {
            box.style.display = 'none';
            hideElements.forEach(el => {
                el.style.display = 'flex';
            });
        } else {
            hideElements.forEach(el => {
                el.style.display = 'none';
            });
            box.style.display = 'grid';
            box.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    } catch (error) {
        console.error('Error toggling Mercado Pago options:', error);
    }
}