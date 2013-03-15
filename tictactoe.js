var Board = function(side_length) {
    'use strict';
    this.side_length = side_length;
    this.squares = [];
    var row, i, j;
    for (i = 0; i < side_length; i++) {
        row = [];
        for (j = 0; j < side_length; j++) {
            row.push(null);
        }
        this.squares.push(row);
    }
};

Board.prototype.square_is = function(row, col, X_or_O) {
    'use strict';
    this.squares[row][col] = X_or_O;
};

Board.prototype.winner = function() {
    'use strict';
    var i, j, X_run, O_run, entry;
    // First check for horizontal wins.
    for (i = 0; i < this.side_length; i++) {
        X_run = 0;
        O_run = 0;
        for (j = 0; j < this.side_length; j++) {
            entry = this.squares[i][j];
            if (entry === 'X') {
                X_run++;
                O_run = 0;
            } else if (entry === 'O') {
                X_run = 0;
                O_run++;
            } else {
                X_run = 0;
                O_run = 0;
            }
            if (X_run === 3) {
                return 'X';
            } else if (O_run === 3) {
                return 'O';
            }
        }
    }
    // Then check for vertical wins.
    for (j = 0; j < this.side_length; j++) {
        X_run = 0;
        O_run = 0;
        for (i = 0; i < this.side_length; i++) {
            entry = this.squares[i][j];
            if (entry === 'X') {
                X_run++;
                O_run = 0;
            } else if (entry === 'O') {
                X_run = 0;
                O_run++;
            } else {
                X_run = 0;
                O_run = 0;
            }
            if (X_run === 3) {
                return 'X';
            } else if (O_run === 3) {
                return 'O';
            }
        }
    }
    // If we reach this point, no wins have been found.
    // So return null.
    return null;
};

function game1() {
    var board = new Board(3);

    board.square_is(1, 1, 'X');
    board.square_is(1, 0, 'O');
    board.square_is(0, 1, 'X');
    board.square_is(2, 1, 'O');
    board.square_is(0, 2, 'X');
    board.square_is(2, 0, 'O');

    // check for a winner - won't find one.
    if (board.winner()) {
        alert('Winner!! -> ' + board.winner());
        return;
    }

    board.square_is(0, 0, 'X');

    // check for a winner - X has won.
    if (board.winner()) {
        alert('Winner!! -> ' + board.winner());
        return;
    }
}

game1();
