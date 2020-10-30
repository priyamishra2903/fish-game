let canvas = document.getElementById("canvas-top");
let ctx = canvas.getContext("2d");
let gameState = {
  rectPosX: 10,
  rectPosY: canvas.height / 2 - 10,
  rectVelocity: { x: 0, y: 0 },
  playerSpeed: 0.5,
  enemyTimeout: 60,
  enemyTimeoutInit: 60,
  enemySpeed: 1,
  enemies: [],
  friends: [],
  friendAdded: false,
  score: 0,
  highscore: 0
};
function random(n) {
  return Math.floor(Math.random() * n);
}

class RectCollider {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  isColliding(rectCollider) {
    if (
      this.x < rectCollider.x + rectCollider.width &&
      this.x + this.width > rectCollider.x &&
      this.y < rectCollider.y + rectCollider.height &&
      this.height + this.y > rectCollider.y
    ) {
      return true;
    }
    return false;
  }
}
function checkCollision(gameState) {
  let playerCollider = new RectCollider(
    gameState.rectPosX,
    gameState.rectPosY,
    10,
    10
  );
  for (let i = 0; i < gameState.enemies.length; ++i) {
    let enemyCollider = new RectCollider(
      gameState.enemies[i].x,
      gameState.enemies[i].y,
      10,
      10
    );
    if (playerCollider.isColliding(enemyCollider)) {
      return true;
    }
  }
  for (let i = 0; i < gameState.friends.length; ++i) {
    let friendCollider = new RectCollider(
      gameState.friends[i].x,
      gameState.friends[i].y,
      5,
      5
    );
    if (playerCollider.isColliding(friendCollider)) {
      gameState.playerSpeed *= 1.05;
      gameState.friends.splice(i, 1);
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.enemyTimeout -= 1;
  if (gameState.enemyTimeout == 0) {
    gameState.enemyTimeout = Math.floor(gameState.enemyTimeoutInit);
    gameState.enemies.push({
      x: canvas.width,
      y: random(canvas.height),
      velocity: gameState.enemySpeed
    });
    gameState.enemySpeed *= 1.001;
    gameState.enemyTimeoutInit = gameState.enemyTimeoutInit * 0.999;
    //console.log('timeout:'+gameState.enemyTimeoutInit);
    //console.log('speed:'+gameState.enemySpeed);
  }

  ctx.fillStyle = "#FF0000";
  gameState.rectPosX += gameState.rectVelocity.x;
  gameState.rectPosY += gameState.rectVelocity.y;
  if (gameState.rectPosX > canvas.width - 10) {
    gameState.rectPosX = canvas.width - 10;
    gameState.rectVelocity.x = 0;
  }
  if (gameState.rectPosX < 0) {
    gameState.rectPosX = 0;
    gameState.rectVelocity.x = 0;
  }
  if (gameState.rectPosY < 0) {
    gameState.rectPosY = 0;
    gameState.rectVelocity.y = 0;
  }
  if (gameState.rectPosY > canvas.height - 10) {
    gameState.rectPosY = canvas.height - 10;
    gameState.rectVelocity.y = 0;
  }
  const img3 = new Image();
  img3.src = 'images/fishyy.png';
  ctx.drawImage(img3, gameState.rectPosX, gameState.rectPosY, 30, 30);
  // ctx.fillRect(gameState.rectPosX, gameState.rectPosY, 10, 10);
  ctx.fillStyle = "#0000FF";
  const img2 = new Image();
  img2.src = 'images/whale.png';
  for (let i = 0; i < gameState.enemies.length; ++i) {
    gameState.enemies[i].x -= gameState.enemies[i].velocity;
    ctx.drawImage(img2, gameState.enemies[i].x, gameState.enemies[i].y, 30, 30);
    // ctx.fillRect(gameState.enemies[i].x, gameState.enemies[i].y, 10, 10);
  }
  for (let i = 0; i < gameState.enemies.length; ++i) {
    if (gameState.enemies[i].x < -10) {
      gameState.enemies.splice(i, 1);
      gameState.score++;
    }
  }




  document.getElementById("score").innerHTML = "score: " + gameState.score;
  if (gameState.score % 5 == 0 && gameState.friendAdded == false) {
    (new Audio('sounds/jump.mp3')).play();
    gameState.friends.push({
      x: random(canvas.width - 20),
      y: random(canvas.height - 20),
    });
    gameState.friendAdded = true;

   
  }

  var highscore = localStorage.getItem("highscore");

  if (highscore !== null) {
    if (gameState.score > highscore) {
      localStorage.setItem("highscore", gameState.score);
    }
  }
  else {
    localStorage.setItem("highscore", gameState.score);
  }

  // window.localStorage.setItem(gamestate.highscore);
  // if (gameState.score > gameState.highscore) {
  //   gameState.highscore = gameState.score;

  // }

  if (gameState.score % 10 == 1 && gameState.friendAdded == true) {
    gameState.friendAdded = false;
       
  }
  for (let i = 0; i < gameState.friends.length; ++i) {
   
    ctx.fillStyle = "#209159";
    const img = new Image();
    img.src = 'images/cupcake.png';
    ctx.drawImage(img, gameState.friends[i].x, gameState.friends[i].y, 35, 35);
    // ctx.fillRect(gameState.friends[i].x, gameState.friends[i].y, 5, 5);
  }

  if (checkCollision(gameState) == true) {
    (new Audio('sounds/jump.mp3')).play();
    (new Audio('sounds/gameover.wav')).play();
    gameState = {
      rectPosX: 10,
      rectPosY: canvas.height / 2 - 10,
      rectVelocity: { x: 0, y: 0 },
      playerSpeed: 0.8,
      enemyTimeout: 60,
      enemyTimeoutInit: 60,
      enemySpeed: 1,
      enemies: [],
      friends: [],
      friendAdded: false,
      score: 0
    };
  }
}


// document.getElementById("highscore").innerHTML = "Highscore:  ";



setInterval(update, 20);
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 39) {
    //right arrow
    gameState.rectVelocity.x = gameState.playerSpeed;
  }
  if (event.keyCode == 37) {
    //left arrow
    gameState.rectVelocity.x = -gameState.playerSpeed;
  }
  if (event.keyCode == 40) {
    //up arrow
    gameState.rectVelocity.y = gameState.playerSpeed;
  }
  if (event.keyCode == 38) {
    //down arrow
    gameState.rectVelocity.y = -gameState.playerSpeed;
  }
});
