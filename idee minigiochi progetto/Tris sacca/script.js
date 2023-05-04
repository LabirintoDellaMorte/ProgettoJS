let caselle = document.getElementsByTagName("td");
let header = document.getElementById("turno");
let testoModal = document.getElementById("testoModal");
let modal = document.getElementById("myModal");
let close = document.getElementById("close");
let resetButton = document.getElementById("reset");
let gioco = document.getElementById("gioco");

close.onclick = chiudi;
window.onclick = chiudiFinestra;
resetButton.onclick = resetTotale;
gira.onclick = giro;


let turn = true;
let winner = 'X';

for (let i in caselle) {
    caselle[i].addEventListener("mouseover", evidenzia);
    caselle[i].addEventListener("mouseleave", reset);
    caselle[i].addEventListener("click", click);
}


function evidenzia(e) {
    e.target.style.backgroundColor = "#282660";
}

function reset(e) {
    e.target.style.backgroundColor = "";
}

function click(e) {
    if (e.target.innerHTML !== 'O' && e.target.innerHTML !== 'X' ){
        let char;
        if (turn) {
            header.innerHTML = "Turno di: O";
            char = 'X';
        }
        else {
            header.innerHTML = "Turno di: X";
            char = 'O';
        }

        e.target.innerHTML = char;
        turn = !turn;
    }
    checkVittoria();
}


function checkVittoria() {
    let win = false;
    let simbolo = 'X';

    for (let i = 0; i<2; i++) {
        if (i === 1) simbolo = 'O';
        if (caselle[0].innerHTML === simbolo && caselle[1].innerHTML === simbolo && caselle[2].innerHTML === simbolo) {
            winner = simbolo;
            win = true;
        }
        else if (caselle[3].innerHTML === simbolo && caselle[4].innerHTML === simbolo && caselle[5].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
        else if (caselle[6].innerHTML === simbolo && caselle[7].innerHTML === simbolo && caselle[8].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
        else if (caselle[0].innerHTML === simbolo && caselle[3].innerHTML === simbolo && caselle[6].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
        else if (caselle[1].innerHTML === simbolo && caselle[4].innerHTML === simbolo && caselle[7].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
        else if (caselle[2].innerHTML === simbolo && caselle[5].innerHTML === simbolo && caselle[8].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
        else if (caselle[0].innerHTML === simbolo && caselle[4].innerHTML === simbolo && caselle[8].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
        else if (caselle[2].innerHTML === simbolo && caselle[4].innerHTML === simbolo && caselle[6].innerHTML === simbolo){
            winner = simbolo;
            win = true;
        }
    }

    if (win) {
        messaggioVittoria();
        for (let i in caselle) {
            caselle[i].removeEventListener("click", click);
        }
    }
}

function messaggioVittoria() {
    testoModal.innerHTML = "VITTORIA DI " + winner + "!";
    modal.style.display = "block";
}

function chiudi() {
    modal.style.display = "none";
}

function chiudiFinestra(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function resetTotale() {
    for (let i in caselle) {
        caselle[i].innerHTML = "";
    }
    turn = true;
    for (let i in caselle) {
        caselle[i].addEventListener("click", click);
    }
}