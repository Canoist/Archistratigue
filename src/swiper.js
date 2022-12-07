import Swiper, { Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css";

Swiper.use([Autoplay, Pagination, EffectFade]);

const swiper = new Swiper(".swiper-image", {
    loop: true,
    autoHeight: true,
    speed: 500,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination-image",
        clickable: true,
    },
    autoplay: {
        disableOnInteraction: false,
        waitForTransition: false,
    },
});

const swiperVideo = new Swiper(".swiper-video", {
    loop: true,
    pagination: {
        el: ".swiper-pagination-video",
        clickable: true,
    },
});
