import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import { Howl, Howler } from "howler";
import { intervalToDuration, formatDuration } from "date-fns";
import "swiper/css";
import sounds from "./sounds";
import setDuration from "./setDuration";
import setMetaData from "./setMetaData";
import setCurrentTime from "./setCurrentTime";
import toggleButton from "./toggleButton";
import generateSound from "./generateSound";

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
const songProgress = document.querySelector(".player-song-played-progress");
songProgress.style.width = "0%";

let index = null;
let sound = null;

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
            sound.play();
        }
    });
}

controlButton.addEventListener("click", () => {
    if (!sound) {
        index = 0;
        sound = generateSound(index);
    }
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
    sound.play();
});
