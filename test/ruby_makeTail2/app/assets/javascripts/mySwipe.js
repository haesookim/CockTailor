// pure JS
var element = document.getElementById('mySwipe');
if (element == null) {

}
if (element != null) {
    window.mySwipe = new Swipe(element, {
        startSlide: 0,
        draggable: true,
        autoRestart: false,
        continuous: true,
        disableScroll: true,
        stopPropagation: true,
        callback: function (index, element) {

        },
        transitionEnd: function (index, element) {
        }
    });
}