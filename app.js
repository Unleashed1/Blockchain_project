const luffy = document.getElementById('luffy');
const gameContainer = document.querySelector('.game-container');
const background = document.querySelector('.background');
const gameForm = document.getElementById('game-form');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const gameInsights = document.getElementById('game-insights');
const username = document.getElementById('username');

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
//funzione pagamento

async function makePayment() {
  alert("aaa");
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new Web3(window.ethereum);

          const accounts = await provider.eth.getAccounts();
          const userAddress = accounts[0];
          const receiverAddress = '0x2DA17fae63983FF03cf36b4E1fD87c3516FB3Aab';//receiverAddress

          const contractABI =[];
          const contractAddress = '0x6317DAAac97B1B01c0B0ee24bd1dc17b234EA24f'; // Replace with your contract's address

          const contract = new provider.eth.Contract(contractABI, contractAddress);
          contract.methods.makePaymentTo(receiverAddress)
            .send({ from: userAddress, value: provider.utils.toWei('1', 'ether') })
            .on('transactionHash', function (hash) {
              console.log('Transaction Hash:', hash);
              alert("Transaction confirmed!")

            })
            .on('error', function (error) {
              console.error('Transaction Error:', error);
              // Handle error
            });
        } catch (error) {
          console.error('MetaMask account access denied or error:', error);
          // Handle error
        }
      } else {
        console.error('MetaMask not detected');
        // Inform the user to install MetaMask
      }
    }




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

function endGame() {
  s=5;
  alert('Game Over!');
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
    
  }
  // display restart btn
  restartBtn.disabled = false;
  gameStart=false;

  //check delle vite

  if (L1.hidden == false){
    if(L2.hidden == false){
      if(L3.hidden == false){
        L3.hidden=true;
      }
      else{
        L2.hidden = true;
      }
    } 
    else{
      L1.hidden = true;
      score = 0;
      startBtn.disabled = false;
      restartBtn.disabled = true;
    } 
  }
 
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
  //add the payment function
  makePayment()

  s=5;
  gameStart = true;
  //e.preventDefault();
  moveBackground();
  //createObstacle();
  startBtn.disabled = true;
    // hide background
  background.style.display = 'none';
  scoreInterval = setInterval(updateScore, 250);
  //Vite visualizzate tutte e 3 almeno finchè non sarà implementato il pagamento
  L1.hidden=false;
  L2.hidden=false;
  L3.hidden=false;
}
//gameForm.addEventListener('submit', startGame);

startBtn.addEventListener('click',startGame)
restartBtn.addEventListener('click',restartGame)

//gameForm.addEventListener('restart', restartGame); 


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

