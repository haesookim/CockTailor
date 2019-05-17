var maker = document.getElementById('maker-container');

function foldPane(button) {
    let pane = button.nextElementSibling;

    pane.classList.toggle("visible");
    if (pane.style.width !== "20px") {
        pane.style.width = "20px";
        maker.style.gridTemplateColumns = "[selector]50px auto [pane]30% [button]auto"

    } else {
        pane.style.width = "320px";
        maker.style.gridTemplateColumns = "[selector]320px auto [pane]30% [button]auto"
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
            showGlassOOP(this.innerHTML.toLowerCase().split(">")[1].trim());
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
            showGlassOOP(this.innerHTML.toLowerCase().split(">")[1].trim());
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
        this.units = units;
        this.slots_color = Array(units).fill(""); //everything starts as transparent
        this.slots_text = Array(units).fill("");
        this.currentSlot = 0;
    }

    onload(){
        let image = document.getElementById(this.name); //each glass class
        this.slots_space = image.querySelector("g#Layer_4").getElementsByClassName("cls-2"); //allocate the svg spaces here
    }

    addIngredient(ingredient) {
        console.log(ingredient);
        if (this.currentSlot < this.units){
            this.slots_color[this.currentSlot] = ingredient.color;
            this.slots_text[this.currentSlot] = ingredient.name;


            if (ingredient.name === this.slots_text[this.currentSlot-1]){
                this.slots_text[this.currentSlot-1] = "";
                //show only 1 name of ingredient if two or more of same are stacked
            }

            this.currentSlot++;
        } else{
            //cannot add more, glass is full
        }
        this.color();
    }

    color() {
        for (let space = 0; space < this.units; space++) {
            if (this.slots_color[space] === "") {
                this.slots_space[space].style.fill = transparent;
            } else {
                this.slots_space[space].style.fill = this.slots_color[space];
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

// initialize glasses
var glassMap = {};
glassMap['martini'] = new Glass('martini', 4);
glassMap['margherita'] = new Glass('margherita', 4);
glassMap['liqueur'] = new Glass('liqueur', 6);
glassMap['whiskey'] = new Glass('whiskey', 6);
glassMap['high-ball'] = new Glass('high-ball', 8);
glassMap['collins'] = new Glass('collins', 8);

var currentGlass;
function showGlassOOP(string) {
    let glass = document.getElementById(string);
    glass.style.display = "block";
    currentGlass = glassMap[string];
    currentGlass.onload();

    let glassArray = document.getElementsByClassName('glasstype')
    for (let k = 0; k < glassItems.length; k++) {
        if (!glassItems[k].classList.contains('selected')) {
            glassArray[k].style.display = "none";
        }
    }
}


var ingredients = new Array();
for (let j = 0; j < choiceItems.length; j++) {
    ingredients[j] = new ingredient(choiceItems[j].innerHTML, "blue");
    choiceItems[j].addEventListener("click", function () {
        this.classList.toggle("selected");

        currentGlass.addIngredient(ingredients[j]);
    })
}

