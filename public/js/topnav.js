
var menu = document.querySelector(".main-menu");

function openMainMenu() {
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
    }
}

document.addEventListener("click", function(event) {
    if (event.target.closest(".main-menu")) return;
    menu.classList.remove("open");
});