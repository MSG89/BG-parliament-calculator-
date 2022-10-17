
const calcButton = document.getElementById('calcButton');
const resetButton = document.getElementById('resetButton');

const gerbEl = document.getElementById('gerbResult');
const itnEl = document.getElementById('ITNResult');
const dbEl = document.getElementById('dbResult');
const vazrazhdaneEl = document.getElementById('vazrazhdaneResult');
const bgvazhodEl = document.getElementById('bgvazhodResult');
const ppEl = document.getElementById('ppResult');
const dpsEl = document.getElementById('dpsResult');
const bspEl = document.getElementById('bspResult');

const table = document.querySelector("table");
const chartEl = document.getElementById('chart');


calcButton.addEventListener('click', (e) => {
    e.preventDefault();

    const turnOut = document.getElementById('Turnout').value;

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
    document.querySelector('.resultField').style.display = 'block';


    if (partyResults[8] > 100) {
        document.querySelector('.inputField').style.display = 'block';
        document.querySelector('.resultField').style.display = 'none';

        clearFields();
        return
    }

    //creates table
    createTable(partyResults);
    drawPieChart(partyResults);
    calculateMajorities(partyResults);




});


resetButton.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'block';
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
        if (validPercentageArr[i] < 4) {
            validPercentageArr[i] = 0;
        } else {
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


    let partyResults = [
        ['GERB', Math.round(gerbSeats), Math.round(gerbPercentage)],
        ['ITN', Math.round(itnSeats), Math.round(itnPercentage)],
        ['DB', Math.round(dbSeats), Math.round(dbPercentage)],
        ['VAZRAZHDANE', Math.round(vazrazhdaneSeats), Math.round(vazrazhdanePercentage)],
        ['BG VAZHOD', Math.round(bgvazhodSeats), Math.round(bgvazhodPercentage)],
        ['PP', Math.round(ppSeats), Math.round(ppPercentage)],
        ['DPS', Math.round(dpsSeats), Math.round(dpsPercentage)],
        ['BSP', Math.round(bspSeats), Math.round(bspPercentage)],
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

    let canvasEl = document.createElement('canvas');
    canvasEl.setAttribute('id', 'pieChart');
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

function calculateMajorities(partyResults) {

 
    //to do - make an KVP object from party Results
 

    const combinations = new Set();
    const threshold = 121;

    const result = {};

    // Object.entries(testData).map(([key1, value1]) => {
    //     return Object.entries(testData).map(([key2, value2]) => {
    //         if (key1 === key2) return; // party1 === party1 do nothing

    //         // take care of the doubles, party1 + party2 === party2 + party1
    //         const key = [key1, key2].sort().join(":");
    //         if (combinations.has(key)) return;
    //         combinations.add(key);

    //         // check if the sum is over the threshold
    //         const sum = value1 + value2;
    //         if (sum > threshold) result[key] = sum;
    //     });
    // });

    // console.log(result);



}
