//ID - 620076247
//Additional Feature - Notification that a player has won the Slidding Piece Game.

//Global variables
var spacePos = [300,300]; //Stores the empty location

// Reference of correct positioning of puzzle pieces 
var puzzleDic = {"1":[0,0],"2":[0,100],"3":[0,200],"4":[0,300],"5":[100,0],"6":[100,100],"7":[100,200],"8":[100,300],"9":[200,0],"10":[200,100],"11":[200,200],"12":[200,300],"13":[300,0],"14":[300,100],"15":[300,200]}

window.onload = function(){	
	var game_area = document.getElementById("puzzlearea").getElementsByTagName('div'); //Array of the div with 15 divs
	loc_img(game_area); //Function call
	
	document.getElementById("shufflebutton").onclick = shuffle; //Function call
	
	for (var i=0; i< game_area.length; i++){
		game_area[i].className = 'puzzlepiece'; //CSS - Image and Size
		game_area[i].onclick = movePiece; //EL - Monitors when the mouse clicks on a puzzle piece and performs necessary actions
		game_area[i].onmouseover = function(){
			if(movable(this)){this.classList.add("movablepiece");}
			else{this.classList.remove("movablepiece");}
		} //EL - Highlights adjacent puzzle pieces (i.e. valid moves only)
	} //Addition of relevant Cascading Style Sheet (CSS) and Event Listeners (EL) to puzzle pieces	
}//Main

function loc_img(pieces){	
	var puzzleHeight = 400; //Height and Width
	
	var j = 0;
	for (var x = 0; x < puzzleHeight; x+= 100){
		for (var y = 0; y < puzzleHeight; y +=100){	
			if(j!==15){
				pieces[j].style.top = x + "px";
				pieces[j].style.left = y + "px";
				j++; //console.log(x,y);
			}	
			else{break;}
		}
	} //Correct Order
		
	var k = 0;
	for (var yPos = puzzleHeight; yPos >= 100; yPos-= 100){
		for (var xPos = 0; xPos >= -1*(puzzleHeight-100); xPos -= 100){
			if(k!==15){
				pieces[k].style.backgroundPosition = (xPos + "px ") + (yPos + "px");
				k++; //console.log(xPos, yPos);
			}
			else{break;}
		}
	} //Background Image	
}//This function arrange the 15 puzzle pieces (Correct Order and Background Image)

function shuffle(){	
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	var listAdjPos = [];
	var c = 0;
	
	do{
		for(var s = 0; s<pieces.length; s++){
			pieces[s].style.backgroundImage = "url('https://googledrive.com/host/0B3zmJAfIk6jvbUZMeGZWcDhoMWozRWlKSWRzWnBnY3cxV0RV')";//????????????????????????????????????????
			if(movable(pieces[s])){listAdjPos.push(pieces[s]);}
		}// Finding the list of positions adjacent to the empty space from the values in the dictionary
		
		if(c!==0){
			for(var i=0; i<listAdjPos.length; i++){
				if(((parseInt(listAdjPos[i].style.top)) === (spacePos[0])) 
				&& (parseInt((listAdjPos[i].style.left)) === (spacePos[1]))){
					listAdjPos.splice(i,1);break;// Removing this from the list of adjacent positions
				}
			}
		}// Ensures that the swap isn't reversed at any point in the shuffling
			
		var choice = Math.floor(Math.random() * (listAdjPos.length-1));// Selection
		move(listAdjPos[choice]);c++;	
	}while(c<(pieces.length) && spacePos!==[300,300])
}//Thus function shuffles puzzle pieces when the button is clicked

function movable(square){ 	
	if (parseInt(square.style.top) === spacePos[0] ){
		if (parseInt(square.style.left) + 100 === spacePos[1] 
		|| parseInt(square.style.left) - 100 === spacePos[1])
		{return true;}
		else{return false;}
	}
	else if (parseInt(square.style.left) === spacePos[1]){   
		if (parseInt(square.style.top) + 100 === spacePos[0] 
		|| parseInt(square.style.top) - 100 === spacePos[0])
		{return true;}
		else{return false;}
	}
	else{return false;}
}//This functions checks the validity of possible moves (i.e. Only adjacent puzzle pieces to the space)

function movePiece(){	
	if (movable(this)){move(this);}
}//This function validates player's moves and relays the appropriate action(s)

function move(current){
	var priorPos = spacePos.slice(0); // Holds the current space coordinates
	spacePos = [parseInt(current.style.top),parseInt(current.style.left)]; // Updates space coordinates
	current.style.top = priorPos[0] + "px";current.style.left = priorPos[1] + "px"; // Executes the move
	hasWon(); //Checks to see if the player won with this move
}//This function performs the actual swap of puzzle piece to empty slot

function hasWon(){
	var correct = 0;var area = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	for(var w = 0; w<area.length; w++){
		for(key in puzzleDic){
			if(puzzleDic[key]!==spacePos){
				if((parseInt(area[w].style.top)===puzzleDic[key][0]) 
				&& (parseInt(area[w].style.left)===puzzleDic[key][1])){
					if(area[w].textContent===key){
						correct++;
					}//Increments if equivalent
				}//Compares the div properties of the current puzzle piece with the value of the key
			}//Eliminates the possibility of an equivalence check with the space location
		}//Traversing through the dictionary key:value pair
	}//Traversing through the array of puzzple pieces
	if(correct === 15){image_changer(area);}
}

function image_changer(tile){	
	var para = document.createElement("p");//Create paragraph tag
	var node = document.createTextNode("YOU WON! CONGRATS!");//Create text for the paragraph tag
	para.appendChild(node);//Adding text to tag
	var location = document.getElementById("controls");location.appendChild(para);
	for(var ic = 0; ic<tile.length; ic++){tile[ic].style.backgroundImage = "url('https://googledrive.com/host/0B3zmJAfIk6jvb2V5c3MxeUdIREkzSklLYW9sekJCdE1rY0NZ')";}
}//Notification that the player has won the game
