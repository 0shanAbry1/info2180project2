// Fifteen Puzzle Javascript Document
// ID - 620076247
// Colaboration - 620076399

// Gloabl variables 
var n = 15; //Number of tiles
//var win = false; ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
var counter = 0; //Keeps track of number of moves made ?????????????????????????????????????????????????????????????????????????
var puzzleHeight = 400; //Height & width) 

// Reference of correct positioning of puzzle pieces 
var puzzleDic = {"1":[0,0],"2":[0,100],"3":[0,200],"4":[0,300],"5":[100,0],"6":[100,100],"7":[100,200],"8":[100,300],"9":[200,0],"10":[200,100],"11":[200,200],"12":[200,300],"13":[300,0],"14":[300,100],"15":[300,200]}; 

window.onload = function()
{	//"use strict";
	
	// To get and arrange puzzle pieces on the game area in the correct order
	var game_area = document.getElementById("puzzlearea").getElementsByTagName('div'); 
	position(game_area);
	
	// Shuffle puzzle pieces
	//document.getElementById("shufflebutton").onclick = shuffle; ????????????????????????????????????????????????????????????????
	
	// Play game
	for(var i=0; i<game_area.length; i++)
	{
		game_area[i].className = 'puzzlepiece'; //???????????????????????????????????????????????????????????????????????????????
		
		//game_area[i].onmouseover = movablePiece; ??????????????????????????????????????????????????????????????????????????????
		//game_area[i].onmouseout = resetPiece; ?????????????????????????????????????????????????????????????????????????????????
    	
		console.log("Call was made to movePiece with "+game_area[i].offsetTop+", "+game_area[i].offsetLeft);
		game_area[i].onclick = movePiece; // ??????????????????????????????????????????????????????????????????????????????????
	}// Adding an event listener to each piece of the puzzle
	
	// New Play Game
	/*while(!win){
		for (var i=0; i< pieces.length; i++)
		{
			pieces[i].className = 'puzzlepiece'; //re-sizes the div
			//pieces[i].onmouseover = movablePiece; 
			//pieces[i].onmouseout = resetPiece;
			
			console.log("Call was made to movePiece with "+movePiece);
    		pieces[i].onclick = movePiece;
			
			if(hasWon(pieces[i]){
				win = true;	
			}
		}
	}**/
};

function position(pieces)
{	//"use strict";
	
	var j = 0;
	for (var i=0; i< pieces.length; i++)
	{
		pieces[i].className = 'puzzlepiece'; 
	} //100x100 puzzle pieces 
	
	for (var x = 0; x < puzzleHeight; x+= 100)
	{
		for (var y = 0; y < puzzleHeight; y +=100)
		{	
			if(j!==15){
				pieces[j].style.top = x + "px";
				pieces[j].style.left = y + "px";
				j++; //console.log(x,y);
			}	
			else{
				break;
			}
		}
	} //Tile
		
	var k = 0;
	for (var yPos = puzzleHeight; yPos >= 100; yPos-= 100)
	{
		for (var xPos = 0; xPos >= -1*(puzzleHeight-100); xPos -= 100)
		{
			if(k!==15){
				pieces[k].style.backgroundPosition = (xPos + "px ") + (yPos + "px");
				k++; //console.log(xPos, yPos);
			}
			else{
				break;
			}
		}
	} //Background Image	
}

/*function hasWon(){
	//Display number of moves in like the winner.jpg & counter not in an alert???????????????????????????????????????????????????
}*/

function movePiece() // Move puzzle piece to empty slot
{		
	//"use strict";
	
	if (moveable(this))
	{
		// Get location of empty slot
		var emptySquare = getSpace();
		console.log("Empty Square coordinates: "+emptySquare);
		
		// Execute move of given puzzle piece
		this.style.top = emptySquare[0] + "px";
	    this.style.left = emptySquare[1] + "px";
		
		// Count move
		counter++;
		console.log("Count of Moves: "+counter);
	}
	else
	{ console.log("In movePiece. This: X --> "+this.offsetTop+" Y --> "+this.offsetLeft+" ... Not able to be moved");}
}

