
const calcButton = document.getElementById('calcButton');
const resetButton = document.getElementById('resetButton');

const calcButton2 = document.getElementById('calcButton2');
const calcButton3 = document.getElementById('calcButton3');
const calcButton4 = document.getElementById('calcButton4');

const party1El = document.getElementById('party1result');
const party1nameEl = document.getElementById('party1name');

const party2El = document.getElementById('party2result');
const party2nameEl = document.getElementById('party2name');

const party3El = document.getElementById('party3result');
const party3nameEl = document.getElementById('party3name');

const party4El = document.getElementById('party4result');
const party4nameEl = document.getElementById('party4name');

const party5El = document.getElementById('party5result');
const party5nameEl = document.getElementById('party5name');

const party6El = document.getElementById('party6result');
const party6nameEl = document.getElementById('party6name');

const party7El = document.getElementById('party7result');
const party7nameEl = document.getElementById('party7name');

const party8El = document.getElementById('party8result');
const party8nameEl = document.getElementById('party8name');

const partyTableEl = document.getElementById('partyTable');
const coalitionTableEl = document.getElementById('coalitionTable');
const chartEl = document.getElementById('chart');
const chartCoalEl = document.getElementById('chartCoalition');

let wrongInput = false;
let coalitionSize = 0;

calculatePartyResults();

calcButton2.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('chartCoalition').innerHTML = '';
    coalitionSize = 2;
    calculatePartyCoalitions(partyResults, coalitionSize);
});

calcButton3.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('chartCoalition').innerHTML = '';
    coalitionSize = 3;
    calculatePartyCoalitions(partyResults, coalitionSize);
});

calcButton4.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('chartCoalition').innerHTML = '';
    coalitionSize = 4;
    calculatePartyCoalitions(partyResults, coalitionSize);
});

resetButton.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.inputField').style.display = 'block';
    document.querySelector('.resultField').style.display = 'none';
    document.querySelector('.coalitionField').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    document.getElementById('chartCoalition').innerHTML = '';


    partyTableEl.innerHTML = '';
    coalitionTableEl.innerHTML = '';
    coalitionTableEl.style.display = 'none';
    clearFields();
    chartEl.innerHTML = '';
});

function calculatePartyResults() {
    calcButton.addEventListener('click', (e) => {
        e.preventDefault();
        wrongInput = false;
        //const turnOut = document.getElementById('Turnout').value;

        let party1result = Number(party1El.value);
        const party1name = party1nameEl.value;

        let party2result = Number(party2El.value);
        const party2name = party2nameEl.value;

        let party3result = Number(party3El.value);
        const party3name = party3nameEl.value;

        let party4result = Number(party4El.value);
        const party4name = party4nameEl.value;

        let party5result = Number(party5El.value);
        const party5name = party5nameEl.value;

        let party6result = Number(party6El.value);
        const party6name = party6nameEl.value;

        let party7result = Number(party7El.value);
        const party7name = party7nameEl.value;

        let party8result = Number(party8El.value);
        const party8name = party8nameEl.value;

        //returning arr of arr - partyNUM [partyName, seats, percentage]
        partyResults = calculate(
            party1result, party1name,
            party2result, party2name,
            party3result, party3name,
            party4result, party4name,
            party5result, party5name,
            party6result, party6name,
            party7result, party7name,
            party8result, party8name);

        document.querySelector('.inputField').style.display = 'none';
        document.querySelector('.resultField').style.display = 'block';
        document.querySelector('.coalitionField').style.display = 'inline-flex';
        document.querySelector('.buttons').style.display = 'block';

        if (wrongInput) {
            document.querySelector('.inputField').style.display = 'block';
            document.querySelector('.resultField').style.display = 'none';
            document.querySelector('.coalitionField').style.display = 'none';
            document.querySelector('.buttons').style.display = 'none';

            clearFields();
            return
        }

        //creates table
        createTable(partyResults);
        drawPieChart(partyResults);

    });
};

function clearFields() {
    document.getElementById('party1result').value = '';
    document.getElementById('party2result').value = '';
    document.getElementById('party3result').value = '';
    document.getElementById('party4result').value = '';
    document.getElementById('party5result').value = '';
    document.getElementById('party6result').value = '';
    document.getElementById('party7result').value = '';
    document.getElementById('party8result').value = '';
}

