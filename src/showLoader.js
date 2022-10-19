import { controlButton, loader } from "./elements";

export default function showLoader() {
    loader.classList.add("hidden");
    controlButton.style.display = "none";
}
