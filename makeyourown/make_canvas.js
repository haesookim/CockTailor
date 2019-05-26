// the using d3 solution

d3.select("#finish-button")
    .on("click", svgToCanvas);

var width = 500;
var height = 500;

function svgToCanvas() {
    var svg = d3.select(".active-glass");
    console.log(svg);

    var img = new Image();
    var serializer = new XMLSerializer(),
        svgStr = serializer.serializeToString(svg);

    img.src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);

    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(img,0,0,w,h);
}