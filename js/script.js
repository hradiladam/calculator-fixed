document.addEventListener('DOMContentLoaded', () => {


    
    // Function to switch theme between light and dark
    const switchTheme = () => {
        const body = document.body;
        const themeSwitchButton = document.querySelector('#theme-switch');

        body.classList.toggle('dark-theme')
        if (body.classList.contains('dark-theme')) {
            themeSwitchButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
        } else {
            themeSwitchButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    const themeSwitchButton = document.getElementById('theme-switch');
    themeSwitchButton.addEventListener('click', switchTheme);

});
