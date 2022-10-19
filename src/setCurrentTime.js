import { playerLeft } from "./elements";

export default function setCurrentTime(formattedTime) {
    if (!formattedTime) {
        playerLeft.querySelector(".current-time").textContent = "00:00";
    } else {
        playerLeft.querySelector(".current-time").textContent = `${
            formattedTime.minutes < 10
                ? "0" + formattedTime.minutes
                : formattedTime.minutes
        }:${
            formattedTime.seconds < 10
                ? "0" + formattedTime.seconds
                : formattedTime.seconds
        }`;
    }
}
