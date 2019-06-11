var answerString = ""; 

function initialize(){
    answerString = "";
    recipe.innerHTML = "Recipe";
    mySwipe.next();
}

function appendAnswer(object){
    if (object.classList.contains('L')){
        answerString+="0";
    } if (object.classList.contains('R')){
        answerString+="1";
    } if (object.classList.contains('CL')){
        answerString+="02";
        mySwipe.next();
    } if (object.classList.contains('PL') || object.classList.contains('PR')){
        if (answerString[0] == "0" && answerString[1] =="2"){
            if (object.classList.contains('PL')){
                answerString+="02";
            } if (object.classList.contains('PR')) {
                answerString+="12";
            }
            mySwipe.next();
        } else{
            if (object.classList.contains('PL')){
                answerString+="0";
            } if (object.classList.contains('PR')){
                answerString+="1";
            }
        }
    }
    mySwipe.next();
    if (answerString.length == 6){
        recipe.innerHTML = "Recipe";
        findMatch(answerString);
    }
}

function findMatch(string){
    for (let i = 0; i<cocktail_data.length; i++){
        if (string === cocktail_data[i].answerstring){
            document.getElementById('answer-title').innerHTML = cocktail_data[i].name;
            document.getElementById('answer-text').innerHTML = cocktail_data[i].description;
            document.getElementById('answer-subtitle').innerHTML = cocktail_data[i].oneliner;

            //get appropriate glass
            selectGlass(cocktail_data[i].glass);

            //add code here for coloring
            addColor(cocktail_data[i].cocktailColor.split(", "));

            for (let j = 0; j<cocktail_data[i].recipe.length; j++){
                let ingredient = cocktail_data[i].recipe[j];
                var recipe = document.querySelector("#recipe");
                
                let recipeElement = document.createElement("li");
                let recipeColor = document.createElement("div");
                recipeColor.className = "recipe-color";
                recipeColor.style.backgroundColor = ingredient.ingredColor;
                recipeElement.append(recipeColor);
                recipeElement.append(ingredient.ingredName);
                recipe.appendChild(recipeElement);
            }

            //show the appropriate garnishes
            if (cocktail_data[i].garnish){
                showGarnish(cocktail_data[i].garnish.split(", "));
            }
            break;
        }
    }
}

function selectGlass(glassString){
    let glassSvg;
    for(let i = 0; i<recommendGlasses.length; i++){
        if (glassString===recommendGlasses[i].name){
            glassSvg = recommendGlasses[i].content;
        }
    }
    document.querySelector('#answer-image').innerHTML = glassSvg;
}

function showGarnish(array){
    console.log(array);
    for (let i = 0; i<array.length; i++){
        document.querySelector('#answer-image').querySelector('#'+array[i]).style.display="block";
    }
}

function addColor(array){
    let defs = document.querySelector('#answer-image').querySelector('defs');
    let fillbody = document.querySelector('#answer-image').querySelector('#whole').querySelector('path');

    if (array.length == 1){
        fillbody.style.fill = array[0];
    } else {
        if (array.length == 2){
            defs.querySelector('linearGradient').innerHTML = '<stop id="top" offset="0%"/><stop id="down" offset="100%"/>'
            defs.querySelector('style').innerHTML += '#down{stop-color:' + array[0] + ';} #top{stop-color: ' + array[1] +';}';
        } else if (array.length == 3){
            defs.querySelector('linearGradient').innerHTML = '<stop id="top" offset="0%"/><stop id="middle" offset = "50%"/><stop id="down" offset="100%"/>'
            defs.querySelector('style').innerHTML += '#down{stop-color:' + array[0] + ';} #middle{stop-color:' + array[1] + ';} #top{stop-color: ' + array[2] +';}';
        } else if (array.length ==4) {
            defs.querySelector('linearGradient').innerHTML = '<stop id="top" offset="0%"/><stop id="mid1" offset = "33%"/><stop id="mid2" offset = "66%"/><stop id="down" offset="100%"/>'
            defs.querySelector('style').innerHTML += '#down{stop-color:' + array[0] + ';} #mid1{stop-color:' + array[1] + ';} #mid2{stop-color:' + array[2] + ';} #top{stop-color: ' + array[3] +';}';
        }
        fillbody.style.fill = "url(#gradient)";
    }
}
