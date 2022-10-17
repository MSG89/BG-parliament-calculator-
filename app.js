
let calcButton = document.getElementById('calcButton');
let resetButton = document.getElementById('resetButton');

let gerbEl = document.getElementById('gerbResult');
let itnEl = document.getElementById('ITNResult');
let dbEl = document.getElementById('dbResult');
let vazrazhdaneEl = document.getElementById('vazrazhdaneResult');
let bgvazhodEl = document.getElementById('bgvazhodResult');
let ppEl = document.getElementById('ppResult');
let dpsEl = document.getElementById('dpsResult');
let bspEl = document.getElementById('bspResult');

const table = document.querySelector("table");
let chartEl = document.getElementById('chart');


calcButton.addEventListener('click', (e) => {
    e.preventDefault();

    let turnOut = document.getElementById('Turnout').value;

    let gerbResult = Number(gerbEl.value);
    let itnResult = Number(itnEl.value);

    let dbResult = Number(dbEl.value);
    let vazrazhdaneResult = Number(vazrazhdaneEl.value);

    let bgvazhodResult = Number(bgvazhodEl.value);
    let ppResult = Number(ppEl.value);

    let dpsResult = Number(dpsEl.value);
    let bspResult = Number(bspEl.value);

    //returning arr of arr - partyNUM [partyName, seats, percentage]
    let partyResults = calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dpsResult, bspResult);

    document.querySelector('.inputField').style.display = 'none';
    document.querySelector('.resultField').style.display = 'inline';


    if (partyResults[8] > 100) {
        document.querySelector('.inputField').style.display = 'inline';
        document.querySelector('.resultField').style.display = 'none';

        clearFields();
        return
    }

    //creates table
createTable(partyResults);
drawPieChart(partyResults);


});


resetButton.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'inline';
    document.querySelector('.resultField').style.display = 'none';
    table.innerHTML = '';
    clearFields();
    chartEl.innerHTML = '';
});


function clearFields() {
    document.getElementById('gerbResult').value = '';
    document.getElementById('ITNResult').value = '';
    document.getElementById('dbResult').value = '';
    document.getElementById('vazrazhdaneResult').value = '';
    document.getElementById('bgvazhodResult').value = '';
    document.getElementById('ppResult').value = '';
    document.getElementById('dpsResult').value = '';
    document.getElementById('bspResult').value = '';
}

