// Moblie dark mode//
document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.button');
    const themeToggle = document.getElementById('theme-toggle');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.classList.remove('fa-toggle-on');
            themeToggle.classList.add('fa-toggle-off');
            themeToggle.nextElementSibling.textContent = 'Light Mode';
        } else {
            themeToggle.classList.remove('fa-toggle-off');
            themeToggle.classList.add('fa-toggle-on');
            themeToggle.nextElementSibling.textContent = 'Dark Mode';
        }
    });
});