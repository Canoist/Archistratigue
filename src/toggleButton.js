import { pauseButton, playButton } from "./elements";

export default function toggleButton() {
    playButton.classList.toggle("player-play-pause-active");
    pauseButton.classList.toggle("player-play-pause-active");
}
