import { intervalToDuration } from "date-fns";
import { Howl } from "howler";
import setCurrentTime from "./setCurrentTime";
import setDuration from "./setDuration";
import setMetaData from "./setMetaData";
import sounds from "./sounds";

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
    });
    return sound;
}