function calculate(party1, party2, party3, party4, party5, party6, party7, party8) {

    let totalPercent = party1 + party2 + party3 + party4 + party5 + party6 + party7 + party8;
    if (totalPercent > 100) {
        ;
        alert('percentages must be equal or less than 100');
    }

    let totalValidVote = 0;
    let validPercentageArr = [party1, party2, party3, party4, party5, party6, party7, party8]; 
    for (let i = 0; i < validPercentageArr.length; i++) {
        if(validPercentageArr[i] < 4){
            validPercentageArr[i] = 0;
        }else{
            totalValidVote += validPercentageArr[i];
        } 
    }


    let gerbSeats = (240 * validPercentageArr[0]) / totalValidVote;
    let gerbPercentage = (gerbSeats / 240) * 100;

    let itnSeats = (240 * validPercentageArr[1]) / totalValidVote;
    let itnPercentage = (itnSeats / 240) * 100;

    let dbSeats = (240 * validPercentageArr[2]) / totalValidVote;
    let dbPercentage = (dbSeats / 240) * 100;

    let vazrazhdaneSeats = (240 * validPercentageArr[3]) / totalValidVote;
    let vazrazhdanePercentage = (vazrazhdaneSeats / 240) * 100;

    let bgvazhodSeats = (240 * validPercentageArr[4]) / totalValidVote;
    let bgvazhodPercentage = (bgvazhodSeats / 240) * 100;

    let ppSeats = (240 * validPercentageArr[5]) / totalValidVote;
    let ppPercentage = (ppSeats / 240) * 100;

    let dpsSeats = (240 * validPercentageArr[6]) / totalValidVote;
    let dpsPercentage = (dpsSeats / 240) * 100;

    let bspSeats = (240 * validPercentageArr[7]) / totalValidVote;
    let bspPercentage = (dpsSeats / 240) * 100;


    // let gerbSeats = (240 * party1) / 100;
    // let gerbPercentage = (gerbSeats / 240) * 100;

    // let itnSeats = (240 * party2) / 100;
    // let itnPercentage = (itnSeats / 240) * 100;

    // let dbSeats = (240 * party3) / 100;
    // let dbPercentage = (dbSeats / 240) * 100;

    // let vazrazhdaneSeats = (240 * party4) / 100;
    // let vazrazhdanePercentage = (vazrazhdaneSeats / 240) * 100;

    // let bgvazhodSeats = (240 * party5) / 100;
    // let bgvazhodPercentage = (bgvazhodSeats / 240) * 100;

    // let ppSeats = (240 * party6) / 100;
    // let ppPercentage = (ppSeats / 240) * 100;

    // let dpsSeats = (240 * party7) / 100;
    // let dpsPercentage = (dpsSeats / 240) * 100;

    // let bspSeats = (240 * party7) / 100;
    // let bspPercentage = (dpsSeats / 240) * 100;



    let partyResults = [
        party1 = ['GERB', Math.round(gerbSeats), Math.round(gerbPercentage)],
        party2 = ['ITN', Math.round(itnSeats), Math.round(itnPercentage)],
        party3 = ['DB', Math.round(dbSeats), Math.round(dbPercentage)],
        party4 = ['VAZRAZHDANE', Math.round(vazrazhdaneSeats), Math.round(vazrazhdanePercentage)],
        party5 = ['BG VAZHOD', Math.round(bgvazhodSeats), Math.round(bgvazhodPercentage)],
        party6 = ['PP', Math.round(ppSeats), Math.round(ppPercentage)],
        party7 = ['DPS', Math.round(dpsSeats), Math.round(dpsPercentage)],
        party8 = ['BSP', Math.round(bspSeats), Math.round(bspPercentage)],
        total = totalPercent
    ];

    return partyResults
}

function createTable(partyResults) {
    let captionEl = document.createElement('caption');
    captionEl.textContent = 'Parliament seat distribution';
    table.appendChild(captionEl);

    let trElement = document.createElement('tr');

    let thElement1 = document.createElement('th');
    thElement1.textContent = 'Party'
    let thElement2 = document.createElement('th');
    thElement2.textContent = 'Seats'
    let thElement3 = document.createElement('th');
    thElement3.textContent = 'Percentage of all Seats'

    trElement.appendChild(thElement1);
    trElement.appendChild(thElement2);
    trElement.appendChild(thElement3);
    table.appendChild(trElement);


    const tBody = document.createElement("tbody");


    for (let i = 0; i < 8; i++) {
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


function drawPieChart(partyResults) {
    
    let canvasEl = document.createElement('canvas')
    canvasEl.setAttribute('id','pieChart');
    canvasEl.setAttribute('class','resultField');
    canvasEl.style.width = '50%';
    canvasEl.style.maxWidth = '500px';
    chartEl.appendChild(canvasEl);
 
    
    var xValues = [partyResults[0][0], partyResults[1][0], partyResults[2][0], partyResults[3][0], partyResults[4][0], partyResults[5][0], partyResults[6][0], partyResults[7][0]];
    var yValues = [partyResults[0][2], partyResults[1][2], partyResults[2][2], partyResults[3][2], partyResults[4][2], partyResults[5][2], partyResults[6][2], partyResults[7][2]];
    var barColors = ["red", "green", "blue", "orange", "brown", "violet", "yellow", "crimson"];

    new Chart("pieChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Parliamentary seat distribution"
            }
        }
    });
}




