var app = angular.module('ticTacColor', ["firebase"])

app.controller('ticTacController', ['$scope', '$firebase', function($scope, $firebase){
	$scope.box = {cells: 
			[["","",""],
			["","",""],
       			["","",""]]};
	
	var ref = $firebase(new Firebase("https://tictacfighter.firebaseio.com/data"));

	ref.$bind($scope, 'box');
	$scope.$watch('box', function(){
		console.log('hello')
	});

	$scope.player1_turn      = true;	
	$scope.num_check         = $scope.box.cells.length;
	$scope.winner            = false;
	$scope.selected          = 0;

	$scope.switchTurn = function() {
		$scope.player1_turn = !$scope.player1_turn;
	}

	$scope.isRed = function() {
		if ($scope.selected == 'X') {
			return true;
		}
	}
	
	$scope.changeColor = function(t,u) {
		$scope.selected = $scope.box.cells[t][u];
		console.log($scope.selected);
	}	
	
	$scope.isWinner = function() {
		return $scope.winner;		
	}

	$scope.selectBox = function(x,y) {
		$scope.box.cells[x][y] = ($scope.player1_turn ? 'X' : 'O');	
		$scope.winnerCond();
		console.log("winner combo:" + $scope.winnerCond());
		$scope.checkDiagonal($scope.box.cells);	
		$scope.checkWinner($scope.box.cells);
		$scope.switchTurn();
		console.log($scope.box.cells[0], $scope.box.cells[1], $scope.box.cells[2]);
		
	}
	
	$scope.winnerCond = function() {
		var choice  = ($scope.player1_turn ? 'X' : 'O');
	       	var winCombo = choice;
		for (var i = 1; i < $scope.num_check; i++){
			winCombo += choice
		}
		return winCombo;
	}

	$scope.checkDiagonal = function(array) {
		diagonal_array1 = [];
		for (var i = 0; i < $scope.num_check; i++) {
			diagonal_array1.push(array[i][i]);
			if (diagonal_array1.join('') == $scope.winnerCond()) {
				winner = true;
				console.log(($scope.player1_turn) ? "player 1 wins:diagonal1" : "player 2 wins:diagonal1");
				return;
			}
		}

		diagonal_array2 = [];
		j = $scope.num_check - 1			
		for (var i = 0; i < $scope.num_check; i++) {
			diagonal_array2.push(array[i][j]);
			j -= 1
			
			if (diagonal_array2.join('') == $scope.winnerCond()) {
				winner = true;
				console.log(($scope.player1_turn) ? "player 1 wins:diagonal2" : "player 2 wins:diagonal2");
				return;
			}
		
		}
	}

      	$scope.checkWinner = function(array) {	
		for (var i = 0; i < $scope.num_check; i++){
			if (array[i].join('') == $scope.winnerCond()){
				winner = true;
				console.log(($scope.player1_turn) ? "player 1 wins:checkwinner:row" : "player 2 wins:checkwinner:row");
				return 
			}
			
		}
		
		vertical_array = [[""],[""],[""]];	
		for (var i = 0; i < $scope.num_check; i++) {
			for (var j = 0; j < $scope.num_check; j++) {
				vertical_array[i].push(array[j][i]);
				console.log(vertical_array[i]);
				if (vertical_array[i].join('') == $scope.winnerCond()) {
					winner = true;
					console.log(($scope.player1_turn) ? "player 1 wins: checkwinner" : "player 2 wins:checkwinner");
					return;
				}
					
			}		
			
		}
		
      	}
}]);
