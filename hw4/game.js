var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 5,
    speed: 3,
    movingUp: false,
    movingLeft: false
};
var paddle = {
    height: 20,
    width: 75
};
var players = window.localStorage.getItem("players") || "[]";
players = JSON.parse(players);

paddle.x = (canvas.width - paddle.width) / 2;

var brickMetadata = {
    width: 75,
    height: 20,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
    rowCount: 3,
    remaining: 0
};

brickMetadata.columnCount = (canvas.width) / (brickMetadata.width + brickMetadata.padding + brickMetadata.offsetLeft);

var bricks = [];

var score = 0;
var level = 0;
var interValSpeed = 50;

var timeElapsed = 0;
var lives = 3;

function newLevel() {
    score == 0 ? paddle.width : paddle.width = (paddle.width - 12);
    ball.speed += 2;
    level++;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.movingUp = false;
    var i;
    var j;
    for (i = 0; i < brickMetadata.rowCount; i++) {
        bricks[i] = [];
        for (j = 0; j < brickMetadata.columnCount; j++) {
            bricks[i][j] = {
                x: 0,
                y: 0,
                broken: 1,
                points: Math.floor(Math.random() * 4) + 1

            };
        }
    }
    brickMetadata.remaining = bricks[0].length * bricks.length;
}


function drawBricks() {
    for (var i = 0; i < brickMetadata.rowCount; i++) {
        for (var j = 0; j < brickMetadata.columnCount; j++) {
            if (bricks[i][j].broken == 1) {
                var brickX = (j * (brickMetadata.width + brickMetadata.padding)) + brickMetadata.offsetLeft;
                var brickY = (i * (brickMetadata.height + brickMetadata.padding)) + brickMetadata.offsetTop;

                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickMetadata.width, brickMetadata.height);
                ctx.fillStyle = "rgba(0,149,221," + bricks[i][j].points * 0.2 + ")";
                ctx.fill();
                ctx.closePath();


            }
        }
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function paddleMove(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    for (var i = 0; i < brickMetadata.rowCount; i++) {
        for (var j = 0; j < brickMetadata.columnCount; j++) {
            var b = bricks[i][j];
            if (b.broken == 1) {
                if (ball.x >= b.x - ball.size && ball.x <= b.x + brickMetadata.width + ball.size && ball.y > b.y && ball.y < (b.y) + brickMetadata.height) {
                    b.broken = 0;
                    ball.movingUp = !ball.movingUp;
                    ball.movingLeft = (Math.random() > 0.5) //Picking a Random Direction
                    score += b.points;
                    brickMetadata.remaining--;
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    ctx.closePath();
    ctx.fillStyle = "#d11aff";
    ctx.fillText("Lives: " + lives, 100, 20);
}


function drawRank() {
    var rank = players.findIndex(function(player) {
        return score > player.score;
    }) + 1;
    if (!rank && !players.length) {
        rank = 1;
    }
    else if (!rank) {
        rank = players.length + 1;
    }
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Rank: " + rank, 240, 20);
}

function drawGameResult() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#d11aff";
    if (lives > 0) {
        ctx.fillText("You Won", (canvas.width / 2) - 40, (canvas.height / 2) - 30);
        var name = window.prompt("Please Enter Your Name", "Player");
        players.push({
            name: name,
            score: score
        });
        players.sort(function(a, b) {
            return b.score - a.score
        });
    }
    else {
        ctx.fillText("Game Over", (canvas.width / 2) - 40, (canvas.height / 2) - 30);
    }
    if (players.length)
        ctx.fillText("High Scores", (canvas.width / 2) - 20, (canvas.height / 2));

    window.localStorage.setItem("players", JSON.stringify(players));
    players.forEach(function(player, idx) {
        if (idx < 5)
            ctx.fillText("Player : " + player.name + " Score : " + player.score, (canvas.width / 2) - 20, (canvas.height / 2) + (idx + 1) * 20);
    });
}

function drawTimeElapsed() {

    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Time: " + Math.round(timeElapsed), canvas.width - 100, 20);

}


var draw = () => {

    timeElapsed = timeElapsed + 0.05;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ball.y <= 0) {
        ball.movingUp = !ball.movingUp;
    }
    if (ball.x >= paddle.x - ball.size && ball.x <= paddle.x + paddle.width + ball.size) {
        if (ball.y >= canvas.height - paddle.height - (ball.size))
            ball.movingUp = true;
    }
    else {
        if (ball.y >= canvas.height) {
            if (lives != 1) {
                ball.movingUp = !ball.movingUp;
                lives--;
                score = (score - 5) > 0 ? (score - 5) : 0;
            }
            else {
                lives--;
                clearInterval(interval);
                drawScore();
                drawTimeElapsed();
                drawRank();
                drawGameResult();
                return;

            }
        }
    }
    if (ball.x >= canvas.width || ball.x <= 0) {
        ball.movingLeft = !ball.movingLeft;
    }
    ball.movingLeft ? ball.x -= ball.speed : ball.x += ball.speed;
    ball.movingUp ? ball.y -= ball.speed : ball.y += ball.speed;

    drawScore();
    drawTimeElapsed();
    drawRank();
    drawBall();
    drawPaddle();
    if (brickMetadata.remaining == 0) {
        newLevel();
        if (level == 4) {
            clearInterval(interval);
            drawGameResult();
            return;
        }
    }
    drawBricks();
    collisionDetection();


}

document.addEventListener("mousemove", paddleMove, false)

var interval = setInterval(draw, interValSpeed);
