$(document).ready(function(){

    let bar = new Audio('sounds/metalPipe.mp3');
    let sottofondo = new Audio('sounds/TheEncounter.mp3');

    //se l'utente preme il bottone del volume parte musica di sottofondo
    let acceso = false;
    $("#volume").click(function(){
        if(!acceso){
            sottofondo.play();
            sottofondo.loop = true;
            $("#volume").attr('src', 'on.jpg');
            acceso = true;
        }
        
        else {
            sottofondo.pause();
            $("#volume").attr('src', 'off.jpg');
            acceso = false;
        }
    })
    
    // seleziona il tag body
    const body = document.getElementById("pagina");

    // funzione per aggiornare la dimensione dello sfondo del body
    function updateBackgroundSize() {
        // imposta la dimensione dello sfondo uguale a quella della finestra
        body.style.backgroundSize = window.innerWidth + "px " + window.innerHeight + "px";
    }

    // aggiorna la dimensione dello sfondo al caricamento della pagina
    updateBackgroundSize();

    // aggiorna la dimensione dello sfondo al ridimensionamento della finestra
    window.addEventListener("resize", updateBackgroundSize);

	let colors=["tomato","chocolate","limegreen","crimson","darkslategray",
    "aliceblue","mediumslateblue","cornflowerblue","darkorchid","darkkhaki","coral",
    "darkolivegreen","cadetblue"];
    let startPressed = false;
    let schiacciato = false;
    let startTime=new Date();

    $("#start").click(startit);
    $("#stop").click(stop);

    function startit()
    {
        if(startPressed)
        {
            alert("Hai gia iniziato. Premi stop per fermare");
        }
        else
        {
            startPressed=true; 
            timerID=setTimeout(start(), 2000);
        }
    }

    function start(){
        
        schiacciato = true;

        let tempoComparsa = Math.floor((Math.random()*6000)+300);
        let timeOut = setTimeout(randomColor, tempoComparsa);
    }

    function stop(){
        if(schiacciato) 
        {
            let endTime=new Date();
            var tempoDiRisposta=(endTime.getTime()-startTime.getTime())/1000;

            alert("Il tuo tempo di risposta e' : " + tempoDiRisposta + " secondi " + "\n" + remark(tempoDiRisposta));
            schiacciato=false;
            startPressed=false;

            $("#stop").css("backgroundColor", "");
        }
        else{
            if (!startPressed)
            {
                alert("Devi prima premere start per iniziare il test!");
            }
            else
            {       
                startPressed=false;             
                alert("Barone! Hai schiacciato troppo presto!");
            }          
        }
    }

    function randomColor(){
        sottofondo.pause();
        bar.play();
        if(acceso){
            setTimeout(function () {
                sottofondo.play();
            }, 3000);
        }

        $("#stop").css("backgroundColor", colors[Math.floor((Math.random()*13))]);
        startTime=new Date();
    }

    function remark(e){
        var risposta="";
        if (e < 0.10)
            risposta="CAMPIONE MONDIALE!";
        if (e >= 0.10 && e < 0.20)
            risposta="IL MIGLIORE!";
        if (e >=0.20 && e < 0.30)
            risposta="FORTISSIMO";
        if (e >=0.30 && e < 0.60)
            risposta="Puoi fare meglio!";
        if (e >=0.60 && e < 1)
            risposta="Hai bevuto?";
        if (e >=1)
            risposta="Ti sei addormentato?";

        return risposta;
    }   

});

