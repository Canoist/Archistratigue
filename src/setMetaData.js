import { playerLeft } from "./elements";

export default function setMetaData(metaData) {
    if (metaData) {
        playerLeft.querySelector(".song-name").textContent = metaData.chapter;
        playerLeft.querySelector(".song-artist-album").textContent =
            metaData.name;
    } else {
        playerLeft.querySelector(".song-name").textContent = "Глава 1";
        playerLeft.querySelector(".song-artist-album").textContent =
            "Испытание войной";
    }
}
