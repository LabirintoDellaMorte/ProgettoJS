$(document).ready(function(){
		
    //variabili audio
    let vinto = new Audio('sounds/win.mp3');
    let perso = new Audio('sounds/lose.mp3');
    let scelta_mario = new Audio('sounds/scelta_mario.mp3');
    let scelta_utente = new Audio('sounds/scelta_utente.mp3');
    let pari = new Audio('sounds/pareggio.mp3');

    //variabili
    let caselle = document.getElementsByTagName("td");
    let titolo = document.getElementById("titolo");
    let win = false; //variabile utilizzata per controllare se qualcuno ha gia vinto o no (usata anche nel pareggio)
    
    $('table').removeClass('fade-out');
    $('table').addClass('fade-in');

    setTimeout(function(){
        $('#tit').removeClass('fade-out');
        $('#tit').addClass('fade-in');
        setTimeout(function(){
            $('#titolo').removeClass('is-up');
            $('#titolo').addClass('came-down');
            setTimeout(function(){
                $('#reset').removeClass('is-left');
                $('#reset').addClass('came-right');

                setTimeout(function(){
                    $('#close').removeClass('is-right');
                    $('#close').addClass('came-left');
                },500)
            },1000)
        },200);
    },500)
    
    //onMouseOver per tutti i td
    for(var i=0; i<(caselle.length); i++)
    {
        caselle[i].onclick=cambioTurno;
    }

    //cambio del titolo e inserimento del segno nel posto scelto
    function cambioTurno(e)
    { 
        if(!win){
            if(e.target.innerHTML=="")
            {
                if(titolo.innerHTML=="YOUR TURN") 
                {
                    scelta_utente.play();
                    titolo.innerHTML="NOT YOUR TURN";
                    e.target.innerHTML="X";
                    $(e.target).removeClass('clickable');
                    setTimeout(turnoMario, 1000);
                }

            }

            //setTimeout(function (){ tolto senno ripeteva due volte (entrando anche dopo la vittoria dell'utente in turnoMario e viceversa)
                checkVittoria();
                checkPareggio();
            //}, 1001);
        }
    }

    function turnoMario(){ //turno di Mario
        if(!win){
            let sceltaMario = 0;
            if(titolo.innerHTML=="NOT YOUR TURN"){
                do{
                    sceltaMario = Math.floor(Math.random()*9);
                    console.log(sceltaMario);
                }while(caselle[sceltaMario].innerHTML!=""); 

                scelta_mario.play();
                caselle[sceltaMario].innerHTML="O";
                $(caselle[sceltaMario]).removeClass('clickable');
                titolo.innerHTML="YOUR TURN";

                checkVittoria();
                checkPareggio();
            }
        }
    }
    
    function checkVittoria() { //controllo condizioni di vittoria e decisione del vincitore, se presente
        win = false;
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


        if (win) {//alert per vittoria

            titolo.innerHTML="GAME ENDED";

            setTimeout(function(){
                $('#container').hide(1000, function(){ 
                        $('#container').remove(); 
                });
                if(winner == 'X'){
                    $('#result').html('YOU WON');
                    $("#imgFine").attr('src', 'imgs/win.jpg');
                    vinto.play();
                }	
            
                else {
                    $('#result').html('YOU LOST');
                    $("#imgFine").attr('src', 'imgs/troll.PNG');
                    perso.play();
                }
            },1000);
            
        }
    }

    function checkPareggio(){ 
        if(!win){
            let pareggio=true;
            for (let i=0; i<9; i++) {
                if(caselle[i].innerHTML == "")pareggio=false;
            }
            if(pareggio){
                $('#container').hide(1000, function(){ 
                        $('#container').remove(); 
                });
                titolo.innerHTML="GAME ENDED";
                setTimeout(function(){
                    $('#result').html('TIE');
                    $("#imgFine").attr('src', 'imgs/pareggio.jpg');
                    pari.play();
                },1000);
            }
        }
    }
    
    $('#reset').click(function(){
        resetTotale();
    });

    $('#close').click(function(){
        let myWindow = window.open("", "_self");
        myWindow.close();
    });

    function resetTotale() {
        location.reload();
    }
});