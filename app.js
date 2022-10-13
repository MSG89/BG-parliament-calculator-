
let calcButton = document.getElementById('calcButton')

let gerbResultElement = document.getElementById('gerbResult');
let gerbResult = Number(gerbResultElement.textContent);

console.log(gerbResult);

calcButton.addEventListener('click', (e) => {

    e.preventDefault();
    calculate();
    

});

function calculate(gerbResult, itnResult){
    console.log('test');
}

