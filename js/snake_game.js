const canvas = document.getElementById("snake_game");
const ctx = canvas.getContext("2d");

// Об'єкти фоток і звідки їх беремо
const ground = new Image();
ground.src = "img/ground.png";

let foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32; // 32х32px ширина квадрата

let score = 0;

// Рандомно появляється їжа
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};


// Позиція змії
let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};


// Вичисляє події, відповідає ха дію при нажиманні на клавіатуру
document.addEventListener("keydown", direction);

let dir; // Напрямок

// Вказує рухи кнопок
function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

// Якщо змія пересіче хвіст, то кінець гри
function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y){
			clearInterval(game);
			ctx.fillStyle = "red";
			ctx.font = "70px Stencil";
			ctx.fillText("You lose!", box * 4.3, box * 9.5);

			ctx.fillStyle = "white";
			ctx.font = "20px Bahnschrift";
			ctx.fillText("Refresh the game", box * 6.5, box * 11);

			ctx.fillStyle = "#007bff";
			ctx.font = "35px Bodoni MT Black";
			ctx.fillText("Collected apples : " + score, box * 3.8, box * 12.8);
		}
	}
}

// Функція яка відображає цілу гру і її функції
function drawGame() {
	ctx.drawImage(ground, 0, 0); // Розміщення фото

	ctx.drawImage(foodImg, food.x, food.y); // Розміщення фото

// Добавляє змії квадрати з заданими кольорами
	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "red" : "orange" && i == 1 ? "orange" : "yellow"
		&& i == 2 ? "yellow" : "green" && i == 3 ? "green" : "#007DFF" && i == 4 ? "#007DFF" : "blue"
		&& i == 5 ? "blue" : "#702963" && i == 6 ? "#702963" : "#E32636" && i == 7 ? "#E32636" : "#FFA500"
		&& i == 8 ? "#FFA500" : "#FFDB58" && i == 9 ? "#FFDB58" : "#0BDA51" && i == 10 ? "#0BDA51" : "#00FFFF"
		&& i == 11 ? "#00FFFF" : "#007BA7" && i == 12 ? "#007BA7" : "#FF00FF" && i == 13 ? "red" : "orange" && i == 1 ? "orange" : "yellow"
		&& i == 14 ? "yellow" : "green" && i == 15 ? "green" : "#007DFF" && i == 16 ? "#007DFF" : "blue"
		&& i == 17 ? "blue" : "#702963" && i == 18 ? "#702963" : "#E32636" && i == 19 ? "#E32636" : "#FFA500"
		&& i == 20 ? "#FFA500" : "#FFDB58" && i == 21 ? "#FFDB58" : "#0BDA51" && i == 22 ? "#0BDA51" : "#00FFFF"
		&& i == 23 ? "#00FFFF" : "#007BA7" && i == 23 ? "#007BA7" : "#FF00FF" && i == 25 ? "red" : "orange" && i == 1 ? "orange" : "yellow"
		&& i == 26 ? "yellow" : "green" && i == 27 ? "green" : "#007DFF" && i == 28 ? "#007DFF" : "blue"
		&& i == 29 ? "blue" : "#702963" && i == 30 ? "#702963" : "#E32636" && i == 31 ? "#E32636" : "#FFA500"
		&& i == 32 ? "#FFA500" : "#FFDB58" && i == 33 ? "#FFDB58" : "#0BDA51" && i == 34 ? "#0BDA51" : "#00FFFF"
		&& i == 35 ? "#00FFFF" : "#007BA7" && i == 36 ? "#007BA7" : "#FF00FF";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "35px Stencil";
	ctx.fillText("Total : ", box * 2.5, box * 1.6);

	ctx.fillStyle = "#fa0244";
	ctx.font = "50px Stencil";
	ctx.fillText(score, box * 6.6, box * 1.7);

	ctx.fillStyle = "#fa8602";
	ctx.font = "45px Algerian";
	ctx.fillText("Snake_Game", box * 9, box * 1.7);

// Зберігання координат
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

// Коли змія з'їдаї 1 їжу, вона появляється в іншому місці, +1 очко
	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop(); // Видаляє останній елемент в масиві

// Зіткнення з стінками
	if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17){
		clearInterval(game);
		ctx.fillStyle = "red";
		ctx.font = "70px Stencil";
		ctx.fillText("You lose!", box * 4.3, box * 9.5);

		ctx.fillStyle = "white";
		ctx.font = "20px Bahnschrift";
		ctx.fillText("Refresh the game", box * 6.5, box * 11);

		ctx.fillStyle = "#007bff";
		ctx.font = "35px Bodoni MT Black";
		ctx.fillText("Collected apples : " + score, box * 3.8, box * 12.8);
	}

// При нажиманні кнопки в якусь сторону, кубік проходить відстань в змінну box(32px)
	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

// Голова змії
	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead); // якщо змія з'їдає 1 їжу то стає більшою на 1 кубік
}

let game = setInterval(drawGame, 100); // Викликає функцію кожних 100м/с
