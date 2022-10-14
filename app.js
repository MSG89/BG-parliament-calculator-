
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

        clearFields();
        return
    }
    //receiving an object with party results


    // test Array
    let arr = ['gerb','120','50'];
    let arr2 = ['itn','24','10'];
    let arr3 = ['db','60','25'];


    createTable(partyResults,arr, arr2, arr3)


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
    let gerbPercentage = gerbSeats/240;

    let itnSeats = (240*Number(party2))/100;
    let itnPercentage = itnSeats/240;

    let dbSeats = (240*Number(party3))/100;
    let dbPercentage = dbSeats/240;

    let vazrazhdaneSeats = (240*Number(party4))/100;
    let vazrazhdanePercentage = vazrazhdaneSeats/240;

    let bgvazhodSeats = (240*Number(party5))/100;
    let bgvazhodPercentage = bgvazhodSeats/240;

    let ppSeats = (240*Number(party6))/100;
    let ppPercentage = ppSeats/240;

    let dpsSeats = (240*Number(party7))/100;
    let dpsPercentage = dpsSeats/240;



    let partyResults = {
        gerbSeats: gerbSeats,
        gerbPercentage: gerbPercentage,

        itnSeats: itnSeats,
        itnPercentage: itnPercentage,

        dbSeats: dbSeats,
        dbPercentage: dbPercentage,

        vazrazhdaneSeats: vazrazhdaneSeats,
        vazrazhdanePercentage: vazrazhdanePercentage,

        bgvazhodSeats: bgvazhodSeats,
        bgvazhodPercentage: bgvazhodPercentage,

        ppSeats: ppSeats,
        ppPercentage: ppPercentage,

        dpsSeats:dpsSeats,
        dpsPercentage: dpsPercentage,

        total: totalPercent
    };

    return partyResults
}

function createTable(partyResults,arr,arr2,arr3){
    const table = document.querySelector("table");
    const tBody = document.createElement("tbody");


    for (let i = 0; i < 7; i++) {
        const rowElement = document.createElement("tr");
        
        for (let j = 0; j < 3; j++) {
            const tdElement = document.createElement("td");
            rowElement.appendChild(tdElement);
        }    
        tBody.appendChild(rowElement);
    }
    table.appendChild(tBody);
}


