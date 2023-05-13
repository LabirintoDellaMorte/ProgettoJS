let timer = 120;

    let sottofondo = new Audio('home/sounds/home.mp3');  

    $(document).ready(function(){

        sottofondo.autoplay = true;
        sottofondo.load();

        $('img').addClass('fade-out');
        caricamento();

        $('#start-img').mouseover(function(){
            $('#start-img').animate({
                width: "450px",
                height: "250px",
            },500)
        })

        $('#start-img').mouseout(function(){
            $('#start-img').animate({
                width: "400px",
                height: "200px",
            },500)
        })

    })

    function caricamento(){
        fadeIn('#sasso');
        fadeIn('#carta');
        fadeIn('#forbice');
        timer += 200;   /* solo per fare apparire "start" con un ritardo più alto */
        fadeIn('#start-img'); 
    }

    function fadeIn(x){
            setTimeout(function(){
            $(x).css('transition', 'opacity 1s ease-in')
            $(x).removeClass('fade-out');
            $(x).addClass('fade-in');
        }, timer)

        timer += timer;
    }