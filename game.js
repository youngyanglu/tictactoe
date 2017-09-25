var inquirer = require('inquirer');
var circle;
var cross;
var board = [[null, null, null],[null, null, null],[null, null, null]];
var winner;
var rounds = 0;
var lastRoundPlayer;

var name1 = {
  name: 'name1',
  message: 'Please enter the name of player 1'
}
var name2 = {
  name: 'name2',
  message: 'Please enter the name of player 2'
}

var checkWinner = (board) => {
  console.log('board', board)
  for (var i = 0; i < 3; i++) {
    if (board[i][1] === board[i][2] && board[i][2] === board[i][3]) {
      return board[i][1];
    } else if (board[1][i] === board[2][i] && board[2][i] === board[3][i]) {
      return board[1][i];
    } else if (board[1][1] === board[2][2] && board[2][2] === board[0][0]) {
      return board[1][1];
    } else if (board[1][1] === board[2][0] && board[2][0] === board[0][2]) {
      return board[1][1];
    }
  }
}

console.log('Welcome to Tic Tac Toe. Please enter your names');

inquirer.prompt([name1, name2])
  .then(function (answers) {
    circle = answers.name1;
    cross = answers.name2;
  })
  .then(() => {
    var roundInit = (player) =>{
      console.log(rounds, 'rounds')
      if (rounds >= 9) {
        return 'game over';
      } else if (winner) {
        return winner;
      } else {
        if (player === 'cross') {
          var turncross = {
            name: 'move',
            message: `Cross, Please pick an empty tile.
                      ${JSON.stringify(board[0])}
                      ${JSON.stringify(board[1])}
                      ${JSON.stringify(board[2])}`
          }
          inquirer.prompt([turncross])
            .then(function (answers) {
              board[Number(answers.move.charAt(0))][Number(answers.move.charAt(2))] = 'x';
              rounds++;
              checkWinner(board);
              return roundInit('circle')
            })
        } else {
          var turncircle = {
            name: 'move',
            message: `Circle, Please pick an empty tile.
                      ${JSON.stringify(board[0])}
                      ${JSON.stringify(board[1])}
                      ${JSON.stringify(board[2])}`
          }
          inquirer.prompt([turncircle])
            .then(function (answers) {
              board[Number(answers.move.charAt(0))][Number(answers.move.charAt(2))] = 'o';
              rounds++;
              checkWinner(board);
              return roundInit('cross')
            })
        }
      }
    }
    return roundInit('circle');
  })
  .then((result) => {
    console.log(result);
  })

