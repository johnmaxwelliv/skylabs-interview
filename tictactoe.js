var Board = function(side_length) {
    'use strict';
    this.side_length = side_length;
    this.squares = [];
    this.player = 'X';
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

Board.prototype.check_for_winner = function() {
    'use strict';
    if (this.winner() !== null) {
        alert(this.winner() + " has won!");
    }
};

Board.prototype.initialize = function() {
    'use strict';
    function makeOnClickAction(cell, board, i, j) {
        return function() {
            cell.text(board.player);
            board.square_is(i, j, board.player);
            board.check_for_winner();
            board.player = board.player === 'X' ? 'O' : 'X';
        };
    }
    var i, j, row, cell, board;
    for (i = 0; i < this.side_length; i++) {
        row = $('<tr>');
        for (j = 0; j < this.side_length; j++) {
            cell=$('<td><a href="#">?</a></td>');
            board = this;
            cell.click(makeOnClickAction(cell, board, i, j));
            row.append(cell);
        }
        row.append('</tr>');
        $('#board').append(row);
    }
}

var board = new Board(5);
board.initialize();
