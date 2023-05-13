$(document).ready(function(){

    
			
    let NOB = "How many bullets?"; 	/* number-of-bullets */
    let split = NOB.split("");		/* divide la stringa lettera per lettera */			
    let time = 0;
    let active = false;
    let emptyGun = new Audio('sounds/emptyGun.mp3');
    let shot = new Audio('sounds/gunShot.mp3');

    $('#start').click(function(){
        $('#loading').addClass('spin');
        $('body').addClass('blood-splash');

        setTimeout(function(){
            $('h1').addClass('fade-out');
            $('#container2').addClass('fade-out');
            
            setTimeout(function(){
                $('#container2').remove();
                
                $('#drum').removeClass('fade-out');
                
                $('#number-of-bullets').removeClass('fade-out');

                for(let i=0; i<split.length; i++){	/* for temporizzato per non far apparire tutta le lettere insieme ma una alla volta */
                    setTimeout(function(){
                        document.getElementById('number-of-bullets').innerHTML += split[i];	
                    }, time);
                    time += 100;			
                }

            },1000)
                
        },1500)
            
    })

    $('#butt').click(function(){
        if(parseInt(document.fuoco.proiettili.value) < 7 && parseInt(document.fuoco.proiettili.value) > 0){

            $('#container1').addClass('fade-out');
            setTimeout(function(){

                $('#gun').removeClass('gun-down');
                $('#gun').addClass('extract-gun');
                $('#timer').removeClass('timer-out');
                $('#timer').addClass('timer-in');

                let timer = 3;

                let interval = setInterval(function(){
                    if(timer>=0){
                        $('#timer').html(timer);
                        timer--;
                    }
                    else{
                        clearInterval(interval);
                        spara(emptyGun, shot);
                    }
                },1000);
            }, 1000)
            
        }
    })
    active = true;
    $('#reset').click(function(){
        if(active)	location.reload();
            
    })

    $('#close').click(function(){
        if(active){
            let myWindow = window.open("", "_self");
   			myWindow.close();
        }
    })
})

function spara(emptyGun, shot){

    let giro=Math.floor(Math.random()*6)

    $('#timer').css('width', '150px');
    setTimeout(function(){
        $('#timer').addClass('fade-out');
    },200)
    
    setTimeout(function(){

        if (giro > document.fuoco.proiettili.value-1){

            $('#timer').html("Safe");
            emptyGun.play();	
        }	
        else{
            $('#timer').html("Dead");
            $('body').css('transition', 'none');
            $('body').css('background-size', '100%');
            $('body').css('background-position-x', '0');
            $('body').css('background-position-y', '-100px');
            $('body').css('background-image', 'url("imgs/overlay.png")');
            shot.play();
            
        }
        $('#timer').css('font-family', '"RussianRoulette"');
        $('#timer').css('font-size', '22pt');
        $('#timer').removeClass('fade-out');

        resetClose();
    },400)
        
}

function resetClose(){
    $('#reset').removeClass('fade-out');
    $('#close').removeClass('fade-out');
    
    /* commentato perche' non funziona, dovrebbe far apparire le immagini una da sinistra e una da destra */
    /* setTimeout(function(){
        $('#reset').removeClass('reset-is-center');
        $('#close').removeClass('close-is-center');
        $('#reset').addClass('move-left');
        $('#close').addClass('move-right');
    },300) */
}