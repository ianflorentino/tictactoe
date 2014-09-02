var app = angular.module('ticTacFighter', ["firebase","ngAnimate"])

app.controller('ticTacController', ['$scope', '$firebase', function($scope, $firebase){
	$scope.box = {cells: 
			[["","",""],
			["","",""],
      ["","",""]], 
			player1_turn:true,
			player1_score:0, 
			player2_score:0,
			winner:false,
			tie:false,
      move:true,
      moveCounter:0,
      currPlayer:0,
      player_reset:false
  };

	var ref = $firebase(new Firebase("https://tictacfighter.firebaseio.com/data"));
  ref.$bind($scope, 'box');
	
  $scope.$watch('box', function(){
		console.log("player 1 turn is " + $scope.box.player1_turn);
  });

	$scope.num_check = $scope.box.cells.length;
  playerCount = 0;
  $scope.up = false;
  $scope.down = false;
  $scope.left = false;
  $scope.right = false;

  $scope.reset = function() {
    console.log("reset went through");
    if ($scope.box.player_reset) {
      $scope.box.cells= [["","",""],
                         ["","",""],
                         ["","",""]];
      $scope.box.winner = false;
      $scope.box.player_reset = false;
      $scope.box.player_turn = true;
      $scope.box.move = true;
      $scope.box.tie = false;
      playerCount = 0;
      $scope.up = false;
      $scope.down = false;
      $scope.left = false;
      $scope.right = false;
     }
    else {
      alert("Waiting on both players to reset");
      $scope.box.cells= [["","",""],
                         ["","",""],
                         ["","",""]];
      $scope.box.player_reset = true;
      $scope.box.move = true;
      $scope.box.tie = false;
      playerCount = 0;
      $scope.up = false;
      $scope.down = false;
      $scope.left = false;
      $scope.right = false;
    }
  }
  
  $scope.ifWin = function() {
    if ($scope.box.winner) {
      return $scope.box.winner;
    } 
    else if ($scope.box.tie) {
      return $scope.box.tie;
    }
  };
   
	$scope.switchTurn = function() {
    if ($scope.box.winner == false) {
		  $scope.box.player1_turn = !$scope.box.player1_turn;
      $scope.box.moveCounter += 1;
      playerCount = $scope.box.moveCounter;
    }
	};

	$scope.isRed = function(x,y) {
		console.log("is Red ran");
    if ($scope.box.cells[x][y] === 'X') {
      return 'white';
		} 
    else if ($scope.box.cells[x][y] === 'O') {
      return 'red';
		}
	};
	
	$scope.animate = function() {	
		$scope.box.move = !$scope.box.move;
		if ($scope.box.move) {
			return 'animate'
		} 
    else {
			return ''
		}
	};
  
	$scope.isWinner = function() {
		if ($scope.box.winner) {
			($scope.box.player1_turn) ? $scope.box.player1_score +=1 : $scope.box.player2_score +=1;	
		} 
	};

   //ALL THE MAGIC THAT HAPPENS (FUNCTIONS CALLED) WHEN A PLAYER CLICKS

	$scope.selectBox = function(x,y) {
		if ($scope.box.cells[x][y] != "") {
			alert("That spot is already taken!");
			return
		}
    else if ($scope.box.winner == true) {
      alert("Play another game!");
			return
		}
    else if (!$scope.box.player1_turn) {
      if (playerCount % 2 == 1) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    else if ($scope.box.player1_turn) {
      if (playerCount != 0 && playerCount % 2 == 0) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    
    $scope.box.cells[x][y] = ($scope.box.player1_turn ? 'X' : 'O');	
		$scope.winnerCond();
    console.log("winner combo:" + $scope.winnerCond());
		$scope.checkDiagonal($scope.box.cells);	
		$scope.checkWinner($scope.box.cells);
		$scope.isWinner();
    $scope.switchTurn();
    $scope.tieCombo();
		console.log($scope.box.cells[0], $scope.box.cells[1], $scope.box.cells[2]);	
	};
	
  //WINNING CONDITIONS

	$scope.winnerCond = function() {
		var choice  = ($scope.box.player1_turn ? 'X' : 'O');
	    var winCombo = choice;
		for (var i = 1; i < $scope.num_check; i++){
			winCombo += choice
		}
		return winCombo;
	};
  
  $scope.tieCombo = function() {
    var filledSpaces = 9;
    if ($scope.box.tie == true || $scope.box.winner == true) {
      filledSpaces = 0;
    }
    for (var i = 0; i < $scope.num_check; i++){
      for (var y = 0; y < $scope.num_check; y++) {
        if ($scope.box.cells[i][y] != '') {
          filledSpaces -= 1;
          if (filledSpaces == 0) {
            $scope.box.tie = true;
          }
        }
      }
    }  
  }

  //CHECK FOR WINNER IN ALL DIRECTIONS

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
	};

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
		
  };
 
  //ATTACK FUNCTIONS

  $scope.attackUp = function() {
   if ($scope.up) {
      alert("You can only use this option once!");
      return
    } 
   else if (!$scope.box.player1_turn) {
      if (playerCount % 2 == 1) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    else if ($scope.box.player1_turn) {
      if (playerCount != 0 && playerCount % 2 == 0) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    
    $scope.box.cells[0] = $scope.box.cells[1];
    $scope.box.cells[1] = $scope.box.cells[2];
    $scope.box.cells[2] = ["","",""];
    $scope.animate();
    $scope.switchTurn();
    $scope.up = true;
  };
  
  $scope.attackDown = function() {
    if ($scope.down) {
      alert("You can only use this option once!");
      return
    }
    else if (!$scope.box.player1_turn) {
      if (playerCount % 2 == 1) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    else if ($scope.box.player1_turn) {
      if (playerCount != 0 && playerCount % 2 == 0) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    
    $scope.box.cells[2] = $scope.box.cells[1]; 
    $scope.box.cells[1] = $scope.box.cells[0];
    $scope.box.cells[0] = ["","",""];
    $scope.animate();
    $scope.switchTurn();
    $scope.down = true;
  }; 
  
  $scope.attackRight = function() {
    if ($scope.right){
      alert("You can only use this option once!");
      return
    }
    else if (!$scope.box.player1_turn) {
      if (playerCount % 2 == 1) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    else if ($scope.box.player1_turn) {
      if (playerCount != 0 && playerCount % 2 == 0) {
        alert("You cannot go twice in a row!");
        return
      }
    } 
    console.log("attack right ran");
    for (var i = 0; i < $scope.num_check; i++) {
      for (var j = 2; j >= 0; j--) {
        if (j == 0) {
          $scope.box.cells[i][j] = "";
        }
        else {
          $scope.box.cells[i][j] = $scope.box.cells[i][j-1];
        }
      }
    }
    $scope.animate();
    $scope.switchTurn();
    $scope.right = true;
  };
 
  $scope.attackLeft = function() {
   if ($scope.left){
      alert("You can only use this option once!");
      return
    }
   else if (!$scope.box.player1_turn) {
      if (playerCount % 2 == 1) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    else if ($scope.box.player1_turn) {
      if (playerCount != 0 && playerCount % 2 == 0) {
        alert("You cannot go twice in a row!");
        return
      }
    }
    console.log("attack left ran");
    for (var i = 0; i < $scope.num_check; i++) {
      for (var j = 0; j < $scope.num_check; j++) {
        if (j == 2) {
          $scope.box.cells[i][j] = "";
        }
        else {
          $scope.box.cells[i][j] = $scope.box.cells[i][j+1];
        }
      }
    }
    $scope.animate();
    $scope.switchTurn();
    $scope.left = true;
  };


}]);
