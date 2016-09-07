document.addEventListener('DOMContentLoaded', function() {
    var elem = document.getElementById('bounce');
    var width;
    var height;
    elem.addEventListener('mousemove', function() {

        if (!window.event.shiftKey & elem.firstElementChild.innerHTML === "Click Me!") {
            width = Math.random() * Number(window.innerWidth);
            height = Math.random() * Number(window.innerHeight);
            elem.style.top = height + 'px';
            elem.style.left = width + 'px';
        } else {}

    });
    elem.addEventListener('click', function() {
        if (elem.firstElementChild.innerHTML === "Click Me!") {
            elem.firstElementChild.innerHTML = "Play Again";
        } else {
            elem.firstElementChild.innerHTML = "Click Me!";
        }
    });

});