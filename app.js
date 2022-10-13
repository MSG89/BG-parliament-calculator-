
let calcButton = document.getElementById('calcButton')
let numberOfSeats = 240;

calcButton.addEventListener('click', (e) => {
    e.preventDefault();

    let turnOut = document.getElementById('Turnout').value;

    let gerbResult = document.getElementById("gerbResult").value;
    let itnResult = document.getElementById("ITNResult").value;

    let dbResult = document.getElementById("dbResult").value;
    let vazrazhdaneResult = document.getElementById("vazrazhdaneResult").value;
    
    let bgvazhodResult = document.getElementById("bgvazhodResult").value;
    let ppResult = document.getElementById("ppResult").value;
    
    let dps = document.getElementById("dps").value;

    calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dps)
});

function calculate(resultOne, resultTwo, resultThree, resultFour, resultFive, resultSix, resultSeven){


}

