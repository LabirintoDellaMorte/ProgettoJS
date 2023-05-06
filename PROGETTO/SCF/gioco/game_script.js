$(document).ready(function () {

    for(let i=1; i<50; i++){

        document.getElementById("space").innerHTML += "<br>";
    }                    

    //variabili
    let sceltaMario;
    let sceltaUtente;
    let punteggioMario = 0;
    let punteggioUtente = 0;

    $('.butt').click(function(){/* al click su un pulsante tutto viene sovrascritto con il risultato*/

        $('#game').remove();
    })
    
    //---------Assegno un valore alla variabile sceltaUtente in base a quello che l'utente appunto sceglie premento gli appositi bottoni----------
    $("#sasso").click(function(){
        sceltaUtente=0;
    })
    $("#carta").click(function(){
        sceltaUtente=1;
    })
    $("#forbice").click(function(){
        sceltaUtente=2;
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
        }
        else{
            if(sceltaMario == 0 && sceltaUtente == 1){
                $("#risultato").text("HAI VINTO!");
                punteggioUtente++;
            }
            else{
                if(sceltaMario == 0 && sceltaUtente == 2){
                    $("#risultato").text("HAI PERSO!");
                    punteggioMario++;
                }
                else{
                    if(sceltaMario == 1 && sceltaUtente == 0){
                        $("#risultato").text("HAI PERSO!");
                        punteggioMario++;
                    }
                    else{
                        if(sceltaMario == 1 && sceltaUtente == 2){
                            $("#risultato").text("HAI VINTO!");
                            punteggioUtente++;
                        }
                        else{
                            if(sceltaMario == 2 && sceltaUtente == 0){
                                $("#risultato").text("HAI VINTO!");
                                punteggioUtente++;
                            }
                            else{
                                if(sceltaMario == 2 && sceltaUtente == 1){
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

            location.reload(true);  /* premendo ricomincia si ricarica la pagina */                        
        })
    }
    

});