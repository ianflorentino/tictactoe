var app = angular.module('ticTacColor', [])

app.controller('ticTacController', ['$scope', function($scope){
	$scope.cells = [["","",""],
			["","",""],
       			["","",""]];
       
	player1_turn      = true;
	player1_select    = 0;
	num_check         = $scope.cells.length;
	winner            = false;
	player1	          = "blue";
	player2           = "green";	

	$scope.switchTurn = function() {
		player1_turn = !player1_turn;
	}

	$scope.changeColor = function() {
		return player1_turn;
	}	
	
	$scope.isWinner = function() {
		return winner;		
	}

	$scope.selectBox = function(x,y) {
		$scope.cells[x][y] = (player1_turn ? 'X' : 'O');	
		winnerCond();
		console.log("winner combo:" + winnerCond());
		$scope.checkDiagonal($scope.cells);	
		$scope.checkWinner($scope.cells);
		$scope.switchTurn(); 
		console.log($scope.cells[0], $scope.cells[1], $scope.cells[2]);
		
	}
	
	winnerCond = function() {
		var choice  = (player1_turn ? 'X' : 'O');
	       	var winCombo = choice;
		for (var i = 1; i < num_check; i++){
			winCombo += choice
		}
		return winCombo;
	}

	$scope.checkDiagonal = function(array) {
		diagonal_array1 = [];
		for (var i = 0; i < num_check; i++) {
			diagonal_array1.push(array[i][i]);
			if (diagonal_array1.join('') == winnerCond()) {
				winner = true;
				console.log((player1_turn) ? "player 1 wins:diagonal1" : "player 2 wins:diagonal1");
				return;
			}
		}

		diagonal_array2 = [];
		j = num_check - 1			
		for (var i = 0; i < num_check; i++) {
			diagonal_array2.push(array[i][j]);
			j -= 1
			
			if (diagonal_array2.join('') == winnerCond()) {
				winner = true;
				console.log((player1_turn) ? "player 1 wins:diagonal2" : "player 2 wins:diagonal2");
				return;
			}
		
		}
	}

      	$scope.checkWinner = function(array) {	
		for (var i = 0; i < num_check; i++){
			if (array[i].join('') == winnerCond()){
				winner = true;
				console.log((player1_turn) ? "player 1 wins:checkwinner:row" : "player 2 wins:checkwinner:row");
				return 
			}
			
		};
		
		vertical_array = [[""],[""],[""]];	
		for (var i = 0; i < num_check; i++) {
			for (var j = 0; j < num_check; j++) {
				vertical_array[i].push(array[j][i]);
				console.log(vertical_array[i]);
				if (vertical_array[i].join('') == winnerCond()) {
					winner = true;
					console.log((player1_turn) ? "player 1 wins: checkwinner" : "player 2 wins:checkwinner");
					return;
				}
					
			}		
			
		}
		
      	}
}]);
