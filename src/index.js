import "./scss/styles.scss";
import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const swiper = new Swiper(".swiper", {
    modules: [Pagination, EffectFade],
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoHeight: true,
});
