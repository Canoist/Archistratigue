const songList = document.querySelectorAll(".song");

export default function setActiveTrack(index) {
    songList.forEach((track) => track.classList.remove("active"));
    songList[index].classList.add("active");
}
