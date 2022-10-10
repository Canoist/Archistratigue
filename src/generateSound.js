import { intervalToDuration } from "date-fns";
import { Howl } from "howler";
import setCurrentTime from "./setCurrentTime";
import setDuration from "./setDuration";
import setMetaData from "./setMetaData";
import sounds from "./sounds";
const songSlider = document.querySelector(".player-song-slider");
const songProgress = document.querySelector(".player-song-played-progress");

export default function generateSound(index) {
    const sound = new Howl({
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
            setMetaData(sounds[index]);
        },
        onplay: function () {
            requestAnimationFrame(step);
        },
    });

    function step() {
        const formattedDuration = intervalToDuration({
            start: 0,
            end: sound.seek() * 1000,
        });
        songProgress.style.width =
            (sound.seek() * 100) / sound.duration() + "%";
        songSlider.value = (sound.seek() * 100) / sound.duration();
        setCurrentTime(formattedDuration);

        if (sound.playing()) {
            requestAnimationFrame(step);
        }
    }

    return sound;
}
