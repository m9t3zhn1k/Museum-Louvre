$(document).ready(function(){
    $('.video__slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 400,
        initialSlide: 3,
        waitForAnimate: false,
        initialSlide: 0,
    });
});

const player = document.querySelector('.video__player');
const video = document.querySelector('.viewer');
const playerControls = document.querySelector('.video__controls');
const buttonPlay = document.querySelector('.video__button_play');
const videoButtonPlay = document.querySelector('.video__player_play');
const buttonVolume = document.querySelector('.video__button_volume');
const buttonFullScreen = document.querySelector('.video__button_fullscreen');
const progressTimeline = document.querySelector('.video__progress_timeline');
const progressVolume = document.querySelector('.video__progress_volume');
const videoSlider = document.querySelector('.video__slider');

let tempVolume;
let currentSlideVideo;
let buttonsSliderVideo;

var playbackRateVideo = document.createElement('span');
playbackRateVideo.classList.add('playbackRate');
player.append(playbackRateVideo);

progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVolume.value*100}%, #C4C4C4 ${progressVolume.value*100}%, #C4C4C4 100%)`;
progressTimeline.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressTimeline.value}%, #C4C4C4 ${progressTimeline.value}%, #C4C4C4 100%)`;

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtonPlay);
video.addEventListener('pause', updateButtonPlay);
video.addEventListener('timeupdate', handleProgress);
buttonPlay.addEventListener('click', togglePlay);
videoButtonPlay.addEventListener('click', togglePlay);
buttonVolume.addEventListener('click', toggleVolume);
progressTimeline.addEventListener('click', scrub);
progressTimeline.addEventListener('input', timelineRange);
progressVolume.addEventListener('change', handleVolumeRangeUpdate);
progressVolume.addEventListener('mousemove', handleVolumeRangeUpdate);
progressVolume.addEventListener('input', volumeRange);
buttonFullScreen.addEventListener('click', toggleFullScreen);

document.addEventListener('keydown', function(event) {
    if (event.code == "Space") {
        event.preventDefault();
        togglePlay();
    }
    if (event.code == "KeyM") {
        toggleVolume();
    }
    if (event.code == "KeyF") {
        toggleFullScreen();
    }
    if (event.shiftKey && event.code == "Comma") {
        video.playbackRate += 0.1;
        playbackRateUpdate();
    }
    if (event.shiftKey && event.code == "Period") {
        video.playbackRate -= 0.1;
        playbackRateUpdate();
    }
});

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    video.volume = progressVolume.value;
}
function toggleVolume() {
    if (progressVolume.value > 0) {
        temp = progressVolume.value;
        video.volume = 0;
        progressVolume.value = 0;
        progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVolume.value*100}%, #C4C4C4 ${progressVolume.value*100}%, #C4C4C4 100%)`;
        buttonVolume.classList.add('active');
    } else {
        progressVolume.value = temp;
        buttonVolume.classList.remove('active');
        progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVolume.value*100}%, #C4C4C4 ${progressVolume.value*100}%, #C4C4C4 100%)`;
        video.volume = temp;
    }
}
let fullscreenMode;
function toggleFullScreen() {


    if (!fullscreenMode) {
        player.parentNode.requestFullscreen();
        fullscreenMode = true;
        player.classList.add('active');
        playerControls.classList.add('active');
        buttonFullScreen.classList.add('active');
      } else if (fullscreenMode) {
        document.exitFullscreen();
        fullscreenMode = false;
        player.classList.remove('active');
        playerControls.classList.remove('active');
        buttonFullScreen.classList.remove('active');
      }
}
function updateButtonPlay() {
    buttonPlay.classList.toggle('active');
    videoButtonPlay.classList.toggle('active');
}
function timelineRange() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}
function volumeRange() {
    const value = progressVolume.value;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value*100}%, #C4C4C4 ${value*100}%, #C4C4C4 100%)`;
}
function handleVolumeRangeUpdate() {
    video.volume = this.value;
    if (this.value == 0) {
        buttonVolume.classList.add('active');
    } else buttonVolume.classList.remove('active');
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressTimeline.value = percent;
    progressTimeline.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
}
function scrub(e) {
    let timelineWidth = getComputedStyle(progressTimeline);
    const scrubTime = (e.offsetX / parseInt(timelineWidth.width)) * video.duration;
    video.currentTime = scrubTime;
}
function playbackRateUpdate() {
    playbackRateVideo.innerText = video.playbackRate + 'x';
    add();
    setTimeout(remove, 3000);
    function add() {
        playbackRateVideo.classList.add('active');
    }
    function remove() {
        playbackRateVideo.classList.remove('active');
    }
}

function currentVideo() {
    currentSlideVideo = $('.video__slider').slick('slickCurrentSlide');
    buttonsSliderVideo = videoSlider.querySelectorAll('button');
    video.src = `assets/video/video${currentSlideVideo}.mp4`;
    video.poster = `assets/video/poster/poster${currentSlideVideo}.webp`;
    buttonsSliderVideo.forEach(button => button.addEventListener('click', currentVideo));
    buttonsSliderVideo.forEach(button => button.addEventListener('click', setTimeout(resetVideo, 1)));

}
function resetVideo() {
    buttonPlay.classList.remove('active');
    videoButtonPlay.classList.remove('active');
    progressTimeline.value = '0';
    progressTimeline.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressTimeline.value}%, #C4C4C4 ${progressTimeline.value}%, #C4C4C4 100%)`;
}
setTimeout(currentVideo, 100);