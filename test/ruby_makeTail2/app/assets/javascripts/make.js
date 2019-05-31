


var maker = document.getElementById('maker-container');

if(maker != null){
    console.log("ok");
} else {
    console.log("no...");
    maker = document.getElementById('maker-container');
}

function foldPane(button) {
    if(maker == null) {
        console.log("no...");
        maker = document.getElementById('maker-container');
    }
    let pane = button.nextElementSibling;

    pane.classList.toggle("visible");
    // pane이 null이어서 그랬던 것으로 판명. 이 부분 추후 수정할 것.
    if (pane.style.width !== "20px") {
        pane.style.width = "20px";
        maker.style.gridTemplateColumns = "[selector]50px auto [pane]30% [button]auto"

    } else {
        pane.style.width = "320px";
        maker.style.gridTemplateColumns = "[selector]320px auto [pane]30% [button]auto"
    }
}

var selectors = document.getElementsByClassName('choice-name');
if (selectors != null) {
    console.log("it's okay");
} else {
    console.log("no, it's not...")
}
var i;
for (i = 0; i < selectors.length; i++) {
    console.log("selector addEventListener working");
    selectors[i].addEventListener("click", function () {
        console.log("selector working");
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

function showNameInput() {
    let select = document.getElementById('select-wrapper');
    let button = document.getElementById('finish-button');
    let preview = document.getElementById('preview');
    let enter = document.getElementById('enter-name');

    select.style.display = "none";

    enter.style.display = "block";
    button.style.display = "none";
    maker.style.gridTemplateColumns = "35% [pane]30% 35%";
    maker.style.gridTemplateRows = "10% [pane]60% [finished]30%"
    preview.style.marginTop = "5%";
}

function showFinishScreen(name, desc) {
    let finished = document.querySelector('#final-result');
    let enter = document.getElementById('enter-name');

    finished.querySelector('#name-output').innerHTML = name;
    finished.querySelector('#desc-output').innerHTML = desc;
    enter.style.display = "none";
    finished.style.display = "block";
    finished.style.gridColumn = "pane"
    finished.style.gridRow = "finished"
}

function getName() {
    let name = document.getElementById('cocktail-name').value;
    let desc = document.getElementById('cocktail-desc').value;
    showFinishScreen(name, desc);
}

function share() {
    // share to SNS (facebook, instagram)
}

function saveImage() {
    var canvas = document.getElementById("previewcanvas");
    image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
    // save image to local
}

function toGallery() {
    //is this necessary if the results are automatically uploaded to gallery
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

    onload() {
        let image = document.getElementById(this.name); //each glass class
        this.slots_space = image.querySelector("g#Layer_4").getElementsByClassName("cls-2"); //allocate the svg spaces here
    }

    addIngredient(ingredient) {
        console.log(ingredient);
        if (this.currentSlot < this.units) {
            this.slots_color[this.currentSlot] = ingredient.color;
            this.slots_text[this.currentSlot] = ingredient.name;

            if (ingredient.name === this.slots_text[this.currentSlot - 1]) {
                this.slots_text[this.currentSlot - 1] = "";
                //show only 1 name of ingredient if two or more of same are stacked
            }

            this.currentSlot++;
        } else {
            //cannot add more, glass is full
        }
        this.color();
    }

    color() {
        for (let space = 0; space < this.units; space++) {
            let slot = this.slots_space[space]; //each slot svg path element
            if (slot === "") {
                slot.style.fill = transparent;
            } else {
                slot.style.fill = this.slots_color[space];
                // slot.append() = this.slots_text[space];
                let element = document.createElement('text');
                element.setAttribute('x', 5);
                element.setAttribute('y', 15);
                let txt = document.createTextNode("Hello World");
                element.append(txt)
                slot.append(element);
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
    glass.classList.toggle('active-glass');
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

