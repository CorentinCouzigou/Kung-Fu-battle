var app = {
    board: {
        x: 0,
        y: 0
    },
    player1: {
        pv: 20,
        attaque: 4,
        defense: 2,
        x: 0,
        y: 0,
        direction: 'right'
    },
    player2: {
        pv: 20,
        attaque: 4,
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
        app.player2.x = 13;
        app.player2.y = 16;
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
                    cell.classList.add('cellCurrent');
                }
                if (x == app.target.x && y == app.target.y) {
                    cell.classList.add('cellEnd');
                }
                if (x == app.player2.x && y == app.target.y) {
                    cell.classList.add('cellCurrent');
                }
                row.append(cell);
            }
        }
        const playerPv = document.querySelector('.pvPlayer1')
        playerPv.textContent = `Pv: ${app.player1.pv}`;
        const playerAttaque = document.querySelector('.attPlayer1')
        playerAttaque.textContent = `Attaque: ${app.player1.attaque}`;
        const playerDefense = document.querySelector('.defPlayer1')
        playerDefense.textContent = `Défense: ${app.player1.defense}`;
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
        else if (data === 'KeyD' || data === 'KeyA' || data === 'KeyW' || data === 'KeyS') {

        } else {
            switch (app.player1.direction) {
                case 'right':
                    app.player1.x++;
                    if (app.player1.x > app.board.x - 1) {
                        app.player1.x = ((app.board.x) - 1);
                        app.removeBoard();
                    }
                    if ((app.player1.x === app.target.x || app.player2.x === app.target.x) && (app.player1.y === app.target.y || app.player2.y === app.target.y)) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
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
                    if ((app.player1.x === app.target.x || app.player2.x === app.target.x) && (app.player1.y === app.target.y || app.player2.y === app.target.y)) {
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
                    if ((app.player1.x === app.target.x || app.player2.x === app.target.x) && (app.player1.y === app.target.y || app.player2.y === app.target.y)) {
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
                    if ((app.player1.x === app.target.x || app.player2.x === app.target.x) && (app.player1.y === app.target.y || app.player2.y === app.target.y)) {
                        app.player1.attaque = app.player1.attaque + 6;//+=6
                        console.log(app.player1.attaque)
                        app.removeBoard();
                        // app.drawBoard.cell.classList.remove('cellEnd');
                    }
                    app.removeBoard();
                    app.turn('ArrowDown');
                    break;
            }

        }

    },
    turn(event) {
        switch (event) {
            case 'ArrowRight':
                app.turnRight();
                break;
            case 'ArrowLeft':
                app.turnLeft();
                break;
            case 'ArrowUp':
                app.turnUp();
                break;
            case 'ArrowDown':
                app.turnDown();
                break;
        }
    },
    turnRight() {
        app.removeBoard();
        const player1 = document.querySelector('.cellCurrent');
        player1.classList.add('cellCurrent-right');
        app.player1.direction = 'right';
    },
    turnLeft() {
        app.removeBoard();
        const player1 = document.querySelector('.cellCurrent');
        player1.classList.add('cellCurrent-left');
        app.player1.direction = 'left';
    },
    turnUp() {
        app.removeBoard();
        const player1 = document.querySelector('.cellCurrent');
        player1.classList.add('cellCurrent-top');
        app.player1.direction = 'top';
    },
    turnDown() {
        app.removeBoard();
        const player1 = document.querySelector('.cellCurrent');
        player1.classList.add('cellCurrent-bottom');
        app.player1.direction = 'bottom';
    },
    cleanbord() {
        const board = document.querySelector('#board');
        board.innerHTML = '';
    }



};

document.addEventListener('DOMContentLoaded', app.init);

