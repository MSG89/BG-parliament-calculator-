
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

    let partyResults = calculate(gerbResult, itnResult, dbResult, vazrazhdaneResult, bgvazhodResult, ppResult, dps);
    
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
        itnSeats:(240*Number(party2))/100,
        dbSeats:(240*Number(party3))/100,
        vazrazhdaneSeats:(240*Number(party4))/100,
        bgvazhodSeats:(240*Number(party5))/100,
        ppSeats:(240*Number(party6))/100,
        dpsSeats:(240*Number(party7))/100,
        total: totalPercent
    };

    return partyResults
}



