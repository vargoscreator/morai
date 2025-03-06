document.querySelectorAll('.header__lang').forEach(langBlock => {
    const langSelected = langBlock.querySelector('.header__lang-selected');
    langSelected.addEventListener('click', (e) => {
        e.preventDefault();
        langBlock.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!langBlock.contains(e.target)) {
            langBlock.classList.remove('active');
        }
    });
});

if(document.querySelector('.header__lang')){
    function moveHeaderLang() {
        const headerLang = document.querySelector('.header__lang');
        const headerContent = document.querySelector('.header__content');
        const headerInner = document.querySelector('.header__inner');
        if (window.innerWidth < 1000) {
            headerContent.appendChild(headerLang);
        } else {
            headerInner.appendChild(headerLang);
        }
    }
    window.addEventListener('load', moveHeaderLang);
    window.addEventListener('resize', moveHeaderLang); 
}

const headerBurger = document.querySelector('.header__burger');
const headerContent = document.querySelector('.header__content');
headerBurger.addEventListener('click', function() {
    headerBurger.classList.toggle('active');
    headerContent.classList.toggle('active');
});


if(document.querySelector('.cookiesPopup')){
    document.querySelector('.cookiesPopup__close').addEventListener('click', () => {
        document.querySelector('.cookiesPopup').classList.remove('show');
    });
}