function getSpace() // Keep track of where the empty square is
{
	//"use strict";
	
	// Inside the puzzle
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div');
	
	// Empty square
	var emptyX = 0;
	var emptyY = 0;
	
	// Row/Column Grid
	var column1 = 0;
	var column2 = 0;
	var column3 = 0;
	var column4 = 0;
	var row1 = 0;
	var row2 = 0;
	var row3 = 0;
	var row4 = 0;
	
	// Calculate the points of the empty square
	for (var i=0; i< pieces.length; i++)
	{
		//Rows (x)
		switch (parseInt(pieces[i].style.top))
		{
			case 0:   row1 += parseInt(pieces[i].style.left); console.log(" Added to Row 1: "+row1);  break;
			case 100: row2 += parseInt(pieces[i].style.left);console.log("Added to Row 2: "+row2); break;
			case 200: row3 += parseInt(pieces[i].style.left); console.log("Added to Row 3: "+row3);break;
			case 300: row4 += parseInt(pieces[i].style.left); console.log("Added to Row 4: "+row4);break;
			default: console("Damn Stupid 1 thing! #kmft - In Top Switch");break;
		}
		
		console.log("Row 1: "+row1);console.log("Row 2: "+row2);
		console.log("Row 3: "+row3);console.log("Row 4: "+row4);
		
		// Columns (y)
		switch (parseInt(pieces[i].style.left))
		{
			case 0:   column1 += parseInt(pieces[i].style.top); console.log("Added to Column 1: "+column1);break;
			case 100: column2 += parseInt(pieces[i].style.top);console.log("Added to Column 2: "+column2); break;
			case 200: column3 += parseInt(pieces[i].style.top); console.log("Added to Column 3: "+column3);break;
			case 300: column4 += parseInt(pieces[i].style.top);console.log("Added to Column 4: "+column4); break;
			default: console("Damn Stupid2 thing! #kmft - In Left Switch");break;
		}
		
		console.log("Column 1: "+column1);console.log("Column 2: "+column2);
		console.log("Column 3: "+column3);console.log("Column 4: "+column4);
		
	}
	
	if (row1 !== 600) {emptyX = 0;}
		else if (row2 !== 600) {emptyX = 100;}
			else if (row3 !== 600) {emptyX = 200;}
				else if (row4 !== 600) {emptyX = 300;}
					else if(row1===600 && row2===600 && row3===600 && row4===600){
						console.log("Hardcode --> Row 1?!");
						emptyX = (row1-300);
					}
					
	if (column1 !== 600) {emptyY = 0;}
		else if (column2 !== 600) {emptyY = 100;} 
			else if (column3 !== 600) {emptyY = 200;}
	 			else if (column4 !== 600) {emptyY = 300;}
					else if(column1===600 && column2===600 && column3===600 && column4===600){
						console.log("Hardcode --> Column 1?!");
						emptyY = (column1-300);
					}
					
	//console.log(emptyX,emptyY);
	return [emptyX,emptyY]; 
}
	
function moveable(square) // Determine whether a given square can move or not 
{	
	//"use strict";	
		
	// Get location of empty square
	var emptySquare = getSpace();
	console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
	console.log("(Comparison) SpaceTop(x): "+emptySquare[0]+" SpaceLeft(y): "+emptySquare[1]);
	
	// Determine whether it neighbors the empty square
	if ( parseInt(square.style.top) === emptySquare[0] )
	{
		if ( parseInt(square.style.left) + 100 === emptySquare[1] || 
			 parseInt(square.style.left) - 100 === emptySquare[1] )
		{
			console.log("In moveable. Top - Same & Left - Changes. Can be moved");
			return true;
		}
		else{
			return false;	
		}
	}
	else if ( parseInt(square.style.left) === emptySquare[1] )
		 {   
			if ( parseInt(square.style.top) + 100 === emptySquare[0] || 
			     parseInt(square.style.top) - 100 === emptySquare[0] )
			{
				console.log("In moveable. Top - Changes & Left - Same. Can be moved");
				return true;
			}
			else{
				return false;
			}
		 }
	else
	{
		console.log("In moveable - Not adjacent possibly");
		console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
		console.log("(Comparison) SpaceTop(x): "+emptySquare[0]+" SpaceLeft(y): "+emptySquare[1]);
		return false;
	}
		
}

function movablePiece() //Highlight piece if moveable
{	//"use strict";
		if (moveable(this))
		{
			this.className = 'movablepiece';
		}
	
} 

//Priority --> if odd or even then unsolvale ????????????????????????????????????????????????????????????????????????????????????
function shuffle()
{	//"use strict";
	
	var listAdjPos = [];
	var priorPos = getSpace;
	var c = 0;
	
	do{
		for(key in puzzleDic){
			if(movable(puzzleDic[key])){
				listAdjPos.push(puzzleDic[key]);
			}
		}// Finding the list of positions adjacent to the empty space from the values in the dictionary
		
		if(c!==0){
			priorPos = getSpace;// Delimiter - Get current empty position prior to swap
			var remove = listAdjPos.indexOf(priorPos);// Finding the index of the prior position
			listAdjPos.splice(remove,1);// Removing this from the list of adjacent positions
		}// Ensures that the swap isn't reversed at any point in the shuffling
			
		var choice = Math.floor(Math.random() * (listAdjPos.length-1));// Selection
		movePiece(listAdjPos[choice]);// Position swap with empty space 
		
		c++;	
	}while(c<n && getSpace!==[300,300])
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**function movablePiece() // Highlight(s) the puzzle piece if it is moveable
{
	"use strict";
	
	// Get puzzle piece elements
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div');
	
	for (var i=0; i< pieces.length; i++)
	{
		if (moveable(pieces[i]))
		{
			pieces[i].className = "movablepiece";
		}
	}
}**/

/**function resetPiece()
{
	this.className = 'puzzlepiece'; //re-sizes the div
} //Once the cursor is no longer hovering over the square, its appearance should revert to its original state**/
