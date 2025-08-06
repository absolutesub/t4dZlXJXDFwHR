document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const id = parseInt(urlParams.get("id"), 10);
  const anime = animes.find(a => a.id === id);

  if (!anime?.trailerUrl) {
    console.warn("Trailer não disponível ou anime não encontrado.");
    return;
  }

  const videoId = anime.trailerUrl.split("/embed/")[1];
  if (!videoId) {
    console.warn("ID do vídeo inválido.");
    return;
  }

  const videoContainer = document.getElementById("anime-bg-video");
  if (!videoContainer) {
    console.warn("#anime-bg-video não encontrado.");
    return;
  }

  // Observa o container e só carrega quando visível
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const iframe = document.createElement("iframe");
      iframe.src = `${anime.trailerUrl}?start=10&autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&loading=lazy`;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.setAttribute("allowfullscreen", "");

      // Estilo inicial (invisível)
      iframe.style.width = "102vh";
      iframe.style.height = "60vh";
      iframe.style.position = "absolute";
      iframe.style.top = "270px";
      iframe.style.left = "50%";
      iframe.style.transform = "translate(-50%, -50%)";
      iframe.style.opacity = "0";
      iframe.style.transition = "opacity 7s ease"; // Mantém o seu fade original
      iframe.style.filter = "blur(3px)";
      iframe.style.pointerEvents = "none";
      iframe.style.zIndex = "0";

      // Ao carregar, aplica fade-in
      iframe.onload = () => {
        iframe.style.opacity = "0.12";
      };

      videoContainer.appendChild(iframe);
      observer.disconnect(); // Para de observar após carregar
    }
  }, {
    threshold: 0.1 // Carrega quando 10% do container estiver visível
  });

  observer.observe(videoContainer);
});
