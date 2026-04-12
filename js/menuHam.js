document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileNav = document.getElementById("mobile-nav");
    const closeBtn = document.getElementById("close-btn");

    hamburgerBtn.addEventListener("click", () => {
        mobileNav.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
        mobileNav.classList.remove("show");
    });
});