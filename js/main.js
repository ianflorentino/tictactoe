var app = angular.module('ticTacColor', [])

app.controller('ticTacController', ['$scope', function($scope){
	$scope.cells = [["","",""],
			["","",""],
       			["","",""]];
       	
	player1_turn = true;
	num_check = $scope.cells.length
	

	$scope.switchTurn = function() {
		player1_turn = !player1_turn;
	}
       	
	$scope.selectBox = function(x,y) {
		$scope.cells[x][y] = (player1_turn ? 'X' : 'O');
		$scope.winnerCond();
		$scope.switchTurn();
		$scope.checkWinner($scope.cells);
		console.log($scope.cells);
		console.log($scope.cells[x][y]);
	}
	
	$scope.winnerCond = function() {
		var choice  = (player1_turn ? 'X' : 'O');
	       	var winner = choice;
		for (var i = 1; i < num_check; i++){
			winner += choice
		}
		return winner;
	}

      	$scope.checkWinner = function(array) {	
		for (var i = 0; i < num_check; i++){
			if (array[i].join('') == $scope.winnerCond()){
				console.log("winner found");
				return 
			}
			console.log(array[i].join(''));
		};
			
		//loop through rows
		//	loop through array rows
		//		loop through row of objects
		//loop through columns
		//	loop through each array object
		//		loop through progressively
		//loop through diagnols
		//	loop through progressively
		// 
		array[0].join('')
		array[1].join('')
		array[2].join('')
		array[0][0] + array[1][0] + array[2][0]
		array[0][1] + array[1][1] + array[2][1]
		array[0][2] + array[1][2] + array[2][2]
		array[0][0] + array[1][1] + array[2][2]
		array[2][2] + array[1][1] + array[0][0]

		//compare board with winning conditions and assign how many times each 
		//
      	}
}]);
