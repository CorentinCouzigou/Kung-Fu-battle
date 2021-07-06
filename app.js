var app = {
    board: {
        x: 0,
        y: 0
    },
    countEvent: 0,
    player1: {
        pv: 30,
        attaque: 2,
        defense: 2,
        x: 0,
        y: 0,
        direction: 'none',
        skin: 'none'
    },
    player2: {
        pv: 30,
        attaque: 2,
        defense: 2,
        x: 0,
        y: 0,
        direction: 'none',
        skin: 'none'
    },
    fireball: {
        x: 0,
        y: 0,
        active:'no'
    },
    iceball:{
        x:0,
        y:0,
        active:'no'
    },
    target: {
        x: 0,
        y: 0,

    },
    target2: {
        x: 0,
        y: 0
    },
    target3:{
        x:0,
        y:0
    },
    init: function () {
        console.log('init');
        app.board.x = 14;
        app.board.y = 10;
        app.target.x = app.randomFunctionX(0, app.board.x - 1);
        app.target.y = app.randomFunctionY(0, app.board.y - 1);
        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
        app.player2.x = app.board.x - 1;
        app.player2.y = app.board.y - 1;
        app.drawBoard();
        app.allListener();
    },
    randomFunctionX(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomFunctionY(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    removeBoard() {
        app.cleanbord();
        app.drawBoard();
    },
    //création du plateau de jeu
    fireballFunction() {
        if (app.player1.skin === 'fire') {
            app.fireball.x = app.player1.x;
            app.fireball.y = app.player1.y;            
        };
        if (app.player2.skin === 'fire') {
            app.fireball.x = app.player2.x;
            app.fireball.y = app.player2.y;
        }
    },
    iceballFunction () {
        if (app.player1.skin === 'water') {
            app.iceball.x = app.player1.x;
            app.iceball.y = app.player1.y;            
        };
        if (app.player2.skin === 'water') {
            app.iceball.x = app.player2.x;
            app.iceball.y = app.player2.y;
        }
    },
    drawBoard() {
        
        const board = document.querySelector('#board');
        for (let y = 0; y < app.board.y; y++) {
            const row = document.createElement('div');
            row.classList.add('cellRow');
            board.append(row);
            for (let x = 0; x < app.board.x; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (x == app.player1.x && y == app.player1.y) {
                    cell.classList.add('cellCurrent', 'player1');
                    switch (app.player1.skin) {
                        case 'fire':
                            cell.classList.add('fire');
                            break;
                        case 'water':
                            cell.classList.add('water');
                            break;
                        case 'earth':
                            cell.classList.add('earth');
                            break;
                        case 'win':
                            cell.classList.add('win');
                            break;
                    }
                   
                }

                if (x === app.target.x && y === app.target.y) {
                    cell.classList.add('target1');
                }
                if (x === app.target2.x && y === app.target2.y) {
                    cell.classList.add('target2')
                }
                if (x === app.target3.x && y === app.target3.y) {
                    cell.classList.add('target3');
                }

                if (x == app.player2.x && y == app.player2.y) {
                    cell.classList.add('cellCurrent', 'player2');
                    switch (app.player2.skin) {
                        case 'fire':
                            cell.classList.add('fire');
                            break;
                        case 'water':
                            cell.classList.add('water');
                            break;
                        case 'earth':
                            cell.classList.add('earth');
                            break;
                        case 'win':
                            cell.classList.add('win');
                            break;
                    }

                }
                if ((x === app.fireball.x) && (y === app.fireball.y)) {
                    cell.classList.add('ballhidden');
                    if(app.fireball.active === 'yes'){
                        cell.classList.add('fireball');                        
                    }
                }
                if ((x === app.iceball.x) && (y === app.iceball.y)) {
                    cell.classList.add('ballhidden');
                    if(app.iceball.active === 'yes'){
                        cell.classList.add('iceball');                        
                    }
                }
                row.append(cell);
            }
        }
        // Valeurs du player 1
        const player1Pv = document.querySelector('.pvPlayer1')
        player1Pv.textContent = `Pv: ${app.player1.pv}`;
        const player1Attaque = document.querySelector('.attPlayer1')
        player1Attaque.textContent = `Attaque: ${app.player1.attaque}`;
        const player1Defense = document.querySelector('.defPlayer1')
        player1Defense.textContent = `Défense: ${app.player1.defense}`;
        //Valeurs du player 2
        const player2Pv = document.querySelector('.pvPlayer2')
        player2Pv.textContent = `Pv: ${app.player2.pv}`;
        const player2Attaque = document.querySelector('.attPlayer2')
        player2Attaque.textContent = `Attaque: ${app.player2.attaque}`;
        const player2Defense = document.querySelector('.defPlayer2')
        player2Defense.textContent = `Défense: ${app.player2.defense}`;


    },

    //ajout de tous les écouteurs d'evenements
    allListener() {
        document.addEventListener('keyup', app.moveForward);
        const buttonSelection = document.querySelectorAll('.buttonSelection');
        for (let button of buttonSelection) {
            button.addEventListener('click', app.closeModal)
        }
    },

    closeModal(event) {
        console.log(event.currentTarget.value)
        app.countEvent++
        if (app.countEvent === 1) {
            const playerSelection = document.querySelector('.playerSelection');
            playerSelection.textContent = "Choose your character for the Player2";
            event.currentTarget.classList.add('displayNone');
            app.player1.skin = event.currentTarget.value;
            switch (event.currentTarget.value){
                case ('fire'):
                app.fireballFunction();
                case ('water'):
                app.waterballFunction();
            }
            

            const buttonSelection = document.querySelectorAll('.buttonSelection');
            for (let button of buttonSelection) {
                button.addEventListener('click', app.closeModal)
            }
        }
        if (app.countEvent === 2) {
            app.player2.skin = event.currentTarget.value;
            switch (event.currentTarget.value){
                case ('fire'):
                app.fireballFunction();
                case ('water'):
                app.waterballFunction();
            }
            const modal = document.querySelector('#modalContainer');
            modal.classList.add('displayNone');
            app.removeBoard();
        }
    },

    moveForward(event) {
        const data = event.code;
        console.log(event.code);
        if (data === 'ArrowRight' || data === 'ArrowLeft' || data === 'ArrowUp' || data === 'ArrowDown') {
            app.turn(data);
        }
        if (data === 'KeyD' || data === 'KeyA' || data === 'KeyW' || data === 'KeyS') {
            app.turn(data);
        }
        if (data === 'KeyB') {
            if (app.player2.skin === 'fire'){
            switch (app.player2.direction) {
            
                case 'right':
                    app.fireball.x++;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player2.attaque;
                        console.log('pvp', finalresult);
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player2 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');

                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                        app.removeBoard();
                    }
                    app.removeBoard();

                    break;
                    case 'left':
                    app.fireball.x--;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player2.attaque;
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player1 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');

                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');

                        app.removeBoard();
                    }
                    app.removeBoard();

                    break;
                    case 'top':
                    app.fireball.y--;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player1.attaque;
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player2 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');

                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
    
                        app.removeBoard();
                    }
                    app.removeBoard();
  
                    break;
                    case 'bottom':
                    app.fireball.y++;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player2.attaque;
                        console.log('pvp', finalresult);
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player2 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
  
                        app.removeBoard();
                    }
                    app.removeBoard();
                    break;
            }
        }
        if (app.player2.skin === 'water'){
            switch (app.player2.direction) {
                case 'right':
                    app.iceball.x++;
                    app.iceball.active = 'yes';
                    if (app.iceball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player2.attaque;
                        console.log('pvp', finalresult);
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player2 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.iceball.x === app.board.x) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');

                        app.removeBoard();
                    }
                    if (app.iceball.x < 0) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');
                        app.removeBoard();
                    }
                    app.removeBoard();

                    break;
                    case 'left':
                    app.iceball.x--;
                    app.iceball.active = 'yes';
                    if (app.iceball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player2.attaque;
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player1 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.iceball.x === app.board.x) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');

                        app.removeBoard();
                    }
                    if (app.iceball.x < 0) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');

                        app.removeBoard();
                    }
                    app.removeBoard();

                    break;
                    case 'top':
                    app.iceball.y--;
                    app.iceball.active = 'yes';
                    if (app.iceball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player1.attaque;
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player2 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.iceball.x === app.board.x) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');

                        app.removeBoard();
                    }
                    if (app.iceball.x < 0) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');
    
                        app.removeBoard();
                    }
                    app.removeBoard();
  
                    break;
                    case 'bottom':
                    app.iceball.y++;
                    app.iceball.active = 'yes';
                    if (app.iceball.x === app.player1.x) {
                        let result = app.player1.pv + app.player1.defense ;
                        let finalresult = result - app.player2.attaque;
                        console.log('pvp', finalresult);
                        app.player1.pv = finalresult;
                        if (app.player1.pv === 0) {
                            alert('Player2 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.iceball.x === app.board.x) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');
                        app.removeBoard();
                    }
                    if (app.iceball.x < 0) {
                        let iceball = document.querySelector('.iceball');
                        iceball.classList.remove('.iceball');
  
                        app.removeBoard();
                    }
                    app.removeBoard();
                    break;
            }
    }
        if (data === 'Numpad2') {
            if (app.player1.skin === 'fire'){
            switch (app.player1.direction) {
                case 'right':
                    app.fireball.x++;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player2.x) {
                        let result = app.player2.pv + app.player2.defense ;
                        let finalresult = result - app.player1.attaque;
                        console.log('pvp', finalresult);
                        app.player2.pv = finalresult;
                        if (app.player2.pv === 0) {
                            alert('Player1 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                       
                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                        
                        app.removeBoard();
                    }
                    app.removeBoard();
                   
                    break;
                    case 'left':
                    app.fireball.x--;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player2.x) {
                        let result = app.player2.pv + app.player2.defense ;
                        let finalresult = result - app.player1.attaque;
                        console.log('pvp', finalresult);
                        app.player2.pv = finalresult;
                        if (app.player2.pv === 0) {
                            alert('Player1 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball'); 
                        app.removeBoard();
                    }
                    app.removeBoard();
                   
                    break;
                    case 'top':
                    app.fireball.y--;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player2.x) {
                        let result = app.player2.pv + app.player2.defense ;
                        let finalresult = result - app.player1.attaque;
                        console.log('pvp', finalresult);
                        app.player2.pv = finalresult;
                        if (app.player2.pv === 0) {
                            alert('Player1 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                       
                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                        
                        app.removeBoard();
                    }
                    app.removeBoard();
                
                    break;
                    case 'bottom':
                    app.fireball.y++;
                    app.fireball.active = 'yes';
                    if (app.fireball.x === app.player2.x) {
                        let result = app.player2.pv + app.player2.defense ;
                        let finalresult = result - app.player1.attaque;
                        console.log('pvp', finalresult);
                        app.player2.pv = finalresult;
                        if (app.player2.pv === 0) {
                            alert('Player1 Win');
                            document.location.reload();
                        }
                        app.removeBoard();
                    }
                    if (app.fireball.x === app.board.x) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
                       
                        app.removeBoard();
                    }
                    if (app.fireball.x < 0) {
                        let fireBall = document.querySelector('.fireball');
                        fireBall.classList.remove('.fireball');
               
                        app.removeBoard();
                    }
                    app.removeBoard();
                
                    break;
                    


            }
        }
    }
        if (data === 'Numpad1') {
            switch (app.player1.direction) {
                case 'right':
                    app.player1.x++;
                    app.fireballFunction();
                    if(app.fireball.active === 'yes'){
                        app.fireball.active = 'no';

                       let cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    
                    if (app.player1.x > app.board.x - 1) {
                        app.player1.x = ((app.board.x) - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target2.x && app.player1.y === app.target2.y) {
                        app.player1.defense = app.player1.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target3.x && app.player1.y === app.target3.y) {
                        app.player1.pv = app.player1.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    app.removeBoard();
                    app.turn('ArrowRight');
                    break;
                case 'left':
                    app.player1.x--;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player1.x < 0) {
                        app.player1.x = 0;
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    if (app.player1.x === app.target2.x && app.player1.y === app.target2.y) {
                        app.player1.defense = app.player1.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target3.x && app.player1.y === app.target3.y) {
                        app.player1.pv = app.player1.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    app.removeBoard();
                    app.turn('ArrowLeft');
                    break;
                case 'top':
                    app.player1.y--;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player1.y < 0) {
                        app.player1.y = 0;
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    if (app.player1.x === app.target2.x && app.player1.y === app.target2.y) {
                        app.player1.defense = app.player1.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target3.x && app.player1.y === app.target3.y) {
                        app.player1.pv = app.player1.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    app.removeBoard();
                    app.turn('ArrowUp');
                    break;
                case 'bottom':
                    app.player1.y++;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player1.y > app.board.y - 1) {
                        app.player1.y = app.board.y - 1;
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    if (app.player1.x === app.target2.x && app.player1.y === app.target2.y) {
                        app.player1.defense = app.player1.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target3.x && app.player1.y === app.target3.y) {
                        app.player1.pv = app.player1.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    app.removeBoard();
                    app.turn('ArrowDown');
                    break;
            };
        }
        if (data === 'KeyV') {
            switch (app.player2.direction) {
                case 'right':
                    app.player2.x++;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player2.x > app.board.x - 1) {
                        app.player2.x = ((app.board.x) - 1); 
                    }
                    if (app.player2.x === app.target.x && app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
               
                    }
                    if (app.player2.x === app.target2.x && app.player2.y === app.target2.y) {
                        app.player2.defense = app.player2.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target3.x && app.player2.y === app.target3.y) {
                        app.player2.pv = app.player2.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    app.removeBoard();
                    app.turn('KeyD');
                    break;
                case 'left':
                    app.player2.x--;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player2.x < 0) {
                        app.player2.x = 0;
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target.x && app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    if (app.player2.x === app.target2.x && app.player2.y === app.target2.y) {
                        app.player2.defense = app.player2.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target3.x && app.player2.y === app.target3.y) {
                        app.player2.pv = app.player2.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    
                    app.removeBoard();
                    app.turn('KeyA');
                    break;
                case 'top':
                    app.player2.y--;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player2.y < 0) {
                        app.player2.y = 0;
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target.x && app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    if (app.player2.x === app.target2.x && app.player2.y === app.target2.y) {
                        app.player2.defense = app.player2.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target3.x && app.player2.y === app.target3.y) {
                        app.player2.pv = app.player2.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                   
                    app.removeBoard();
                    app.turn('KeyW');
                    break;
                case 'bottom':
                    app.player2.y++;
                    app.fireballFunction();
                    if( app.fireball.active === 'yes'){
                        app.fireball.active = 'no';
                        cellFire = document.querySelector('.fireball')
                        cellFire.classList.remove('.fireball')
                    }
                    if (app.player2.y > app.board.y - 1) {
                        app.player2.y = app.board.y - 1;
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target.x && app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.target.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    if (app.player2.x === app.target2.x && app.player2.y === app.target2.y) {
                        app.player2.defense = app.player2.defense + 3;//+=6
                        app.target2.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target2.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target3.x && app.player2.y === app.target3.y) {
                        app.player2.pv = app.player2.pv + 3;//+=6
                        app.target3.x = app.randomFunctionX(0, app.board.x - 1);
                        app.target3.y = app.randomFunctionY(0, app.board.y - 1);
                        app.removeBoard();
                    }
                    app.removeBoard();
                    app.turn('KeyS');
                    break;
            }
        }
    },
    turn(event) {
        switch (event) {
            case 'ArrowRight':
                app.turnRight('player1');
                break;
            case 'ArrowLeft':
                app.turnLeft('player1');
                break;
            case 'ArrowUp':
                app.turnUp('player1');
                break;
            case 'ArrowDown':
                app.turnDown('player1');
                break;
            case 'KeyD':
                app.turnRight('player2');
                break;
            case 'KeyA':
                app.turnLeft('player2');
                break;
            case 'KeyW':
                app.turnUp('player2');
                break;
            case 'KeyS':
                app.turnDown('player2');
                break;
        }
    },
    turnRight(string) {
        app.removeBoard();
        if (string === 'player1') {
            const player1 = document.querySelector('.cellCurrent.player1');
            player1.classList.add('cellCurrent-right');
            app.player1.direction = 'right';
        }
        if (string === 'player2') {
            const player2 = document.querySelector('.cellCurrent.player2');
            player2.classList.add('cellCurrent-right');
            app.player2.direction = 'right';
        }

    },
    turnLeft(string) {
        app.removeBoard();
        if (string === 'player1') {
            const player1 = document.querySelector('.cellCurrent.player1');
            player1.classList.add('cellCurrent-left');
            app.player1.direction = 'left';
        }
        if (string === 'player2') {
            const player2 = document.querySelector('.cellCurrent.player2');
            player2.classList.add('cellCurrent-left');
            app.player2.direction = 'left';
        }
    },
    turnUp(string) {
        if (string === 'player1') {
            const player1 = document.querySelector('.cellCurrent.player1');
            player1.classList.add('cellCurrent-top');
            app.player1.direction = 'top';
        }
        if (string === 'player2') {
            const player2 = document.querySelector('.cellCurrent.player2');
            player2.classList.add('cellCurrent-top');
            app.player2.direction = 'top';
        }
    },
    turnDown(string) {
        if (string === 'player1') {
            const player1 = document.querySelector('.cellCurrent.player1');
            player1.classList.add('cellCurrent-bottom');
            app.player1.direction = 'bottom';
        }
        if (string === 'player2') {
            const player2 = document.querySelector('.cellCurrent.player2');
            player2.classList.add('cellCurrent-bottom');
            app.player2.direction = 'bottom';
        }
    },
    cleanbord() {
        const board = document.querySelector('#board');
        board.innerHTML = '';
    }



};

document.addEventListener('DOMContentLoaded', app.init);

