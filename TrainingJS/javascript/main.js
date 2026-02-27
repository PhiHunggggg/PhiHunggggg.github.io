function changeButton() {
    const noButton = document.getElementById("noButton");
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * (window.innerWidth - noButton.offsetWidth) + "px";
    noButton.style.top = Math.random() * (window.innerHeight - noButton.offsetHeight) + "px";
    noButton.style.transition = "left 0.5s, top 0.5s";
}
function openGame() {
    window.open("./TrainingJS/html/snake.html", "_blank");
}
function openGame1() {
    window.open("./TrainingJS/html/Racing.html", "_blank");

}

