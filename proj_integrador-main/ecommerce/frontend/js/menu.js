document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuPages = document.getElementById('menu-pages');

    if (menuToggle && menuPages) {
        menuToggle.addEventListener('click', () => {
            menuPages.classList.toggle('menu-open');
        });
    }
});