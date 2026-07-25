function meuEscopo() {

    const showButton = document.querySelector('.show');
    const sidebar = document.querySelector('.sidebar');
    const nav = document.querySelector('.navegacao');

    showButton.addEventListener('click', () => {
        nav.classList.toggle('hide');
        sidebar.classList.toggle('active-bar');
    })

}
meuEscopo();