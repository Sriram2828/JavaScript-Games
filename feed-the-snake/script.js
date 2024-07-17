// Setup and Initialization
const canvas = document.getElementById("gameCanvas");
const canvasCtx = canvas.getContext("2d");

const box = 15; // Size of the snake and food

// Initial Snake and Food Position
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 14 + 1) * box,
  y: Math.floor(Math.random() * 14 + 1) * box
};

// Score and High Score Initialization
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").textContent = highScore;

// Direction Handling
let d;
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}

// Drawing the Game
function draw() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < snake.length; i++) {
    canvasCtx.fillStyle = i%2== 0 ? "rgb(16, 246, 0)" : "rgb(0, 0, 0)";
    canvasCtx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  canvasCtx.fillStyle = "red";
  canvasCtx.fillRect(food.x, food.y, box, box);

  // Updating the Snake Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // Eating Food and Growing the Snake
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    document.getElementById("score").textContent = score;
    food = {
      x: Math.floor(Math.random() * 14 + 1) * box,
      y: Math.floor(Math.random() * 14 + 1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // Collision Detection
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScore").textContent = highScore;
    }
  }

  snake.unshift(newHead);
}

// Collision Function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// Starting the Game
let game;
document.getElementById("startButton").addEventListener("click", function() {
  clearInterval(game);
  score = 0;
  document.getElementById("score").textContent = score;
  snake = [];
  snake[0] = { x: 10 * box, y: 10 * box };
  d = undefined;
  game = setInterval(draw, 100);
});
