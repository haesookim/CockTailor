var answerString = ""; 

function initialize(){
    answerString = "";
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
    console.log(answerString);
    if (answerString.length == 6){
        findMatch(answerString);
    }
}

function findMatch(string){
    for (let i = 0; i<cocktail_data.length; i++){
        if (string === cocktail_data[i].answerstring){
            document.getElementById('answer-title').innerHTML = cocktail_data[i].name;
            document.getElementById('answer-text').innerHTML = cocktail_data[i].description;
            break;
        }
    }
}