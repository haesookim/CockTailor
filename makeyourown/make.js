function foldPane(button) {
    let pane = button.nextElementSibling;

    pane.classList.toggle("visible");
    if (pane.style.width !== "20px" ) {
        pane.style.width = "20px" ;
    } else {
        pane.style.width = "320px" ;
    }
}

var selectors = document.getElementsByClassName('choice-name');
var i;
for (i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "flex") {
            content.style.display = "none";
        } else {
            content.style.display = "flex";
        }
    });
}

var choiceItems = document.getElementsByClassName('choice-item');
var glassItems = document.getElementsByClassName('glass');
var j;
for (j = 0; j<choiceItems.length; j++){
    choiceItems[j].addEventListener("click", function(){
        this.classList.toggle("selected");
        if (this.classList.contains('glass')){
            let k;
            for (k = 0; k<glassItems.length; k++){
                if (glassItems[k] !== this && glassItems[k].classList.contains('selected')){
                    glassItems[k].classList.toggle('selected');
                }
            }
            showGlass(this.innerHTML.toLowerCase());
        }
    })
}

function showGlass(string){
    let k;
    let glass = document.getElementById(string);
    let glassArray = document.getElementsByClassName('glasstype')
    glass.style.display = "block";
    for (k = 0; k<glassItems.length; k++){
        if (!glassItems[k].classList.contains('selected')){
            glassArray[k].style.display = "none";
            console.log("nullified")
        }
    }
}