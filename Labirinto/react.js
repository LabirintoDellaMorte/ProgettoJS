        /*
            Benevenuti nel programma principale del labirinto di Bonini Federico, Caprari Filippo e Marco Lanzafame.
            Nel codice troverete svariati commenti per aiutarvi nella comprensione di una proprietà html/js da noi mai vista in classe: il canvas.
            Inoltre ci saranno piccole parti commentate relative a come avevamo pensato di gestire l'eliminazione dei nemici una volta colpiti (per obbligare il giocatore a percorrere tutto il labirinto).
            Ci dispiace di non essere riusciti ad implementare quest'ultima funzione a causa del tempo.
            Detto questo speriamo vi piaccia, cordiali saluti
        */ 
        
        
        
        //Variabile globale grandezza blocchi
        var blockSize = 40;
        
        //Inizializzazione canvas standard
        var canvas = document.getElementById("canvas");
        c = canvas.getContext("2d");

        //Dichiarazione immagini
        const image_wall = new Image();
        image_wall.src = "WallTile.png";

        const image_player = new Image();
        image_player.src = "Player.png";

        const image_enemy = new Image();
        image_enemy.src = "Enemy.png";

        const image_win = new Image();
        image_win.src = "Win.png";

        var miniGiochi = ["RR", "Tris", "RIFLESSI", "Memory", "SCF"];

        //Creiamo un oggetto 'object', con sue proprietà e funzioni
        function object (image, x, y, width, height) {
            
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.image = image;

            this.update = function() {

                this.draw();
            }

            this.draw = function () {

                c.drawImage(image, x, y, width, height);
            }
        }
        
        //Matrici da cui creeremo i labirinti
        let maze1 = [
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, -1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, -2, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        let maze2 = [
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, -1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, -1, 1, 1, -2, 1, 1, -1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ];

        let maze3 = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        
        //Scelta casuale fra le tre matrici
        var randomIndex = Math.floor(Math.random() * 3); // Genera 0, 1 o 2
        var maze;

        if (randomIndex === 0) {
            maze = maze1;
        } else if (randomIndex === 1) {
            maze = maze2;
        } else {
            maze = maze3;
        }


        // Settaggio posizione iniziale player
        var player = {
        x: 0,
        y: 0
        };

        //Variabili che utilizzerò nel programma per salvarmi la posizione del player precedente ad un movimento
        var playerY_now,
            playerX_now;

        //Array che salveranno ogni muro, nemico ecc..., mi serve salvarli per controllare le eventuali collisioni con il player
        var wall=[], enemy=[], win=[], player_;


        //var xEnemies=[];
        //var yEnemies=[];
        //var enemyRemoved=[false, false, false, false, false];


        function drawMaze() {
            
            var innerWidth = 1070,
            innerHeight = 727;
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        
        //Scorriamo la matrice e in base agli 1, -1, 0 e -2 ci salviamo nei rispettivi vettori gli oggetti che poi disegneremo 
        for (var y = 0; y<maze.length; y++) {
            for (var x=0; x<maze[y].length; x++) {

                if (maze[y][x] === 1) {

                    wall.push(new object(image_wall, x*blockSize, y*blockSize, blockSize, blockSize));
                }
                else if (maze[y][x] === -1) {
                    
                    //This can rapresent the enemy
                    //xEnemies.push(x);
                    //yEnemies.push(y);
                    enemy.push(new object(image_enemy, x*blockSize, y*blockSize, blockSize, blockSize));
                }
                else if (maze[y][x] === -2) {

                    win.push(new object(image_win, x*blockSize, y*blockSize, blockSize, blockSize));
                }
            }
        }

        //Aggiorna e disegna tutti gli oggetti nell'array walls
        function updateWalls() {
            for (var i=0; i<wall.length; i++) {
                wall[i].update();
            }
        }
        
        //Aggiorna e disegna tutti gli oggetti nell'array enemies
        function updateEnemies() {
            for (var i=0; i<enemy.length; i++) {
                enemy[i].update();
            }
        }
        
        //Aggiorna e disegna tutti gli oggetti nell'array wins
        function updateWins() {
            for (var i=0; i<win.length; i++) {
                win[i].update();
            }
        }
        
        //Aggiorna e disegna tutto
        function update() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            updateWalls();
            /*for (var i=0; i<5; i++) {
                if (enemyRemoved[i]==true) {
                    //deleteEnemy(enemy[i], xEnemies[i], yEnemies[i]);
                    enemy.splice(i, 1);
                }
            }*/
            updateEnemies();
            updateWins();
            drawPlayer();
            player_.update();
        }

        //Chiamata alla funzione di aggiornamento
        update();
    }

        // Controlliamo sempre che l'utente si sposti
        document.addEventListener("keydown", function(event) {

        playerY_now = player.y;
        playerX_now = player.x;

        switch (event.key) {
            case "ArrowUp": 
            player.y -= 20;
            break;
            case "ArrowDown":
            player.y += 20;
            break;
            case "ArrowLeft":
            player.x -= 20;
            break;
            case "ArrowRight":
            player.x += 20;
            break;
        }

        //Limiti confini canvas e gestione
        if (player.x<0) player.x = 0;
        if (player.y<0) player.y = 0;
        if (player.x>1150) player.x = playerX_now;
        if (player.y>650) player.y = playerY_now;

        //Nel caso non ci siano collisioni ridisegno solo il player
        drawPlayer();
        player_.update();

        //In caso di collisioni ridisegno sia il player che il labirinto
        if (checkCollisionWall(player_, wall, "Hai scontrato un muro, attento!") == true) {
            //Nelle collisioni il player non deve "invadere" l'area degli altri blocchi
            player.x = playerX_now;
            player.y = playerY_now;
            drawMaze();
        };
        if (checkCollisionEnemy(player_, enemy, "Hai scontrato un nemico, ora gioca Fillo conta su di te!") == true) {
            player.x = playerX_now;
            player.y = playerY_now;
            drawMaze();
        };
        
        if (checkCollisionWin(player_, win, "HAI RAGGIUNTO L'USCITA, FILLO HA RECUPERATO!") == true) {
            player.x = playerX_now;
            player.y = playerY_now;
            drawMaze();
            player_.update();
        };
        });

        // Cancella dove era precedentemente disegnato il player e lo disegna nella nuova posizione
        function drawPlayer() {
            c.clearRect(playerX_now, playerY_now, blockSize, blockSize);
            player_ = new object(image_player,player.x, player.y, blockSize, blockSize);
        }

        //Funzione che returna true in caso di scontro tra due object
        function collides(a, b) {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height &&
        a.y + a.height > b.y;
        }

        //Le seguenti funzioni servono per controllare se ci sono collisioni tra il player e gli altri elementi del canvas, e in tal caso si gestisce la situazione di conseguenza
        function checkCollisionEnemy(player_, wall, message) {
            for (var i=0; i<wall.length; i++) {
                if (collides(player_, wall[i])) {

                    var t = i;

                    // Crea l'elemento audio
                    const audio = new Audio('Enemy.mp3');
                    // Avvia la riproduzione
                    audio.play();
                
                //dichiariamo e creiamo nel document l'elemento div che farà da alert personalizzato
                var alertDiv = document.createElement('div');
                alertDiv.innerHTML = message;

                //Variabile per tenerci salvato se l'alert è aperto
                var dialogOpen = true;

                // Aggiunge il CSS per lo stile dell'alert
                alertDiv.style.padding = '10px';
                alertDiv.style.height = '60px';
                alertDiv.style.width = '500px';
                alertDiv.style.border = '1px solid #ccc';
                alertDiv.style.borderRadius = '5px';
                alertDiv.style.backgroundColor = 'antiquewhite';
                alertDiv.style.fontFamily = 'Arcade1';
                alertDiv.style.position = 'fixed';
                alertDiv.style.top = '5%';
                alertDiv.style.right = '31%';
                alertDiv.style.zIndex = '9999';
                alertDiv.style.animation = 'slideIn 1s ease-in-out forwards';
                alertDiv.style.display = 'flex'; // Abilita il layout Flexbox
                alertDiv.style.flexDirection = 'column'; // Imposta la direzione del layout Flexbox
                // Crea un pulsante OK per l'alert
                const okButton = document.createElement('button');
                okButton.style.fontFamily = 'Arcade';
                okButton.innerText = 'OK';
                okButton.style.marginTop = '10px';
                okButton.style.alignSelf = 'center';
                //Immagine di fillo pazzo mentale
                var img_fillo = document.createElement('img');
                img_fillo.src="FilloPazzo.png";

                //Gestione ridirect alle pagine dei minigiochi, mai una uguale e mai due volte
                var randomNumber = Math.floor(Math.random() * 5);
                var i=0;
                while (miniGiochi[randomNumber]==null && i<7) {
                    var randomNumber = Math.floor(Math.random() * 5);
                    
                }
                if (i<5)    {
                    i++;
                    var redirect = "../PROGETTO/" + miniGiochi[randomNumber] + "/" + miniGiochi[randomNumber] + ".html";
                    miniGiochi.splice(randomNumber, 1);
                }
                else {
                    alertDiv.innerHTML = "FURBACCHIONE!, hai già giocato tutti i minigiochi. Se non sai cosa fare picchia Denti";
                    alertDiv.style.height = '80px';
                    img_fillo.src="MarcoPazzo.png";
                    img_fillo.style.marginTop = "-100px";
                }

                // Aggiungo l'evento di invio per il pulsante OK
                document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' && dialogOpen == true) {
                    if (i<6) {
                        window.open (redirect); // Reindirizza ad un gioco dopo la pressione del pulsante OK
                    }
                    
                    // Chiudi l'alert
                    alertDiv.remove();
                    okButton.remove();
                    img_fillo.remove();
                    dialogOpen = false;
                    //maze[yEnemies[t]][xEnemies[t]] = 0;
                    /*deleteEnemy(wall[t], xEnemies[t], yEnemies[t]);
                    enemyRemoved[t] = true;*/
                }
                });
                // Aggiungo l'evento di clic per il pulsante OK
                okButton.addEventListener('click', function() {
                    if (i<6) {
                        window.open (redirect); // Reindirizza ad un gioco dopo la pressione del pulsante OK
                    }

                alertDiv.remove(); // Rimuove l'elemento alertDiv
                okButton.remove(); // Rimuove il pulsante okButton
                img_fillo.remove(); //Rimuove l'immagine
                dialogOpen = false;
                //maze[yEnemies[t]][xEnemies[t]] = 0;
                //deleteEnemy(wall[t], xEnemies[t], yEnemies[t]);
                //enemyRemoved[t] = true;
                });
                // Aggiunge il pulsante OK e l'immagine all'alert personalizzato
                alertDiv.appendChild(okButton);
                alertDiv.appendChild(img_fillo);
                // Aggiunge l'alert personalizzato al body del documento
                document.body.appendChild(alertDiv);

                return true;
                }
            }
            return false;
        }

        function checkCollisionWall(player_, wall, message) {
            for (var i=0; i<wall.length; i++) {
                if (collides(player_, wall[i])) {

                    // Crea l'elemento audio
                    const audio = new Audio('Dang.mp3');
                    // Avvia la riproduzione
                    audio.play();
                    
                const alertDiv = document.createElement('div');
                alertDiv.innerHTML = message;

                // Aggiunge il CSS per lo stile dell'alert
                alertDiv.style.padding = '10px';
                alertDiv.style.height = '60px';
                alertDiv.style.width = '500px';
                alertDiv.style.border = '1px solid #ccc';
                alertDiv.style.borderRadius = '5px';
                alertDiv.style.backgroundColor = 'antiquewhite';
                alertDiv.style.fontFamily = 'Arcade1';
                alertDiv.style.position = 'fixed';
                alertDiv.style.top = '5%';
                alertDiv.style.right = '31%';
                alertDiv.style.zIndex = '9999';
                alertDiv.style.animation = 'slideIn 1s ease-in-out forwards';
                alertDiv.style.display = 'flex'; // Abilita il layout Flexbox
                alertDiv.style.flexDirection = 'column'; // Imposta la direzione del layout Flexbox
                // Crea un pulsante OK per l'alert
                const okButton = document.createElement('button');
                okButton.style.fontFamily = 'Arcade';
                okButton.innerText = 'OK';
                okButton.style.marginTop = '10px';
                okButton.style.alignSelf = 'center';
                //Immagine di fillo pazzo mentale
                const img_fillo = document.createElement('img');
                img_fillo.src="FilloPazzo.png";
                img_fillo.style.marginTop = '16px';
               // Aggiungo l'evento di invio per il pulsante OK
                document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    // Chiudi l'alert
                    alertDiv.remove();
                    okButton.remove();
                    img_fillo.remove();
                }
                });
                // Aggiungo l'evento di clic per il pulsante OK
                okButton.addEventListener('click', function() {
                    alertDiv.remove(); // Rimuove l'elemento alertDiv
                    okButton.remove(); // Rimuove il pulsante okButton
                    img_fillo.remove();
                });
                // Aggiunge il pulsante OK e l'img all'alert personalizzato
                alertDiv.appendChild(okButton);
                alertDiv.appendChild(img_fillo);
                // Aggiunge l'alert personalizzato al body del documento
                document.body.appendChild(alertDiv);

                return true;
                }
            }
            return false;
        }

        function checkCollisionWin(player_, wall, message) {
            for (var i=0; i<wall.length; i++) {
                if (collides(player_, wall[i])) {

                    // Crea l'elemento audio
                    let audio = new Audio('Vittoria.mp3');
                    // Avvia la riproduzione
                    audio.play();

                    //Variabile per salvare se l'alert è aperto
                    var dialog = true;
                    
                const alertDiv = document.createElement('div');
                alertDiv.innerHTML = message;

               // Aggiunge il CSS per lo stile dell'alert
               alertDiv.style.padding = '10px';
                alertDiv.style.height = '60px';
                alertDiv.style.width = '500px';
                alertDiv.style.border = '1px solid #ccc';
                alertDiv.style.borderRadius = '5px';
                alertDiv.style.backgroundColor = '#98FF98';
                alertDiv.style.fontFamily = 'Arcade1';
                alertDiv.style.position = 'fixed';
                alertDiv.style.top = '5%';
                alertDiv.style.right = '31%';
                alertDiv.style.zIndex = '9999';
                alertDiv.style.animation = 'slideIn 1s ease-in-out forwards';
                alertDiv.style.display = 'flex'; // Abilita il layout Flexbox
                alertDiv.style.flexDirection = 'column'; // Imposta la direzione del layout Flexbox
                //Immagine di fillo pazzo mentale
                const img_fillo = document.createElement('img');
                img_fillo.src="Fillo_win.png";
                img_fillo.style.marginTop = '28px';
                // Crea un pulsante OK per l'alert
                const okButton = document.createElement('button');
                okButton.style.fontFamily = 'Arcade';
                okButton.innerText = 'OK';
                okButton.style.marginTop = '10px';
                okButton.style.alignSelf = 'center';

                //Gestione uscita, non si può uscire se non si ha giocato ogni minigioco
                var randomNumber = Math.floor(Math.random() * 5);
                var i=0;
                while (miniGiochi[randomNumber]==null && i<7) {
                    var randomNumber = Math.floor(Math.random() * 5);
                    i++;
                }
                if (i<6)    {
                    alertDiv.innerHTML="Hai provato ad uscire dal labirinto senza completare i giochi, guardati le spalle";
                    alertDiv.style.backgroundColor="#03342e";
                    alertDiv.style.color="white";
                    alertDiv.style.height = "80px";
                    audio.pause();
                    audio = new Audio ("Scary.mp3");
                    audio.play();
                }

                // Aggiungo l'evento di invio per il pulsante OK
                document.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' && dialog == true) {
                    if (i>6) { 
                        window.open("../PROGETTO/home/HOME_ani.html");
                        close();
                    }
                    // Chiudo l'alert
                    alertDiv.remove();
                    okButton.remove();
                    img_fillo.remove();
                    dialog = false;
                }
                });
                // Aggiungo l'evento di clic per il pulsante OK
                okButton.addEventListener('click', function() {
                    window.open("../PROGETTO/home/HOME_ani.html");
                    //Chiudo l'alert
                    alertDiv.remove();
                    okButton.remove();
                    img_fillo.remove();
                    dialog = false;
                });
                // Aggiunge il pulsante OK all'alert personalizzato
                alertDiv.appendChild(okButton);
                alertDiv.appendChild(img_fillo);
                // Aggiunge l'alert personalizzato al body del documento
                document.body.appendChild(alertDiv);

                return true;
                }
            }
            return false;
        }

        /*
        function deleteEnemy (enemy, xEnemy, yEnemy) {
            c.clearRect(xEnemy, yEnemy, blockSize, blockSize);
        }*/