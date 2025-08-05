document.addEventListener('DOMContentLoaded', () => {
  const bannerData = [
    {
      image: "url('img/banners/banner-absolute-recrutamento.webp')",
      link: "recrutamento.html"
    },
    {
      image: "url('img/banners/banner-absolute-ptojetos.webp')",
      link: "projetos.html"
    }
  ];

  const bannerWrapper = document.getElementById('banners');
  const progress = document.querySelector('.progress-fill');
  const transitionTime = 8000;
  let index = 0;

  bannerData.forEach(({ image, link }) => {
    const a = document.createElement('a');
    a.className = 'banner';
    a.href = link;
    a.style.backgroundImage = image;
    bannerWrapper.appendChild(a);
  });

  const total = bannerData.length;

  function showBanner(i) {
    bannerWrapper.style.transform = `translateX(-${i * 100}%)`;
    animateProgressBar();
  }

  function animateProgressBar() {
    progress.style.transition = 'none';
    progress.style.width = '0%';
    void progress.offsetWidth; // força reflow
    progress.style.transition = `width ${transitionTime}ms linear`;
    progress.style.width = '100%';
  }

  function nextBanner() {
    index = (index + 1) % total;
    showBanner(index);
  }

  function prevBanner() {
    index = (index - 1 + total) % total;
    showBanner(index);
  }

  document.querySelector('.next-banner').addEventListener('click', () => {
    clearInterval(autoSlide);
    nextBanner();
    resetAutoSlide();
  });

  document.querySelector('.prev-banner').addEventListener('click', () => {
    clearInterval(autoSlide);
    prevBanner();
    resetAutoSlide();
  });

  let autoSlide = setInterval(nextBanner, transitionTime);

  function resetAutoSlide() {
    animateProgressBar();
    autoSlide = setInterval(nextBanner, transitionTime);
  }

  showBanner(index); // inicial
});
