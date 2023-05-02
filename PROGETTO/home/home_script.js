$(document).ready(function(){

    const container = document.getElementById('container');

    const wCells = 10;
    const hCells = 6;
    const imgS = 160;
    const imgB = 11;

    $('body').css('background-image', 'url("immaginiSfondo/background' + Math.floor(Math.random() * imgB + 1) + '.jpg")');  /* è fuori dal .ready per impostare lo sfondo prima che appaiano le immagini */

    $(document).ready(function () {

      sizeDiv();
      riempiDiv();

      setTimeout(function () {

        document.getElementById('start-img').classList.remove('fade-out');
        document.getElementById('start-img').classList.add('fade-in');
      }, 1300);



      $(window).resize(function () {
        sizeDiv();
      });
    });

    function riempiDiv() {

      for (let i = 0; i < hCells; i++) {

        const row = document.createElement('div');
        row.classList.add('row'); /* aggiunge all'elemento puntato dalla costante "row" la classe "row*/
        container.appendChild(row); /* rende l'elemento puntato dalla costante "row" figlio dell'elemento "container" */

        for (let j = 0; j < wCells; j++) {
          const rand = Math.floor(Math.random() * imgS + 1);  /* genera un numero da 1 a quante immagini abbiamo */
          const img = document.createElement('img');  /* genera un nuovo elemento di tipo "img" */
          img.src = `immagini/${rand}.jpg`; /* decide la src dell'immagine appena creata */
          img.classList.add('imgSF'); /* la classe "imgSF" è utilizzata unicamente per distinguere le immagini di sfondo dal pulsante */

          img.classList.add('fade-out');
          row.appendChild(img);

          img.addEventListener('load', function () {

            const delay = Math.floor(Math.random() * 1200 + 1);

            setTimeout(function () {

              img.classList.remove('fade-out');
              img.classList.add('fade-in');

            }, delay);
          });
        }
      }
      sizeDiv();
    }

    function sizeDiv() {

      $('#container').width(window.innerWidth);
      $('#container').height(window.innerHeight);
      $('.imgSF').width(window.innerWidth / wCells);
      $('.imgSF').height(window.innerHeight / hCells);
    }
});

