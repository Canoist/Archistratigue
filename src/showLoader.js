import { controlButton, loader, nextButton, prevButton } from "./elements";

export default function showLoader() {
    loader.classList.add("hidden");
    controlButton.style.display = "none";
    nextButton.classList.add("disable");
    prevButton.classList.add("disable");
}
