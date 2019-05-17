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

// make the choices selectable
var choiceItems = document.getElementsByClassName('choice-item');
var j;
for (j = 0; j < choiceItems.length; j++) {
    choiceItems[j].addEventListener("click", function () {
        this.classList.toggle("selected");

        //paint each section
    })
}

// make the glasses selectable
var glassItems = document.getElementsByClassName('glass');
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
                        } else {
                            glassItems[k].classList.toggle('selected');
                        }
                    }
                    //adjust for cancel condition : we get both cups if we say cancel
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


function showFinishScreen() {
    let maker = document.getElementById('maker-container');
    let select = document.getElementById('select-wrapper');
    let button = document.getElementById('finish-button');
    let preview = document.getElementById('preview');
    let finished = document.getElementById('finished');

    select.style.display = "none";

    finished.style.display = "flex";
    finished.style.gridColumn = "pane"
    finished.style.gridRow = "finished"
    button.style.display = "none";
    maker.style.gridTemplateColumns = "35% [pane]30% 35%";
    maker.style.gridTemplateRows = "10% [pane]60% [finished]30%"
    //preview.style.marginTop = "5%";
}

/* Glass operaton with classes section */

//glass filling functions
var transparent = "rgba(0,0,0,0)"; //basic fill of the svg

//use classes for glass
class Glass {
    constructor(name, units) {
        this.name = name;
        this.image = document.getElementById(name);
        this.slots_color = Array(units).fill(""); //everything starts as transparent
        this.slots_space = image.getElementById("Layer-4").getElementsByClassName("cls-2"); //allocate the svg spaces here
        this.slots_text = Array(units).fill("");
        this.currentSlot = 0;
    }

    addIngredient(ingredient) {
        if (currentSlot < units){
            slots_color[currentSlot] = ingredient.color;
            slots_text[currentSlot] = ingredient.name;

            if (ingredient.name === slots_text[currentSlot-1]){
                slots_text[currentSlot-1] = "";
                //show only 1 name of ingredient if two or more of same are stacked
            }

            currentSlot++;
        } else{
            //cannot add more, glass is full
        }
    }

    color() {
        var space;
        for (space = 0; space < units; space++) {
            if (slots_color[space] === "") {
                slots_space[space].style.fill = transparent;
            } else {
                slots_space[space].style.fill = slots_color[space];
            }
        }
    }
}

class ingredient {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

var currentGlass;
function showGlassOOP(string) {
    console.log(string); //name of class
    let k;
    let glass = document.getElementById(string);
    currentGlass = glass;
    let glassArray = document.getElementsByClassName('glasstype')
    glass.style.display = "block";
    for (k = 0; k < glassItems.length; k++) {
        if (glassItems[k] !== currentGlass) {
            glassArray[k].style.display = "none";
        }
    }

}


var ingredients = new Array();
var j;
for (j = 0; j < choiceItems.length; j++) {
    ingredients[j] = new ingredient(choiceItems[j].innerHTML, "blue");
    choiceItems[j].addEventListener("click", function () {
        this.classList.toggle("selected");

        //make everything blue for now
        currentGlass.addIngredient();
    })
}

