'use strict';

var BOARD_SIZE = 10;

var game = (function() {
  var board;

  var setBoard = function(b) {
    board = b;
  }

  var getBoard = function() {
    board;
  }

  return {
    setBoard: setBoard,
    getBoard: getBoard
  }
}());

var renderer = (function() {
  var cellClick = function(x, y) {
    console.log(x, y);
  }

  var render = function(board) {
    var $table = $('<table>');
    for (let i = 0; i < BOARD_SIZE; i++) {
      var $tr = $('<tr>');
      for (let j = 0; j < BOARD_SIZE; j++) {
        var $td = $('<td>');

        $td.addClass('cell');
        if (board[i][j].status !== 'blank') {
          $td.addClass('cell-grey');
        }

        $td.click(function() {
          cellClick(j, i);
        });

        $tr.append($td);
      }
      $table.append($tr)
    }

    $('.game-area').html($table);
  }

  return {
    render: render
  }
}());

function crawData() {
  $.get({ url: './api/board' }, function(res) {

    if (!res.ok) {
      alert('Error: ' + data.message);
      return ;
    }

    var data = res.data;
    var board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      board.push([]);
      for (let j = 0; j < BOARD_SIZE; j++) {
        var cell;
        for (let k = 0; k < data.length; k++) {
          if (data[k].x === j && data[k].y === i) {
            cell = data[k];
          }
        }

        board[i].push({
          status: cell.status
        });
      }
    }
    game.setBoard(board);
    renderer.render(board);
  });
}

$(function() {
  crawData();
});