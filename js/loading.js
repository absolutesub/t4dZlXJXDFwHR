document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    const hideLoadingScreen = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.remove();
            }, { once: true });
        }
    };

    // Garante que o loading fique no mínimo 600ms, mas não espera o iframe
    const MIN_LOADING_TIME = 600;
    const startTime = Date.now();

    window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;

        if (remaining > 0) {
            setTimeout(hideLoadingScreen, remaining);
        } else {
            hideLoadingScreen();
        }
    });
});
