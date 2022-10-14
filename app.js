
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
    let bspResult = bspEl.value;

    //returning arr of arr - partyNUM [partyName, seats, percentage]
    let partyResults = calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dpsResult, bspResult);

    document.querySelector('.inputField').style.display = 'none';
    document.querySelector('.resultField').style.display = 'inline';


    if (partyResults[7] > 100) {
        document.querySelector('.inputField').style.display = 'inline';
        document.querySelector('.resultField').style.display = 'none';

        clearFields();
        return
    }

    //creates table
    createTable(partyResults);

    drawBarChart(partyResults);
    drawPieChart(partyResults);



});


resetButton.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'inline';
    document.querySelector('.resultField').style.display = 'none';
    table.innerHTML = '';
    clearFields();
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

    let totalPercent = Number(party1) + Number(party2) + Number(party3) + Number(party4) + Number(party5) + Number(party6) + Number(party7) + Number(party8);
    if (totalPercent > 100) {
        ;
        alert('percentages must be equal or less than 100');
    }
    let gerbSeats = (240 * Number(party1)) / 100;
    let gerbPercentage = (gerbSeats / 240) * 100;

    let itnSeats = (240 * Number(party2)) / 100;
    let itnPercentage = (itnSeats / 240) * 100;

    let dbSeats = (240 * Number(party3)) / 100;
    let dbPercentage = (dbSeats / 240) * 100;

    let vazrazhdaneSeats = (240 * Number(party4)) / 100;
    let vazrazhdanePercentage = (vazrazhdaneSeats / 240) * 100;

    let bgvazhodSeats = (240 * Number(party5)) / 100;
    let bgvazhodPercentage = (bgvazhodSeats / 240) * 100;

    let ppSeats = (240 * Number(party6)) / 100;
    let ppPercentage = (ppSeats / 240) * 100;

    let dpsSeats = (240 * Number(party7)) / 100;
    let dpsPercentage = (dpsSeats / 240) * 100;

    let bspSeats = (240 * Number(party7)) / 100;
    let bspPercentage = (dpsSeats / 240) * 100;



    let partyResults = [
        party1 = ['GERB', gerbSeats, gerbPercentage],
        party2 = ['ITN', itnSeats, itnPercentage],
        party3 = ['DB', dbSeats, dbPercentage],
        party4 = ['VAZRAZHDANE', vazrazhdaneSeats, vazrazhdanePercentage],
        party5 = ['BG VAZHOD', bgvazhodSeats, bgvazhodPercentage],
        party6 = ['PP', ppSeats, ppPercentage],
        party7 = ['DPS', dpsSeats, dpsPercentage],
        party8 = ['BSP', bspSeats, bspPercentage],
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

function drawBarChart(partyResults) {
    var xValues = [partyResults[0][0], partyResults[1][0], partyResults[2][0], partyResults[3][0], partyResults[4][0], partyResults[5][0], partyResults[6][0], partyResults[7][0]];
    var yValues = [partyResults[0][2], partyResults[1][2], partyResults[2][2], partyResults[3][2], partyResults[4][2], partyResults[5][2], partyResults[6][2], partyResults[7][2]];
    var barColors = ["red", "green", "blue", "orange", "brown", "violet", "yellow","crimson"];

    new Chart("barChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Parliamentary seat distribution"
            }
        }
    });
}

function drawPieChart(partyResults) {
    var xValues = [partyResults[0][0], partyResults[1][0], partyResults[2][0], partyResults[3][0], partyResults[4][0], partyResults[5][0], partyResults[6][0], partyResults[7][0]];
    var yValues = [partyResults[0][2], partyResults[1][2], partyResults[2][2], partyResults[3][2], partyResults[4][2], partyResults[5][2], partyResults[6][2], partyResults[7][2]];
    var barColors = ["red", "green", "blue", "orange", "brown", "violet", "yellow","crimson"];

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




