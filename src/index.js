import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

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
