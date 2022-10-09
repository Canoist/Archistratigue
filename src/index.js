import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import { Howl, Howler } from "howler";
import "swiper/css";
import sound1 from "../public/assets/mp3/Chapter_1.mp3";
import sound2 from "../public/assets/mp3/Chapter_2.mp3";
import sound3 from "../public/assets/mp3/Chapter_3.mp3";
import sound4 from "../public/assets/mp3/Chapter_4.mp3";
import sound5 from "../public/assets/mp3/Chapter_5.mp3";
import sound6 from "../public/assets/mp3/Chapter_6.mp3";
import sound7 from "../public/assets/mp3/Chapter_7.mp3";
import sound8 from "../public/assets/mp3/Chapter_8.mp3";
import sound9 from "../public/assets/mp3/Chapter_9.mp3";
import sound10 from "../public/assets/mp3/Chapter_10.mp3";
import sound11 from "../public/assets/mp3/Chapter_11.mp3";
import sound12 from "../public/assets/mp3/Chapter_12.mp3";
import sound13 from "../public/assets/mp3/Chapter_13.mp3";
import soundSummary from "../public/assets/mp3/Chapter_Summary.mp3";

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

const sound_1 = new Howl({
    src: sound1,
});

for (let i = 0; i < songElements.length; i++) {
    songElements[i].addEventListener("click", function () {
        this.querySelectorAll(".play-button-container")[0].style.display =
            "none";
        Howler.stop();
        sound_1.play();
    });
}
