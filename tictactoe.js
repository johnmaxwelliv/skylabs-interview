var Board = function(side_length) {
    'use strict';
    this.side_length = side_length;
    this.squares = []; // Internal board representation.
    this.player = 'X'; // Player to move, for web interface.  X starts.
    // Initialize the board with nulls.
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
        X_run = 0; // Track consecutive Xs.
        O_run = 0; // Track consecutive Os.
        for (j = 0; j < this.side_length; j++) {
            entry = this.squares[i][j];
            if (entry === 'X') {
                // Add to X run; reset O run.
                X_run++;
                O_run = 0;
            } else if (entry === 'O') {
                // Add to O run; reset X run.
                X_run = 0;
                O_run++;
            } else {
                // Reset both runs.
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
    // I thought about trying to abstract this checking process in to a function, 'cause it's so similar to what's above.
    // But it seemed like more trouble than it was worth, given that this pattern only occurs twice and doesn't look very easy to abstract out.
    // See above for comments explaining how it works.
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
    // For web interface.
    // Alert the users if there is a winner.
    'use strict';
    if (this.winner() !== null) {
        alert(this.winner() + " has won!");
    }
};

Board.prototype.initialize = function() {
    // For web interface.
    // Set up the board HTML with all necessary event handlers in place.
    'use strict';
    // This makeOnClickAction stuff is necessary so that the click event handler uses the right scope.
    function makeOnClickAction(cell, board, i, j) {
        return function() {
            // Change the cell text.
            cell.text(board.player);
            // Modify the internal representation.
            board.square_is(i, j, board.player);
            // Alert the users if there's a winner.
            board.check_for_winner();
            // Change the player to move.
            board.player = board.player === 'X' ? 'O' : 'X';
        };
    }
    var i, j, row, cell, board;
    for (i = 0; i < this.side_length; i++) {
        // Each iteration of this for loop generates and adds row html with necessary event handlers.
        row = $('<tr>');
        for (j = 0; j < this.side_length; j++) {
            // Each iteration of this for loop generates and adds cell html with necessary event handlers.
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
