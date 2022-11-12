var btns = document.querySelectorAll("button");
btns[0].addEventListener("click", () => review());
btns[1].addEventListener("click", () => play());

function review() {
  window.open("https://en.wikipedia.org/wiki/Rules_of_chess", "_blank");
}
function play() {
  window.location.replace("chessBoard.html");
}
