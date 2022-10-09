import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import { Howl, Howler } from "howler";
import { intervalToDuration, formatDuration } from "date-fns";
import "swiper/css";
import sounds from "./sounds";
import setDuration from "./setDuration";
import setMetaData from "./setMetaData";

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

const playerLeft = document.querySelector("#player-left");
const songElements = document.getElementsByClassName("song");

const sound = new Howl({
    src: sounds[0].src,
    html5: true,
    onload: () => {
        const totalDurationInSec = sound.duration();
        const formattedDuration = intervalToDuration({
            start: 0,
            end: totalDurationInSec * 1000,
        });

        setDuration(formattedDuration);
        setMetaData();
    },
});

for (let i = 0; i < songElements.length; i++) {
    songElements[i].addEventListener("click", function () {
        Howler.stop();
        const sound = new Howl({
            src: sounds[i].src,
            html5: true,
            onload: () => {
                const totalDurationInSec = sound.duration();
                const formattedDuration = intervalToDuration({
                    start: 0,
                    end: totalDurationInSec * 1000,
                });
                setDuration(formattedDuration);
                setMetaData(sounds[i]);
            },
        });
        sound.play();
    });
}