function calculate(
    party1, party1name,
    party2, party2name,
    party3, party3name,
    party4, party4name,
    party5, party5name,
    party6, party6name,
    party7, party7name,
    party8, party8name) 
    {

        let totalPercent = party1 + party2 + party3 + party4 + party5 + party6 + party7 + party8;
        if (totalPercent > 100) {
            alert('total percentage result must be equal or less than 100');
            wrongInput = true;
        }else if(totalPercent < 4){
            alert('at least one party must have more than 4 percent of the vote');
            wrongInput = true;
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


        let party1Seats = (240 * validPercentageArr[0]) / totalValidVote;
        let party1Percentage = (party1Seats / 240) * 100;

        let party2Seats = (240 * validPercentageArr[1]) / totalValidVote;
        let party2Percentage = (party2Seats / 240) * 100;

        let party3Seats = (240 * validPercentageArr[2]) / totalValidVote;
        let party3Percentage = (party3Seats / 240) * 100;

        let party4Seats = (240 * validPercentageArr[3]) / totalValidVote;
        let party4Percentage = (party4Seats / 240) * 100;

        let party5Seats = (240 * validPercentageArr[4]) / totalValidVote;
        let party5Percentage = (party5Seats / 240) * 100;

        let party6Seats = (240 * validPercentageArr[5]) / totalValidVote;
        let party6Percentage = (party6Seats / 240) * 100;

        let party7Seats = (240 * validPercentageArr[6]) / totalValidVote;
        let party7Percentage = (party7Seats / 240) * 100;

        let party8Seats = (240 * validPercentageArr[7]) / totalValidVote;
        let party8Percentage = (party8Seats / 240) * 100;


        let partyResults = [
            [party1name, Math.round(party1Seats), Math.round(party1Percentage), party1],
            [party2name, Math.round(party2Seats), Math.round(party2Percentage), party2],
            [party3name, Math.round(party3Seats), Math.round(party3Percentage), party3],
            [party4name, Math.round(party4Seats), Math.round(party4Percentage), party4],
            [party5name, Math.round(party5Seats), Math.round(party5Percentage), party5],
            [party6name, Math.round(party6Seats), Math.round(party6Percentage), party6],
            [party7name, Math.round(party7Seats), Math.round(party7Percentage), party7],
            [party8name, Math.round(party8Seats), Math.round(party8Percentage), party8],
            total = totalPercent
        ];

        return partyResults
    }

function createTable(partyResults) {
    let captionEl = document.createElement('caption');
    captionEl.textContent = 'Parliament seat distribution';
    partyTableEl.appendChild(captionEl);

    let trElement = document.createElement('tr');

    let thElement1 = document.createElement('th');
    thElement1.textContent = 'Party'
    let thElement2 = document.createElement('th');
    thElement2.textContent = 'Seats'
    let thElement3 = document.createElement('th');
    thElement3.textContent = 'Percentage of all Seats'
    let thElement4 = document.createElement('th');
    thElement4.textContent = 'Voting results';

    trElement.appendChild(thElement1);
    trElement.appendChild(thElement2);
    trElement.appendChild(thElement3);
    trElement.appendChild(thElement4);
    partyTableEl.appendChild(trElement);


    const tBody = document.createElement("tbody");


    for (let i = 0; i < 8; i++) {
        const rowElement = document.createElement("tr");

        for (let j = 0; j < 4; j++) {
            const tdElement = document.createElement("td");
            tdElement.textContent = partyResults[i][j];
            if (j == 2) {
                tdElement.textContent += ` %`;
            }
            rowElement.appendChild(tdElement);
        }
        tBody.appendChild(rowElement);
    }
    partyTableEl.appendChild(tBody);
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

function calculatePartyCoalitions(partyResults, coalitionSize) {


    let inputData = {
        [partyResults[0][0]]: partyResults[0][1],
        [partyResults[1][0]]: partyResults[1][1],
        [partyResults[2][0]]: partyResults[2][1],
        [partyResults[3][0]]: partyResults[3][1],
        [partyResults[4][0]]: partyResults[4][1],
        [partyResults[5][0]]: partyResults[5][1],
        [partyResults[6][0]]: partyResults[6][1],
        [partyResults[7][0]]: partyResults[7][1]
    };

    const keysRaw = Object.keys(inputData);
    const valuesRaw = Object.values(inputData)
    let keys = [];
    let values = [];

    for (let i = 0; i < keysRaw.length; i++) {
        if (valuesRaw[i] > 0) {
            keys.push(keysRaw[i]);
            values.push(valuesRaw[i]);
        }
    }

    let Coalitions = [];
    let CoalitionSeats = [];

    const majorityThreshold = 121;

    //possible coalitions algorithm.

    if (coalitionSize == 2) {
        for (let i = 0; i < keys.length; i++) {

            for (let j = 0; j < keys.length; j++) {

                if (keys[i] === keys[j]) {
                    continue;
                } else if ((values[i] + values[j]) > majorityThreshold) {

                    let currentCombo = [keys[i], keys[j]].sort().join(" + ");
                    let currentComboSeats = [values[i] + values[j]];

                    if (Coalitions.includes(currentCombo)) {
                        continue;
                    } else {
                        Coalitions.push(currentCombo);
                        CoalitionSeats.push(currentComboSeats);
                    }
                }
            }
        }

    } else if (coalitionSize == 3) {
        for (let i = 0; i < keys.length; i++) {

            for (let j = 0; j < keys.length; j++) {

                for (let k = 0; k < keys.length; k++) {
                    if (keys[i] === keys[j] || keys[i] === keys[k] || keys[j] === keys[k]) {
                        continue;
                    } else if ((values[i] + values[j] + values[k]) > majorityThreshold) {

                        let currentCombo = [keys[i], keys[j], keys[k]].sort().join(" + ");
                        let currentComboSeats = [values[i] + values[j] + values[k]];

                        if (Coalitions.includes(currentCombo)) {
                            continue;
                        } else {
                            Coalitions.push(currentCombo);
                            CoalitionSeats.push(currentComboSeats);
                        }
                    }
                }
            }
        }

    } else if (coalitionSize == 4) {
        for (let i = 0; i < keys.length; i++) {

            for (let j = 0; j < keys.length; j++) {

                for (let k = 0; k < keys.length; k++) {

                    for (let l = 0; l < keys.length; l++) {
                        if (keys[i] === keys[j] || keys[i] === keys[k] || keys[i] === keys[l] || keys[j] === keys[k] || keys[j] === keys[l] || keys[k] === keys[l]) {
                            continue;
                        } else if ((values[i] + values[j] + values[k] + values[l]) > majorityThreshold) {

                            let currentCombo = [keys[i], keys[j], keys[k], keys[l]].sort().join(" + ");
                            let currentComboSeats = [values[i] + values[j] + values[k] + values[l]];

                            if (Coalitions.includes(currentCombo)) {
                                continue;
                            } else {
                                Coalitions.push(currentCombo);
                                CoalitionSeats.push(currentComboSeats);
                            }
                        }
                    }
                }
            }
        }
    }

    createTablePartyCoalitions(Coalitions, CoalitionSeats, coalitionSize)
}

function createTablePartyCoalitions(coalitionName, totalSeats, coalitionSize) {

    coalitionTableEl.innerHTML = '';
    coalitionTableEl.style.display = 'block';
    let tableCaption = '';
    let captionEl = document.createElement('caption');

    if (coalitionSize == 2) {
        tableCaption = 'Possible two party coalitions';
    } else if (coalitionSize == 3) {
        tableCaption = 'Possible three party coalitions';
    } else if (coalitionSize == 4) {
        tableCaption = 'Possible four party coalitions';
    }

    captionEl.textContent = tableCaption;

    coalitionTableEl.appendChild(captionEl);

    let trElement = document.createElement('tr');

    let thElement1 = document.createElement('th');
    thElement1.textContent = 'Coalition'
    let thElement2 = document.createElement('th');
    thElement2.textContent = 'Seats'
    let thElement3 = document.createElement('th');
    thElement3.textContent = 'Percentage of all Seats'

    trElement.appendChild(thElement1);
    trElement.appendChild(thElement2);
    trElement.appendChild(thElement3);
    coalitionTableEl.appendChild(trElement);


    const tBody = document.createElement("tbody");


    for (let i = 0; i < coalitionName.length; i++) {
        const rowElement = document.createElement("tr");
        const tdElement = document.createElement("td");
        const tdElement1 = document.createElement("td");
        const tdElement2 = document.createElement("td");

        const tdElement3 = document.createElement("td");

        tdElement.textContent = coalitionName[i];
        rowElement.appendChild(tdElement);
        tdElement1.textContent = totalSeats[i];
        rowElement.appendChild(tdElement1);
        tdElement2.textContent = `${Math.round(((totalSeats[i] / 240) * 100))} %`;
        rowElement.appendChild(tdElement2);

        tdElement3.innerHTML = `<input type="submit" value="Visualize" class="VisualizeBtn" name="VisualizeBtn"></input>`
        rowElement.appendChild(tdElement3);

        tBody.appendChild(rowElement);
    }
    coalitionTableEl.appendChild(tBody);

    //draw table

    const btnArr = document.querySelectorAll('.VisualizeBtn');
    const btnLenght = btnArr.length;

    for (let index = 0; index < btnLenght; index++) {
        btnArr[index].addEventListener('click', (e) => {
            e.preventDefault();

            const tableRow = e.currentTarget.parentNode.parentNode;
            const tableRowChildren = tableRow.children;

            const coalitionName = tableRowChildren.item(0).textContent;
            const coalitionSharePercentage = tableRowChildren.item(2).textContent;

            coalitionShare = Number(coalitionSharePercentage.replace(/[%]/g, ''));

            drawPieChartCoalition(coalitionName, coalitionShare);
        })
    }

}

function drawPieChartCoalition(coalitionName, coalitionSeats) {

    chartCoalEl.innerHTML = '';
    let canvasEl = document.createElement('canvas');
    canvasEl.setAttribute('id', 'pieChartCoalition');
    chartCoalEl.appendChild(canvasEl);

    const oppositionSeats = 100 - coalitionSeats;

    var xValues = [coalitionName, "Opposition"];
    var yValues = [coalitionSeats, oppositionSeats];
    var barColors = ["blue", "red"];

    new Chart("pieChartCoalition", {
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
                text: "Coalition / Opposition seat distribution"
            }
        }
    });
}