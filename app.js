
let calcButton = document.getElementById('calcButton');
let resetButton = document.getElementById('resetButton');

let gerbEl = document.getElementById('gerbResult');
let itnEl = document.getElementById('ITNResult');
let dbEl = document.getElementById('dbResult');
let vazrazhdaneEl = document.getElementById('vazrazhdaneResult');
let bgvazhodEl = document.getElementById('bgvazhodResult');
let ppEl = document.getElementById('ppResult');
let dpsEl = document.getElementById('dpsResult');


calcButton.addEventListener('click', (e) => {
    e.preventDefault();

    let turnOut = document.getElementById('Turnout').value;

    let gerbResult = gerbEl.value;
    let itnResult = itnEl.value;

    let dbResult = dbEl.value;
    let vazrazhdaneResult = vazrazhdaneEl.value;
    
    let bgvazhodResult = bgvazhodEl.value;
    let ppResult = ppEl.value;
    
    let dpsResult = dpsEl.value;

    let partyResults = calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dpsResult);
    
    document.querySelector('.inputField').style.display = 'none';
    document.querySelector('.resultField').style.display = 'inline';


    if(partyResults.total > 100){
        document.querySelector('.inputField').style.display = 'inline';
        document.querySelector('.resultField').style.display = 'none';

        document.getElementById('gerbResult').value = '';
        document.getElementById('ITNResult').value = '';
        document.getElementById('dbResult').value = '';
        document.getElementById('vazrazhdaneResult').value = '';
        document.getElementById('bgvazhodResult').value = '';
        document.getElementById('ppResult').value = '';
        document.getElementById('dpsResult').value = '';
        return
    }








});


resetButton.addEventListener('click', (e) =>{
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'inline';
    document.querySelector('.resultField').style.display = 'none';
});

function calculate(party1, party2, party3, party4, party5, party6, party7){

    let totalPercent = Number(party1) + Number(party2) + Number(party3) + Number(party4) + Number(party5) + Number(party6) + Number(party7);
    if(totalPercent > 100){;
        alert('percentages must be equal or less than 100');
    }

    let partyResults = {
        gerbSeats:(240*Number(party1))/100,
        gerbPercentage: gerbSeats/240,

        itnSeats:(240*Number(party2))/100,
        itnPercentage: itnSeats/240,

        dbSeats:(240*Number(party3))/100,
        dbPercentage: dbSeats/240,

        vazrazhdaneSeats:(240*Number(party4))/100,
        vazrazhdanePercentage: vazrazhdaneSeats/240,

        bgvazhodSeats:(240*Number(party5))/100,
        bgvazhodPercentage: bgvazhodSeats/240,

        ppSeats:(240*Number(party6))/100,
        ppPercentage: ppSeats/240,

        dpsSeats:(240*Number(party7))/100,
        dpsPercentage: dpsSeats/240,

        total: totalPercent
    };

    return partyResults
}



