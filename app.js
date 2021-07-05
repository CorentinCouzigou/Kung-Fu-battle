var app = {
    board: {
        x: 0,
        y: 0
    },
    player1: {
        pv: 20,
        attaque: 2,
        defense: 2,
        x: 0,
        y: 0,
        direction: 'right'
    },
    player2: {
        pv: 20,
        attaque: 2,
        def: 2,
        x: 0,
        y: 0,
        direction: 'left'
    },
    target: {
        x: 0,
        y: 0
    },
    init: function () {
        console.log('init');
        app.board.x = 14;
        app.board.y = 10;
        app.target.x = app.randomFunctionX(0, app.board.x - 1);
        app.target.y = app.randomFunctionY(0, app.board.y - 1);
        app.player2.x = app.board.x-1;
        app.player2.y = app.board.y-1;
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
                }
                if (x == app.target.x && y == app.target.y) {
                    cell.classList.add('cellEnd');
                }
                if (x == app.player2.x && y == app.player2.y) {
                    cell.classList.add('cellCurrent', 'player2');
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
        //Valeyrs du player 2
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
        if (data === 'Numpad1') {
            switch (app.player1.direction) {
                case 'right':
                    app.player1.x++;
                    if (app.player1.x > app.board.x - 1) {
                        app.player1.x = ((app.board.x) - 1);
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x  && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 4;//+=6
                        console.log(app.player1.attaque)
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.removeBoard();
                    app.turn('ArrowRight');
                    break;
                case 'left':
                    app.player1.x--;
                    if (app.player1.x < 0) {
                        app.player1.x = 0;
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x  && app.player1.y === app.target.y ) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.removeBoard();
                    app.turn('ArrowLeft');
                    break;
                case 'top':
                    app.player1.y--;
                    if (app.player1.y < 0) {
                        app.player1.y = 0;
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x  && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        console.log(app.player1.attaque)
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.cleanbord();
                    app.drawBoard();
                    app.turn('ArrowUp');
                    break;
                case 'bottom':
                    app.player1.y++;
                    if (app.player1.y > app.board.y - 1) {
                        app.player1.y = app.board.y - 1;
                        app.removeBoard();
                    }
                    if (app.player1.x === app.target.x  && app.player1.y === app.target.y) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        console.log(app.player1.attaque)
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
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
                    if (app.player2.x > app.board.x - 1) {
                        app.player2.x = ((app.board.x) - 1);
                        app.removeBoard();
                    }
                    if ( app.player2.x === app.target.x &&  app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        console.log(app.player1.attaque)
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.removeBoard();
                    app.turn('KeyD');
                    break;
                case 'left':
                    app.player2.x--;
                    if (app.player2.x < 0) {
                        app.player2.x = 0;
                        app.removeBoard();
                    }
                    if ( app.player2.x === app.target.x &&  app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.removeBoard();
                    app.turn('KeyA');
                    break;
                case 'top':
                    app.player2.y--;
                    if (app.player2.y < 0) {
                        app.player2.y = 0;
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target.x && app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.cleanbord();
                    app.drawBoard();
                    app.turn('KeyW');
                    break;
                case 'bottom':
                    app.player2.y++;
                    if (app.player2.y > app.board.y - 1) {
                        app.player2.y = app.board.y - 1;
                        app.removeBoard();
                    }
                    if (app.player2.x === app.target.x &&  app.player2.y === app.target.y) {
                        app.player2.attaque = app.player2.attaque + 6;//+=6
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
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

