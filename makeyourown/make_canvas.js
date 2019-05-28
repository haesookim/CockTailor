// the using d3 solution

d3.select("#finish-button")
    .on("click", svgToCanvas);

var width = 500;
var height = 500;

function svgToCanvas1() {

    var img = new Image();
    var serializer = new XMLSerializer(),
        svgStr = serializer.serializeToString(svg);

    img.src = "" + svgStr;
    img.type = "image/svg+xml";

    console.log(img);

    var canvas = document.getElementById('previewcanvas');

    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d")
    ctx.drawImage(img,0,0,width,height);
}

function svgToCanvas(){
    var svg = d3.select(".active-glass").select("svg")[0][0];

    var serializer = new XMLSerializer(),
        svgStr = serializer.serializeToString(svg);

    var canvas = document.getElementById('previewcanvas');
    
    canvg(canvas, svgStr);
    canvas.width = 500;
    canvas.height = 500; 

    var glasses = d3.select(".active-glass")[0][0];
    glasses.style.display = "none";
}