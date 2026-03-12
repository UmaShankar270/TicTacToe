const board = document.getElementById("board");
const statusText = document.getElementById("status");

let playerScore = 0;
let aiScore = 0;

const playerScoreText = document.getElementById("playerScore");
const aiScoreText = document.getElementById("aiScore");

let cells = [];
let gameActive = true;

const winPatterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function createBoard(){
board.innerHTML="";
cells=[];

for(let i=0;i<9;i++){
const cell=document.createElement("div");
cell.classList.add("cell");
cell.dataset.index=i;

cell.addEventListener("click",playerMove);

board.appendChild(cell);
cells.push(cell);
}
}

function playerMove(){

if(this.textContent!==""||!gameActive)return;

this.textContent="X";

if(checkWinner("X")){
statusText.textContent="You Win!";
playerScore++;
playerScoreText.textContent=playerScore;
gameActive=false;
return;
}

if(isDraw()){
statusText.textContent="Draw!";
gameActive=false;
return;
}

aiMove();
}

function aiMove(){

let emptyCells=cells.filter(c=>c.textContent==="");

let randomCell=emptyCells[Math.floor(Math.random()*emptyCells.length)];

randomCell.textContent="O";

if(checkWinner("O")){
statusText.textContent="Computer Wins!";
aiScore++;
aiScoreText.textContent=aiScore;
gameActive=false;
return;
}

if(isDraw()){
statusText.textContent="Draw!";
gameActive=false;
}
}

function checkWinner(player){

return winPatterns.some(pattern=>{
return pattern.every(index=>{
return cells[index].textContent===player;
});
});
}

function isDraw(){
return cells.every(cell=>cell.textContent!=="");
}

function restartGame(){
gameActive=true;
statusText.textContent="Your Turn";
createBoard();
}

createBoard();