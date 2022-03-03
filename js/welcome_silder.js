$(document).ready(function(){
    $('.welcome__slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 400,
        autoplay: true,
        autoplaySpeed: 3000,
        waitForAnimate: false,
    });
});

var $slider = $('.welcome__slider');

if ($slider.length) {
  var currentSlide = document.createElement('span');
  var sliderLine = document.createElement('span');
  var slidesCount = document.createElement('span');
  var sliderCounter = document.createElement('div');
  sliderCounter.classList.add('slider__bar_slides');
  sliderLine.innerText = '|';
  
  var updateSliderCounter = function(slick) {
    currentSlide.innerText = '0' + (slick.slickCurrentSlide() + 1);
    slidesCount.innerText = '0' + slick.slideCount;
  };

  $slider.on('init', function(event, slick) {
    $slider.append(sliderCounter);
    sliderCounter.append(currentSlide);
    sliderCounter.append(sliderLine);
    sliderCounter.append(slidesCount);
    updateSliderCounter(slick);
  });

  $slider.on('afterChange', function(event, slick) {
    updateSliderCounter(slick);
  });
}