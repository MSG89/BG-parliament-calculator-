
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

    //receiving an object with party results (partyName, partySeats, partySeatsAsPercentage)
    let partyResults = calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dpsResult);
    
    document.querySelector('.inputField').style.display = 'none';
    document.querySelector('.resultField').style.display = 'inline';


    if(partyResults[7] > 100){
        document.querySelector('.inputField').style.display = 'inline';
        document.querySelector('.resultField').style.display = 'none';

        clearFields();
        return
    }
    
    console.log(partyResults[0][0]);
    console.log(partyResults[0][1]);
    console.log(partyResults[0][2]);
    //creates empty table
    createTable(partyResults)


});


resetButton.addEventListener('click', (e) =>{
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'inline';
    document.querySelector('.resultField').style.display = 'none';
    clearFields();
});


function clearFields(){
    document.getElementById('gerbResult').value = '';
    document.getElementById('ITNResult').value = '';
    document.getElementById('dbResult').value = '';
    document.getElementById('vazrazhdaneResult').value = '';
    document.getElementById('bgvazhodResult').value = '';
    document.getElementById('ppResult').value = '';
    document.getElementById('dpsResult').value = '';
}

function calculate(party1, party2, party3, party4, party5, party6, party7){

    let totalPercent = Number(party1) + Number(party2) + Number(party3) + Number(party4) + Number(party5) + Number(party6) + Number(party7);
    if(totalPercent > 100){;
        alert('percentages must be equal or less than 100');
    }
    let gerbSeats = (240*Number(party1))/100;
    let gerbPercentage = (gerbSeats/240)*100;

    let itnSeats = (240*Number(party2))/100;
    let itnPercentage = (itnSeats/240)*100;

    let dbSeats = (240*Number(party3))/100;
    let dbPercentage = (dbSeats/240)*100;

    let vazrazhdaneSeats = (240*Number(party4))/100;
    let vazrazhdanePercentage = (vazrazhdaneSeats/240)*100;

    let bgvazhodSeats = (240*Number(party5))/100;
    let bgvazhodPercentage = (bgvazhodSeats/240)*100;

    let ppSeats = (240*Number(party6))/100;
    let ppPercentage = (ppSeats/240)*100;

    let dpsSeats = (240*Number(party7))/100;
    let dpsPercentage = (dpsSeats/240)*100;



    let partyResults = [
        party1 = ['gerb',gerbSeats,gerbPercentage],
        party2 = ['itn',itnSeats,itnPercentage],
        party3 = ['db', dbSeats, dbPercentage],
        party4 = ['vazrazhdane', vazrazhdaneSeats, vazrazhdanePercentage],
        party5 = ['bgvazhod', bgvazhodSeats, bgvazhodPercentage],
        party6 = ['pp', ppSeats, ppPercentage],
        party7 = ['dps', dpsSeats, dpsPercentage],
        total = totalPercent
    ];
    // let partyResults = {
    //     party1: ['gerb',gerbSeats,gerbPercentage],
        
    //     party2: ['itn',itnSeats,itnPercentage],

    //     party3: ['db', dbSeats, dbPercentage],

    //     party4: ['vazrazhdane', vazrazhdaneSeats, vazrazhdanePercentage],

    //     party5: ['bgvazhod', bgvazhodSeats, bgvazhodPercentage],
        
    //     party6: ['pp', ppSeats, ppPercentage],

    //     party7: ['dps', dpsSeats, dpsPercentage],

    //     total: totalPercent
    // };

    return partyResults
}

function createTable(partyResults){
    const table = document.querySelector("table");
    const tBody = document.createElement("tbody");


    for (let i = 0; i < 7; i++) {
        const rowElement = document.createElement("tr");
        
        for (let j = 0; j < 3; j++) {
            const tdElement = document.createElement("td");
            tdElement.textContent = partyResults[i][j];
            rowElement.appendChild(tdElement);
        }    
        tBody.appendChild(rowElement);
    }
    table.appendChild(tBody);
}


