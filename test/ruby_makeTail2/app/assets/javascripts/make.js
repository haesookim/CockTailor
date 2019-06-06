var maker = document.getElementById('maker-container');
if (maker == null) {
    maker = document.getElementById('maker-container')
}
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

for (var j = 0; j < choiceItems.length; j++) {
    choiceItems[j].addEventListener("click", function () {
        this.classList.toggle("selected");
    })
}

var extraItems = document.getElementsByClassName('extra-item');
for (let k = 0; k<extraItems.length; k++){
    extraItems[k].addEventListener("click", function(){
       let itemName = extraItems[k].innerHTML.toLowerCase().trim();
       let extraItem =  document.querySelector('.active-glass').querySelector("#"+itemName);
       extraItem.classList.toggle("selected");
       extraItems[k].classList.toggle("selected");
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
                            toggleActive(glassItems[k].innerHTML.toLowerCase().split(">")[1].trim())
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
    maker.style.gridTemplateColumns = "[pane]45% [finished]45% 10%";
    maker.style.gridTemplateRows = "[start]15% [recipe]50% [pane]35% "
    preview.style.gridRowStart = "start";
    preview.style.gridRowEnd = "pane-end";
    preview.style.marginTop = "5%";
    recipe.style.gridColumn = "finished";
    recipe.style.gridRow = "recipe";
    
    for (element in recipe.querySelectorAll("li")){
        element.style.marginLeft="200px"; 
    }
}

function showFinishScreen(name, desc) {
    let finished = document.querySelector('#final-result');
    let enter = document.getElementById('enter-name');

    finished.querySelector('#desc-output').innerHTML = desc;
    enter.style.display = "none";
    finished.style.display = "block";
    finished.style.gridColumn = "finished"
    finished.style.gridRow = "recipe"
    recipe.style.gridColumn = "finished";
    recipe.style.gridRow = "recipe";
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
    var cocktailname = document.querySelector('#final-result').querySelector('#name-output').innerHTML;
    image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = cocktailname + ".png";
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

    onload() { // initialize
        let image = document.getElementById(this.name); //each glass class
        this.slots_space = image.querySelector("g#cuts").getElementsByClassName("cls-3");
        this.slots_color = Array(this.units).fill("");
        this.color();
        this.currentSlot = 0;
        recipe.innerHTML = "Recipe";
    }

    addIngredient(ingredient) {
        if (this.currentSlot < this.units) {
            this.slots_color[this.currentSlot] = ingredient.color;
            this.slots_text[this.currentSlot] = ingredient.name;

            if (ingredient.name === this.slots_text[this.currentSlot - 1]) {
                this.slots_text[this.currentSlot - 1] = "";
                //show only 1 name of ingredient if two or more of same are stacked
                //actually add this to the recipe
            }
            this.currentSlot++;
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

    toggleActive(string);
    currentGlass = glassMap[string];
    currentGlass.onload();

    let glassArray = document.getElementsByClassName('glasstype')
    for (let k = 0; k < glassItems.length; k++) {
        if (!glassItems[k].classList.contains('selected')) {
            glassArray[k].style.display = "none";
        }
    }
}

function toggleActive(string){
    let glass = document.getElementById(string);
    glass.classList.toggle('active-glass');
}

var ingredients = new Array();
// ingredient colors
var colors = ["e34e04", "654323", "b2beaf", "cb002d", "fdcd4f", "f0e5c9", "3a2426", "6defe5", "d9f852", "b983c8", "eec744", "f3e4c5", "e02031", "f11347", "fee251", "c0d643", "ff9402", "f3554a"];
var recipe = document.querySelector("#recipe");

for (let j = 0; j < choiceItems.length; j++) {
    ingredients[j] = new ingredient(choiceItems[j].innerHTML, "#" + colors[j]);
    choiceItems[j].addEventListener("click", function () {
        this.classList.toggle("selected");
        createRecipe(ingredients[j]);
        currentGlass.addIngredient(ingredients[j]);
    })
}

function createRecipe(ingredient) {
    if (currentGlass.currentSlot < currentGlass.units) {
        let recipeElement = document.createElement("li");
        let recipeColor = document.createElement("div");
        recipeColor.className = "recipe-color";
        recipeColor.style.backgroundColor = ingredient.color;
        recipeElement.append(recipeColor);
        recipeElement.append(ingredient.name);
        recipe.appendChild(recipeElement);
    }
}

/* convert svg to canvas */

let finish = document.getElementById('finish-button');
if (finish == null) {
    finish = document.getElementById('finish-button');
    finish.addEventListener("click", svgToCanvas);
} else {
    finish.addEventListener("click", svgToCanvas);
}

function svgToCanvas() {
    var svg = document.querySelector(".active-glass").querySelector("svg");
    var innerG = svg.querySelector('#Layer_2').querySelectorAll('g');
    for (let x = 3; x<innerG.length; x++){
        if (!innerG[x].classList.contains('selected')){
            innerG[x].remove();
        }
    }

    var serializer = new XMLSerializer(),
        svgStr = serializer.serializeToString(svg);

    var canvas = document.getElementById('previewcanvas');

    canvg(canvas, svgStr);
    canvas.width = 500;
    canvas.height = 500;

    var glasses = document.querySelector(".active-glass");
    glasses.style.display = "none";
    canvas.style.display = "block";
}