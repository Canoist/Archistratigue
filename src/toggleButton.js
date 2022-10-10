const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");

export default function toggleButton() {
    playButton.classList.toggle("player-play-pause-active");
    pauseButton.classList.toggle("player-play-pause-active");
}
