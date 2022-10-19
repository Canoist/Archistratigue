import { playerLeft } from "./elements";

export default function setDuration(formattedDuration) {
    playerLeft.querySelector(".player-duration").textContent = `${
        formattedDuration.minutes < 10
            ? "0" + formattedDuration.minutes
            : formattedDuration.minutes
    }:${
        formattedDuration.seconds < 10
            ? "0" + formattedDuration.seconds
            : formattedDuration.seconds
    }`;
}
