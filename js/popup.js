const openButton = document.querySelector('.tickets__button_buy');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');

openButton.addEventListener('click', function (e) {
    popupOpen(popup);
});

closeButton.addEventListener('click', function (e) {
    popupClose(popup);
});

function popupOpen(x) {
    x.classList.add('open');
    x.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
            x.classList.remove('open');
        }
    });
}

function popupClose(x) {
    x.classList.remove('open');
}