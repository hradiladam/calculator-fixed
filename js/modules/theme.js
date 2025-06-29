// js/modules/theme.js
// ——— Switches themes ———

const themeSwitch = () => {
    const body = document.body;
    const themeSwitchButton = document.getElementById('theme-switch');

    body.classList.toggle('dark-theme');
    
    themeSwitchButton.innerHTML = body.classList.contains('dark-theme')
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
};

const init = () => {
    const themeSwitchButton = document.getElementById('theme-switch');

    if (themeSwitchButton) {
        themeSwitchButton.addEventListener('click', themeSwitch)
    }
}

export default { init };



