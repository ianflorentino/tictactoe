var app = angular.module('ticTacColor', ["firebase","ngAnimate"])

app.controller('ticTacController', ['$scope', '$firebase', function($scope, $firebase){
	$scope.box = {cells: 
			[["","",""],
			["","",""],
       			["","",""]], 
			player1_turn:true,
			player1_score:0, 
			player2_score:0,
			winner:false};
	
	var ref = $firebase(new Firebase("https://tictacfighter.firebaseio.com/data"));

	ref.$bind($scope, 'box');
	$scope.$watch('box', function(){
		console.log("player 1 turn is " + $scope.box.player1_turn);
	});

	$scope.num_check = $scope.box.cells.length;
	$scope.move = true;

	$scope.ifWin = function() {
		return $scope.box.winner
	}
	
	$scope.switchTurn = function() {
		if ($scope.box.winner == false) {
			$scope.box.player1_turn = !$scope.box.player1_turn;
			console.log("switched turns");
		}
	}

	$scope.isRed = function(x,y) {
		console.log($scope.box.cells[x][y]);
		if ($scope.box.cells[x][y] === 'X') {
			return 'white';
		} else if ($scope.box.cells[x][y] === 'O') {
			return 'red';
		}
	}
	
	$scope.animate = function() {
		console.log($scope.move);
		$scope.move = !$scope.move;
		if ($scope.move) {
			return 'animate'
		} else {
			return ''
		}
	}

	$scope.isWinner = function() {
		if ($scope.box.winner == true) {
			(player1_turn) ? $scope.box.player1_score +=1 : $scope.box.player1_score +=1;	
		}	
	}

	$scope.selectBox = function(x,y) {
		if ($scope.box.cells[x][y] != "") {
			alert("That spot is already taken!");
			return
		}else if ($scope.box.winner == true) {
			alert("Play another game!");
			return
		}
		$scope.box.cells[x][y] = ($scope.box.player1_turn ? 'X' : 'O');	
		$scope.animate();
		$scope.winnerCond();
		console.log("winner combo:" + $scope.winnerCond());
		$scope.checkDiagonal($scope.box.cells);	
		$scope.checkWinner($scope.box.cells);
		$scope.switchTurn();
		console.log($scope.box.cells[0], $scope.box.cells[1], $scope.box.cells[2]);
		
	}
	
	$scope.winnerCond = function() {
		var choice  = ($scope.box.player1_turn ? 'X' : 'O');
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
				$scope.box.winner = true
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
				$scope.box.winner = true;
				console.log(($scope.player1_turn) ? "player 1 wins:diagonal2" : "player 2 wins:diagonal2");
				return;
			}
		
		}
	}

      	$scope.checkWinner = function(array) {	
		for (var i = 0; i < $scope.num_check; i++){
			if (array[i].join('') == $scope.winnerCond()){
				$scope.box.winner = true;
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
					$scope.box.winner = true;
					console.log(($scope.player1_turn) ? "player 1 wins: checkwinner" : "player 2 wins:checkwinner");
					return;
				}
					
			}		
			
		}
		
      	}
}]);
