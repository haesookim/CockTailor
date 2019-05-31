let finish = document.getElementById('finish-button');
finish.addEventListener("click", svgToCanvas);

var width = 500;
var height = 500;

function svgToCanvas(){
    var svg = document.querySelector(".active-glass").querySelector("svg");
    console.log(svg);

    var serializer = new XMLSerializer(),
        svgStr = serializer.serializeToString(svg);

    var canvas = document.getElementById('previewcanvas');
    
    canvg(canvas, svgStr);
    canvas.width = 500;
    canvas.height = 500; 

    var glasses = document.querySelector(".active-glass");
    glasses.style.display = "none";
}