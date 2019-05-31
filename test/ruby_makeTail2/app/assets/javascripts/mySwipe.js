 // pure JS


 var element = document.getElementById('mySwipe');
if (element == null) {
    console.log("no, it is not working");
}
if (element != null) {
    console.log ("hello!")
 window.mySwipe = new Swipe(element, {
    


     startSlide: 0,
     draggable: true,
     autoRestart: false,
     continuous: true,
     disableScroll: true,
     stopPropagation: true,
     callback: function (index, element) {
         console.log("working");
     },
     transitionEnd: function (index, element) {
     }
 }); 
}