import "./scss/styles.scss";
import "./formHandlers";
import "./swiper";
import "./audioPlayer";
import { copyText } from "./elements";

copyText.addEventListener("click", (e) => {
    window.navigator.clipboard.writeText(copyText.innerText);
});
