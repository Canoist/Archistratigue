import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import { Howler } from "howler";
import { intervalToDuration } from "date-fns";
import "swiper/css";
import sounds from "./sounds";
import toggleButton from "./toggleButton";
import generateSound from "./generateSound";
import setCurrentTime from "./setCurrentTime";
import setActiveTrack from "./setActiveTrack";
import showLoader from "./showLoader";
import {
    controlButton,
    nextButton,
    playButton,
    prevButton,
    progressContainer,
    songList,
    songProgress,
} from "./elements";

Swiper.use([Autoplay, Pagination, EffectFade]);

const swiper = new Swiper(".swiper", {
    loop: true,
    autoHeight: true,
    speed: 500,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        disableOnInteraction: false,
        waitForTransition: false,
    },
});

let index = 0;
showLoader();
let sound = generateSound(index);

for (let i = 0; i < songList.length; i++) {
    songList[i].addEventListener("click", (e) => {
        if (e.target.closest("a")) {
            return;
        }
        if (index === i) {
            if (sound.playing()) {
                sound.pause();
            } else {
                sound.play();
            }
            toggleButton();
        } else {
            if (playButton.classList.contains("player-play-pause-active")) {
                toggleButton();
            }

            Howler.stop();
            index = i;
            showLoader();
            sound = generateSound(index);
            setActiveTrack(index);
            sound.play();
        }
    });
}

controlButton.addEventListener("click", () => {
    toggleButton();
    if (playButton.classList.contains("player-play-pause-active")) {
        sound.pause();
    } else {
        sound.play();
    }
});

prevButton.addEventListener("click", () => {
    showLoader();
    if (playButton.classList.contains("player-play-pause-active")) {
        toggleButton();
    }

    Howler.stop();

    if (index === 0) {
        index = sounds.length;
    }

    index -= 1;
    sound = generateSound(index);
    setActiveTrack(index);
    sound.play();
});

nextButton.addEventListener("click", () => {
    showLoader();
    if (playButton.classList.contains("player-play-pause-active")) {
        toggleButton();
    }

    Howler.stop();

    if (index === sounds.length - 1) {
        index = 0;
    } else {
        index += 1;
    }

    sound = generateSound(index);
    setActiveTrack(index);
    sound.play();
});

progressContainer.addEventListener("mousedown", (e) => {
    if (sound.playing()) {
        toggleButton();
        sound.pause();
    }
});

progressContainer.addEventListener("mousemove", (e) => {
    const { value } = e.target;
    songProgress.value = value / 100;
    const formattedDuration = intervalToDuration({
        start: 0,
        end: ((sound.duration() * value) / 100) * 1000,
    });
    setCurrentTime(formattedDuration);
});

progressContainer.addEventListener("click", (e) => {
    const value = e.offsetX / e.target.offsetWidth;
    sound.seek(sound.duration() * value);
    if (playButton.classList.contains("player-play-pause-active")) {
        toggleButton();
        sound.play();
    }
});

progressContainer.addEventListener("touchstart", (e) => {
    if (sound.playing()) {
        toggleButton();
        sound.pause();
    }
});

progressContainer.addEventListener("touchmove", (e) => {
    const { value } = e.target;
    songProgress.value = value / 100;
    const formattedDuration = intervalToDuration({
        start: 0,
        end: ((sound.duration() * value) / 100) * 1000,
    });
    setCurrentTime(formattedDuration);
});

progressContainer.addEventListener("touchend", (e) => {
    const { value } = e.target;
    sound.seek((sound.duration() * value) / 100);
    if (playButton.classList.contains("player-play-pause-active")) {
        toggleButton();
        sound.play();
    }
});
