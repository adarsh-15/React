function toggleDrop() {
    'use strict';
    var tog = document.getElementById("uno");
    if (tog.className === "unordered") {
        tog.className += " open";
    } else {
        tog.className = "unordered";
    }
}