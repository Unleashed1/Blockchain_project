const luffy = document.getElementById('luffy');
const gameContainer = document.querySelector('.game-container');
const background = document.querySelector('.background');
const gameForm = document.getElementById('game-form');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const gameInsights = document.getElementById('game-insights');
const username = document.getElementById('username');

const scoreBoard = document.getElementById('score');

let isJumping = false;
let score = 0;
let obstacles = [];
let bgPosition = 0;

function jump() {
  if (!isJumping) {
    isJumping = true;
    let position = 0;
    const jumpInterval = setInterval(() => {
      if (position >= 170) {
        clearInterval(jumpInterval);
        let downInterval = setInterval(() => {
          if (position === 0) {
            clearInterval(downInterval);
            isJumping = false;
          }
          position -= 10;
          luffy.style.bottom = position + 'px';
        }, 20);
      }
      position += 10;
      luffy.style.bottom = position + 'px';
    }, 20);
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
  const images = obstacleImages.map((imageName) => 'png/' + imageName);

  const obstacle = document.createElement('img');
  obstacle.classList.add('obstacle');
  obstacle.src = pickRandomImage(images);

  gameContainer.appendChild(obstacle);
  obstacles.push(obstacle);

  obstacle.style.left = '800px';
  obstacle.style.bottom = '0px';

  moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
  let obstaclePosition = 800;
  const speed = 5 + Math.random() * 5;

  const moveInterval = setInterval(() => {
    if (obstaclePosition < -148) {
      clearInterval(moveInterval);
      obstacle.remove();
      obstacles = obstacles.filter((ob) => ob !== obstacle);
    } else {
      obstaclePosition -= speed;
      obstacle.style.left = obstaclePosition + 'px';

      if (!isJumping && checkCollision(obstacle)) {
        endGame();
        clearInterval(moveInterval);
      }
    }
  }, 20);

  setTimeout(createObstacle, Math.random() * 3000 + 1000);
}

function checkCollision(obstacle) {
  const luffyRect = luffy.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return (
    luffyRect.bottom >= obstacleRect.top &&
    luffyRect.top <= obstacleRect.bottom &&
    luffyRect.right >= obstacleRect.left &&
    luffyRect.left <= obstacleRect.right
  );
}

function endGame() {
  alert('Game Over!');
  scoreBoard.innerHTML = 'Score: ' + score;
  obstacles.forEach((obstacle) => obstacle.remove());
  obstacles = [];
  score = 0;

  // display restart btn
  restartBtn.style.display = 'block';


}

function updateScore() {
  score++;
}

setInterval(updateScore, 100);

function moveBackground() {
  bgPosition -= 1;

  if (bgPosition <= -800) {
    bgPosition = 0;
  }

  background.style.backgroundPositionX = bgPosition + 'px';

  requestAnimationFrame(moveBackground);
}

function startGame(e) {
  makePayment();
  e.preventDefault();
  moveBackground();
  createObstacle();

  // hide background
  background.style.display = 'none';
}

gameForm.addEventListener('submit', startGame);

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

