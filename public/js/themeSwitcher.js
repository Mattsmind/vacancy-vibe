const themeToggle = document.querySelector('#theme-toggle');
const sunIcon = document.querySelector('.theme-icon-sun');
const moonIcon = document.querySelector('.theme-icon-moon');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);

    sunIcon.classList.toggle('d-none', theme !== 'light');
    moonIcon.classList.toggle('d-none', theme !== 'dark');
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme)

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-bs-theme', newTheme);

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});
