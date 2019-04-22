// pure JS
//var elem = document.getElementById('slider');
var slider = new Swipe(document.getElementById('slider'), {
    startSlide: 0,
    speed: 400,
    auto: 3000,
    draggable: false,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    callback: function(index, elem, dir) {},
    transitionEnd: function(index, elem) {}
});


var bullets = document.getElementById('position').getElementsByTagName('li');

$('li').on('click', function(event){
    event.preventDefault();
    var index = $("li").index(event.currentTarget);
    slider.slide(index);
});

// with jQuery
//window.mySwipe = $('#mySwipe').Swipe().data('Swipe');