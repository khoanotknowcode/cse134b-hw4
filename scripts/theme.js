/*--- Theme Switching Script ---*/
function saveTheme(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        console.warn('Could not save theme.');
    }
}

function loadTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (error) {
        return null;
    }
}

// Load saved theme if there's one
const savedTheme = loadTheme();
if (savedTheme !== null) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

const themeSwitch = document.getElementById('theme');
// Button lets keyboard and mouse actions become 'click' event
themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        saveTheme('light');
    } else if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        saveTheme('dark');
    }
});