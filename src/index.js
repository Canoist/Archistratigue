import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import { Howl, Howler } from "howler";
import { intervalToDuration, formatDuration } from "date-fns";
import "swiper/css";
import sounds from "./sounds";
import toggleButton from "./toggleButton";
import generateSound from "./generateSound";
import setCurrentTime from "./setCurrentTime";
import setActiveTrack from "./setActiveTrack";

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

const songElements = document.getElementsByClassName("song");
const controlButton = document.querySelector(".player-play-pause");
const prevButton = document.querySelector("#previous");
const playButton = document.querySelector("#play");
const nextButton = document.querySelector("#next");
const progressContainer = document.querySelector("#progress-container");
const songSlider = document.querySelector(".player-song-slider");

let index = 0;
let sound = generateSound(index);

for (let i = 0; i < songElements.length; i++) {
    songElements[i].addEventListener("click", function () {
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

progressContainer.addEventListener("click", (e) => {
    const value = e.offsetX / e.target.offsetWidth;
    sound.seek(sound.duration() * value);
    if (sound.playing()) {
        sound.seek(sound.duration() * value);
    }
    if (playButton.classList.contains("player-play-pause-active")) {
        toggleButton();
        sound.play();
    }
});

songSlider.addEventListener(["input", "touchmove"], (e) => {
    const { value } = e.target;
    const totalDurationInSec = (sound.duration() * value) / 100;
    const formattedDuration = intervalToDuration({
        start: 0,
        end: totalDurationInSec * 1000,
    });
    setCurrentTime(formattedDuration);
});
