const loader = document.querySelector("#loader");
const controlButton = document.querySelector(".player-play-pause");

export default function showLoader() {
    loader.classList.add("hidden");
    controlButton.style.display = "none";
}
