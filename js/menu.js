const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__list');
const menuLinks = document.querySelectorAll('.menu__item');
const welcomeText = document.querySelector('.welcome__text');
const welcomeS = document.querySelector('.welcome__slider');
const welcomeContainer = document.querySelector('.welcome__container');
const welcomeImages = document.querySelector('.welcome__images');
const welcomeLine = document.querySelector('.welcome__line');
const welcomeSocialNetworks = document.querySelector('.welcome__social-networks');

menuIcon.addEventListener('click', (e) => toggle());
menuLinks.forEach(link => link.addEventListener('click', (e) => toggle()));


function toggle() {
    menuIcon.classList.toggle('active');
    menuBody.classList.toggle('active');
    welcomeText.classList.toggle('active');
    welcomeContainer.classList.toggle('active');
    welcomeImages.classList.toggle('active');
    welcomeS.classList.toggle('active');
    welcomeLine.classList.toggle('active');
    welcomeSocialNetworks.classList.toggle('active');
}

document.addEventListener('click', function(e) {
    if ( e.target != (menuIcon || menuLinks)) {
        menuIcon.classList.remove('active');
        menuBody.classList.remove('active');
        welcomeText.classList.remove('active');
        welcomeContainer.classList.remove('active');
        welcomeImages.classList.remove('active');
        welcomeS.classList.remove('active');
        welcomeLine.classList.remove('active');
        welcomeSocialNetworks.classList.remove ('active');
    };
});