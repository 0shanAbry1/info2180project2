//ID - 620076247
//Additional Feature - Notification that a player has won the Slidding Piece Game.

//Global variables
var n = 15;
var num_of_moves = 0;//Only if Best Time & Number of Move Feature ?????????????????????????????????????????????????????????????
var spacePos = [300,300]; //Stores the empty location

// Reference of correct positioning of puzzle pieces 
var puzzleDic = {"1":[0,0],"2":[0,100],"3":[0,200],"4":[0,300],"5":[100,0],"6":[100,100],"7":[100,200],"8":[100,300],"9":[200,0],"10":[200,100],"11":[200,200],"12":[200,300],"13":[300,0],"14":[300,100],"15":[300,200]}

window.onload = function()
{	//"use strict";
	
	var game_area = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	loc_img(game_area); //Function call
	
	document.getElementById("shufflebutton").onclick = shuffle; //Function call
	
	for (var i=0; i< game_area.length; i++)
	{
		game_area[i].className = 'puzzlepiece'; //CSS - Image and Size
		
		game_area[i].onmouseover = function(){
			if(movable(this)){
				this.classList.add("movablepiece");
			}
			else{
				this.classList.remove("movablepiece");
			}
		} //EL - Highlights adjacent puzzle pieces (Valid moves)
				
    	game_area[i].onclick = movePiece;
		//console.log("Call was made to movePiece with "+game_area.offsetTop+", ",+game_area.offsetLeft);
		
	} //Addition of relevant Cascading Style Sheet (CSS) and Event Listeners (EL) to puzzle pieces
	
}//Main

function loc_img(pieces)
{	//"use strict";
	var puzzleHeight = 400; //Height & width
	
	/*for (var i=0; i< pieces.length; i++)
	{
		pieces[i].className = 'puzzlepiece'; //CSS - Image and Size
	}//Addition of CSS to the class 'puzzlepiece'*/
	
	var j = 0;
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
	} //Correct Order
		
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
}//This function arrange the 15 puzzle pieces (Correct Order and Background Image)

function shuffle()
{	//"use strict";
	
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	console.log(pieces);
	var listAdjPos = [];
	var c = 0;
	
	do{
		for(var s = 0; s<pieces.length; s++){
			if(movable(pieces[s])){
				listAdjPos.push(pieces[s]);
			}
		}// Finding the list of positions adjacent to the empty space from the values in the dictionary
		
		console.log("In shuffle. Array: "+listAdjPos);
		
		if(c!==0){
			//var remove = listAdjPos.indexOf(spacePos);// Finding the index of the prior position
			console.log("Inside c!==0");
			
			for(var i=0; i<listAdjPos.length; i++){
				if(((parseInt(listAdjPos[i].style.top)) === (spacePos[0])) 
				&& (parseInt((listAdjPos[i].style.left)) === (spacePos[1]))){
					listAdjPos.splice(i,1);// Removing this from the list of adjacent positions
					break;
				}
			}
			
		}// Ensures that the swap isn't reversed at any point in the shuffling
			
		var choice = Math.floor(Math.random() * (listAdjPos.length-1));// Selection
		move(listAdjPos[choice]);
		c++;	
	}while(c<n && spacePos!==[300,300])
}//Thus function shuffles puzzle pieces when the button is clicked

function movable(square)
{ 	//"use strict";	
		
	console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
	console.log("(Comparison) SpaceTop(x): "+spacePos[0]+" SpaceLeft(y): "+spacePos[1]);
	
	// Determine whether it neighbors the empty square
	if ( parseInt(square.style.top) === spacePos[0] )
	{
		if ( parseInt(square.style.left) + 100 === spacePos[1] || 
			 parseInt(square.style.left) - 100 === spacePos[1] )
		{
			console.log("In moveable. Top - Same & Left - Changes. Can be moved");
			return true;
		}
		else{
			return false;	
		}
	}
	else if ( parseInt(square.style.left) === spacePos[1] )
		 {   
			if ( parseInt(square.style.top) + 100 === spacePos[0] || 
			     parseInt(square.style.top) - 100 === spacePos[0] )
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
		console.log("(Comparison) SpaceTop(x): "+spacePos[0]+" SpaceLeft(y): "+spacePos[1]);
		return false;
	}
}//This functions checks the validity of possible moves (i.e. Only adjacent puzzle pieces to the space)

