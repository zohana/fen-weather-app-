function validationsForPlace(inputText) {
    let errorDiv = document.getElementById("error-div");

    if(inputText === '' || inputText === undefined ){
        //alert('Please add place to search');
        errorDiv.classList.add("show-s");
        errorDiv.classList.remove("hide");
    }else{
        errorDiv.classList.add("hide-s");
        errorDiv.classList.remove("show-s");
    }
}

function validateForDate(dateInput){
    let errorDiv = document.getElementById("error-div-d");
    if(dateInput === '' || dateInput === undefined ){
        //alert('Please add place to search');
        errorDiv.classList.add("show-d");
        errorDiv.classList.remove("hide-d");
    }else{
        errorDiv.classList.add("hide-d");
        errorDiv.classList.remove("show-d");
    }
}

function validateDateInput(startDate, endDate){
    let errorDiv = document.getElementById("error-div-t");

    if (endDate <= startDate){
        errorDiv.classList.add("show-t");
        errorDiv.classList.remove("hide-t");
    }else{
        errorDiv.classList.add("hide-t");
        errorDiv.classList.remove("show-t");
    }
}

export { validationsForPlace,validateForDate, validateDateInput }
