var audio = document.getElementById('audio');
var target = document.getElementById("enter");

function playAudio() {
    target.style.opacity = '0';
    target.addEventListener('transitionend', () => target.remove());
    audio.play();
}

target.addEventListener("click", playAudio);
target.addEventListener("touchstart", playAudio);
