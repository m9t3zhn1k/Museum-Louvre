const pictureInnerContainer = document.querySelector('.gallery__picture-inner-container');
const headerButton = document.querySelector('.header__button');

let pictureAdress = [
  {adress: 'assets/img/gallery/galery1.webp', size: 'medium'},
  {adress: 'assets/img/gallery/galery2.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery3.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery4.webp', size: 'medium'},
  {adress: 'assets/img/gallery/galery5.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery6.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery7.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery8.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery9.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery10.webp', size: 'medium'},
  {adress: 'assets/img/gallery/galery11.webp', size: 'medium'},
  {adress: 'assets/img/gallery/galery12.webp', size: 'small'},
  {adress: 'assets/img/gallery/galery13.webp', size: 'small'},
  {adress: 'assets/img/gallery/galery14.webp', size: 'large'},
  {adress: 'assets/img/gallery/galery15.webp', size: 'medium'}];

let ad = shuffle(pictureAdress);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

for (let i = 0; i < ad.length; i++) {
  let divImg = `<div class="gallery__item slide-in ${ad[i].size}"><img src="${ad[i].adress}" alt=""></div>`;
  pictureInnerContainer.innerHTML += divImg;
}

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const galleryImages = document.querySelectorAll('.slide-in');
const galleryContainer = document.querySelector('.gallery__picture-container');

function checkSlide(e) {
  galleryImages.forEach(galleryImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - galleryImage.clientHeight / 5;
    const imageBottom = galleryImage.offsetTop + galleryImage.clientHeight * 2 + galleryContainer.offsetTop;
    const isShown = slideInAt > (galleryImage.offsetTop + galleryContainer.offsetTop);
    const isScrolledBack = (window.scrollY + window.innerHeight) < galleryContainer.offsetTop;
    if (isShown) {
      galleryImage.classList.add('active');
    }
    if (isScrolledBack) {
      galleryImage.classList.remove('active');
    }
  });
}
function arrowActive(e) {
  const slideDown = 2000;
  if (window.scrollY > slideDown) {
    headerButton.classList.add('active');
  } else headerButton.classList.remove('active');
}
window.addEventListener('scroll', debounce(checkSlide));
window.addEventListener('scroll', arrowActive);