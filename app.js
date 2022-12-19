
const toolCalcPercentage = document.getElementById('calcPercentage');
const toolCalcVoters = document.getElementById('calcAbsoluteNum');
const toolCalcSeatShare = document.getElementById('calcSeatShare')
const homeViewBtn = document.getElementById('HomeBtn');

const calcButton = document.getElementById('calcButton');
const calcButtonV = document.getElementById('calcButtonV');
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

const barrierForEntry = 4;

let currentCalc = 0;

//homeview
homeViewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearFields();
    homeView();
});

//VoteShareCalcView
toolCalcPercentage.addEventListener('click', (e) => {
    e.preventDefault();
    clearFields();
    calculatorVotingResView();
});

//AbsoluteVotersCalcView
toolCalcVoters.addEventListener('click', (e) => {
    e.preventDefault();
    clearFields();
    calculatorVoterTurnoutView();
})

//SeatsShareCalculatorView
toolCalcSeatShare.addEventListener('click', (e) => {
    e.preventDefault();
    clearFields();
    calculatorParliamentSeatsShareView();
})

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
    clearFields();

});

calculatePartyResults();

function calculatePartyResults() {
    calcButton.addEventListener('click', (e) => {
        e.preventDefault();
        wrongInput = false;

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

        if (currentCalc === 1 || currentCalc === 3) {
            // for voting results calc below
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

        } else if (currentCalc === 2) {
            const totalVoters = Number(document.getElementById("totalVoters").value);
            const voterTurnout = Number(document.getElementById("voterTurnout").value);
            const percentIneligebleBulletins = Number(document.getElementById("ineligebleBulletins").value);

            const totalEligebleVotes = (totalVoters * (voterTurnout / 100)) * (1 - (percentIneligebleBulletins / 100));
            partyResults = calculateForVoters(
                party1result, party1name,
                party2result, party2name,
                party3result, party3name,
                party4result, party4name,
                party5result, party5name,
                party6result, party6name,
                party7result, party7name,
                party8result, party8name,
                totalEligebleVotes);

            document.querySelector('.inputField').style.display = 'none';
            document.querySelector('.resultField').style.display = 'block';
            document.querySelector('.coalitionField').style.display = 'inline-flex';
            document.querySelector('.buttons').style.display = 'block';

            createTable(partyResults);
            drawPieChart(partyResults);
        }


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

    document.querySelector('.inputField').style.display = 'block';
    document.querySelector('.resultField').style.display = 'none';
    document.querySelector('.coalitionField').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    document.getElementById('chartCoalition').innerHTML = '';


    partyTableEl.innerHTML = '';
    coalitionTableEl.innerHTML = '';
    coalitionTableEl.style.display = 'none';
    chartEl.innerHTML = '';
}

function calculate(
    party1, party1name,
    party2, party2name,
    party3, party3name,
    party4, party4name,
    party5, party5name,
    party6, party6name,
    party7, party7name,
    party8, party8name) {

    let totalPercent = party1 + party2 + party3 + party4 + party5 + party6 + party7 + party8;

    if (totalPercent > 100) {
        alert('total percentage result must be equal or less than 100');
        wrongInput = true;
    } else if (totalPercent < barrierForEntry) {
        alert('at least one party must have more than 4 percent of the vote');
        wrongInput = true;
    }

    let totalValidVote = 0;
    let validPercentageArr = [party1, party2, party3, party4, party5, party6, party7, party8];
    for (let i = 0; i < validPercentageArr.length; i++) {
        if (validPercentageArr[i] < barrierForEntry && currentCalc === 1) {
            validPercentageArr[i] = 0;
        }else{
            totalValidVote += validPercentageArr[i];
        }
    }

    let parliamentResArr = [];
    const parliamentResArrLenght = 16;
    let j = 0;

    for (let i = 0; i < parliamentResArrLenght; i+=2) {
        parliamentResArr[i] = (240 * validPercentageArr[j]) / totalValidVote;
        parliamentResArr[i+1] = (parliamentResArr[i] / 240) * 100;
        j++;
    }
    j=0

    let partyResults = [
        [party1name, Math.round(parliamentResArr[0]), Math.round(parliamentResArr[1]), party1],
        [party2name, Math.round(parliamentResArr[2]), Math.round(parliamentResArr[3]), party2],
        [party3name, Math.round(parliamentResArr[4]), Math.round(parliamentResArr[5]), party3],
        [party4name, Math.round(parliamentResArr[6]), Math.round(parliamentResArr[7]), party4],
        [party5name, Math.round(parliamentResArr[8]), Math.round(parliamentResArr[9]), party5],
        [party6name, Math.round(parliamentResArr[10]), Math.round(parliamentResArr[11]), party6],
        [party7name, Math.round(parliamentResArr[12]), Math.round(parliamentResArr[13]), party7],
        [party8name, Math.round(parliamentResArr[14]), Math.round(parliamentResArr[15]), party8],
        total = totalPercent
    ];

    return partyResults
}

function calculateForVoters(
    party1, party1name,
    party2, party2name,
    party3, party3name,
    party4, party4name,
    party5, party5name,
    party6, party6name,
    party7, party7name,
    party8, party8name,
    totalEligebleVotes) {

    //needs validation for correct input

    let totalPercent = party1 + party2 + party3 + party4 + party5 + party6 + party7 + party8;

    let totalValidVote = 0;
    let validPercentageArr = [party1, party2, party3, party4, party5, party6, party7, party8];
    for (let i = 0; i < validPercentageArr.length; i++) {
        if (validPercentageArr[i] < barrierForEntry) {
            validPercentageArr[i] = 0;
        } else {
            totalValidVote += validPercentageArr[i];
        }
    }

    let parliamentResArr = [];
    const parliamentResArrLenght = 16;
    let secondIterator = 0;

    for (let i = 0; i < parliamentResArrLenght; i+=2) {
        parliamentResArr[i] = (240 * validPercentageArr[secondIterator]) / totalValidVote;
        parliamentResArr[i+1] = (parliamentResArr[i] / 240) * 100;
        secondIterator++;
    }
    secondIterator=1

    votersPerPartyArr = [];
    votersPerPartyArrLenght = 8;
    for (let index = 0; index < votersPerPartyArrLenght; index++) {
        votersPerPartyArr[index] = totalEligebleVotes*(parliamentResArr[secondIterator]/100);
        secondIterator += 2;
    }
    secondIterator=0;

    let partyResults = [
        [party1name, Math.round(parliamentResArr[0]), Math.round(parliamentResArr[1]), Math.round(votersPerPartyArr[0])],
        [party2name, Math.round(parliamentResArr[2]), Math.round(parliamentResArr[3]), Math.round(votersPerPartyArr[1])],
        [party3name, Math.round(parliamentResArr[4]), Math.round(parliamentResArr[5]), Math.round(votersPerPartyArr[2])],
        [party4name, Math.round(parliamentResArr[6]), Math.round(parliamentResArr[7]), Math.round(votersPerPartyArr[3])],
        [party5name, Math.round(parliamentResArr[8]), Math.round(parliamentResArr[9]), Math.round(votersPerPartyArr[4])],
        [party6name, Math.round(parliamentResArr[10]), Math.round(parliamentResArr[11]), Math.round(votersPerPartyArr[5])],
        [party7name, Math.round(parliamentResArr[12]), Math.round(parliamentResArr[13]), Math.round(votersPerPartyArr[6])],
        [party8name, Math.round(parliamentResArr[14]), Math.round(parliamentResArr[15]), Math.round(votersPerPartyArr[7])],
        total = totalPercent
    ];

    return partyResults;
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

        tdElement3.innerHTML = `<input type="submit" value="Visualize" class="VisualizeBtn btn" name="VisualizeBtn"></input>`
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


//views
function homeView() {
    document.getElementById('Home').style.display = 'block';
    document.getElementById('ToolCalcPercentage').style.display = 'none';
    document.getElementById('ToolCalcVoters').style.display = 'none';
    document.getElementById('ToolCalcSeatShare').style.display = 'none';
    document.querySelector('.inputField').style.display = 'none';
    currentCalc = 0;
}
function calculatorVotingResView() {
    document.getElementById('Home').style.display = 'none';
    document.getElementById('ToolCalcPercentage').style.display = 'inline';
    document.getElementById('ToolCalcSeatShare').style.display = 'none';
    document.getElementById('ToolCalcVoters').style.display = 'none';
    document.querySelector('.inputField').style.display = 'inline';
    document.getElementById('inputTurnout').style.display = 'none';
    currentCalc = 1;
}
function calculatorVoterTurnoutView() {
    document.getElementById('Home').style.display = 'none';
    document.getElementById('ToolCalcPercentage').style.display = 'none';
    document.getElementById('ToolCalcSeatShare').style.display = 'none';
    document.getElementById('ToolCalcVoters').style.display = 'inline';
    document.querySelector('.inputField').style.display = 'inline';
    document.getElementById('inputTurnout').style.display = 'inline';
    currentCalc = 2;
}
function calculatorParliamentSeatsShareView() {
    document.getElementById('Home').style.display = 'none';
    document.getElementById('ToolCalcPercentage').style.display = 'none';
    document.getElementById('ToolCalcVoters').style.display = 'none';
    document.getElementById('ToolCalcSeatShare').style.display = 'inline';
    document.querySelector('.inputField').style.display = 'inline';
    document.getElementById('inputTurnout').style.display = 'none';
    currentCalc = 3;
}