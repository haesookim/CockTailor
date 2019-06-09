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
            break;
        }
    }
}

function addColor(array){
    let defs = document.querySelector('.selected-glass').querySelector('defs');
    let baseString = '.cls-1{fill:none;} .cls-2{fill: #fff}'
    let fillbody = document.querySelector('.cls-3');

    if (array.length == 1){
        fillbody.style.fill = array[0];
    } else {
        if (array.length == 2){
            defs.querySelector('linearGradient').innerHTML = '<stop id="top" offset="0%"/><stop id="down" offset="100%"/>'
            defs.querySelector('style').innerHTML = baseString + '#down{stop-color:' + array[0] + ';} #top{stop-color: ' + array[1] +';}';
        } else if (array.length == 3){
            defs.querySelector('linearGradient').innerHTML = '<stop id="top" offset="0%"/><stop id="middle" offset = "50%"/><stop id="down" offset="100%"/>'
            defs.querySelector('style').innerHTML = baseString + '#down{stop-color:' + array[0] + ';} #middle{stop-color:' + array[1] + ';} #top{stop-color: ' + array[2] +';}';
        } else if (array.length ==4) {
            defs.querySelector('linearGradient').innerHTML = '<stop id="top" offset="0%"/><stop id="mid1" offset = "33%"/><stop id="mid2" offset = "66%"/><stop id="down" offset="100%"/>'
            defs.querySelector('style').innerHTML = baseString + '#down{stop-color:' + array[0] + ';} #mid1{stop-color:' + array[1] + ';} #mid2{stop-color:' + array[2] + ';} #top{stop-color: ' + array[3] +';}';
        }
        fillbody.style.fill = "url(#gradient)";
    }
}