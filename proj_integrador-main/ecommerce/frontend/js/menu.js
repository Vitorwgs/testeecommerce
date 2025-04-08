document.addEventListener('DOMContentLoaded', function() {
    const menuBar = document.querySelector('.menu_bar');
    const menuPages = document.querySelector('.menu-pages');

    if (menuBar && menuPages) {
        menuBar.addEventListener('click', function() {
            menuPages.style.display = menuPages.style.display === 'block' ? 'none' : 'block';
        });
    }
});