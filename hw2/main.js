document.addEventListener("DOMContentLoaded", function() {

    Array.prototype.forEach.call(document.getElementsByTagName('button'), function(elem) {
        var interval = setInterval(changeImages, Math.floor((Math.random() * 1000 / 2) + 1), elem);
        elem.addEventListener('click', function() {
            if (!interval) {
                elem.innerHTML = "Stop";
                interval = setInterval(changeImages, Math.floor((Math.random() * 1000 / 2) + 1), elem);
            } else {
                elem.innerHTML = "Start";
                clearInterval(interval);
                interval = null;
            }
        });
    });

    function changeImages(elem) {
        elem.previousSibling.src = "https://unsplash.it/300/200/?image=" + Math.floor((Math.random() * 100) + 1);
    };
});