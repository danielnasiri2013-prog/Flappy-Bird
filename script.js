const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Bird
let bird = {
  x: 50,
  y: 200,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

// Pipes
let pipes = [];
let frame = 0;
let score = 0;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height);
  });
}

function updatePipes() {
  if (frame % 100 === 0) {
    let top = Math.random() * 200 + 50;
    let gap = 150;
    pipes.push({
      x: canvas.width,
      width: 50,
      top: top,
      bottom: top + gap
    });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Collision
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      resetGame();
    }

    if (pipe.x + pipe.width === bird.x) {
      score++;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    resetGame();
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function resetGame() {
  bird.y = 200;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  frame = 0;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
  drawScore();

  updateBird();
  updatePipes();

  frame++;
  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    bird.velocity = bird.lift;
  }
});

canvas.addEventListener("click", () => {
  bird.velocity = bird.lift;
});

gameLoop();
