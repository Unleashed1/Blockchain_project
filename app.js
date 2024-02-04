const luffy = document.getElementById('luffy');
const gameContainer = document.querySelector('.game-container');
const background = document.querySelector('.background');
const gameForm = document.getElementById('game-form');
const startBtn = document.getElementById('start');
const mintBtn = document.getElementById('mint');
const restartBtn = document.getElementById('restart');
const gameInsights = document.getElementById('game-insights');
const username = document.getElementById('username').value;
const chiave = 'exrctvyb';



let payment=startBtn.onclick();

let jumpInterval;
let scoreInterval;

let up = false;
//Variabili delle vite
const L1 = document.getElementById("L1");
const L2 = document.getElementById("L2");
const L3 = document.getElementById("L3");

const scoreBoard = document.getElementById('score');

let isJumping = false;
let score = 0;
let obstacles = [];
let bgPosition = 0;
let s=0;
let gameStart = false;
startBtn.disabled = false;
mintBtn.disabled = true;

function jump() {
  if (!isJumping) {
    isJumping = true;
    let position = 2;
    jumpInterval = setInterval(() => {
        up=true;
        if (position >= 250 ) {
          clearInterval(jumpInterval);
          up = false;
          downInterval = setInterval(() => {
            if (position <= 2 ) {
              clearInterval(downInterval);
              isJumping = false;
            }
            position -= s/2;
            luffy.style.bottom = position + 'px';
          }, 15);
        }
        position += s/2;
        luffy.style.bottom = position + 'px';
      }, 15);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

const obstacleImages = [
  '15766.png',
  '15767.png',
  '15770.png',
  '15775.png',
  '15782.png',
];

function pickRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

async function createObstacle() {
  if (gameStart){
    console.log('create obstacle');
    s = s + 0.8;//+Math.random(0.5,0.8);

    const images = obstacleImages.map((imageName) => 'png/' + imageName);

    const obstacle = document.createElement('img');

    //obstacle.style.left = '800px';
    //obstacle.style.bottom = '0px';

    obstacle.classList.add('obstacle');
    obstacle.src = pickRandomImage(images);

    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);

    moveObstacle(obstacle);

  }
}

function moveObstacle(obstacle) {
  let obstaclePosition = 1800;

  const moveInterval = setInterval(() => {
    if (obstaclePosition < -150) {
      clearInterval(moveInterval);
      obstacle.remove();
      obstacles = obstacles.filter((ob) => ob !== obstacle);
    } else {
      obstaclePosition -= s;
      obstacle.style.left = obstaclePosition + 'px';

      if (checkCollision(obstacle)) {
        endGame();
        clearInterval(moveInterval);
      }
      else{
        //updateScore()
        scoreBoard.innerHTML = 'Score: ' + score;
      }
    }
  }, 20);

}

setInterval(createObstacle, 4500);

function checkCollision(obstacle) {
  const luffyRect = luffy.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  /*console.log('obstacle')
  console.log(obstacleRect.left)
  console.log(obstacleRect.right)
  
  console.log('luffy')
  console.log(luffyRect.left)
  console.log(luffyRect.right)*/

  return (
    luffyRect.bottom >= obstacleRect.top + 10 &&
    luffyRect.top <= obstacleRect.bottom &&
    luffyRect.right >= obstacleRect.left + 40 &&
    luffyRect.left <= obstacleRect.right + 10
  );
}

async function endGame() {
  s=5;
  clearInterval(scoreInterval);
  scoreBoard.innerHTML = 'Score: ' + score;
  obstacles.forEach((obstacle) => obstacle.remove());
  obstacles = [];
  if (up){
    clearInterval(jumpInterval);
    let position = parseInt(luffy.style.bottom);
    downInterval = setInterval(() => {
      if (position <= 2 ) {
        clearInterval(downInterval);
        isJumping = false;
        down=false;
      }
      position -= s/2;
      luffy.style.bottom = position + 'px';
    }, 15);
    up=false;
  }
  // display restart btn
  restartBtn.disabled = false;
  mintBtn.disabled = false;
  gameStart=false;

  //check delle vite

  if (L1.hidden == false){
    if(L2.hidden == false){
      if(L3.hidden == false){
        L3.hidden=true;
        alert('OH no, you lose one life!');
      }
      else{
        L2.hidden = true;
        alert('OH no, you lose one life!');
      }
    } 
    else{
      L1.hidden = true;
      alert('Game Over!');
      startBtn.disabled = false;
      restartBtn.disabled = true;
      mintBtn.disabled = true;
      payment=false;
      mintScore();
      score = 0;
    } 

  }
  //const nome_giocatore = 'NomeGiocatore'; // Sostituisci con il nome del giocatore
  //const punteggio = 1000; // Sostituisci con il punteggio
  /*const chiave = 'fefe';
  fetch('http://localhost:8080', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ chiave, score, username}),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Risposta dal server:', data);
  })
  .catch(error => {
    console.error('Errore durante la richiesta al server:', error);
  });
  fetch("http://localhost:8080")
        .then(function (response) {
          return console.log(response.json());
        })*/
}

function updateScore() {
  score++;
}

function restartGame(){
  gameStart = true;
  moveBackground();
  scoreInterval = setInterval(updateScore, 250);
}


//setInterval(updateScore, 100);


function moveBackground() {
  bgPosition -= 1;

  if (bgPosition <= -800) {
    bgPosition = 0;
  }

  background.style.backgroundPositionX = bgPosition + 'px';

  requestAnimationFrame(moveBackground);
}

function startGame() {

  if (!payment){
    s=5;
    gameStart = true;
    //e.preventDefault();
    moveBackground();
    //createObstacle();
    startBtn.disabled = true;
    mintBtn.disabled = false;
      // hide background
    background.style.display = 'none';
    scoreInterval = setInterval(updateScore, 250);
    //Vite visualizzate tutte e 3 almeno finchè non sarà implementato il pagamento
    L1.hidden=false;
    L2.hidden=false;
    L3.hidden=false;
  }else{
    alert("E' necessario il pagamento per poter giocare!");
  }

  
}
//gameForm.addEventListener('submit', startGame);

startBtn.addEventListener('click',startGame);
restartBtn.addEventListener('click',restartGame);
mintBtn.addEventListener('click',mintScore);

async function mintScore(){
//aggiornare il db con il nuovo punteggio se è un nuovo record e salvarlo
//generare la chiave e darla al giocatore
try {
  console.log(JSON.stringify({ score, username, chiave }))

  const response = await fetch('http://localhost:3000/api/dati', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score, username, chiave })
  });

  if (!response.ok) {
    throw new Error('Errore nella richiesta: '+ response.status + ' ' + response.statusText);
  }

  // Continua con la gestione della risposta
} catch (error) {
  console.error('Errore durante la richiesta:', error.message);
}
}

document.getElementById
// jump luffy on click space
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});


// get username
function getUsername(e) {
  e.preventDefault();
  const name = username.value;
  gameInsights.innerHTML = `Hello ${name}! <br> Use spacebar to jump.`;
}


