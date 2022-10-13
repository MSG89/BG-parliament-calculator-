
let calcButton = document.getElementById('calcButton');
let resetButton = document.getElementById('resetButton');
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
    
    let dps = document.getElementById("dpsResult").value;

    calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dps)
    document.querySelector('.inputField').style.display = 'none';
    document.querySelector('.resultField').style.display = 'inline';

});


resetButton.addEventListener('click', (e) =>{
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'inline';
    document.querySelector('.resultField').style.display = 'none';
});

function calculate(part1, party2, party3, party4, party5, party6, party7){
    //do something
}



