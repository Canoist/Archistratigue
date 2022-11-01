import { intervalToDuration } from "date-fns";
import { Howl } from "howler";
import {
    controlButton,
    loader,
    nextButton,
    prevButton,
    songProgress,
    songSlider,
} from "./elements";
import setCurrentTime from "./setCurrentTime";
import setDuration from "./setDuration";
import setMetaData from "./setMetaData";
import sounds from "./sounds";

export default function generateSound(index) {
    const sound = new Howl({
        src: sounds[index].src,
        html5: true,
        preload: "metadata",
        onload: () => {
            const totalDurationInSec = sound.duration();
            const formattedDuration = intervalToDuration({
                start: 0,
                end: totalDurationInSec * 1000,
            });
            setCurrentTime();
            setDuration(formattedDuration);
            setMetaData(sounds[index]);
            loader.classList.remove("hidden");
            controlButton.style.display = "flex";
            nextButton.classList.remove("disable");
            prevButton.classList.remove("disable");
        },
        onplay: function () {
            requestAnimationFrame(step);
        },
        onseek: function () {
            requestAnimationFrame(step);
        },
    });

    function step() {
        const formattedDuration = intervalToDuration({
            start: 0,
            end: sound.seek() * 1000,
        });
        songProgress.value = sound.seek() / sound.duration();
        songSlider.value = (sound.seek() * 100) / sound.duration();
        setCurrentTime(formattedDuration);

        if (sound.playing()) {
            requestAnimationFrame(step);
        }
    }

    return sound;
}
