var answerString = ""; 

function appendAnswer(object){
    mySwipe.next();
    if (object.classList.contains('L')){
        answerString+="0";
    } if (object.classList.contains('R')){
        answerString+="1";
    } if (object.classList.contains('CL')){
        answerString+="02";
        mySwipe.next();
    } if (object.classList.contains('PL') || object.classList.contains('PL')){
        if (answerString.substring(0, 2) === "02"){
            if (object.classList.contains('PL')){
                answerString+="02";
            } if (object.classList.contains('PR')){
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
    console.log(answerString);
}

$.getJSON('cocktail_data.json', function(data){

});