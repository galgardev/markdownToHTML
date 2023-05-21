const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

function setTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.className = isDarkMode ? 'dark' : 'light';
}

function toggleTheme() {
    body.classList.toggle('dark');
    body.classList.toggle('light');
}

setTheme();

themeToggle.addEventListener('click', toggleTheme);
