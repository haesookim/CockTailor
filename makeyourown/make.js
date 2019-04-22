function foldPane(button) {
    let pane = button.nextElementSibling;

    pane.classList.toggle("visible");
    if (pane.style.width !== "20px") {
        pane.style.width = "20px";
    } else {
        pane.style.width = "320px";
    }
}

var selectors = document.getElementsByClassName('choice-name');
var i;
for (i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener("click", function () {
        this.parentElement.classList.toggle("active");
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
for (j = 0; j < choiceItems.length; j++) {
    choiceItems[j].addEventListener("click", function () {
        this.classList.toggle("selected");
    })
}

var glassChosen = false;
for (j = 0; j < glassItems.length; j++) {
    glassItems[j].addEventListener("click", function () {
        if (!glassChosen) {
            glassChosen = true;
            this.classList.toggle('selected');
            showGlass(this.innerHTML.toLowerCase().split(">")[1].trim());
        }
        else {
            let k;
            for (k = 0; k < glassItems.length; k++) {
                if (glassItems[k].classList.contains('selected')) {
                    if (confirm("If you change your glass, you will lose all progress. continue?")) {
                        if (glassItems[k] === this) {
                            glassChosen = false;
                        } else{
                            glassItems[k].classList.toggle('selected');
                        }
                    }
                }
            }
            this.classList.toggle('selected')
            showGlass(this.innerHTML.toLowerCase().split(">")[1].trim());
        }
    })
}

function showGlass(string) {
    console.log(string);
    let k;
    let glass = document.getElementById(string);
    let glassArray = document.getElementsByClassName('glasstype')
    glass.style.display = "block";
    for (k = 0; k < glassItems.length; k++) {
        if (!glassItems[k].classList.contains('selected')) {
            glassArray[k].style.display = "none";
        }
    }
}

function showFinishScreen(){
    let maker = document.getElementById('maker-container');
    let select = document.getElementById('select-wrapper');
    let button = document.getElementById('finish-button');
    let preview = document.getElementById('preview');
    let finished = document.getElementById('finished');

    select.style.display = "none";
    finished.style.display = "flex";
    button.style.display = "none";
    maker.style.display = "block";
    preview.style.marginTop = "5%";
}