function movePiece() 
{	//"use strict";
	
	if (movable(this))
	{	
		move(this);
		
		// Count the number of moves made --> Test if player has won with that move --> If not then increment ???????????????????
		//num_of_moves++; console.log("Count of Moves: "+num_of_moves);//??????????????????????????????????????????????????????????
	}
	else
	{console.log("In movePiece. This: X --> "+this.offsetTop+" Y --> "+this.offsetLeft+" ... Not able to be moved");}
}//This function validates player's moves and relays the appropriate action(s)

function move(current){
	var priorPos = spacePos.slice(0); // Holding current space before move
		
	// Change coordinates of empty space to piece being moved
	spacePos = [parseInt(current.style.top),parseInt(current.style.left)];
		
	console.log("Empty Square coordinates: "+spacePos);
		
	// Execute move of given puzzle piece
	current.style.top = priorPos[0] + "px";
	current.style.left = priorPos[1] + "px";
	
	hasWon(); //????????????????????????????????????????????????????????????????????????????????????????????????????????????????
}//This function performs the actual swap of puzzle piece to empty slot

function hasWon(){
	/**var correct = 0; //Counts the number of puzzle pieces in the correct order
	var found = false; //If the location of the puzzle piece and value are the same
	var track = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	//console.log(track);
	
	//Using a for each --> Go through the array and find the location that is equivalent to the the dictionary
	//finding this, check if the key and text are equal; if not then flag is false but if true continue to the next key:value
	//When m=15 and the flag is true then call on change image
	
	for(key in puzzleDic){
		for(var w=0;w<track.length;w++){
			if((parseInt(track[w].style.top)===puzzleDic[key][0]) && (parseInt(track[w].style.left)===puzzleDic[key][1])){
				found = true;
				if(track[w].textContent===key){
					correct++;
					break;
				}	
			}
			if(found){
				break;
			}//If found but key!== to the textContent	
		}//Traversing through the array of puzzple piece to find number of equivalence
		found = false; //resets
	}//Traversing through the dictionary key:value pair
	
	if(correct = 15){
		image_changer(track);
	}//Function call*/
	
	//Get an array of the divs --> check each elements' for equivalence
	//Flag - Assumed to be true (Controls the while)
	//Equivalence:- If each element (A) Has the same position [x,y] === (style Top and Left) AND (B) key === text in the divs
	//If equivalence false then flag is set then while terminated.
	//However, if flag is true and counter = 15 then display winner.jpg??????????????????????????????????????????????????????????
	
	var m = 0; 
	var winner = true;
	var track = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	
	while(winner){
		for(key in puzzleDic){
			console.log(track[m].style.top);
			
			if ((parseInt(track[m].style.top)) === (puzzleDic[key][0])
			&& (parseInt(track[m].style.left)) === (puzzleDic[key][1]) 
			&& (track[m].textContent!==key)){
				winner = false;
				//m = 15;
				break;
			}
			m++;
		}
		
		if(winner === true && m===15){
			image_changer(track);
		}//Notification that the player has won the game
	}
}//This function verifies if upon moving a selected piece if the player has won the game

function image_changer(tile){	
	var para = document.createElement("p");//Create paragraph tag
	var node = document.createTextNode("YOU WON! CONGRATS!");//Create text for the paragraph tag
	para.appendChild(node);//Adding text to tag
			
	var location = document.getElementById("controls");
	location.appendChild(para);
	
	for(var ic = 0; ic<tile.length; ic++){
		tile[ic].style.backgroundImage = "url('https://googledrive.com/host/0B3zmJAfIk6jvb2V5c3MxeUdIREkzSklLYW9sekJCdE1rY0NZ')";
	}
}//Notification that the player has won the game
