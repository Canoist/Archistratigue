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

let index = 0;
let sound = new Howl({
    src: sounds[index].src,
    html5: true,
    onload: () => {
        const totalDurationInSec = sound.duration();
        const formattedDuration = intervalToDuration({
            start: 0,
            end: totalDurationInSec * 1000,
        });
        setCurrentTime();
        setDuration(formattedDuration);
        setMetaData();
    },
});

for (let i = 0; i < songElements.length; i++) {
    songElements[i].addEventListener("click", function () {
        if (playButton.classList.contains("player-play-pause-active")) {
            toggleButton();
        }

        Howler.stop();

        index = i;
        sound = generateSound(index);
        sound.play();

        setInterval(function tick() {
            const formattedDuration = intervalToDuration({
                start: 0,
                end: sound.seek() * 1000,
            });
            setCurrentTime(formattedDuration);
        }, 1000);
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
