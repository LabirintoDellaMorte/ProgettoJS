$(document).ready(function () {

    for(let i=1; i<50; i++){

        document.getElementById("space").innerHTML += "<br>";
    }               
    
    /* appare il body */
    $('body').removeClass('fade-out');

    //variabili audio
    let forbici = new Audio('sounds/forbici.mp3');
    let pareggio = new Audio('sounds/pareggio.mp3');
    let sasso = new Audio('sounds/sasso.mp3');
    let carta = new Audio('sounds/carta.mp3');
    let forbice_carta = new Audio('sounds/forbice_carta.mp3');
    let carta_sasso = new Audio('sounds/carta_sasso.mp3');
    let sasso_forbice = new Audio('sounds/sasso_forbice.mp3');

    //variabili
    let sceltaMario;
    let sceltaUtente;
    let punteggioMario = 0;
    let punteggioUtente = 0;

    $('.butt').click(function(){/* al click su un pulsante tutto viene sovrascritto con il risultato*/

    $('#game').addClass('fade-out');

        setTimeout( function(){
            $('#game').remove();
            $('#result').removeClass('fade-out');
        },1500) 
    })
    
    //---------Assegno un valore alla variabile sceltaUtente in base a quello che l'utente appunto sceglie premento gli appositi bottoni 0=sasso, 1=carta, 2=forbici----------
    $("#sasso").click(function(){
        sceltaUtente=0;
        sasso.play();
    })
    $("#carta").click(function(){
        sceltaUtente=1;
        carta.play();
    })
    $("#forbice").click(function(){
        sceltaUtente=2;
        forbici.play();
    })

    //--------------------Scrivo sullo schermo quello che ha scelto mario in base al numero estratto casualmente tra 0,1,2------------------------
    $(".butt").click(function(){
        sceltaMario = Math.floor((Math.random()*3));                    
        scrivi(sceltaMario, "sceltaMario");

        scrivi(sceltaUtente, "sceltaUtente");
        risultato();
    });
    
    function scrivi(scelta, player){
        if(scelta == 0){
            $("#" + player).attr('src', 'butt/s.png');
        }
        else{
            if(scelta == 1){
                $("#" + player).attr('src', 'butt/c.png');
            }
            else{
                if(scelta == 2){
                    $("#" + player).attr('src', 'butt/f.png');
                }
            }
        }
    }
    //--------------------------Determino chi ha vinto in base al valore delle due variabili che ho dichiarato all'inizio------------------------
    function risultato(){
        if(sceltaMario == sceltaUtente){
            $("#risultato").text("PAREGGIO!");
            setTimeout( function(){
                pareggio.play();
            },1500);
        }
        else{
            if(sceltaMario == 0 && sceltaUtente == 1){
                $("#risultato").text("HAI VINTO!");
                punteggioUtente++;
                setTimeout( function(){
                    carta_sasso.play();
                },1500); 
            }
            else{
                if(sceltaMario == 0 && sceltaUtente == 2){
                    $("#risultato").text("HAI PERSO!");
                    punteggioMario++;
                    setTimeout( function(){
                        sasso_forbice.play();
                    },1500);
                }
                else{
                    if(sceltaMario == 1 && sceltaUtente == 0){
                        $("#risultato").text("HAI PERSO!");
                        punteggioMario++;
                        setTimeout( function(){
                            carta_sasso.play();
                        },1500); 
                    }
                    else{
                        if(sceltaMario == 1 && sceltaUtente == 2){
                            setTimeout( function(){
                                forbice_carta.play();
                            },1500) 
                            
                            $("#risultato").text("HAI VINTO!");
                            punteggioUtente++;
                        }
                        else{
                            if(sceltaMario == 2 && sceltaUtente == 0){
                                $("#risultato").text("HAI VINTO!");
                                punteggioUtente++;
                                setTimeout( function(){
                                    sasso_forbice.play();
                                },1500);
                            }
                            else{
                                if(sceltaMario == 2 && sceltaUtente == 1){
                                    setTimeout( function(){
                                        forbice_carta.play();
                                    },1500) 
                                    $("#risultato").text("HAI PERSO!");
                                    punteggioMario++;
                                }
                            }
                        }
                    }
                }
            }
        }
                            
        $("#reset").click(function(){

            $('body').addClass('fade-out');

            setTimeout(function(){
                location.reload(true);  /* premendo ricomincia si ricarica la pagina */
            },1500)
                                        
        })

        $('#close').click(function(){
            close();
        })
    }
    

});